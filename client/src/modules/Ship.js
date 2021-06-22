import axios from "axios";
import store from "../store";
export default {
  namespaced: true,
  state: {
    Ships: [],
    Ship_Id: "",
    ShipsData: [],
    ShipsOutFromSearch: [],
    managerShips: [],
    done:false,
    add:false,
    delete:false,
    searchwith:"",
    mseg:""
  },
  mutations: {
    done(state, done) {
      state.done = done;
    },
    add(state, add) {
      state.add = add;
    },
    delete(state, bol) {
      state.done = bol;
    },
    setShips(state, resShips) {
      state.Ships = resShips;
    },
    set_Ship(state, id) {
      state.Ship_Id = id;
    }, setsearchwith(state,value) {
      state.searchwith = value;
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
        .get("http://localhost:3000/ships")
        .then((respons) => {
          console.log(respons);
          let resShips = respons.data;
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
    setsearchwith({ commit }, searchwithhh) {
      commit("setsearchwith", searchwithhh);
    },
    //////////////////search for ship with name////////////////////////
    SearchShip({ commit,state }, searchvalue) {
      var searchByCountry=false;
      console.log(state.searchwith);
      if(state.searchwith==="2")
      {
        searchByCountry=true;
      }
      axios
        .get("http://localhost:3000/search/ships?name="+searchvalue+"&searchByCountry="+searchByCountry)
        .then((respons) => {
          let resultShips = respons.data;
          commit("setShipsOutFromSearch", resultShips);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //////////////////showmanagerShips////////////////////////
    showmanagerShips({ commit }) {
      const token = localStorage.getItem("Authorization");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3000/me/ships")
        .then((respons) => {
          console.log(respons);
          let resultShips = respons.data.ships_data;
          commit("setmanagerShips", resultShips);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ////////////////////////////////////
    addmanagerShip({ commit },newship) {
      console.log(newship);
      const token = localStorage.getItem("Authorization");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post("http://localhost:3000/me/ships", {
          name: newship.name,
          description: newship.description,
          blockDates: [],
          salaryPerHour: newship.salaryPerHour,
          location: newship.location,
          country: newship.country,
          capcity: newship.capcity,
          partySalary: newship.partySalary,
          soundSalary: newship.soundSalary,
          lightSalary: newship.lightSalary,
          foodPartySalary: newship.foodPartySalary,
          decorationSalary: newship.decorationSalary,
          meetingSalary: newship.meetingSalary,
          hallSalary: newship.hallSalary,
          foodMeetingSalary: newship.foodMeetingSalary,
          travelSalary: newship.travelSalary,
          roomSalary: newship.roomSalary,
          foodTravelSalary: newship.foodTravelSalary,
          swingSalary: newship.swingSalary,
          numberOfHoursPerday: newship.numberOfHoursPerday,
          offers: [],
        })
        .then((respons) => {
          commit("add",true);
          console.log(respons);
          store.dispatch("Ship/showmanagerShips");
        })
        .catch((error) => {
          commit("add",true);
          console.log(error,"hiii");
        });
    },
    //////////////////////////////////
    deletemanagerShip({commit},shipid) {
      const token = localStorage.getItem("Authorization");
      console.log(token);
      console.log(shipid);
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .delete("http://localhost:3000/me/ships/" + shipid)
        .then((respons) => {
          commit("delete",true)
          console.log(respons);
          store.dispatch("Ship/showmanagerShips");
        })
        .catch((error) => {
          commit("delete",false)
          console.log(error);
        });
    },
    getShipInfo({ commit }, ShipId) {
      axios
        .get("http://localhost:3000/ships/" + ShipId)
        .then((respons) => {
          console.log(respons);
          let resShipsData = respons.data;
          commit("setShipsData", resShipsData);
        })
        .catch((error) => {
          commit("setShipsData", []);
          console.log(error);
        });
    },
    //////////////////////////////////////////////
    bookShip({ commit,state },bookinfo) {
      console.log(bookinfo);
      const token = localStorage.getItem("Authorization");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post("http://localhost:3000/me/book/"+state.Ship_Id, {
            bookDate: bookinfo.bookDate,
            salary:bookinfo.salary,
            availableFunctions:["Party","food","light"] ,
            fromHour:bookinfo.fromHour,
            endHour:bookinfo.endHour
        })
        .then((respons) => {
          commit("done",true)
          console.log(respons);
          store.dispatch("Ship/showmanagerShips");
        })
        .catch((error) => {
          state.mseg=error.mseg;
          commit("done",false)
          console.log(error.mseg,"hiii");
        });
    },
  },
  getters: {
    getShips: (state) => state.Ships,
    getShipsData: (state) => state.ShipsData,
    setShipsOutFromSearch: (state) => state.ShipsOutFromSearch,
    getmanagerShips: (state) => state.managerShips,
    donebook:(state) => state.done,
    getmsg:(state) => state.mseg,
  },
};
