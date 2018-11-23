<template>
  <q-page>
    <q-card style="margin-bottom: 8px">
      <q-card-title>
        <!-- title -->
        <p class="q-headline">{{ $t('Profile') }}</p>
        <!-- sub title -->
        <span slot="right">
          <div class="q-subheading" style="padding-bottom: 20px;">{{ subMenu }} : {{ userName() }}</div>
        </span>
      </q-card-title>
    </q-card>
    <div v-if="hasPermission" class="row justify-between gutter-xs">
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
        <sub-menu/>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-12">
        <router-view @updateSubMenu="subMenu=$event"/>
      </div>
    </div>
    <div v-else>
      {{ $t('Authenticating...') }}
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import authUserOptions from 'src/components/options/authUserWithMoreInfoOptions'
import subMenu from './subMenu'
export default {
  name: 'profileIndex',
  // mixins
  mixins: [
    authUserOptions
  ],
  // components
  components: {
    subMenu
  },
  data () {
    return {
      subMenu: ''
    }
  },
  // methods
  methods: {
    userName () {
      return this._.find(this.authUserOptions, {id: this.$route.params.id})['name']
    }
  },
  // computed
  computed: {
    ...mapGetters([
      'userId',
      'userPermission'
    ]),
    hasPermission () {
      let vm = this
      let result = false
      let permissionObject = vm._.uniq(vm.userPermission)
      if (vm._.intersection(permissionObject, ['personnel--employee-management']).length) {
        result = true
      } else {
        if (vm.$route.params.id === vm.userId) {
          result = true
        } else {
          result = false
        }
      }
      return result
    }
  }
}
</script>

<style>
</style>
