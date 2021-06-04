import axios from "axios";
export default {
  namespaced: true,
  state: {
    Ships: [],
    Ship_Id: "",
    ShipsData: [],
  },
  mutations: {
    setShips(state, resShips) {
      state.Ships = resShips;
    },
    set_Ship(state, id) {
      state.Ship_Id = id;
    },
    setShipsData(state, data) {
      state.ShipsData = data;
    },
  },
  actions: {
    showfreqShips({ commit }) {
      axios
        .get("/api/browse/Ships/")
        .then((respons) => {
          let resShips = respons.data.Ships;
          commit("setShips", resShips);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ////////////////////////////////////////
    setShip({ commit }, ShipId) {
      commit("set_Ship", ShipId);
    },
    ////////////////////////////////////////
    getShipInfo({ commit }, ShipId) {
      axios
        .get("/api/browse/Ship/" + ShipId)
        .then((respons) => {
          let resShipsData = respons.data.playlists;
          commit("setShipsData", resShipsData);
        })
        .catch((error) => {
          commit("setShipsData", []);
          console.log(error);
        });
    },
  },
  getters: {
    getShips: (state) => state.Ships,
    getShipsData: (state) => state.ShipsData,
  },
};
