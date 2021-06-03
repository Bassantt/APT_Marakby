import axios from "axios";
export default {
  namespaced: true,
  state: {
    email:"",
    password: "",
    username: "",
    gender: "",
    country:"",
    birthday:"",

    deleted_Acount: true
    //short cicuit evaluation if the first argument return anything but null it will be stored if not token=''
  },
  mutations: {
  },
  actions: 
  {
    signUp({ commit }, user)
     {
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
