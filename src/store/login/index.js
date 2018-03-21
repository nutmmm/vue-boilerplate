export const state = {
	// This should contain variables that you would like to preserve
	user: {},
	loggedIn: false

}

export const mutations = {
	// This should contain methods for modifying the state section but should not be called directly
	setUser(state, user) {
		state.user = user
	},
	setLoggedIn(state, loggedIn) {
		state.loggedIn = loggedIn
	}
}

export const actions = {
	// This should contain methods that do not modify the state directly
	// They may however modify the stat by calling a method in the mutations
	// This may be done via: commit("mutation_name", data)
}

export const getters = {
	// This should contain methods for retrieving the data from the state
}

export default {
  state,
  mutations,
  actions,
  getters
}
