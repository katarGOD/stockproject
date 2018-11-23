<template>
  <div>
    <template v-if="!userInfo.active">
      <q-card>
        <q-card-title>
          {{ $t('Welcome') }} {{ userInfo.fullName }}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <p>{{ $t('Look for the verification email in your inbox and click the link in that email. A confirmation message will appear in your web browser.') }}</p>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :label="$t('Click after you verified')"
            @click="checkVerified"
          />
          <q-btn
            class="q-mr-sm"
            color="grey"
            :label="$t('Resend email verification')"
            @click="resendEmailVerification"
          />
        </q-card-main>
      </q-card>
    </template>
    <template v-else>
      <q-card>
        <q-card-title>
          {{ $t('Welcome') }} {{ userInfo.fullName }}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <p>{{ $t('Thank you for signing up!') }}</p>
          <p>{{ $t('Please click the button below to fill in your personal information') }}</p>
          <q-btn
            class="q-mr-sm"
            color="primary"
            :label="$t('Update profile')"
            @click="$router.push(`/my-account/profile/${userId}/personal`)"
          />
        </q-card-main>
      </q-card>
    </template>
    <q-inner-loading :visible="_.isEmpty(userInfo)">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import userInfo from 'src/components/shared/userInfo'
import router from 'src/router'
export default {
  name: 'welcome',
  // mixins
  mixins: [
    userInfo
  ],
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    ...mapActions([
      'assignAuthState',
      'getAuthPermission'
    ]),
    ...mapMutations([
      'setAllDrawerClose',
      'setLeftDrawerState'
    ]),
    async checkVerified () {
      let vm = this
      let userId = await vm.assignAuthState()
      if (vm.userAccount.emailVerified) {
        vm.$database.collection('authUser').doc(userId).update({
          active: true
        }).then(function () {
          vm.setLeftDrawerState(false)
          vm.$q.notify({
            message: vm.$t('message.thankyouForVerification'),
            type: 'positive',
            icon: 'info'
          })
          router.push({path: '/'})
        })
      } else {
        vm.$q.notify(vm.$t('message.verificationEmailSent'))
      }
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
    let userId = await vm.assignAuthState()
    vm.userInfo = await vm.getUserInfo(userId)
    if (vm.userInfo.active) {
      this.setLeftDrawerState(false)
    } else {
      this.setAllDrawerClose()
      this.setLeftDrawerState(true)
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'userPermission'
    ])
  }
}
</script>

<style>
</style>
