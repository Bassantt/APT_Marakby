<template>
  <div>
    <h1>Hello My Boss</h1>
    <h1>Do you want to add a new ship ?</h1>
    <div class="cont">
      <input
        type="text"
        v-model="ship_name"
        name="ship_name"
        placeholder="Add ship name..."
      />
      <br /><br />
      <input
        type="text"
        v-model="ship_location"
        name="ship_location"
        placeholder="Add ship loc..."
      />
      <br /><br />
      <label for="ship_price"> Price:</label>
      <input
        type="number"
        v-model="ship_price"
        name="ship_price"
        placeholder="Add ship price..."
      />
      <br /><br />
      <input
        type="text"
        v-model="ship_description"
        name="ship_description"
        placeholder="Add ship desc..."
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
      ship_name: "",
      ship_location: "",
      ship_ImageSrc: "./assets/ship2.jpg",
      Available: true,
      ship_price: 0,
      ship_description: "",
      Rate: 5.0,
    };
  },
  methods: {
    AddShip() {
      const newShip = {
        Name: this.ship_name,
        Loc: this.ship_location,
        ImageSrc: this.ship_ImageSrc,
        Price: this.ship_price,
        Description: this.ship_description,
        Rate: 5.0,
        Available: true,
      };
      console.log(newShip);

      //will put dispatch here
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
  margin-bottom: 50px;
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
</style>
