<template>
  <div class="cont">
    <img src="../assets/logo.png" />
    <button class="btn" @click="LOgoutmanger">Log out</button>
    <div>
      <div class="home row col-12 justify-content-center px-0 m-0">
        <AddShip />
      </div>
    </div>
    <div class="row">
      <h1>YOUR SHIPS</h1>
      <ShipItem
        class="col-lg-100% col-md-60% col-xs-6"
        v-for="Ship in ships"
        :key="Ship.id"
        :Ship_Id="Ship.id"
        :Ship_Name="Ship.Name"
        :Ship_Price="Ship.Price"
        :ship_img="Ship.ImageSrc"
      />
    </div>
  </div>
</template>

<script>
import AddShip from "@/components/AddShip.vue";
import ShipItem from "@/components/ShipItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "Manager",
  components: {
    AddShip,
    ShipItem,
  },
  data() {
    return {
      ships: [
        {
          id: "1",
          Name: "Normandy",
          Loc: "mazarita",
          ImageSrc: "../assets/ship4.jpg",
          Price: "1500",
          Description: "This is a very good ship",
          Rate: "5.0",
          Available: true,
        },

        {
          id: "2",
          Name: "amirelb7ar",
          Loc: "kotmoto",
          ImageSrc: "../assets/ship5.jpg",
          Price: "500",
          Description: "This is a very bad ship",
          Rate: "5.0",
          Available: true,
        },
        {
          id: "3",
          Name: "Normandy",
          Loc: "mazarita",
          ImageSrc: "../assets/ship4.jpg",
          Price: "1500",
          Description: "This is a very good ship",
          Rate: "5.0",
          Available: true,
        },

        {
          id: "4",
          Name: "amirelb7ar",
          Loc: "kotmoto",
          ImageSrc: "../assets/ship5.jpg",
          Price: "500",
          Description: "This is a very bad ship",
          Rate: "5.0",
          Available: true,
        },
      ],
    };
  },
  created: function () {
    this.$store.dispatch("Ship/showmanagerShips");
  },
  computed: {
    ...mapGetters({
      Ships: "Ship/getmanagerShips",
    }),
  },
  methods: {
    LOgoutmanger() {
      console.log("logOUT");
      //will put dispatch here
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 1000px;
}
.cont {
  height: calc(200vh);
  background-color: rgba(158, 185, 185, 0.596);
}
.home {
  background-repeat: no-repeat;
  height: calc(70vh);
  width: 100%;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
}
.btn {
  background-color: rgb(96, 155, 189);
  width: 15%;
  display: inline-block;
  height: 60px;
  border-radius: 20px;
  margin: 50px 0px;
  color: rgb(37, 91, 122);
  border: solid black;
}
.btn:hover {
  background-color: rgb(37, 91, 122);
}
</style>
