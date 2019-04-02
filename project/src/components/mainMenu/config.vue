<template>
  <q-collapsible
    indent
    icon="settings"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Configulation')"
    :class="collapseState"
  >
    <q-item
      to="/config/stock-type"
    >
      <q-item-main :label="$t('Stock Type')"/>
    </q-item>
    <!-- product type -->
    <q-item
      to="/config/product-type"
    >
      <q-item-main :label="$t('Product Type')"/>
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
