<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      positionOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('position').get()
      .then(docs => {
        docs.forEach(doc => {
          vm.positionOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().jobTitleEnglish}`,
            model: false
          })
        })
      })
  }
}
</script>
