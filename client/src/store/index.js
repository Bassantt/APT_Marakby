import Vue from "vue";
import Vuex from "vuex";
import Authorization from "../modules/Authorization";
import Ship from "../modules/Ship";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Authorization,
    Ship,
  },
});
