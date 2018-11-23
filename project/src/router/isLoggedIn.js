import store from '../store'
export function isLoggedIn () {
  return new Promise(resolve => {
    let result = false
    store.dispatch('assignAuthState')
      .then(user => {
        if (user) {
          result = true
        } else {
          result = false
        }
        return resolve(result)
      })
  })
}
