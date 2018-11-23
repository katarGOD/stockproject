<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      initialSetupOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('initialSetup')
      .orderBy('code')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.initialSetupOptions.push({
            id: doc.id,
            data: doc.data(),
            code: doc.data().code,
            // selection
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`
          })
        })
      })
  }
}
</script>
