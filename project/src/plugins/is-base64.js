import isBase64 from 'is-base64'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$isBase64 = isBase64
}
