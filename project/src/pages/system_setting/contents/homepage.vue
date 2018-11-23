<template>
  <div>
    <q-toolbar color="primary" inverted class="shadow-1">
      <q-btn :label="$t('Announcement')" flat rounded icon="announcement" @click="scrollMeTo('announcement')"/>
    </q-toolbar>
    <q-page padding class="row justify-center">

      <div style="width: 800px; max-width: 90vw;">
        <br><br>
        <div ref="announcement" v-html="announcement"></div>
      </div>
      <q-btn
        v-back-to-top
        round
        color="teal-5"
        class="fixed-bottom-right animate-pop"
        style="margin: 0 15px 15px 0"
      >
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import publicFunc from 'src/components/shared/publicFunc'

export default {
  name: 'homepage',
  // mixins
  mixins: [
    publicFunc
  ],
  data () {
    return {
      announcement: ''
    }
  },
  // firestore
  firestore () {
    return {
      contents: this.$database.collection('contents')
    }
  },
  // methods
  methods: {
    async allContents (locale) {
      let vm = this
      let contents = await vm.getContent('homepage', locale)
      // content
      vm.announcement = vm._.find(contents, {code: 'announcement'}).body
    },
    scrollMeTo (refName) {
      let element = this.$refs[refName]
      let top = element.offsetTop

      window.scrollTo(0, top)
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'locale'
    ])
  },
  watch: {
    locale () {
      this.allContents(this.locale)
    }
  },
  created: async function () {
    this.allContents(this.locale)
  }
}
</script>

<style>
</style>
