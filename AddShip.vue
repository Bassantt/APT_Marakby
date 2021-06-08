<template>
  <div>
    <form @submit.prevent="AddShip">
      <input type="text" v-model="ship_name" name="ship_name" placeholder="Add ship name..."/>
      <br><br>
      <input type="text" v-model="ship_location" name="ship_location" placeholder="Add ship loc..."/>
      <br><br>
      <label for="ship_price"> Price:</label>
      <input type="number" v-model="ship_price" name="ship_price" placeholder="Add ship price..." />
      <br><br>
      <input type="text" v-model="ship_description" name="ship_description" placeholder="Add ship desc..."/>
      <br><br>
      <input type="submit" value="Submit" class="btn" />
      <br><br>
    </form>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'; 
export default {
  name: "AddShip",
  data() {
    return {
      uuid:uuid.v4(),
      id:null,
      ship_name: '',
      ship_location:'',
      ship_ImageSrc: "./assets/norm2.jpg",
      Available: true,
      ship_price: 0,
      ship_description:'',
      Rate: 5.0
    }
  },

  methods: {
    AddShip() {
      //e.preventDefault();
      const newShip = {
        id: this.id, //i need to generate id
        Name: this.ship_name,
        Loc: this.ship_location,
        ImageSrc: "./assets/norm2.jpg",
        Price: this.ship_price,
        Description: this.ship_description,
        Rate: 5.0,
        Available: true
      }

      // Send up to parent
      this.$emit("add-ship", newShip);
    }
  }
}
</script>

<style scoped>

form {
  width: 500px;
  height: 250px;
  border: 5px solid rgb(116, 110, 110);
  
  padding: 10px 0;
  margin: 50px auto;
  background-position: 0 0, 0 100% ;
  background-repeat: no-repeat;
  background-size: 100% 10px;
}

input[type=text] {
  background-color: white;

  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;
}




 input[type=submit] {
  background-color: #1389e9;
  border: none;
  color: white;
  border-radius: 35%;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

</style>