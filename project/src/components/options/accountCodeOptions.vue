<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      accountCodeOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('accountCode')
      .orderBy('code')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.accountCodeOptions.push({
            id: doc.id,
            code: doc.data().code,
            postingCategory: doc.data().postingCategory,
            data: doc.data(),
            // selection
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`
          })
        })
      })
  }
}
</script>
