<template>
  <div></div>
</template>

<script>
export default {
  // data
  data () {
    return {
      branchs: [],
      departments: [],
      positions: [],
      officials: [],
      authUserOptions: []
    }
  },
  // methods
  methods: {
    getBranchOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('branch')
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                code: doc.data().code,
                description: doc.data().description
              })
            })
            vm.branchs = result
            resolve(result)
          })
      })
    },
    getDepartmentOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('department')
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                code: doc.data().code,
                description: doc.data().description
              })
            })
            vm.departments = result
            resolve(result)
          })
      })
    },
    getPositionOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('position').get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                jobTitleThai: doc.data().jobTitleThai,
                jobTitleEnglish: doc.data().jobTitleEnglish
              })
            })
            vm.positions = result
            resolve(result)
          })
      })
    },
    getOffical () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('official')
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                authUser: doc.data().authUser,
                employeeId: doc.data().employeeid,
                employeePayType: doc.data().employeePayType
              })
            })
            vm.officials = result
            resolve(result)
          })
      })
    },
    getAuthUserOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('authUser')
          .orderBy('firstName')
          .get()
          .then(docs => {
            docs.forEach(doc => {
              // position
              let jt = vm._.find(vm.positions, {'id': doc.data().position})
              let jobTitle = jt ? jt.jobTitleEnglish : ''
              // official
              let off = vm._.find(vm.officials, {'authUser': doc.id})
              let employeeId = off ? off.employeeId : ''
              let employeePayType = off ? off.employeePayType : ''
              // department
              let dp = vm._.find(vm.departments, {id: doc.data().department})
              let department = dp ? dp.code : ''
              // branch
              let br = vm._.find(vm.branchs, {id: doc.data().branch})
              let branch = br ? br.code : ''
              result.push({
                id: doc.id,
                data: doc.data(),
                name: `${doc.data().firstName} ${doc.data().lastName}`,
                employeeId: employeeId,
                branch: branch,
                department: department,
                photo: doc.data().photo,
                jobTitle: jobTitle,
                employeePayType: employeePayType,
                // for selection
                value: doc.id,
                label: `${doc.data().firstName} ${doc.data().lastName} ${jobTitle ? '(' + jobTitle + ')' : ''} ${employeePayType}`
              })
            })
            vm.authUserOptions = result
            resolve(result)
          }).catch(err => {
            console.log(err)
          })
      })
    }
  },
  // created
  created: async function () {
    let vm = this
    let promiseArray = [
      vm.getBranchOptions(),
      vm.getPositionOptions(),
      vm.getOffical(),
      vm.getDepartmentOptions()
    ]
    Promise.all(promiseArray)
      .then(() => {
        vm.getAuthUserOptions()
      })
  }
}
</script>
