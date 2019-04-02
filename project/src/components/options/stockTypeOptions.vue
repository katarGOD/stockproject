<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      stockTypeOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('stockType')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.stockTypeOptions.push({
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
