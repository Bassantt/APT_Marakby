import axios from "axios";
import store from "../store";
export default {
  namespaced: true,
  state: {
    Ships: [],
    Ship_Id: "",
    ShipsData: [],
    ShipsOutFromSearch: [],
    managerShips:[]
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
    setmanagerShips(state, data) {
      state.managerShips = data;
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

        //////////////////showmanagerShips////////////////////////
        showmanagerShips({ commit }) {
          axios
            .get("/api/showmanagerShips" )
            .then((respons) => {
              let resultShips = respons.data.Ships;
              commit("setmanagerShips", resultShips);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        ////////////////////////////////////
        addmanagerShip(newship) {
          console.log(newship);
          axios
            .post("/api/addmanagerShip", {
              Name: newship.Name,
              Loc: newship.Loc,
              Price: newship.Price,
              Description: newship.Description,
              Rate: 5.0,
              Available: true,
            } )
            .then((respons) => {
              console.log(respons)
              store.dispatch("Ship/showmanagerShips");
            })
            .catch((error) => {
              console.log(error);
            });
        },
        //////////////////////////////////
        DeleteShip(ship_id) {
          axios
            .delete("/api/showmanagerShips"+ship_id)
            .then((respons) => {
              console.log(respons)
              store.dispatch("Ship/showmanagerShips");
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
    getmanagerShips:(state) => state.managerShips,
  },
};
