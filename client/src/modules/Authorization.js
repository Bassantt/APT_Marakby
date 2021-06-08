import axios from "axios";
import store from "../store";
import router from "../router/index";
export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("x-auth-token") || "",
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
      commit("auth_request");
      axios
        .post("http://localhost:3000/sign-up", {
          email: user.email,
          password: user.password,
          username: user.username,
          type: user.type,
          Phone: user.Phone,
          country: user.country,
        })
        .then((response) => {
          ///////////////////
          const token = response.data.token;
          localStorage.setItem("X-token", token);
          console.log("token", token);
          ///////////////
        })
        .catch((error) => {
          commit("auth_error", "signup_err");
          localStorage.removeItem("X-token");
          console.log(error);
        });
    },
    get_user({ commit }, flag) {
      const token = localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      commit("auth_request");
      axios
        .get("http://localhost:3000/me")
        .then((response) => {
          const user = response.data[0];
          commit("auth_success", { token, user });
          localStorage.setItem("is-manager", user.type);
          if (flag) router.replace("/");
        })
        .catch((error) => {
          commit("auth_error", "user_err");
          localStorage.removeItem("x-auth-token");
          console.log(error);
        });
    },
    login({ commit }, user) {
      console.log(localStorage);
      commit("auth_request");
      axios
        .post("http://localhost:3000/login", {
          password: user.password,
          email: user.email,
          type: user.type,
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("x-auth-token", token);
          axios.defaults.headers.common["x-auth-token"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch((error) => {
          console.log(error);
          commit("auth_error", "not user by this email");
          localStorage.removeItem("x-auth-token");
        });
    },
    logout({ commit }) {
      commit("logout");
      axios.post("/api/user/logout", {}).then(() => {
        localStorage.removeItem("x-auth-token");
        localStorage.removeItem("is-manager");
        delete axios.defaults.headers.common["x-auth-token"];
      });
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
  },
};
