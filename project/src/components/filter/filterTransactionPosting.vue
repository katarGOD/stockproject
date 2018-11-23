<template>
  <div></div>
</template>

<script>
export default {
  // data
  data () {
    return {
      datatable: []
    }
  },
  // methods
  methods: {
    getDatatable (payrollProcess, accountCode) {
      return new Promise(resolve => {
        let vm = this
        let result = []
        // posetdTransaction
        if (accountCode.length) {
          result = []
          accountCode.forEach(function (eachAcc) {
            vm.$database.collection('transactionPosting')
              .where('payrollProcess', '==', payrollProcess)
              .where('accountCode', '==', eachAcc)
              .get()
              .then(docs => {
                docs.forEach(function (doc) {
                  result.push(
                    {
                      '.key': doc.id,
                      accountCode: doc.data().accountCode,
                      accountCodeRef: doc.data().accountCodeRef,
                      amount: doc.data().amount,
                      authUser: doc.data().authUser,
                      autoPost: doc.data().autoPost,
                      calculateTax: doc.data().calculateTax,
                      createdBy: doc.data().createdBy,
                      createdOn: doc.data().createdOn,
                      dateOfPosting: doc.data().dateOfPosting,
                      description: doc.data().description,
                      modifiedBy: doc.data().modifiedBy,
                      modifiedOn: doc.data().modifiedOn,
                      payrollProcess: doc.data().payrollProcess,
                      payrollProcessRef: doc.data().payrollProcessRef,
                      postingCategory: doc.data().postingCategory,
                      yearOfPosting: doc.data().yearOfPosting
                    }
                  )
                })
                return resolve(result)
              })
          })
        } else {
          result = []
          vm.$database.collection('transactionPosting')
            .where('payrollProcess', '==', payrollProcess)
            .orderBy('accountCodeRef.code')
            .get()
            .then(docs => {
              docs.forEach(function (doc) {
                result.push(
                  {
                    '.key': doc.id,
                    accountCode: doc.data().accountCode,
                    accountCodeRef: doc.data().accountCodeRef,
                    amount: doc.data().amount,
                    authUser: doc.data().authUser,
                    autoPost: doc.data().autoPost,
                    calculateTax: doc.data().calculateTax,
                    createdBy: doc.data().createdBy,
                    createdOn: doc.data().createdOn,
                    dateOfPosting: doc.data().dateOfPosting,
                    description: doc.data().description,
                    modifiedBy: doc.data().modifiedBy,
                    modifiedOn: doc.data().modifiedOn,
                    payrollProcess: doc.data().payrollProcess,
                    payrollProcessRef: doc.data().payrollProcessRef,
                    postingCategory: doc.data().postingCategory,
                    yearOfPosting: doc.data().yearOfPosting
                  }
                )
              })
              return resolve(result)
            })
        }
      })
    }
  },
  // created
  created: async function () {
  }
}
</script>
