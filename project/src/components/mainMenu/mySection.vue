<template>
  <q-collapsible
    indent
    icon="face"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('My  account')"
    :class="collapseState"
  >
    <!-- time-clock -->
    <q-item to="/my-account/time-clock">
      <q-item-main :label="$t('Time clock')"/>
      <q-item-side right icon="timer" />
    </q-item>
    <!--
    tasks
    <q-item to="/tasks">
      <q-item-main :label="$t('Tasks')"/>
      <q-item-side right icon="playlist_add_check" />
    </q-item>
    calendar
    <q-item to="/my-account/calendar">
      <q-item-main :label="$t('calendar')"/>
    </q-item>
     -->
    <!-- requests -->
    <q-item to="/my-account/leave-request">
      <q-item-main :label="$t('Leave request')"/>
    </q-item>
    <q-item
      v-if="hasPermission(['overtime-request'])"
      to="/my-account/overtime-request">
      <q-item-main :label="$t('Overtime request')"/>
    </q-item>
    <q-item-separator />
    <!-- profile -->
    <q-item :to="{ path: `/my-account/profile/${userId}` }">
      <q-item-main :label="$t('Profile')"/>
    </q-item>
    <q-item to="/my-account/change-password">
      <q-item-main :label="$t('Change Password')"/>
    </q-item>
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
