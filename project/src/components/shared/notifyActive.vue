<template>
  <div></div>
</template>

<script>
export default {
  watch: {
    notifyState () {
      let vm = this
      if (vm.notifyState) {
        let notifyObject = {}
        vm._.forEach(vm.notifyOptions, function (value, key) {
          if (key === 'message') {
            notifyObject[key] = vm.$t(value)
          } else {
            notifyObject[key] = value
          }
        })
        vm.$q.notify(notifyObject)
      }
      vm.resetNotifyState()
    }
  }
}
</script>
