<template>
  <!-- inventory -->
  <q-collapsible
    indent
    icon="card_giftcard"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('inventory')"
    :class="collapseState"
  >
    <!-- product-info -->
    <q-item
      v-if="hasPermission(['inventory--product-info'])"
      to="/inventory/product-info"
    >
      <q-item-main :label="$t('productInfo')"/>
    </q-item>
    <!-- stock-entry -->
    <q-item
      v-if="hasPermission(['inventory--stock-entry'])"
      to="/inventory/stock-entry"
    >
      <q-item-main :label="$t('stockEntry')"/>
    </q-item>
    <!-- item-adjustments -->
    <q-item
      v-if="hasPermission(['inventory-item-adjustments'])"
      to="/inventory/item-adjustments"
    >
      <q-item-main :label="$t('itemAdjustments')"/>
    </q-item>
    <!-- transfer-order -->
    <q-item
      v-if="hasPermission(['inventory--transfer-order'])"
      to="/inventory/transfer-order"
    >
      <q-item-main :label="$t('transferOrder')"/>
    </q-item>
    <q-item-separator />

    <!-- /////// -->
    <!-- reports -->
    <!-- /////// -->
    <template v-if="hasPermission(['inventory--reports'])">
      <q-list-header>{{$t('Reports')}}</q-list-header>
      <!-- stock-movement-report -->
      <q-item
        v-if="hasPermission(['inventory--reports--stock-movement-report'])"
        to="/inventory/reports/stock-movement-report"
      >
        <q-item-main :label="$t('stockMovementReport')"/>
      </q-item>
      <!-- product-sales-report -->
      <q-item
        v-if="hasPermission(['inventory--reports--product-sales-report'])"
        to="/inventory/reports/product-sales-report"
      >
        <q-item-main :label="$t('productSalesReport')"/>
      </q-item>
      <!-- active-purchase-orders-report -->
      <q-item
        v-if="hasPermission(['inventory--reports--active-purchase-orders-report'])"
        to="/inventory/reports/active-purchase-orders-report"
      >
        <q-item-main :label="$t('activePurchaseOrderReport')"/>
      </q-item>
      <!-- inventory-details -->
      <q-item
        v-if="hasPermission(['inventory--reports--inventory-details'])"
        to="/inventory/reports/inventory-details-report"
      >
        <q-item-main :label="$t('inventoryDetailsReport')"/>
      </q-item>
      <!-- inventory-valuation-summary -->
      <q-item
        v-if="hasPermission(['inventory--reports--inventory-valuation-summary'])"
        to="/inventory/reports/inventory-valuation-summary-report"
      >
        <q-item-main :label="$t('inventoryValuationSummaryReport')"/>
      </q-item>
      <!-- warehouse-report -->
      <q-item
        v-if="hasPermission(['inventory--reports--warehouse-report'])"
        to="/inventory/reports/warehouse-report"
      >
        <q-item-main :label="$t('warehouseReport')"/>
      </q-item>
      <q-item-separator />
    </template>

    <!-- ///////// -->
    <!-- configure -->
    <!-- ///////// -->
    <template v-if="hasPermission(['inventory--configure'])">
      <q-list-header>{{$t('Configure')}}</q-list-header>
      <!-- warehouse -->
      <q-item
        v-if="hasPermission(['inventory--configure--warehouse'])"
        to="/inventory/configure/warehouse"
      >
        <q-item-main :label="$t('warehouse')" />
      </q-item>
      <!-- items -->
      <q-item
        v-if="hasPermission(['inventory--configure--items'])"
        to="/inventory/configure/items"
      >
        <q-item-main :label="$t('items')" />
      </q-item>
      <!-- composite-items -->
      <q-item
        v-if="hasPermission(['inventory--configure--composite-item'])"
        to="/inventory/configure/composite-items"
      >
        <q-item-main :label="$t('compositeItems')" />
      </q-item>
      <!-- price-lists -->
      <q-item
        v-if="hasPermission(['inventory--configure--price-lists'])"
        to="/inventory/configure/price-lists"
      >
        <q-item-main :label="$t('priceLists')" />
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
