// import something here
import changeCase from 'change-case'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$changeCase = changeCase
}
