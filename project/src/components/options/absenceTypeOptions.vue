<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      absenceTypeOptions: []
    }
  },
  methods: {
    getAbsenceTypeOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('leaveAndAbsenceTypes')
          .orderBy('index')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                value: doc.id,
                index: doc.data().index,
                label: doc.data().description,
                id: doc.id,
                code: doc.data().code,
                entitlement: doc.data().entitlement,
                data: doc.data()
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
    vm.absenceTypeOptions = await vm.getAbsenceTypeOptions()
  }
}
</script>
