<script>
export default {
  name: 'deleteProcess',
  methods: {
    addProcess (database, value, inputForm) {
      return new Promise(resolve => {
        let vm = this
        // validate
        if (inputForm.$invalid) {
          vm.$q.notify({
            message: vm.$t('Form validation error'),
            type: 'nagative',
            icon: 'error_outline'
          })
        } else {
          let vm = this
          // validate
          // set record
          database.add(value).then(function () {
            // notify
            vm.$q.notify({
              message: vm.$t('Form submitted successfully'),
              type: 'positive',
              icon: 'info'
            })
          }).catch(function (error) {
            vm.$q.notify(vm.$t('Error writing document'))
            console.error('Error writing document: ', error)
          })
        }
        return resolve(true)
      })
    },
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
                // notify
                vm.$q.notify({
                  message: `${vm.$t('Document successfully deleted!')} : ${e['.key']}`,
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
          vm.$q.notify(vm.$t('Cancel'))
        })
      })
    }
  }
}
</script>
