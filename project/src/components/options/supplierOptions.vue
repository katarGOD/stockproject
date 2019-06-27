<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      supplierOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('supplier')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.supplierOptions.push({
            id: doc.id,
            data: doc.data(),
            code: doc.data().code,
            // for selection
            value: doc.id,
            label: `${doc.data().suppName}`
          })
        })
      })
  }
}
</script>
