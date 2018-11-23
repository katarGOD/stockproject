<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      lang: '',
      languageOption: [
        { label: 'EN', value: 'en-us' },
        { label: 'TH', value: 'th' }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setLocale'
    ])
  },
  computed: {
    ...mapGetters([
      'locale'
    ])
  },
  created: function () {
    this.lang = this.locale
  },
  watch: {
    locale () {
      this.lang = this.locale
      this.$i18n.locale = this.locale
      this.$i18n.fallbackLocale = this.locale
    },
    lang (lang) {
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
      this.setLocale(lang)
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
    }
  }
}
</script>
