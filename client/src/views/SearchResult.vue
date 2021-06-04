<template>
  <div>
    <div class="navbar-list">
      <ul style="list-style-type: none">
        <router-link to="/" v-if="isLoggedIn != 'success'" tag="li">
          <a>Back TO Home</a>
        </router-link>
      </ul>
    </div>
    <div class="Brows-container">
      <div class="row">
        <h1>The result for search is {{ this.$route.params.Searchvalue }}</h1>
        <h2 v-if="true">Ships</h2>
      </div>
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
          :Shipname="this.$route.params.Searchvalue"
          :ShipId="'1'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShipCard from "@/components/ShipCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchResult",
  components: {
    ShipCard,
  },
  computed: {
    ...mapGetters({
      Ships: "Ship/setShipsOutFromSearch",
    }),
  },
  created: function () {
    this.$store.dispatch("Ship/SearchShip", this.$route.params.Searchvalue);
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
  background-color: rgb(97, 127, 145);
  padding: 30px 50px;
  height: calc(200vh);
}
h1,
h2 {
  font-size: 50px;
  font-weight: 400px;
  color: #ffffff;
  float: left;
  margin: 10px 20px;
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

.navbar-list {
  background-color: rgb(37, 91, 122);
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  padding: 20px;
}
a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  padding: 0%;
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
}
a:hover {
  color: #0f0f0f;
}
</style>
