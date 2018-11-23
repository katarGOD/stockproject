<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      authGroupOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('authGroup').orderBy('index').get()
      .then(docs => {
        docs.forEach(doc => {
          vm.authGroupOptions.push({
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
