<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      authPermissionOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('authPermission').get()
      .then(docs => {
        docs.forEach(doc => {
          vm.authPermissionOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: doc.id
          })
        })
      })
  }
}
</script>
