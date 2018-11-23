<script>
// export
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUserInfo (userId) {
      return new Promise(resolve => {
        this.$database.collection('authUser').doc(userId).get()
          .then(function (doc) {
            if (doc.exists) {
              return resolve(doc.data())
            } else {
              return resolve({})
            }
          })
      })
    }
  }
}
</script>
