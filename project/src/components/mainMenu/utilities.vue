<template>
  <!-- leave -->
  <q-collapsible
    indent
    icon="build"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Utilities')"
    :class="collapseState"
  >
    <!-- duplicateField -->
    <q-item to="/utilities/duplicate-field">
      <q-item-main :label="$t('Duplicate field')"/>
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
