import axios from "axios";
export default {
  namespaced: true,
  state: {
    Ships: [],
    Ship_Id: "",
    ShipsData: [],
    ShipsOutFromSearch: [],
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
    setShipsOutFromSearch(state, data) {
      state.ShipsOutFromSearch = data;
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
    //////////////////search for ship with name////////////////////////
    SearchShip({ commit }, searchvalue) {
      axios
        .get("/api/search/Ships/" + searchvalue)
        .then((respons) => {
          let resultShips = respons.data.Ships;
          commit("setShipsOutFromSearch", resultShips);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getShips: (state) => state.Ships,
    getShipsData: (state) => state.ShipsData,
    setShipsOutFromSearch: (state) => state.ShipsOutFromSearch,
  },
};
