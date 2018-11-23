<script>
import publicFunc from 'src/components/shared/publicFunc'
export default {
  name: 'crudProcess',
  // mixins
  mixins: [
    publicFunc
  ],
  // data
  data () {
    return {
      // app variable
      subHeading: null,
      formAction: null,
      // datatable
      selected: [],
      filter: '',
      collectionSize: 0,
      loading: true,
      formModal: false
    }
  },
  methods: {
    // loading State
    loadingState (collection) {
      return new Promise(resolve => {
        let result = {}
        collection.get().then(snapshot => {
          result = [snapshot.size, false]
          return resolve(result)
        })
      })
    },
    // initial form
    initialInputForm (inputForm, clearInput = false) {
      let vm = this
      for (let field in inputForm) {
        // parameter clearInput
        if (clearInput) {
          if (inputForm.hasOwnProperty(field)) {
            // object
            if (vm.isObject(inputForm[field])) {
              let result = {}
              for (let key in inputForm[field]) {
                if (vm.isString(inputForm[field][key])) {
                  result[key] = ''
                } else if (vm.isNumber(inputForm[field][key])) {
                  result[key] = 0
                } else if (vm.isArray(inputForm[field][key])) {
                  result[key] = []
                } else if (vm.isBoolean(inputForm[field][key])) {
                  result[key] = false
                } else if (vm.isDate(inputForm[field][key])) {
                  result[key] = new Date()
                } else if (vm.isNull(inputForm[field][key])) {
                  result[key] = ''
                } else if (vm.isUndefined(inputForm[field][key])) {
                  result[key] = ''
                } else {
                  result[key] = inputForm[field][key]
                }
              }
              inputForm[field] = result
            // other type
            } else if (vm.isString(inputForm[field])) {
              inputForm[field] = ''
            } else if (vm.isNumber(inputForm[field])) {
              inputForm[field] = 0
            } else if (vm.isArray(inputForm[field])) {
              inputForm[field] = []
            } else if (vm.isBoolean(inputForm[field])) {
              inputForm[field] = false
            } else if (vm.isDate(inputForm[field])) {
              inputForm[field] = new Date()
            } else if (vm.isNull(inputForm[field])) {
              inputForm[field] = ''
            } else if (vm.isUndefined(inputForm[field])) {
              inputForm[field] = ''
            }
            // case index
            if (field === 'index') {
              inputForm[field] = vm.collectionSize + 1
            }
          }
        // initial form payload
        } else {
          if (inputForm.hasOwnProperty(field)) {
            if (vm.isObject(inputForm[field])) {
              let result = {}
              for (let key in inputForm[field]) {
                // isNull
                if (vm.isNull(inputForm[field][key])) {
                  result[key] = ''
                // isUndefined
                } else if (vm.isUndefined(inputForm[field][key])) {
                  result[key] = ''
                // other
                } else {
                  result[key] = inputForm[field][key]
                }
              }
              inputForm[field] = result
            }
            // isnull
            if (vm.isNull(inputForm[field])) {
              inputForm[field] = ''
            }
            // undefined
            if (vm.isUndefined(inputForm[field])) {
              inputForm[field] = ''
            }
            // case index
            if (field === 'index') {
              inputForm[field] = vm.collectionSize + 1
            }
          }
        }
      }
    },
    // open add form
    openAddForm (inputForm) {
      let vm = this
      vm.subHeading = vm.$t('Add')
      vm.formAction = 'add'
      vm.initialInputForm(inputForm, true)
      vm.formModal = true
    },
    // open update form
    openUpdateFrom (inputForm, selectedRow) {
      let vm = this
      vm.subHeading = vm.$t('Update')
      vm.formAction = 'update'
      for (let field in inputForm) {
        if (inputForm.hasOwnProperty(field)) {
          inputForm[field] = selectedRow[field]
        }
      }
      vm.formModal = true
    },
    // set process
    setProcess (collection, inputForm, validate, docId) {
      return new Promise(resolve => {
        let vm = this
        if (validate.$invalid) {
        // validate false
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          // validate : true
          let value = {}
          for (var field in inputForm) {
            if (inputForm.hasOwnProperty(field)) {
              if (field !== '.key') {
                value[field] = inputForm[field]
              }
            }
          }
          // update document
          collection.doc(docId).set(value).then(function () {
            vm.selected = []
            vm.loadingState(collection).then((result) => {
              [vm.collectionSize, vm.loading] = result
              vm.formModal = false
              vm.initialInputForm(inputForm)
            })
            // notify
            vm.$q.notify({
              message: vm.$t('Form submitted successfully'),
              type: 'positive',
              icon: 'info'
            })
          }).catch(function (error) {
            vm.$q.notify({
              message: vm.$t('Error writing document'),
              type: 'nagative',
              icon: 'error_outline'
            })
            console.error('Error writing document: ', error)
          })
        }
        return resolve(true)
      })
    },
    // decrease index function
    decreaseIndex (props, collection) {
      collection.doc(props.row['.key']).update({
        index: parseInt(props.row.index) - parseInt(1)
      })
    },
    // increase index function
    increaseIndex (props, collection) {
      collection.doc(props.row['.key']).update({
        index: parseInt(props.row.index) + parseInt(1)
      })
    },
    // add document
    addProcess (collection, inputForm, validate) {
      return new Promise(resolve => {
        let vm = this
        if (validate.$invalid) {
        // validate false
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          // validate : true
          let value = {}
          for (var field in inputForm) {
            if (field !== '.key') {
              if (inputForm.hasOwnProperty(field)) {
                value[field] = inputForm[field]
              }
            }
          }
          // add to collection
          collection.add(value).then(function (docRef) {
            vm.loadingState(collection).then((result) => {
              [vm.collectionSize, vm.loading] = result
              vm.formModal = false
              vm.initialInputForm(inputForm)
              // notify
              vm.$q.notify({
                message: vm.$t('Form submitted successfully'),
                type: 'positive',
                icon: 'info'
              })
              return resolve(docRef.id)
            })
          }).catch(function (error) {
            vm.$q.notify({
              message: vm.$t('Error writing document'),
              type: 'nagative',
              icon: 'error_outline'
            })
            console.error('Error writing document: ', error)
            return resolve('')
          })
        }
      })
    },
    // update document
    updateProcess (collection, inputForm, validate) {
      return new Promise(resolve => {
        let vm = this
        if (validate.$invalid) {
        // validate false
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          // validate : true
          let value = {}
          for (var field in inputForm) {
            if (inputForm.hasOwnProperty(field)) {
              if (field !== '.key') {
                value[field] = inputForm[field]
              }
            }
          }
          // update document
          collection.doc(inputForm['.key']).update(value).then(function () {
            vm.selected = []
            vm.loadingState(collection).then((result) => {
              [vm.collectionSize, vm.loading] = result
            })
            vm.formModal = false
            vm.initialInputForm(inputForm)
            // notify
            vm.$q.notify({
              message: vm.$t('Form submitted successfully'),
              type: 'positive',
              icon: 'info'
            })
          }).catch(function (error) {
            vm.$q.notify({
              message: vm.$t('Error writing document'),
              type: 'nagative',
              icon: 'error_outline'
            })
            console.error('Error writing document: ', error)
          })
        }
        return resolve(true)
      })
    },
    // delete document
    deleteProcess (selected, collection) {
      return new Promise(resolve => {
        let vm = this
        vm.$q.dialog({
          title: vm.$t('Confirm'),
          message: vm.$t('Are you sure you want to delete these records?'),
          ok: vm.$t('Confirm'),
          cancel: vm.$t('Cancel'),
          preventClose: true
        }).then(() => {
          // loop selected rows
          selected.forEach(e => {
            // delete rec
            collection.doc(e['.key']).delete()
              .then(function () {
                // remove deleted
                vm._.without(selected, e)
                // loadingState
                vm.loadingState(collection).then((result) => {
                  [vm.collectionSize, vm.loading] = result
                })
                // notify
                vm.$q.notify({
                  message: `${vm.$t('Delete was successful')} : ${e['.key']}`,
                  type: 'positive',
                  icon: 'info'
                })
              })
              // error
              .catch((error) => {
                console.error('Error removing document: ', error)
              })
          })
          return resolve(true)
        }).catch(() => {
          vm.$q.notify({
            message: vm.$t('Cancel'),
            type: 'nagative',
            icon: 'error_outline'
          })
        })
      })
    }
  }
}
</script>
