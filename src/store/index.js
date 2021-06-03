import Vue from "vue";
import Vuex from "vuex";
import signup from "../modules/signup";

//import ShowWebPlayer from "../modules/ShowWebPlayer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
   // ShowWebPlayer
   signup
  }
});
