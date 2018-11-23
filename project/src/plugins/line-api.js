// import something here
import LineAPI from 'line-api'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  const token = 'ZGIylS3hDmIksM1YTuylkgy0OSvz0u9FP6NNv1hz256'
  Vue.prototype.$lineNotify = new LineAPI.Notify({
    token: token
  })
}
