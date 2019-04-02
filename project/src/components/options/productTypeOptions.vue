<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      productTypeOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('productType')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.productTypeOptions.push({
            id: doc.id,
            data: doc.data(),
            code: doc.data().code,
            // for selection
            value: doc.id,
            label: `${doc.data().code}`
          })
        })
      })
  }
}
</script>
