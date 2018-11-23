<template>
  <!-- dropdown-options -->
  <q-collapsible :label="$t('Options')">
    <!-- title -->
    <q-item
      v-if="hasPermission(['personnel--configure--options--title'])"
      to="/personnel/configure/options/title"
    >
      <q-item-main :label="$t('Title')"/>
    </q-item>
    <!-- education -->
    <q-item
      v-if="hasPermission(['personnel--configure--options--education'])"
      to="/personnel/configure/options/education"
    >
      <q-item-main :label="$t('Education')"/>
    </q-item>
    <q-item-separator />
    <!-- employment-status -->
    <q-item
      v-if="hasPermission(['personnel--configure--options--employment-status'])"
      to="/personnel/configure/options/employment-status"
    >
      <q-item-main :label="$t('Employment status')"/>
    </q-item>
    <!-- overtime-type -->
    <q-item
      v-if="hasPermission(['personnel--configure--options--overtime-type'])"
      to="/personnel/configure/options/overtime-type"
    >
      <q-item-main :label="$t('Overtime type')"/>
    </q-item>

  </q-collapsible>
</template>

<script>
// import
import hasPermission from 'src/components/shared/hasPermission'
// export
export default {
  // mixins
  mixins: [
    hasPermission
  ]
}
</script>
