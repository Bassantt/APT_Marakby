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
    deleted_playlists: [],
    emailConfirmed: Boolean,
    updateConfirmed: Boolean,
    premiumConfirmed: Boolean,
    deleted_Acount: true
    //short cicuit evaluation if the first argument return anything but null it will be stored if not token=''
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    upgrade(state, flag) {
      state.upgraded = flag;
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
    ClaimArtistProfile(state, payload) {
      state.User.update({
        Name: payload.Name,
        Genre: payload.Genre,
        Description: payload.Description
      });
    },
    is_edit(state, msg) {
      state.isEdited = msg;
    },
    setDeletedPlaylists(state, playlists) {
      state.deleted_playlists = playlists;
    },
    deleted(state) {
      state.status = "";
      state.token = "";
      state.User = {};
    }
  },
  actions: {
    signUp({ commit }, user) {
      commit("auth_request");
      axios
        .post("/api/sign_up", {
          email: user.email,
          password: user.password,
          username: user.username,
          gender: user.gender,
          country: user.country,
          birthday: user.birthday
        })
        .then(response => {
          ///////////////////
          const token = response.data.token;
          localStorage.setItem("X-token", token);
          console.log("Nihal", token);
          ///////////////
        })
        .catch(error => {
          commit("auth_error", "signup_err");
          localStorage.removeItem("X-token");
          console.log(error);
        });
    },
    facebook_signUp({ commit }) {
      commit("auth_request");
      axios
        .get("/api/auth/facebook")
        .then(response => {
          const token = response.headers.token;
          localStorage.setItem("x-auth-token", token);
          axios.defaults.headers.common["x-auth-token"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch(error => {
          commit("auth_error", "facebook_err");
          localStorage.removeItem("x-auth-token");
          console.log(error);
        });
    },
    get_user({ commit, dispatch }, flag) {
      const token = localStorage.getItem("x-auth-token");
      axios.defaults.headers.common["x-auth-token"] = token;
      commit("auth_request");
      axios
        .get("/api/me-player")
        .then(response => {
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
        .catch(error => {
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
          password: user.password
        })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem("x-auth-token", token);
          axios.defaults.headers.common["x-auth-token"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch(error => {
          console.log(error);
          commit("auth_error", "login_err");
          localStorage.removeItem("x-auth-token");
        });
    },
    toPremium({ commit }, payload) {
      axios
        .put("api/me/promote", {
          expiresDate: payload.expiresDate,
          cardNumber: payload.cardNumber,
          isMonth: payload.isMonth
        })
        .then(() => {
          router.replace("/EmailConfirmation");
          commit("upgrade", "success");
        })
        .catch(error => {
          console.log(error);
          if (
            error.response.data.error.details[0].message ==
              '"cardNumber" must be a credit card' ||
            error.response.data.error.details[0].message ==
              '"cardNumber" is not allowed to be empty'
          )
            commit("upgrade", "carderror");
          else if (
            error.response.data.error.details[0].message.includes(
              '"expiresDate" must be larger than or equal to'
            )
          )
            commit("upgrade", "dateerror");
          else commit("upgrade", "failed");
        });
    },
    toFree({ commit }) {
      axios
        .put("api/me/free")
        .then(() => {
          store.dispatch("Authorization/logout");
          router.replace("/");
        })
        .catch(error => {
          console.log(error);
          commit("upgrade", false);
        });
    },
    reset({ commit }, user) {
      axios
        .post("/api/login/forgetpassword", {
          email: user.email
        })
        .then(() => {
          commit("logout");
        })
        .catch(error => {
          commit("auth_error", "reset_err");
          console.log(error);
          localStorage.removeItem("x-auth-token");
        });
    },
    resetPassword({ commit }, payload) {
      axios.defaults.headers.common["x-auth-token"] = payload.token;
      axios
        .post("api/login/reset_password", {
          password: payload.password
        })
        .then(() => {
          router.replace("/login");
        })
        .catch(error => {
          commit("logout");
          console.log(error);
          delete axios.defaults.headers.common["x-auth-token"];
        });
    },
    logout({ commit }) {
      var vol = store.getters["Mediaplayer/volume"] * 10;
      var curTime = store.getters["Mediaplayer/progress"];
      commit("logout");
      axios
        .post("/api/user/logout", {
          currentTimeStampe: curTime,
          isRepeatTrack: true,
          volume: vol
        })
        .then(() => {
          localStorage.removeItem("x-auth-token");
          localStorage.removeItem("set-volume");
          localStorage.removeItem("is-artist");
          delete axios.defaults.headers.common["x-auth-token"];
        });
    },
    ClaimArtistProfile({ commit }, payload) {
      axios
        .post("/api/me/ToArtist", {
          name: payload.name,
          genre: payload.genre,
          info: payload.info
        })
        .then(response => {
          const claim = response.data;
          commit("ClaimArtistProfile", claim);
          store.dispatch("Authorization/logout");
          router.replace("/login");
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveEdit({ commit }, user) {
      axios
        .put("/api/me/update", {
          user
        })
        .then(() => {
          commit("is_edit", "success");
          router.replace("/EmailConfirmation");
        })
        .catch(error => {
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
    showDeletedPlaylists({ commit }) {
      axios
        .get("/api/me/deletedplaylists")
        .then(response => {
          let playlists = response.data;
          commit("setDeletedPlaylists", playlists);
        })
        .catch(error => {
          console.log(error);
        });
    },
    ConfirmEmail({ state }, userId) {
      axios.post("/api/login/confirm?id=" + userId);
      state.emailConfirmed = true;
    },
    ResendEmail({ state }) {
      const resendtoken = localStorage.getItem("X-token");
      axios.defaults.headers.common["x-auth-token"] = resendtoken;
      axios.post("/api/sendmail");
      state.emailConfirmed = true;
    },
    ConfirmUpdate({ state }, userId) {
      axios.post("/api/me/confirmUpdate?id=" + userId);
      state.updateConfirmed = true;
    },
    ConfirmPremium({ state }, userId) {
      axios.post("/api/premium/confirm?id=" + userId).then(() => {
        router.replace("/login");
      });
      state.premiumConfirmed = true;
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
        .catch(error => {
          console.log(error.response.status);
          if (error.response.status == 400) {
            state.deleted_Acount = false;
          }
        });
    }
  },
  getters: {
    Username: state => state.User.displayName,
    GetStatus: state => state.status,
    user: state => state.User,
    isEdited: state => state.isEdited,
    deleted_playlists: state => state.deleted_playlists,
    upgraded: state => state.upgraded,
    userid: state => state.User._id,
    deleted_Acountt: state => state.deleted_Acount
  }
};
