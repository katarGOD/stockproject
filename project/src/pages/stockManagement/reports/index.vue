<template>
  <div>
    <q-toolbar color="positive">
      <q-toolbar-title>
        {{ $t('Stock Report') }}
      </q-toolbar-title>
    </q-toolbar>
    <q-list link>
      <q-item to="/stock-management/stock-report/po-list">
        <q-item-main>
          <q-item-tile label>
            {{ $t('1) รายงานใบสั่งซื้อ') }}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item to="/stock-management/stock-report/witdraw-list">
        <q-item-main>
          <q-item-tile label>
            {{ $t('2) รายงานการเบิก') }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <!-- render view -->
    <router-view/>
  </div>
</template>
