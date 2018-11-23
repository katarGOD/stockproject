// import something here
import JsonExcel from 'vue-json-excel'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('downloadExcel', JsonExcel)
}
