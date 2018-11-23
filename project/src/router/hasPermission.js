import _ from 'lodash'
import store from '../store'

export function hasPermission (code, next, to) {
  let permissionObject = _.uniq(store.getters.userPermission)
  if (_.intersection(permissionObject, code).length) {
    next()
  } else {
    store.commit('setRequestUrl', to.path)
    next('/403')
  }
}
