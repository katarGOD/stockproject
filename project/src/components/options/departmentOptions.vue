<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      departmentOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('department')
      .orderBy('code')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.departmentOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`,
            model: false
          })
        })
      })
  }
}
</script>
