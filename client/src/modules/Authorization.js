import axios from "axios";
import store from "../store";
import router from "../router/index";
export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("Authorization") || "",
    resendtoken: localStorage.getItem("X-token") || "",
    User: {},
    deleted_Acount: true,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.User = user;
    },
    auth_error(state, err_msg) {
      state.status = err_msg;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.User = {};
    },
    deleted(state) {
      state.status = "";
      state.token = "";
      state.User = {};
    },
  },
  actions: {
    signUp({ commit }, user) {
      console.log(user);
      commit("auth_request");
      axios
        .post("http://localhost:3000/sign-up", {
          email: user.email,
          password: user.password,
          userName: user.username,
          type: user.type,
          country: user.country,
        })
        .then((response) => {
          ///////////////////
          console.log(response);
          const token = response.data.token;
          localStorage.setItem("Authorization", token);
          axios.defaults.headers.common["Authorization"] = token;
          store.dispatch("Authorization/get_user", true);
          console.log(" sign up from token", token);
          ///////////////
        })
        .catch((error) => {
          commit("auth_error", "signup_err");
          localStorage.removeItem("X-token");
          console.log(error);
        });
    },
    get_user({ commit }, flag) {
      const token = localStorage.getItem("Authorization");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_request");
      axios
        .get("http://localhost:3000/me")
        .then((response) => {
          console.log(response);
          const user = response.data.user;
          commit("auth_success", { token, user });
          localStorage.setItem("is-manager", user.type);
          if (flag) router.replace("/");
        })
        .catch((error) => {
          commit("auth_error", "user_err");
          localStorage.removeItem("Authorization");
          console.log(error);
        });
    },
    login({ commit }, user) {
      console.log(localStorage,"hi iam in log in");
      console.log(user);
      commit("auth_request");
      axios
        .post("http://localhost:3000/login", {
          password: user.password,
          email: user.email,
          type: user.type,
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("Authorization", token);
          axios.defaults.headers.common["Authorization"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch((error) => {
          console.log(error);
          commit("auth_error", "not user by this email");
          localStorage.removeItem("Authorization");
        });
    },
    logout({ commit }) {
      commit("logout");
        localStorage.removeItem("X-token");
        localStorage.removeItem("Authorization");
        localStorage.removeItem("is-manager");
        delete axios.defaults.headers.common["Authorization"];
        router.replace("/");
    },
    removeuser({ commit, state }) {
      axios
        .delete("http://localhost:3000/me/delete")
        .then(() => {
          state.deleted_Acount = true;
          commit("deleted");
          router.replace("/");
          delete axios.defaults.headers.common["x-auth-token"];
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status != 400) {
            state.deleted_Acount = false;
          }
        });
    },
  },
  getters: {
    Username: (state) => state.User.displayName,
    GetStatus: (state) => state.status,
    user: (state) => state.User,
    userid: (state) => state.User._id,
    usertype: (state) => state.User.type,
    deleted_Acountt: (state) => state.deleted_Acount,
    getuser_discount:(state) => state.User.discond
  },
};