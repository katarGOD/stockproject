<template>
  <q-page>
    <homepage/>
  </q-page>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import homepage from 'src/pages/system_setting/contents/homepage'

export default {
  name: 'pageIndex',
  mixins: [
  ],
  components: {
    homepage
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
    ]),
    ...mapMutations([
      'setLeftDrawerOpen',
      'setRightDrawerOpen',
      'setLeftDrawerState'
    ]),
    leftDrawerAction () {
      this.setLeftDrawerOpen()
    },
    rightDrawerAction () {
      this.setRightDrawerOpen()
    },
    openURL
  },
  created: async function () {
    this.setLeftDrawerState(false)
  },
  computed: {
    ...mapGetters([
      'applicationName',
      'leftDrawerOpen',
      'rightDrawerOpen',
      'leftDrawerState',
      'rightDrawerState'
    ]),
    leftDrawer: {
      // getter
      get: function () {
        return this.leftDrawerOpen
      },
      // setter
      set: function (newValue) {
        this.setLeftDrawerOpen()
      }
    },
    rightDrawer: {
      // getter
      get: function () {
        return this.rightDrawerOpen
      },
      // setter
      set: function (newValue) {
        this.setRightDrawerOpen()
      }
    }
  }
}
</script>

<style>
</style>
