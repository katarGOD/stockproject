<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      employmentStatusOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('employmentStatus').get()
      .then(docs => {
        docs.forEach(doc => {
          vm.employmentStatusOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().status}`,
            model: false
          })
        })
      })
  }
}
</script>
