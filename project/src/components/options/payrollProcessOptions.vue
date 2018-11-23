<template>
  <div></div>
</template>

<script>
export default {
  // data
  data () {
    return {
      payrollProcessOptions: []
    }
  },
  // methods
  methods: {
    getPayrollProcessOptions (years) {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('payrollProcess')
          .where('yearOfProcess', '==', years)
          .orderBy('dateOfProcess')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              result.push({
                id: doc.id,
                data: doc.data(),
                // selection
                value: doc.id,
                label: `${doc.data().processName} ${doc.data().description}`
              })
            })
            return resolve(result)
          })
      })
    }
  },
  // created
  created: async function () {
  }
}
</script>
