<template>
  <div>
    <q-toolbar color="warning">
      <q-toolbar-title>
        {{ $t('My account') }}
      </q-toolbar-title>
    </q-toolbar>
    <!-- render view -->
    <router-view/>
  </div>
</template>
