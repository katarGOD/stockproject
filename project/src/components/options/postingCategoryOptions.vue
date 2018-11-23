<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      postingCategoryOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('postingCategory')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.postingCategoryOptions.push({
            id: doc.id,
            data: doc.data(),
            type: doc.data().type,
            // for selection
            value: doc.id,
            label: `${doc.data().code}`
          })
        })
      })
  }
}
</script>
