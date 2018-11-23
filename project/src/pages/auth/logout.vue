<template>
  <div>
    <q-card-title>
      <q-icon name="exit_to_app"/> {{ $t('Logout') }}
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <span>{{ $t('Are you sure you want to log out?') }}</span>
    </q-card-main>

    <!-- Submit Button -->
    <q-card-actions align="center">
      <q-btn
        color="orange"
        icon="home"
        :label="$t('Home')"
        @click="$router.push('/')"
      />
      <q-btn
        color="primary"
        icon="exit_to_app"
        :label="$t('Logout')"
        @click="logout"
      />
    </q-card-actions>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'logout',
  mixins: [
  ],
  data () {
    return {
      email: this.$route.query.email,
      password: null
    }
  },
  methods: {
    ...mapActions([
      'signUserOut'
    ]),
    ...mapMutations([
      'setLeftDrawerState'
    ]),
    checkKey (e) {
      // code: "Enter"
      if (e.charCode === 13) {
        this.logout()
      }
    },
    logout () {
      let vm = this
      vm.signUserOut({router: vm.$router})
    }
  },
  created: function () {
    window.addEventListener('keypress', this.checkKey)
  },
  computed: {
    ...mapGetters([
      'leftDrawerState',
      'rightDrawerState',
      'userAccount'
    ])
  },
  beforeDestroy () {
    window.removeEventListener('keypress', this.checkKey)
  }
}
</script>

<style>
</style>
