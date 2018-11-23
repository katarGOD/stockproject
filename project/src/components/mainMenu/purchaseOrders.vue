<template>
  <!-- purchase-order -->
  <q-collapsible
    indent
    icon="add_shopping_cart"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('purchaseOrders')"
    :class="collapseState"
  >
    <!-- managing-purchase-orders -->
    <q-item
      v-if="hasPermission(['purchase-order--managing-purchase-orders'])"
      to="/purchase-order/managing-purchase-orders"
    >
      <q-item-main :label="$t('managingPurchaseOrders')"/>
    </q-item>
    <q-item-separator />

    <!-- /////// -->
    <!-- reports -->
    <!-- /////// -->
    <template v-if="hasPermission(['purchase-order--reports'])">
      <q-list-header>{{$t('Reports')}}</q-list-header>
      <!-- purchase-order-history -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--purchase-order-history-report'])"
        to="/purchase-order/purchase-order-history-report"
      >
        <q-item-main :label="$t('purchaseOrderHistoryReport')"/>
      </q-item>
      <!-- receive-history -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--receive-history-report'])"
        to="/purchase-order/receive-history-report"
      >
        <q-item-main :label="$t('receiveHistoryReport')"/>
      </q-item>
      <!-- purchase-by-vendor -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--purchase-by-vendor-report'])"
        to="/purchase-order/purchase-by-vendor-report"
      >
        <q-item-main :label="$t('purchaseByVendorReport')"/>
      </q-item>
      <!-- purchases-by-item -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--purchases-by-item-report'])"
        to="/purchase-order/purchases-by-item-report"
      >
        <q-item-main :label="$t('purchasesByItemReport')"/>
      </q-item>
      <!-- bill-details -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--bill-details-report'])"
        to="/purchase-order/bill-details-report"
      >
        <q-item-main :label="$t('billDetailsReport')"/>
      </q-item>
      <!-- payments-made -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--payments-made-report'])"
        to="/purchase-order/payments-made-report"
      >
        <q-item-main :label="$t('paymentsMadeReport')"/>
      </q-item>
      <!-- vendor-balance -->
      <q-item
        v-if="hasPermission(['purchase-order--reports--vendor-balance-report'])"
        to="/purchase-order/vendor-balance-report"
      >
        <q-item-main :label="$t('vendorBalanceReport')"/>
      </q-item>
      <q-item-separator />
    </template>

    <!-- ///////// -->
    <!-- configure -->
    <!-- ///////// -->
    <template v-if="hasPermission(['purchase-order--configure'])">
      <q-list-header>{{$t('Configure')}}</q-list-header>
      <!-- vendor-type -->
      <q-item
        v-if="hasPermission(['purchase-order--configure--vendor-type'])"
        to="/purchase-order/vendor-type"
      >
        <q-item-main :label="$t('vendorType')"/>
      </q-item>
      <!-- purchase-order-status -->
      <q-item
        v-if="hasPermission(['purchase-order--configure--purchase-order-status'])"
        to="/purchase-order/purchase-order-status"
      >
        <q-item-main :label="$t('purchaseOrderStatus')"/>
      </q-item>
      <!-- purchase-amount-approval-limit -->
      <q-item
        v-if="hasPermission(['purchase-order--configure--purchase-amount-approval-limit'])"
        to="/purchase-order/purchase-amount-approval-limit"
      >
        <q-item-main :label="$t('purchaseAmountApprovalLimit')"/>
      </q-item>
    </template>
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
