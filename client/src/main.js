import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
// import axios from "axios";

// axios.defaults.baseURL = "http://34.206.123.67";
// Vue.prototype.$url = "http://34.206.123.67";

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
