<template>
  <div class="cont">
    <HomeNavigation />
    <div>
      <div class="home row col-12 justify-content-center px-0 m-0">
        <searchcomponent />
      </div>
    </div>
    <BrowsAll />
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import searchcomponent from "@/components/SearchComponent.vue";
import BrowsAll from "@/components/BrowsAll.vue";
export default {
  name: "Home",
  components: {
    HomeNavigation,
    searchcomponent,
    BrowsAll,
  },
};
</script>

<style scoped>
.cont {
  height: calc(200vh);
  background-color: rgb(37, 91, 122);
}
.home {
  background-image: url("../assets/ship.jpg");
  background-repeat: no-repeat;
  height: calc(70vh);
  width: 100%;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
}

.BROWS {
  background-color: rgb(16, 17, 17);
  width: 100px;
  height: 100px;
  margin-top: 400px;
}
</style>
