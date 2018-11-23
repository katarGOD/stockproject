// import something here
import ThaiBaht from 'thai-baht-text'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$ThaiBaht = ThaiBaht
}
