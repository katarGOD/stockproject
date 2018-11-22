import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
import 'firebase/firestore'

export default ({ app, router, Vue }) => {
  Vue.use(VueFirestore)
  // initial variable
  const config = {
    apiKey: 'AIzaSyCAuhpQQypYQKbASri6Xn3YeaQIH0UzH1k',
    authDomain: 'link-computerstock.firebaseapp.com',
    databaseURL: 'https://link-computerstock.firebaseio.com',
    projectId: 'link-computerstock',
    storageBucket: 'link-computerstock.appspot.com',
    messagingSenderId: '538933952653',
    imestampsInSnapshots: true
  }
  firebase.initializeApp(config)
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$database = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
  Vue.prototype.$fieldValue = firebase.firestore().FieldValue
}
