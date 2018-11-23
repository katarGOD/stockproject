<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      branchOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('branch')
      .orderBy('code')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.branchOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`
          })
        })
      })
  }
}
</script>
