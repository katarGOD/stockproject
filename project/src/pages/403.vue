<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/customer-logo.png"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">{{ $t('Checking permission') }}<strong> (403)</strong></p>
    <q-btn
      class="q-mr-sm"
      color="secondary"
      icon="arrow_back"
      :label="$t('back')"
      @click="goBack"
    />
    <q-btn
      class="q-mr-sm"
      color="secondary"
      icon="home"
      :label="$t('Home')"
      @click="$router.push('/')"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  created: async function () {
    this.$q.loading.show()
    await this.assignAuthState()
    await this.getAuthPermission(this.userId).then(() => {
      this.$q.loading.hide()
      if (this.requestUrl) {
        this.goBack()
      }
    })
  },
  methods: {
    ...mapActions([
      'assignAuthState',
      'getAuthPermission'
    ]),
    goBack () {
      this.$router.push({ path: `${this.requestUrl}` })
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'userPermission',
      'requestUrl'
    ])
  },
  watch: {
    userPermission () {
      if (this.userPermission.length) {
        this.goBack()
      }
    }
  }
}
</script>

<style>
</style>
