<template>
  <div class="fixed-center text-center">
        {{ $t('offlineMessage') }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { watch } from 'is-offline'

export default {
  components: {
  },
  methods: {
    ...mapActions([
      'assignAuthState',
      'getAuthPermission'
    ])
  },
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'userPermission'
    ])
  },
  created: async function () {
    let vm = this
    // watch networkStatus
    watch(function (result) {
      if (!result) {
        // vm.goBack()
        vm.$router.push('/')
      }
    })
  }
}
</script>
