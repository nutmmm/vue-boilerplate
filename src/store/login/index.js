export const state = {
	// This should contain variables that you would like to preserve
	authenticated: false

}

export const mutations = {
	// This should contain methods for modifying the state section but should not be called directly
	authenticate(){
		state.authenticated = true;
	}
}

export const actions = {
	// This should contain methods that do not modify the state directly
	// They may however modify the stat by calling a method in the mutations
	// This may be done via: commit("mutation_name", data)
	authenticate(){
		this.commit("authenticate")
	}
}

export const getters = {
	// This should contain methods for retrieving the data from the state
	isAuthenticated(){
		return state.authenticated;
	}
}

export default {
  state,
  mutations,
  actions,
  getters
}
