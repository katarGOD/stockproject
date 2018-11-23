// import something here
import FullCalendar from 'vue-full-calendar'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(FullCalendar)
  Vue.config.productionTip = false
}
