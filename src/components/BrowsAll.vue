<template>
  <div class="Brows-container">
    <ul class="list-unstyled background">
      Here You Can Find What You want Or Search to Reach Fast...
      <li>Ship for wedding</li>
      <li>Ship for Meeting</li>
      <li>Ship for Birthday</li>
    </ul>

    <h2 v-if="true">Ships</h2>
    <div class="row">
      <!-- when back intgrate -->
      <!-- <ShipCard
              class="col-lg-10% col-md-60% col-xs-6"
              v-for=" Ship in Ships"
              :key="Ship.id"
              :image="Ship.images[0]._id"
              :name="Ship.name"
              :ShipId="Ship._id"
            /> -->
      <!-- just for test -->
      <ShipCard
        class="col-lg-10% col-md-60% col-xs-6"
        :key="'1'"
        :Shipname="'SEE_SHIP'"
        :ShipId="'1'"
      />
    </div>
  </div>
</template>

<script>
import ShipCard from "@/components/ShipCard.vue";
//import { mapGetters } from "vuex";

export default {
  name: "BrowsAll",
  components: {
    ShipCard,
  },
  // mounted() {
  //  this.$store.dispatch("Ship/showfreqShips");
  // },
  computed: {
    //  ...mapGetters({
    //     Ships: "Ship/getShips"
    //  })
  },
};
</script>

<style scoped>
.background {
  background-color: rgba(158, 185, 185, 0.596);
  border-radius: 20px;
  color: #000;
  font-size: 40px;
  font: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.Brows-container {
  width: 100%;
  margin-top: 500px;
  background-color: rgb(37, 91, 122);
  padding: 30px 50px;
}
h1,
h2 {
  font-size: 50px;
  font-weight: 400px;
  color: #ffffff;
  float: left;
  margin: 10px 20px;
  text-decoration: underline;
  display: block;
}
ul {
  margin: 0%;
  display: block;
  color: #ffffff;
  font-size: 30px;
}
li {
  text-align: center;
  color: #ffffff;
}
a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  padding: 0%;
  display: block;
}
</style>
