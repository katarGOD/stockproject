<template>
  <q-collapsible
    indent
    icon="category"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Product Management')"
    :class="collapseState"
  >
    <q-item
      to="/product-management/product"
    >
      <q-item-main :label="$t('Product')"/>
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
