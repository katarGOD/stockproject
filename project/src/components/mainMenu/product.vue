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
    <q-list-header>{{$t('report')}}</q-list-header>
      <q-item
        to="/product-management/product-report"
      >
        <q-item-main :label="$t('รายงานสินค้า')"/>
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
