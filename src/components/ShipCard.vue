<template>
  <div class="card rounded col-lg-20%">
    <div class="card-img-overlay">
      <h4 class="card-title" id="Shipname">{{ Shipname }}</h4>
      <div @click="setShipId">
        <router-link
          :to="{ path: 'Ship/' + ShipId + '/' + Shipname }"
          class="stretched-link"
          id="carglink"
          testid="cardlink"
        ></router-link>
      </div>
    </div>
    <img
      class="card-img-top mx-auto d-block"
      src="../assets/ship.jpg"
      alt="Card image"
      id="cardimg"
    />
  </div>
</template>

<style scoped>
.round {
  border-radius: 10px;
  background-color: rgb(110, 106, 106);
}
.card {
  background: black;
  width: 225px;
  height: 200px;
  margin-left: 15px;
  margin-right: 20px;
  margin-top: 18px;
  border-radius: 100px;
}
#cardimg {
  border-radius: 10px;
  width: 200px;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
}
h4 {
  font-size: 22px;
  font-weight: 790;
  color: black;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  name: "ShipCard",
  props: {
    // image: {
    //   type: String
    // },
    Shipname: {
      type: String,
    },
    ShipId: {
      type: String,
    },
  },
  methods: {
    setShipId() {
      this.$store.dispatch("Ship/setShip", ShipId);
    },
  },
};
</script>