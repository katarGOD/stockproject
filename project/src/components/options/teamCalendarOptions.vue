<template>
  <div></div>
</template>

<script>
export default {
  // data
  data () {
    return {
      teamCalendarOptions: []
    }
  },
  // methods
  methods: {
    getTeamCalendarOptions () {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('teamCalendars')
          .orderBy('code')
          .get()
          .then(function (docs) {
            docs.forEach(function (doc) {
              result.push({
                id: doc.id,
                calendarMaster: doc.data().calendarMaster,
                teamMembers: doc.data().teamMembers,
                activityTypes: doc.data().activityTypes,
                // options
                value: doc.id,
                label: doc.data().code
              })
            })
            return resolve(result)
          })
      })
    }
  },
  // created
  created: async function () {
    let vm = this
    vm.teamCalendarOptions = await vm.getTeamCalendarOptions()
  }
}
</script>
