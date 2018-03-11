export const state = {
  user: {},
  loggedIn: false
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  }
}

// Getters are not really necessary for a simple case like this one, but
// in general is a good practice, since they add another layer of abstraction
// that can be used to get computed or transformed version of the state
export const getters = {
  user: state => state.user,
  loggedIn: state => state.loggedIn
}

export default {
  state,
  mutations,
  getters
}
