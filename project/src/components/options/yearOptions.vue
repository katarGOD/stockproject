<template>
  <div></div>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      yearOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    let currentYear = date.formatDate(Date.now(), 'YYYY')
    this.$database.collection('initialSetup').where('code', '==', '_STSY').get().then(snapshot => {
      snapshot.forEach(doc => {
        let systemStartupYear = doc.data().value
        vm._.range(parseInt(systemStartupYear), (parseInt(currentYear) + 4)).forEach(function (i) {
          vm.yearOptions.push({
            value: i,
            label: `${i}`
          })
        })
      })
    })
  }
}
</script>
