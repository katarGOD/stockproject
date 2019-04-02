<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      productOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('product')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.productOptions.push({
            id: doc.id,
            data: doc.data(),
            code: doc.data().code,
            // for selection
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`
          })
        })
      })
  }
}
</script>
