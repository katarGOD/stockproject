<template>
  <div></div>
</template>

<script>
export default {
  // data
  data () {
    return {
      authUserOptions: []
    }
  },
  // methods
  methods: {
    getAuthUserOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('authUser')
          .orderBy('firstName')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                data: doc.data(),
                value: doc.id,
                label: `${doc.data().firstName} ${doc.data().lastName}`,
                model: false
              })
            })
            return resolve(result)
          }).catch(err => {
            console.log(err)
          })
      })
    }
  },
  // created
  created: async function () {
    let vm = this
    vm.authUserOptions = await vm.getAuthUserOptions()
  }
}
</script>
