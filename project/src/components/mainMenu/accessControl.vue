<template>
  <q-collapsible
    indent
    icon="verified_user"
    @show="toggleCollapse"
    @hide="toggleCollapse"
    :label="$t('Authentication')"
    :class="collapseState"
  >
    <!-- user account -->
    <q-item
      v-if="hasPermission(['access-control--user-accounts'])"
      to="/access-control/user-accounts"
    >
      <q-item-main :label="$t('User accounts')"/>
    </q-item>
    <!-- roles -->
    <q-item
      v-if="hasPermission(['access-control--user-roles'])"
      to="/access-control/roles"
    >
      <q-item-main :label="$t('Roles')"/>
    </q-item>
    <!-- permission -->
    <q-item
      v-if="hasPermission(['access-control--user-permissions'])"
      to="/access-control/permissions"
    >
      <q-item-main :label="$t('Permissions')"/>
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
