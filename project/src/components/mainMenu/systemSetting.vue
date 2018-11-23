<template>
  <q-collapsible
    indent
    icon="settings"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('System setting')"
    :class="collapseState"
  >

    <!-- initial variable -->
    <q-item
      v-if="hasPermission(['system-setting--initial-setup'])"
      to="/system-setting/initial-setup"
    >
      <q-item-main :label="$t('Initial variable')"/>
    </q-item>
    <!-- locale -->
    <q-item
      v-if="hasPermission(['system-setting--locale'])"
      to="/system-setting/locale"
    >
      <q-item-main :label="$t('Locale')"/>
    </q-item>
    <!-- contents -->
    <q-item
      v-if="hasPermission(['system-setting--contents'])"
      to="/system-setting/contents"
    >
      <q-item-main :label="$t('Contents') "/>
    </q-item>
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
