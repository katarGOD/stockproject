<template>
  <q-list link>
    <!-- <q-list-header>{{ $t('User information') }}</q-list-header> -->
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/personal` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Personal') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <!-- <q-item :to="{ path: `/my-account/profile/${$route.params.id}/contact` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Contact') }}</q-item-tile>
      </q-item-main>
    </q-item> -->
  </q-list>
</template>
