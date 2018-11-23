<template>
  <!-- leave -->
  <q-collapsible
    indent
    icon="access_time"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Planner')"
    :class="collapseState"
  >
    <!-- team-calendar -->
    <q-item
      v-if="hasPermission(['planner--team-calendars'])"
      to="/planner/team-calendars"
    >
      <q-item-main :label="$t('Team')"/>
    </q-item>
    <!-- work-schedule -->
    <q-item to="/planner/roster">
      <q-item-main :label="$t('Work schedule')"/>
    </q-item>
    <!-- time-attendance-master -->
    <q-item
      v-if="hasPermission(['planner--time-attendance-master'])"
      to="/planner/time-attendance-master"
    >
      <q-item-main :label="$t('Time attendance master')"/>
    </q-item>

    <q-item-separator />

    <!-- report -->
    <q-list-header>{{$t('Reports')}}</q-list-header>
    <q-item to="/planner/reports/time-attendance-report">
      <q-item-main :label="$t('Time attendance report')"/>
    </q-item>

    <q-item-separator />

    <!-- configure -->
    <q-list-header>{{$t('Configure')}}</q-list-header>
    <!-- public-holiday -->
    <q-item to="/planner/configure/public-holidays">
      <q-item-main :label="$t('Public holidays')"/>
    </q-item>
    <!-- leave-and-absence-type -->
    <q-item to="/planner/configure/leave-and-absence-types">
      <q-item-main :label="$t('Leave & absence types')"/>
    </q-item>
    <!-- activity-types -->
    <q-item to="/planner/configure/activity-types">
      <q-item-main :label="$t('Activity types')"/>
    </q-item>
  </q-collapsible>
</template>

<script>
// import
import hasPermission from 'src/components/shared/hasPermission'
import publicFunc from 'src/components/shared/publicFunc'
// export
export default {
  // mixins
  mixins: [
    hasPermission,
    publicFunc
  ]
}
</script>
