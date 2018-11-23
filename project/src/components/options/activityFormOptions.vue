<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activityFormOptions: [],
      myActivityFormOptions: []
    }
  },
  // created
  created: function () {
    let vm = this
    vm.$database.collection('activityTypes')
      .orderBy('index')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          if (vm._.intersection(doc.data().requester, vm.userRoles).length) {
            vm.myActivityFormOptions.push({
              id: doc.id,
              data: doc.data(),
              value: doc.id,
              label: `${doc.data().code} : ${doc.data().description}`,
              model: false
            })
          }
          vm.activityFormOptions.push({
            id: doc.id,
            data: doc.data(),
            value: doc.id,
            label: `${doc.data().code} : ${doc.data().description}`,
            model: false
          })
        })
      })
  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userRoles'
    ])
  }
}
</script>
