// import
import firebase from 'firebase'
import _ from 'lodash'
import 'firebase/firestore'
// import router from 'src/router'
import { Loading } from 'quasar'

// export
export default {
  // state
  state: {
    requestUrl: null,
    userAccount: null,
    userId: null,
    userRoles: [],
    userPermission: [],
    userEmailVerified: true
  },
  // mutations
  mutations: {
    // setRequestUrl
    setRequestUrl (state, payload) {
      state.requestUrl = payload
    },
    // setUserAccount
    setUserAccount (state, payload) {
      state.userAccount = payload
    },
    // setUserId
    setUserId (state, payload) {
      state.userId = payload
    },
    // setUserRoles
    setUserRoles (state, payload) {
      state.userRoles = payload
    },
    // setUserPermission
    setUserPermission (state, payload) {
      state.userPermission = payload
    },
    // setUserEmailVerified
    setUserEmailVerified (state, payload) {
      state.userEmailVerified = payload
    }
  },
  // actions
  actions: {
    updatePhoneUser ({dispatch, commit}, payload) {
      // show loading
      Loading.show()
      let defalutAuthGroup = []
      dispatch('assignAuthState').then(user => {
        firebase.firestore().collection('initialSetup')
          .where('code', '==', '_AUTHGRP')
          .limit(1)
          .get()
          .then(function (docs) {
            if (docs.size) {
              docs.forEach(function (doc) {
                defalutAuthGroup.push(doc.data().value)
              })
            }
            firebase.firestore().collection('authUser').doc(user)
              .set({
                email: payload.email,
                authGroup: defalutAuthGroup,
                firstName: payload.firstName,
                lastName: payload.lastName,
                inviter: payload.inviter,
                active: payload.active
              })
              .then(function () {
                console.log('Add user to database')
              })
              .catch(function (error) {
                console.error('Error writing document: ', error)
              })
          })
      })
      // commit
      commit('setNotifyState', {
        notifyState: true,
        notifyOptions: {
          message: 'Please enter your password',
          type: 'positive',
          icon: 'info'
        }
      })
      // hide loading
      Loading.hide()
    },
    sendEmailVerify ({commit}) {
      Loading.show()
      let curUser = firebase.auth().currentUser
      curUser.sendEmailVerification().then(() => {
        console.log('email sent')
      })
      commit('setNotifyState', {
        notifyState: true,
        notifyOptions: {
          message: 'Resend Email Success',
          type: 'positive',
          icon: 'info'
        }
      })
      Loading.hide()
    },
    signUserUp ({dispatch, commit}, payload) {
      // show loading
      Loading.show()
      let defalutAuthGroup = []
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(function () {
          let newUser = firebase.auth().currentUser
          newUser.sendEmailVerification().then(() => {
            console.log('email sent')
          })
          // create newUser profile
          dispatch('assignAuthState')
            .then(user => {
              firebase.firestore().collection('initialSetup')
                .where('code', '==', '_AUTHGRP')
                .limit(1)
                .get()
                .then(function (docs) {
                  if (docs.size) {
                    docs.forEach(function (doc) {
                      defalutAuthGroup.push(doc.data().value)
                    })
                  }
                  firebase.firestore().collection('authUser').doc(newUser.uid)
                    .set({
                      email: payload.email,
                      authGroup: defalutAuthGroup,
                      firstName: payload.firstName,
                      lastName: payload.lastName,
                      inviter: payload.inviter,
                      active: payload.active
                    }).then(function () {
                      console.log('Document successfully written!')
                    }).catch(function (error) {
                      console.error('Error writing document: ', error)
                    })
                })
            })
          // commit
          // commit('setUserId', null)
          // commit('setUserAccount', null)
          // commit('setUserPermission', [])
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: 'Signup success',
              type: 'positive',
              icon: 'info'
            }
          })
          // hide loading
          Loading.hide()
        }, function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(`${errorCode} : ${errorMessage}`)
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: errorCode,
              type: 'negative',
              icon: 'error_outline'
            }
          })
        })
    },
    // signUserIn
    signUserIn ({state, commit, dispatch}, payload) {
      Loading.show()
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          if (firebaseUser) {
            // dispatch
            dispatch('getAuthPermission', firebaseUser.user.uid)
            // commit
            commit('setUserId', firebaseUser.user.uid)
            commit('setUserAccount', firebaseUser.user)
            commit('setLeftDrawerState', false)
            commit('setNotifyState', {
              notifyState: true,
              notifyOptions: {
                message: 'Welcome back!',
                type: 'positive'
              }
            })
            payload.router.push('/')
            // hide loading
            Loading.hide()
          } else {
            commit('setUserId', null)
            commit('setUserAccount', null)
            commit('setUserPermission', [])
            commit('setNotifyState', {
              notifyState: true,
              notifyOptions: {
                message: 'The user name entered does not exist or the password is incorrect.',
                type: 'negative',
                icon: 'error_outline'
              }
            })
          }
        })
        .catch(error => {
          Loading.hide()
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: error.code,
              type: 'negative',
              icon: 'error_outline'
            }
          })
          console.log(error)
        })
    },
    // assignAuthState
    assignAuthState ({ commit, dispatch }) {
      return new Promise(function (resolve) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            commit('setUserId', user.uid)
            commit('setUserAccount', user)
            dispatch('getAuthPermission', user.uid)
            dispatch('checkEmailVerified', user)
            return resolve(user.uid)
          } else {
            commit('setUserId', null)
            return resolve(false)
          }
        })
      })
    },
    // checkEmailVerified
    checkEmailVerified ({ commit, state }, payload) {
      let result = false
      if (_.isUndefined(payload)) {
        result = true
      } else {
        if (payload.emailVerified) {
          result = true
        } else {
          if (payload.phoneNumber) {
            result = true
          } else {
            result = false
          }
        }
      }
      commit('setUserEmailVerified', result)
      return result
    },
    // getAuthPermission
    getAuthPermission ({commit}, payload) {
      return new Promise(function (resolve) {
        if (payload) {
          let result = []
          firebase.firestore().collection('authUser').doc(payload).get()
            .then(function (authUserDoc) {
              if (authUserDoc.exists) {
                let roles = (authUserDoc.data().authGroup)
                let lang = authUserDoc.data().language ? authUserDoc.data().language : 'th'
                if (!_.isArray(roles)) {
                  roles = [roles]
                }
                commit('setUserRoles', roles)
                commit('setLocale', lang)
                roles.forEach(function (groupId) {
                  firebase.firestore().collection('authGroup').doc(`${groupId}`).get()
                    .then(function (authGroupDoc) {
                      if (authGroupDoc.exists) {
                        if (authGroupDoc.data().permission) {
                          authGroupDoc.data().permission.forEach(function (eachPermission) {
                            result.push(eachPermission)
                          })
                        }
                      }
                      commit('setUserPermission', result)
                      return resolve(result)
                    })
                })
              } else {
                return resolve(false)
              }
            })
        } else {
          return resolve(false)
        }
      })
    },
    // changePassword
    changePassword ({ commit }, payload) {
      return new Promise((resolve) => {
        let user = firebase.auth().currentUser
        let credentials = firebase.auth.EmailAuthProvider.credential(payload.email, payload.currentPassword)
        user.reauthenticateWithCredential(credentials).then(function () {
          user.updatePassword(payload.password).then(function () {
            // Update successful.
            commit('setNotifyState', {
              notifyState: true,
              notifyOptions: {
                message: 'Password changed',
                type: 'positive',
                icon: 'info'
              }
            })
            return resolve(true)
          }, function (error) {
            // An error happened.
            commit('setNotifyState', {
              notifyState: true,
              notifyOptions: {
                message: error.code,
                type: 'warning',
                icon: 'error_outline'
              }
            })
            console.log(error)
            return resolve(error.message)
          })
        },
        function (error) {
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: error.code,
              type: 'warning',
              icon: 'error_outline'
            }
          })
          console.log(error)
          return resolve(error.message)
        })
      })
    },
    // signUserOut
    signUserOut ({commit}, payload) {
      firebase.auth().signOut()
      commit('setUserId', null)
      commit('setUserAccount', null)
      commit('setUserPermission', [])
      commit('setUserEmailVerified', true)
      payload.router.push('/')
    },
    // resetPassword
    resetPassword ({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload)
        .then(function () {
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: `Password reset`,
              type: 'negative',
              icon: 'error_outline'
            }
          })
        })
        .catch(function () {
          commit('setNotifyState', {
            notifyState: true,
            notifyOptions: {
              message: `Fail`,
              type: 'negative',
              icon: 'error_outline'
            }
          })
        })
    }
  },
  // getters
  getters: {
    requestUrl (state) {
      return state.requestUrl
    },
    userId (state) {
      return state.userId
    },
    userAccount (state) {
      return state.userAccount
    },
    userRoles (state) {
      return state.userRoles
    },
    userPermission (state) {
      return state.userPermission
    },
    userEmailVerified (state) {
      return state.userEmailVerified
    }
  }
}
