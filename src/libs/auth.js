const client = require("./client");

const auth = {
	hasJWT() {
	//	return false;
	},
	isLoggedIn(from, to, next){
	/*	auth.hasJWT().then(token => {
			if (!token) {
				next("/login");
			}
			else{
				next()
			}
		}).catch(err => {
			next("/login");
		})*/
		next();
	}
}

export default auth;
