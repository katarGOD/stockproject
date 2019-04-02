<template>
  <div>
    <q-list>
      <template v-if="userId">
        <q-list-header>
          <q-btn
            icon="face"
            flat
            style="width:100%"
            :label="email"
            @click="$router.push(`/my-account/profile/${userId}/personal`)"
          />
        </q-list-header>
      </template>
      <template v-else>
        <q-btn
          style="width:100%"
          :label="$t('Login or Signup')"
          @click="$router.push('/login')"
        />
      </template>

      <!-- home -->
      <q-item to="/" exact>
        <q-item-side icon="home" />
        <q-item-main :label="$t('Home')"/>
      </q-item>
      <!-- dashboard
      <q-item to="/dashboard" exact>
        <q-item-side icon="dashboard" />
        <q-item-main :label="$t('Dashboard')"/>
      </q-item> -->
      <template v-if="userEmailVerified">
        <template v-if="userId">
          <!-- my-section -->
          <my-section v-if="userId"/>

          <q-list-header>{{$t('Operation')}}</q-list-header>
          <product/>
          <stock-management/>
          <config/>
          <return-mer/>
          <!-- Access Control -->
          <access-control v-if="hasPermission(['access-control'])"/>
        </template>

        <!-- logout -->
        <q-item
          v-if="userId"
          to="/auth/logout"
          exact
        >
          <q-item-side icon="exit_to_app" />
          <q-item-main :label="$t('Logout')" />
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
// import
import { mapGetters } from 'vuex'
import hasPermission from 'src/components/shared/hasPermission'
// import menu
import mySection from './mySection'
import systemSetting from './systemSetting'
import accessControl from './accessControl'
import config from './config'
import product from './product'
import stockManagement from './stockManagement'
import returnMer from './returnMer'

// export
export default {
  // mixins
  mixins: [
    hasPermission
  ],
  // components
  components: {
    mySection,
    config,
    systemSetting,
    accessControl,
    product,
    stockManagement,
    returnMer

  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userAccount',
      'userEmailVerified'
    ]),
    email () {
      let vm = this
      let result = ''
      try {
        if (vm.userAccount.phoneNumber) {
          result = vm.userAccount.phoneNumber
        } else {
          result = vm.userAccount.email
        }
      } catch (err) {
        result = ''
      }
      return result
    }
  }
}
</script>
