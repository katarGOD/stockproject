<template>
  <q-list link>
    <q-list-header>{{ $t('User information') }}</q-list-header>
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/personal` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Personal') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/contact` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Contact') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item-separator />
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/official` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Official') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/allowance` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Allowance') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/deduction` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Deduction') }}</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item-separator />
    <q-item :to="{ path: `/my-account/profile/${$route.params.id}/education` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Education') }}</q-item-tile>
      </q-item-main>
    </q-item>
     <q-item :to="{ path: `/my-account/profile/${$route.params.id}/skill` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Skill') }}</q-item-tile>
      </q-item-main>
    </q-item>
     <q-item :to="{ path: `/my-account/profile/${$route.params.id}/training` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Training') }}</q-item-tile>
      </q-item-main>
    </q-item>
     <q-item :to="{ path: `/my-account/profile/${$route.params.id}/experience` }">
      <q-item-main>
        <q-item-tile label>{{ $t('Experience') }}</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>
