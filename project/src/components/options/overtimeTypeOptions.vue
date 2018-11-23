<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      overtimeTypeOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('overtimeType')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          vm.overtimeTypeOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`,
            holiday: doc.data().holiday,
            overtime: doc.data().overtime,
            rate: doc.data().rate,
            model: false
          })
        })
      })
  }
}
</script>
