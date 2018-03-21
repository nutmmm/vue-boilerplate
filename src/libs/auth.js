import client from "./client"
import store from "../store"

const auth = {
	login(email, password){
		const payload = email ? { strategy: "local", email, password } : {}

		// If payload is {} it will authenticate using JWT from localStorage
		return client.authenticate(payload).then(res => {
			store.commit("setUser", res.user)
			store.commit("setLoggedIn", true)
		})
		.catch(err => {
			auth.logout()
			throw err
		})
	},

	logout(){
		client.logout();
	},

	register(nick, email, password) {
		return client.service("users").create({
			nick,
			email,
			password
		})
	},

	isLoggedIn(from, to, next){
		if(store.getters.isAuthenticated){
			next();
		}
		next("login")
	}
}

export default auth;
