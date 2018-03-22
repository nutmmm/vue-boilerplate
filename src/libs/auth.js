import client from "./client"
import store from "../store"

const auth = {
	hasJWT() {
		return client.passport.getJWT();
	},

	login(email, password){
		const payload = email ? { strategy: "local", email, password } : {};

		// If payload is {} it will authenticate using JWT from localStorage
		return client.authenticate(payload).then(res => {
			store.dispatch("setUser", res.user);
			store.dispatch("setLoggedIn", true);
		})
		.catch(err => {
			auth.logout();
			throw err;
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
		});
	},

	beforeRoot(from, to, next){
		auth.hasJWT().then(token => {
			if (!token) {
				next("/login");
			}
			else {
				// has token, but Not authenticated
				// Add store.getters.loggedIn for the case the store is not initialized yet
				if (!store.getters.loggedIn) {
					// try login using JWT
					auth.login().then(next).catch(err => {
						// If JWT token is not valid, redirect to login
						next("/login");
					})
				}
				else {
					next();
				}
			}
		})
		.catch(err => {
			next("/login");
		})
	},

	beforeLogin(from, to, next){
		auth.hasJWT().then(token => {
			if (!token) {
				next();
			}
			else {
				if (store.getters.loggedIn) {
					next("/");
				}
				else{
					auth.login().then(res => {
						next("/");
					}).catch(err => {
						next();
					});
				}
			}
		})
		.catch(err => {
			next();
		});
	}
}
export default auth;
