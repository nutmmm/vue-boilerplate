import Vue from "vue"
import Router from "vue-router"
import Login from "./Login.vue"
import Register from "./Register.vue"
import Chat from "./Chat.vue"
import auth from "./libs/auth"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Chat",
      component: Chat,
      beforeEnter: auth.isLoggedIn
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    // If access a non-existing route, redirect to root route
    {
      path: "*",
      redirect: "/"
    }
]
})

router.afterEach(function (to, from){
	document.title = to.name;
});

export default router;
