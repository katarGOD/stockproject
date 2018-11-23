<script>
// import
import { mapGetters } from 'vuex'
// export
export default {
  // methods
  methods: {
    hasPermission (code) {
      let permissionObject = this._.uniq(this.userPermission)
      let result = this._.intersection(permissionObject, code).length
      return result
    }
  },
  computed: {
    ...mapGetters([
      'userPermission'
    ])
  }
}
</script>
