<script>
// export
export default {
  // methods
  methods: {
    // getDownloadURL
    getDownloadURL (pageId) {
      // ** return image url or false ** //
      return new Promise(resolve => {
        let vm = this
        vm.$databaseMaster.collection('page').doc(pageId).get()
          .then(function (doc) {
            if (doc.exists) {
              let storageRef = vm.$storageMaster.ref().child(`${doc.data().edition}/${doc.data().volume}/${doc.id}${doc.data().fileExt}`)
              storageRef.getDownloadURL().then(function (url) {
                return resolve(url)
              }).catch(function (error) {
                console.log(error)
                return resolve(false)
              })
            } else {
              console.log('false')
              return resolve('doc not exists')
            }
          })
      })
    }
  }
}
</script>
