import Vue from "vue"
import Vuex from "vuex"
//import chat from "./SOTRENAMEONE"
import login from "./login"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		//chat,
		login
	}
})
