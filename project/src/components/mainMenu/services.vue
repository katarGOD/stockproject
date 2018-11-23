<template>
  <!-- service -->
  <q-collapsible
    indent
    icon="favorite_border"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Services')"
    :class="collapseState"
  >
    <!-- contacts -->
    <q-item
      v-if="hasPermission(['services--contacts'])"
      to="/services/contacts"
    >
      <q-item-main :label="$t('Contacts')"/>
    </q-item>
    <!-- manage-sale-orders -->
    <q-item
      v-if="hasPermission(['services--manage-sale-orders'])"
      to="/services/manage-sale-orders"
    >
      <q-item-main :label="$t('Manage sale orders')"/>
    </q-item>
    <!-- invoices -->
    <q-item
      v-if="hasPermission(['services--invoices'])"
      to="/services/invoices"
    >
      <q-item-main :label="$t('Invoices')"/>
    </q-item>
    <!-- deliveries -->
    <q-item
      v-if="hasPermission(['services--deliveries'])"
      to="/services/deliveries"
    >
      <q-item-main :label="$t('deliveries')"/>
    </q-item>
    <template v-if="hasPermission(['no-permission'])">
      <q-item-separator />

      <!-- /////// -->
      <!-- reports -->
      <!-- /////// -->
      <q-list-header>{{$t('Reports')}}</q-list-header>
      <!-- sales-order-history -->
      <q-item to="/services/sales-order-history">
        <q-item-main :label="$t('Sales order history')"/>
      </q-item>
      <!-- invoice-history -->
      <q-item to="/services/invoice-history">
        <q-item-main :label="$t('Invoice history')"/>
      </q-item>
      <!-- payments-received -->
      <q-item to="/services/payments-received">
        <q-item-main :label="$t('Payments received')"/>
      </q-item>
      <!-- sales-by-customer -->
      <q-item to="/services/sales-by-customer">
        <q-item-main :label="$t('Sales by customer')"/>
      </q-item>
      <!-- sales-by-item -->
      <q-item to="/services/sales-by-item">
        <q-item-main :label="$t('salesByItem')"/>
      </q-item>
      <!-- sales-by-salesperson -->
      <q-item to="/services/sales-by-salesperson">
        <q-item-main :label="$t('Sales by sales person')"/>
      </q-item>
      <!-- customer-balance -->
      <q-item to="/services/customer-balance">
        <q-item-main :label="$t('Customer balance')"/>
      </q-item>
      <q-item-separator />

      <!-- ///////// -->
      <!-- configure -->
      <!-- ///////// -->
      <q-list-header>{{$t('Configure')}}</q-list-header>
      <!-- sales-accounts -->
      <q-item to="/services/sales-accounts">
        <q-item-main :label="$t('Sales accounts')"/>
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
