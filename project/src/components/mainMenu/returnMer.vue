<template>
  <q-collapsible
    indent
    icon="category"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Return The Merchandise')"
    :class="collapseState"
  >
    <q-item
      to="/return-merchandise/merchandise"
    >
      <q-item-main :label="$t('ส่งคืนสินค้า')"/>
    </q-item>
    <q-item
      to="/return-merchandise/merchandise-report"
    >
      <q-item-main :label="$t('รายงานส่งคืนสินค้า')"/>
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
