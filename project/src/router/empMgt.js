import _ from 'lodash'
import store from '../store'

export function empMgt (code, id, next, to) {
  console.log(code)
  let permissionObject = _.uniq(store.getters.userPermission)
  if (_.intersection(permissionObject, code).length) {
    next()
  } else {
    if (store.getters.userId === id) {
      next()
    } else {
      store.commit('setRequestUrl', to.path)
      next('/403')
    }
  }
}
