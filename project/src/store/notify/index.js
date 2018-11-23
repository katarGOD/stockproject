export default {
  // state
  state: {
    notifyState: false,
    notifyOptions: {}
  },
  // mutations
  mutations: {
    setNotifyState (state, payload) {
      state.notifyState = payload.notifyState
      state.notifyOptions = payload.notifyOptions
    },
    resetNotifyState (state) {
      state.notifyState = false
      state.notifyOptions = {}
    }
  },
  // getters
  getters: {
    notifyState (state) {
      return state.notifyState
    },
    notifyOptions (state) {
      return state.notifyOptions
    }
  }
}
