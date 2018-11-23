<template>
  <!-- personnel -->
  <q-collapsible
    indent
    icon="people_outline"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Personnel')"
    :class="collapseState"
  >
    <!-- employee-management -->
    <q-item
      v-if="hasPermission(['personnel--employee-management'])"
      to="/personnel/employee-management">
      <q-item-main :label="$t('Employee management')"/>
    </q-item>
    <q-item
      v-if="hasPermission(['personnel--leave-master'])"
      to="/personnel/leave-master">
      <q-item-main :label="$t('Leave master')"/>
    </q-item>
    <q-item
      v-if="hasPermission(['personnel--overtime-master'])"
      to="/personnel/overtime-master">
      <q-item-main :label="$t('Overtime master')"/>
    </q-item>
    <q-item-separator />

    <!-- /////// -->
    <!-- reports -->
    <!-- /////// -->
    <template v-if="hasPermission(['personnel--reports'])">
      <q-list-header>{{$t('Reports')}}</q-list-header>
        <q-item
          v-if="hasPermission(['personnel--reports--employee-list'])"
          to="/personnel/employee-list-reports">
          <q-item-main :label="$t('Employee list')"/>
        </q-item>
        <q-item
          v-if="hasPermission(['personnel--reports--employee-list'])"
          to="/personnel/leave-without-pay-reports">
          <q-item-main :label="$t('Leave Without Pay list')"/>
        </q-item>
        <q-item
          v-if="hasPermission(['personnel--reports--employee-list'])"
          to="/personnel/time-attendance-reports">
          <q-item-main :label="$t('Time Attendance')"/>
        </q-item>
      <q-item-separator />
    </template>

    <!-- ///////// -->
    <!-- configure -->
    <!-- ///////// -->
    <template v-if="hasPermission(['personnel--configure'])">
      <q-list-header>{{$t('Configure')}}</q-list-header>
      <!-- organization -->
      <organization v-if="hasPermission(['personnel--configure--organization'])"/>
      <!-- personnel-options -->
      <personnel-options v-if="hasPermission(['personnel--configure--options'])"/>
    </template>
  </q-collapsible>
</template>

<script>
// import
import hasPermission from 'src/components/shared/hasPermission'
import publicFunc from 'src/components/shared/publicFunc'
import organization from './organization'
import personnelOptions from './personnelOptions'
// export
export default {
  // mixins
  mixins: [
    hasPermission,
    publicFunc
  ],
  // components
  components: {
    organization,
    personnelOptions
  }
}
</script>
