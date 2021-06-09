import axios from "axios";
export default {
  namespaced: true,
  state: {
    ship_name: "",
    ship_image: "",
    ship_id: 0,
    ship_description: "",
    ship_blockDate: "",
    ship_salaryPerHour: 0,
    ship_country: "Egypt",
    ship_capacity: 0,
  },
  mutations: {
    set_ship_name(state, name) {
      state.ship_name = name;
    },
    set_ship_image(state, image) {
      state.ship_image = image;
    },
    set_ship_id(state, id) {
      state.ship_id = id;
    },
    set_ship_description(state, description) {
      state.ship_description = description;
    },
    set_ship_blockDate(state, date) {
      state.ship_blockDate = date;
    },
    set_ship_salaryPerHour(state, salaryPerHour) {
      state.ship_salaryPerHour = salaryPerHour;
    },
    set_ship_country(state, country) {
      state.ship_country = country;
    },
    set_ship_capacity(state, capacity) {
      state.ship_capacity = capacity;
    },
  },
  actions: {
    ship({ commit }, ship_id) {
      console.log(ship_id);
      axios
        .get("http://localhost:3000/ships/" + ship_id)
        .then((response) => {
          console.log(response.data);
          let ship = response.data;
          commit("set_ship_name", ship.name);
          commit("set_ship_id", ship._id);
          commit("set_ship_description", ship.description);
          commit("set_ship_blockDate", ship.blockDates);
          commit("set_ship_salaryPerHour", ship.salaryPerHour);
          commit("set_ship_country", ship.country);
          commit("set_ship_capacity", ship.capcity);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    ship_name: (state) => state.ship_name,
    ship_image: (state) => state.ship_image,
    ship_id: (state) => state.ship_id,
    ship_description: (state) => state.ship_description,
    ship_blockDate: (state) => state.ship_blockDate,
    ship_salaryPerHour: (state) => state.ship_salaryPerHour,
    ship_country: (state) => state.ship_country,
    ship_capacity: (state) => state.ship_capacity,
  },
};
