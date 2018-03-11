import client from "./client"
import store from "../store"

const auth = {
	hasJWT() {
		return client.passport.getJWT()
	},

	login(email, password) {
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

	register(nick, email, password) {
		return client.service("users").create({
			nick,
			email,
			password
		})
	},

	logout() {
		client.logout()
		store.commit("setLoggedIn", false)
	},

	isLoggedIn(from, to, next){
		auth.hasJWT().then(token => {
			if (!token) {
				next("/login")
			} else {
				// has token, but Not authenticated
				// Add store.getters.loggedIn for the case the store is not initialized yet
				if (!store.getters.loggedIn) {
					// try login using JWT
					auth.login().then(next).catch(err => {
						// If JWT token is not valid, redirect to login
						next("/login")
					})
				} else {
					next()
				}
			}
		})
		.catch(err => {
			next("/login")
		})
	}
}
export default auth;
