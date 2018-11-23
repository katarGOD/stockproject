import base64Img from 'base64-img'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$base64Img = base64Img
}
