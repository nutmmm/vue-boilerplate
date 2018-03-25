import Vue from "vue"
import Router from "vue-router"
import Login from "./pages/Login.vue"
import Register from "./pages/Register.vue"
import Chat from "./pages/Chat.vue"
import auth from "./libs/auth"

Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "Chat",
			component: Chat,
			beforeEnter: auth.beforeRoot
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
			beforeEnter: auth.beforeLogin
		},
		{
			path: "/register",
			name: "Register",
			component: Register,
			beforeEnter: auth.beforeLogin
		},
		// If access a non-existing route, redirect to root route
		{
			path: "*",
			redirect: "/"
		}
	]
})

router.afterEach(function (to, from){
	//Set the title for the pages
	document.title = to.name;
});

export default router;
