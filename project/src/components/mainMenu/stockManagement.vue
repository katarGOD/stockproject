<template>
  <q-collapsible
    indent
    icon="category"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Stock Management')"
    :class="collapseState"
  >
    <q-item
      to="/stock-management/po"
    >
      <q-item-main :label="$t('Purchase Order')"/>
    </q-item>
    <q-item
      to="/stock-management/withdraw"
    >
      <q-item-main :label="$t('Withdraw')"/>
    </q-item>
    <q-item
      to="/stock-management/stock-report"
    >
      <q-item-main :label="$t('รายงานการสั่งซื้อ/เบิก')"/>
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
