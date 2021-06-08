<template>
  <div>
    <h1>Hello My Boss</h1>
    <h1>Do you want to add a new ship ?</h1>
    <div class="cont">
      <input
        type="text"
        v-model="name"
        name="ship_name"
        placeholder="Add ship name..."
      />
      <br /><br />
      <input
        type="text"
        v-model="description"
        name="ship_name"
        placeholder="Add ship description..."
      />
      <br /><br />
      <input
        type="text"
        v-model="location"
        name="ship_location"
        placeholder="Add ship location..."
      />
      <br /><br />
      <label for="ship_price">salary Per Hour</label>
      <br /><br />
      <input
        type="number"
        v-model="salaryPerHour"
        name="ship_price"
        placeholder="Add ship price..."
      />
      <br /><br />
      <input
        type="text"
        v-model="country"
        name="ship_country"
        placeholder="Add ship country..."
      />
      <br /><br />
      <label for="ship_price">capcity</label>
      <br /><br />
      <input
        type="number"
        v-model="capcity"
        name="ship_price"
        placeholder="Add ship capcity..."
      />
      <br /><br />
      <label for="ship_price">number Of Hours Per day</label>
      <input
        type="number"
        v-model="numberOfHoursPerday"
        name="ship_price"
        placeholder="Add ship numberOfHoursPerday..."
      />
      <br /><br />
      <input type="submit" value="Submit" class="btn" @click="AddShip" />
      <br /><br />
    </div>
    <h1>Do you want to Browse Or Delelet ..</h1>
  </div>
</template>

<script>
export default {
  name: "AddShip",
  data() {
    return {
      name: "",
      description: "",
      blockDates: [],
      salaryPerHour: 0,
      location: "",
      country: "",
      capcity: 50,
      availableFunctions: [],
      numberOfHoursPerday: 0,
      offers: [],
    };
  },
  methods: {
    AddShip() {
      const newShip = {
        name: this.name,
        description: this.description,
        blockDates: [],
        salaryPerHour: this.salaryPerHour,
        location: this.location,
        country: this.country,
        capcity: this.capcity,
        availableFunctions: [],
        numberOfHoursPerday: this.numberOfHoursPerday,
        offers: [],
      };
      console.log(newShip);

      //will put dispatch here
      this.$store.dispatch("Ship/addmanagerShip", newShip);
    },
  },
};
</script>

<style scoped>
.cont {
  margin-top: 50px;
  border: solid beige;
  width: 50%;
  margin: 5% 20%;
  padding: 50px;
  background-color: rgb(37, 91, 122);
}

input[type="text"] {
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;
}
input[type="submit"] {
  background-color: rgb(96, 155, 189);
  border: none;
  color: white;
  border-radius: 35%;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border: solid beige;
}
input[type="submit"]:hover {
  background-color: rgb(183, 215, 236);
}
h1 {
  background-color: rgb(96, 155, 189);
  border-radius: 50px;
  border: solid black;
}
label {
  color: white;
}
</style>
