<template>
  <q-collapsible
    indent
    icon="face"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('My  account')"
    :class="collapseState"
  >
    <!-- requests -->
    <q-item-separator />
    <!-- profile -->
    <q-item :to="{ path: `/my-account/profile/${userId}` }">
      <q-item-main :label="$t('Profile')"/>
    </q-item>
    <!-- <q-item to="/my-account/change-password">
      <q-item-main :label="$t('Change Password')"/>
    </q-item> -->
  </q-collapsible>
</template>
<script>
// import
import { mapGetters } from 'vuex'
import hasPermission from 'src/components/shared/hasPermission'
import publicFunc from 'src/components/shared/publicFunc'
// export
export default {
  // mixins
  mixins: [
    hasPermission,
    publicFunc
  ],
  // data
  data () {
    return {
      collapseState: ''
    }
  },
  // computed
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}
</script>
