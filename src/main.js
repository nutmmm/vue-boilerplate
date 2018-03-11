// Here you may import any polyfill that you need. core-js polyfills are a good option.
// For example, for this project, the followings are needed for older browsers

import "core-js/fn/array/find"
import "core-js/fn/array/find-index"

import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

new Vue({
  el: "#app",
  store,
  router, // Add router config to the Vue instance
  render: h => h(App)
})
