<template>
  <div>
    <q-toolbar color="positive">
      <q-toolbar-title>
        {{ $t('Product report') }}
      </q-toolbar-title>
    </q-toolbar>
    <q-list link>
      <q-item to="/product-management/product-report/product-list">
        <q-item-main>
          <q-item-tile label>
            {{ $t('1) รายงานสินค้าคงคลังทั้งหมด') }}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item to="/product-management/product-report/product-list">
        <q-item-main>
          <q-item-tile label>
            {{ $t('2) รายงานสินค้าคงคลังไกล้หมด') }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <!-- render view -->
    <router-view/>
  </div>
</template>
