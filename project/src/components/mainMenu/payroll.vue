<template>
  <!-- payroll -->
  <q-collapsible
    indent
    icon="event_available"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Payroll')"
    :class="collapseState"
  >
    <!-- payrollProcess -->
    <q-item
      v-if="hasPermission(['payroll--payroll-process'])"
      to="/payroll/payroll-process"
    >
      <q-item-main :label="$t('Payroll process')"/>
    </q-item>
    <!-- transactionPosint -->
    <q-item
      v-if="hasPermission(['payroll--transaction-posting'])"
      to="/payroll/transaction-posting"
    >
      <q-item-main :label="$t('Transaction posting')" />
    </q-item>
    <q-item-separator />

    <!-- /////// -->
    <!-- reports -->
    <!-- /////// -->
    <template v-if="hasPermission(['payroll--reports'])">
      <q-list-header>{{$t('Reports')}}</q-list-header>
      <!-- payroll-process-summary -->
      <q-item
        v-if="hasPermission(['payroll--reports--payroll-process-summary-report'])"
        to="/payroll/reports/payroll-process-summary-report"
      >
        <q-item-main :label="$t('Summary report')"/>
      </q-item>
      <q-item-separator />
    </template>

    <!-- ///////// -->
    <!-- configure -->
    <!-- ///////// -->
    <template v-if="hasPermission(['payroll--configure'])">
      <q-list-header>{{$t('Configure')}}</q-list-header>
      <!-- posting-category -->
      <q-item
        v-if="hasPermission(['payroll--configure--posting-category'])"
        to="/payroll/configure/posting-category"
      >
        <q-item-main :label="$t('Posting category')"/>
      </q-item>
      <!-- account-code -->
      <q-item
        v-if="hasPermission(['payroll--configure--account-code'])"
        to="/payroll/configure/account-code"
      >
        <q-item-main :label="$t('Account code')"/>
      </q-item>
      <!-- income-tax-rate -->
      <q-item
        v-if="hasPermission(['payroll--configure--income-tax-rate'])"
        to="/payroll/configure/income-tax-rate"
      >
        <q-item-main :label="$t('Income tax rate')"/>
      </q-item>
      <!-- provident-fund -->
      <q-item
        v-if="hasPermission(['payroll--configure--provident-fund'])"
        to="/payroll/configure/provident-fund"
      >
        <q-item-main :label="$t('Provident fund')"/>
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
