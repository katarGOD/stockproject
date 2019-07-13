<template>

  <q-collapsible
    v-if="hasPermission(['access-control--stock-managestock'])"
    indent
    icon="category"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Stock Management')"
    :class="collapseState"
  >
    <q-item
      v-if="hasPermission(['access-control--stock-po'])"
      to="/stock-management/po"
    >
      <q-item-main :label="$t('Purchase Order')"/>
    </q-item>
    <q-item
      v-if="hasPermission(['access-control--stock-withdraw'])"
      to="/stock-management/withdraw"
    >
      <q-item-main :label="$t('Withdraw')"/>
    </q-item>
    <q-item
      v-if="hasPermission(['access-control--stock-report'])"
      to="/stock-management/stock-report"
    >
      <q-item-main :label="$t('Po/Withdraw Report')"/>
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
