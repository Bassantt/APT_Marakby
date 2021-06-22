<template>
  <div>
    <div class="navbar-list">
      <ul style="list-style-type: none">
        <router-link to="/" tag="li">
          <a>Back TO Home</a>
        </router-link>
      </ul>
    </div>
    <div class="Brows-container">
      <div class="row">
        {{ this.$route.params.searchwith }}
        <h1>The result for search is {{ this.$route.params.Searchvalue }}</h1>
        <h2 v-if="true">Ships</h2>
      </div>
      <div class="row" v-if="Ships != []">
        <!-- when back intgrate -->
        <ShipCard
          class="col-lg-10% col-md-60% col-xs-6"
          v-for="Ship in Ships"
          :key="Ship._id"
          :name="Ship.name"
          :ShipId="Ship._id"
          :country="Ship.country"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
    this.$store.dispatch(
      "Ship/setsearchwith",
      this.$route.params.searchwith
    );
    this.$store.dispatch(
      "Ship/SearchShip",
      this.$route.params.Searchvalue
    );
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
