<template>
  <div>
    <HomeNavigation/>
    <searchcomponent/>
    <div>
      <img src="../assets/ship.jpg" style="width:50%;height:50%"/>
    </div>
    <div>
      <h1>
        RECENT
      </h1>
    </div>
  </div>
</template>

<script>

import HomeNavigation from "@/components/HomeNavigationBar.vue";
import searchcomponent from "@/components/SearchComponent.vue";
export default {
  name: "Home",
  components: {
    HomeNavigation,searchcomponent
  }
};
</script>

<style lang="scss" scoped>
</style>
