export default {
  // state
  state: {
    applicationName: 'STOCK LINK-COMPUTER',
    subtitle: 'STOCK IN LINK-COMPUTER STORE',
    locale: 'en-us',
    leftDrawerOpen: false,
    leftDrawerState: false
  },
  // mutations
  mutations: {
    setLocale (state, payload) {
      state.locale = payload
    },
    setAllDrawerClose (state) {
      state.leftDrawerOpen = false
    },
    setLeftDrawerOpen (state) {
      state.leftDrawerOpen = !state.leftDrawerOpen
      state.rightDrawerOpen = false
    },
    setLeftDrawerState (state, payload) {
      state.leftDrawerState = payload
    }
  },
  // actions
  actions: {
  },
  // getters
  getters: {
    applicationName (state) {
      return state.applicationName
    },
    subtitle (state) {
      return state.subtitle
    },
    locale (state) {
      return state.locale
    },
    leftDrawerOpen (state) {
      return state.leftDrawerOpen
    },
    leftDrawerState (state) {
      return state.leftDrawerState
    }
  }
}
