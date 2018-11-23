<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" >
        <!-- left drawer open btn -->
        <q-btn
          class="shadow-0"
          color="blue"
          icon="menu"
          :disable="leftDrawerState"
          @click="leftDrawerAction"
        />
        <!-- toolbar title -->
        <q-toolbar-title>
          {{ $t(applicationName) }}
          <div slot="subtitle">
            {{ $t(subtitle) }}
          </div>
        </q-toolbar-title>

        <!-- language selection -->
        <template>
          <q-btn-toggle
            v-model="lang"
            class="shadow-0"
            color="blue-7"
            toggle-color="blue"
            :options="languageOption"
          />
        </template>

      </q-toolbar>
    </q-layout-header>

    <!-- drawer -->
    <q-layout-drawer
      v-model="leftDrawer"
      content-class="bg-grey-2"
    >
      <customer-logo/>
      <main-menu/>
    </q-layout-drawer>

    <!-- page container -->
    <q-page-container>
      <div v-if="userEmailVerified">
        <router-view/>
      </div>
      <div v-else>
        <email-address-verifier/>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { watch } from 'is-offline'
import router from 'src/router'
import langSwitch from 'src/components/shared/langSwitch'
import notifyActive from 'src/components/shared/notifyActive'
import mainMenu from 'src/components/mainMenu'
import customerLogo from 'src/components/shared/customerLogo'
import emailAddressVerifier from 'src/pages/auth/emailAddressVerifier'

export default {
  name: 'LayoutDefault',
  mixins: [
    notifyActive,
    langSwitch
  ],
  components: {
    customerLogo,
    mainMenu,
    emailAddressVerifier
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'assignAuthState',
      'getAuthPermission',
      'checkEmailVerified'
    ]),
    ...mapMutations([
      'setLeftDrawerOpen',
      'setLeftDrawerState',
      'setNotifyState',
      'resetNotifyState'
    ]),
    leftDrawerAction () {
      this.setLeftDrawerOpen()
    },
    openURL
  },
  created: async function () {
    let vm = this
    // watch networkStatus
    watch(function (result) {
      if (result) {
        router.push('/offline')
      }
    })
    // get user id and permission
    await vm.assignAuthState()
    if (vm.userId) {
      await vm.getAuthPermission(vm.userId)
    }
  },
  computed: {
    ...mapGetters([
      'locale',
      'applicationName',
      'subtitle',
      'leftDrawerOpen',
      'leftDrawerState',
      'userId',
      'userPermission',
      'notifyState',
      'notifyOptions',
      'userEmailVerified',
      'userAccount'
    ]),
    leftDrawer: {
      // getter
      get: function () {
        return this.leftDrawerOpen
      },
      // setter
      set: function (newValue) {
        this.setLeftDrawerOpen()
      }
    }
  }
}
</script>

<style>
.text-transparent {display: none;}
.q-field-content {padding-bottom: 10px;}
.q-mr-sm {
  margin-bottom: 10px;
}
.q-stepper-tab {
  padding-top: 32px !important;
}
.q-search {
  margin-top: 9px;
  margin-bottom: 9px;
}
.submit {
  padding-top: 50px;
  text-align: right;
}
</style>
