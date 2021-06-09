<template>
  <div class="cont">
    <HomeNavigation id="nav" />
    <img src="../assets/logo.png" />
    <div>
      <div class="home row col-12 justify-content-center px-0 m-0">
        <AddShip />
      </div>
    </div>
    <div class="row" id="margn">
      <h1>YOUR SHIPS</h1>
      <ShipItem
        class="col-lg-100% col-md-60% col-xs-6"
        v-for="Ship in Ships"
        :key="Ship._id"
        :Ship_Id="Ship._id"
        :Ship_Name="Ship.name"
        :Ship_Price="Ship.salaryPerHour"
      />
    </div>
  </div>
</template>

<script>
import AddShip from "@/components/AddShip.vue";
import ShipItem from "@/components/ShipItem.vue";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Manager",
  components: {
    AddShip,
    ShipItem,
    HomeNavigation,
  },
  created: function () {
    this.$store.dispatch("Ship/showmanagerShips");
  },
  computed: {
    ...mapGetters({
      Ships: "Ship/getmanagerShips"
    }),
  },
};
</script>

<style scoped>
#margn
{
  margin-top: 1300px;
  background-color: rgba(158, 185, 185, 0.596);
}
#nav {
  z-index: 0;
}
.row {
  margin-top: 900px;
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
