<template>
  <div>
    <q-toolbar color="positive">
      <q-toolbar-title>
        {{ $t('Merchandise Report') }}
      </q-toolbar-title>
    </q-toolbar>
    <q-list link>
      <q-item to="/return-merchandise/merchandise-report/merchandise-list">
        <q-item-main>
          <q-item-tile label>
            {{ $t('1) รายงานส่งคืนสินค้าทั้งหมด') }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <!-- render view -->
    <router-view/>
  </div>
</template>
