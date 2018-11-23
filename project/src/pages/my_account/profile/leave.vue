<template>
  <q-page>
    Leave
  </q-page>
</template>
<script>
export default {
  // data
  data () {
    return {
    // app variable
      subHeading: null
    }
  },
  // created
  created: async function () {
    this.$emit('updateSubMenu', this.$t('leave'))
  }
}
</script>
