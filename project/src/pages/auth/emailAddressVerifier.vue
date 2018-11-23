<template>
  <q-page class="flex flex-center">
    <q-card style="width: 385px; max-width: 90vw;">
      <q-card-title>
        <q-icon name="verified_user"/> {{ $t('Verification process') }}
      </q-card-title>
      <q-card-separator />
        <q-card-main>
          <p>{{ $t(`Welcome to The JOBRUN`) }}</p>
          <p>{{ $t(`A validation e-mail has been sent to your e-mail address.`) }}</p>
          <p>{{ $t(`Look for the verification email in your inbox and click the link in that email. A confirmation message will appear in your web browser.`) }}</p>
          <p>{{ $t(`If you didn't receive your verification email, please click resend verification email button below.`) }}</p>
        </q-card-main>
      <q-card-actions align="center">
        <q-btn
          color="primary"
          icon="verified_user"
          :label="$t('Email verified')"
          @click="verified"
        />
      </q-card-actions>

      <q-card-actions align="center">
        <q-btn
          icon="email"
          :label="$t('Resend')"
          @click="resendEmailVerification"
        />
        <q-btn
          icon="exit_to_app"
          :label="$t('Logout')"
          @click="logout"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import router from 'src/router'
import userInfo from 'src/components/shared/userInfo'
export default {
  name: 'emailAddressVerifier',
  mixins: [
    userInfo
  ],
  methods: {
    ...mapActions([
      'signUserIn',
      'signUserOut'
    ]),
    ...mapMutations([
      'setAllDrawerClose',
      'setLeftDrawerState'
    ]),
    logout () {
      let vm = this
      vm.signUserOut()
      router.push('/login')
    },
    verified () {
      this.$router.push('my-account/profile')
      window.location.reload()
    },
    resendEmailVerification () {
      let vm = this
      vm.userAccount.sendEmailVerification()
        .then(() => {
          vm.$q.notify({
            message: vm.$t('Email resented'),
            type: 'positive',
            icon: 'info'
          })
        })
    }
  },
  created: async function () {
    let vm = this
    // set navigator
    vm.setAllDrawerClose()
    vm.setLeftDrawerState(true)
    // check verify account status
    if (vm.userEmailVerified) {
      router.push('/')
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'userEmailVerified',
      'leftDrawerState'
    ])
  }
}
</script>

<style>
</style>
