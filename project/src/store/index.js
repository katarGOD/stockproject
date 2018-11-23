import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import layout from './layout'
import main from './main'
import notify from './notify'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    layout,
    main,
    notify
  }
})

export default store
