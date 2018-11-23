<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      localeOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('locale').get()
      .then(docs => {
        docs.forEach(doc => {
          vm.localeOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().value}`,
            model: false
          })
        })
      })
  }
}
</script>
