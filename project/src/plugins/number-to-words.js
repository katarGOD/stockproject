// import something here
import numberToWords from 'number-to-words'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$numberToWords = numberToWords
}
