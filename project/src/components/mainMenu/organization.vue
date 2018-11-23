<template>
  <!-- organization -->
  <q-collapsible :label="$t('Organization')">
    <!-- company -->
    <q-item
      v-if="hasPermission(['personnel--configure--organization--company'])"
      to="/personnel/configure/organization/company">
      <q-item-main :label="$t('Company')"/>
    </q-item>
    <!-- branch -->
    <q-item
      v-if="hasPermission(['personnel--configure--organization--branch'])"
      to="/personnel/configure/organization/branch">
      <q-item-main :label="$t('Branch')"/>
    </q-item>
    <!-- department -->
    <q-item
      v-if="hasPermission(['personnel--configure--organization--department'])"
      to="/personnel/configure/organization/department">
      <q-item-main :label="$t('Department')"/>
    </q-item>
    <!-- position -->
    <q-item
      v-if="hasPermission(['personnel--configure--organization--position'])"
      to="/personnel/configure/organization/position">
      <q-item-main :label="$t('Position')"/>
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
