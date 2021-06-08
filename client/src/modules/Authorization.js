import axios from "axios";
import store from "../store";
import router from "../router/index";

export default {
  namespaced: true,
  state: {
    status: "",
    upgraded: "",
    token: localStorage.getItem("x-auth-token") || "",
    resendtoken: localStorage.getItem("X-token") || "",
    User: {},
    isEdited: "",
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
    is_edit(state, msg) {
      state.isEdited = msg;
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
        .post("/sign_up", {
          email: user.email,
          password: user.password,
          username: user.username,
          type:user.type,
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
    get_user({ commit, dispatch }, flag) {
      const token = localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      commit("auth_request");
      axios
        .get("/api/me-player")
        .then((response) => {
          const user = response.data[0];
          if (!localStorage.getItem("set-volume")) {
            const setVol = user.player.volume / 10;
            dispatch("Mediaplayer/update_volume", setVol, { root: true });
            localStorage.setItem("set-volume", setVol);
          }
          if (!user.player.haveQueue) {
            dispatch("Queue/CreateQueue", "", { root: true });
          } else {
            dispatch("Mediaplayer/get_currentsong", 2, { root: true });
          }
          commit("auth_success", { token, user });
          localStorage.setItem("is-artist", user.userType);
          if (flag) router.replace("/");
        })
        .catch((error) => {
          commit("auth_error", "user_err");
          localStorage.removeItem("x-auth-token");
          console.log(error);
        });
    },
    login({ commit }, user) {
      commit("auth_request");
      axios
        .post("/api/login", {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("x-auth-token", token);
          axios.defaults.headers.common["x-auth-token"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch((error) => {
          console.log(error);
          commit("auth_error", "login_err");
          localStorage.removeItem("x-auth-token");
        });
    },
    logout({ commit }) {
      commit("logout");
      axios.post("/api/user/logout", {}).then(() => {
        localStorage.removeItem("x-auth-token");
        localStorage.removeItem("set-volume");
        localStorage.removeItem("is-artist");
        delete axios.defaults.headers.common["x-auth-token"];
      });
    },
    saveEdit({ commit }, user) {
      axios
        .put("/api/me/update", {
          user,
        })
        .then(() => {
          commit("is_edit", "success");
          router.replace("/EmailConfirmation");
        })
        .catch((error) => {
          if (
            error.response.data.error.details[0].message ==
            '"cardNumber" must be a credit card'
          )
            commit("is_edit", "carderror");
          else if (
            error.response.data.error.details[0].message.includes(
              '"expiresDate" must be larger than or equal to'
            )
          )
            commit("is_edit", "dateerror");
          else commit("is_edit", "faild");
        });
    },
    removeuser({ commit, state }) {
      axios
        .delete("api/remove")
        .then(() => {
          state.deleted_Acount = true;
          commit("deleted");
          router.replace("/signup");
          delete axios.defaults.headers.common["x-auth-token"];
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 400) {
            state.deleted_Acount = false;
          }
        });
    },
  },
  getters: {
    Username: (state) => state.User.displayName,
    GetStatus: (state) => state.status,
    user: (state) => state.User,
    isEdited: (state) => state.isEdited,
    userid: (state) => state.User._id,
    deleted_Acountt: (state) => state.deleted_Acount,
  },
};
