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
      <input
        type="text"
        v-model="description"
        name="ship_name"
        placeholder="Add ship description..."
      />
      <input
        type="text"
        v-model="location"
        name="ship_location"
        placeholder="Add ship location..."
      />
      <input
        type="text"
        v-model="country"
        name="ship_country"
        placeholder="Add ship country..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">salaryPerHour</label>
      
      <input
        type="number"
        v-model="salaryPerHour"
        placeholder="Add ship price..."
      />
      
      <label for="ship_price">capcity</label>

      <input
        type="number"
        v-model="capcity"
        name="ship_price"
        placeholder="Add ship capcity..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">partySalary</label>
      <input
        type="number"
        v-model="partySalary"
        name="ship_partySalary"
        placeholder="Add ship partySalary..."
      />
      
      <label for="ship_price">soundSalary</label>
      <input
        type="number"
        v-model="soundSalary"
        name="ship_soundSalary"
        placeholder="Add ship soundSalary..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">lightSalary</label>
      <input
        type="number"
        v-model="lightSalary"
        name="ship_lightSalary"
        placeholder="Add ship lightSalary..."
      />
      
      <label for="ship_price">foodPartySalary</label>
      <input
        type="number"
        v-model="foodPartySalary"
        name="ship_foodPartySalary"
        placeholder="Add ship capcity..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">decorationSalary</label>
      <input
        type="number"
        v-model="decorationSalary"
        name="ship_decorationSalary"
        placeholder="Add ship decorationSalary..."
      />
      
      <label for="ship_price">meetingSalary</label>
      <input
        type="number"
        v-model="hallSalary"
        name="ship_meetingSalary"
        placeholder="Add ship hallSalary..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">hallSalary</label>
      <input
        type="number"
        v-model="meetingSalary"
        name="ship_meetingSalary"
        placeholder="Add ship meetingSalary..."
      />
      
      <label for="ship_price">foodMeetingSalary</label>
      <input
        type="number"
        v-model="foodMeetingSalary"
        name="ship_foodMeetingSalary"
        placeholder="Add ship foodMeetingSalary..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">travelSalary</label>
      <input
        type="number"
        v-model="travelSalary"
        name="ship_price"
        placeholder="Add ship travelSalary..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">roomSalary</label>
      <input
        type="number"
        v-model="roomSalary"
        name="ship_price"
        placeholder="Add ship roomSalary..."
      />
      
      <label for="ship_price">foodTravelSalary</label>
      <input
        type="number"
        v-model="foodTravelSalary"
        name="ship_foodTravelSalary"
        placeholder="Add ship foodTravelSalary..."
      />
      <hr class="solid" style="color:white;">
      <label for="ship_price">swingSalary</label>
      <input
        type="number"
        v-model="swingSalary"
        name="ship_swingSalary"
        placeholder="Add ship swingSalary..."
      />
      
      <label for="ship_price">numberOfHoursPerday</label>
      <input
        type="number"
        v-model="numberOfHoursPerday"
        placeholder="Add ship numberOfHoursPerday..."
      />
      <hr class="solid" style="color:white;">
      <input type="submit" value="Submit" class="btn" @click="AddShip" />
    </div>
    <hr class="solid" style="color:white;">
    <h1>Do you want to Browse Or Delelet ..</h1>
    <hr class="solid" style="color:white;">
  </div>
</template>

<script>
export default {
  name: "AddShip",
  data() {
    return {
      name: "",
      description: "",
      salaryPerHour: 0,
      location: "",
      country: "",
      capcity: 50,
      partySalary: 100,
      soundSalary: 100,
      lightSalary: 100,
      foodPartySalary: 100,
      decorationSalary: 100,
      meetingSalary: 100,
      hallSalary: 100,
      foodMeetingSalary: 100,
      travelSalary: 100,
      roomSalary: 100,
      foodTravelSalary: 100,
      swingSalary: 100,
      numberOfHoursPerday: 0,
      offers: [],
    };
  },
  methods: {
    AddShip() {
      const newShip = {
        name: this.name,
        description: this.description,
        blockDates: {},
        salaryPerHour: parseInt(this.salaryPerHour),
        location: this.location,
        country: this.country,
        capcity: parseInt(this.capcity),
        partySalary: parseInt(this.partySalary),
        soundSalary: parseInt(this.soundSalary),
        lightSalary: parseInt(this.lightSalary),
        foodPartySalary: parseInt(this.foodPartySalary),
        decorationSalary: parseInt(this.decorationSalary),
        meetingSalary: parseInt(this.meetingSalary),
        hallSalary: parseInt(this.hallSalary),
        foodMeetingSalary: parseInt(this.foodMeetingSalary),
        travelSalary: parseInt(this.travelSalary),
        roomSalary: parseInt(this.roomSalary),
        foodTravelSalary: parseInt(this.foodTravelSalary),
        swingSalary: parseInt(this.swingSalary),
        numberOfHoursPerday: parseInt(this.numberOfHoursPerday),
        offers: {},
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
  width: 60%;
  padding: 10px;
  background-color: rgb(37, 91, 122);
  margin-left: 20%;
}
input[type="number"] 
{
  display: inline;
  margin: 5px 20px;
  width: 15%;
}
input[type="text"],label{
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  margin: 10px 50px;
  width: 30%;
}
label {
  background-color:transparent;
  display: inline-block;
}
input[type="submit"] {
  display: inline;
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
  display: inline;
  color: white;
}
</style>
