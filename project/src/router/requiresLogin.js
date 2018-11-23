import store from '../store'
export function requiresLogin (next) {
  return new Promise(resolve => {
    store.dispatch('assignAuthState')
      .then(user => {
        if (user) {
          next()
        } else {
          next('/login')
        }
        return resolve()
      })
  })
}
