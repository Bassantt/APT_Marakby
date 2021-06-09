<template>
  <div class="Ship-item" id="con">
    <tr>
      <td><img src="../assets/ship2.jpg" /></td>
      <td></td>
      <td>
        <h3>Name: {{ Ship_Name }}</h3>
      </td>
      <td>
        <h3>Price: {{ Ship_Price }}</h3>
      </td>
      <td></td>
      <td></td>
      <td><button @click="DeleteShip" class="Delete">X</button></td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "ShipItem",
  props: {
    Ship_Id: {
      type: String,
    },
    Ship_Name: {
      type: String,
    },
    Ship_Price: {
      type: Number,
    },
  },
  methods: {
    DeleteShip() {
      console.log("I will delete");

      //will put dispatch here and send the ship id
      this.$store.dispatch("Ship/deletemanagerShip", this.Ship_Id);
    },
  },
};
</script>

<style scoped>
#con {
  background: rgb(37, 91, 122);
  padding: 10px;
  word-spacing: 5px;
  border-spacing: 20px;
  background-color: rgb(96, 155, 189);
  margin-bottom: 20px;
  border: solid black;
  width: 50%;
}

.Delete {
  background: #af0909;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
