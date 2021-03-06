import Vue from "vue";
import Vuex from "vuex";
import Authorization from "../modules/Authorization";
import Ship from "../modules/Ship";
import shipview from "../modules/shipview";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Authorization,
    Ship,
    shipview,
  },
});
