<template>
  <div>
    <div class="ship-item" v-bind:key="ship.id" v-for="ship in ships">
      <ship-item v-bind:ship="ship" v-on:del-ship="$emit('del-ship',ship.id)"/>
    </div>
    
  </div>
</template>


  
<script>

import ShipItem from './ShipItem.vue';
export default {
  components: {
       ShipItem
        },

//  name: "Ships",
  props: ["ships"],
};
</script>



<style scoped>
 .ship-item {
    background: #f4f4f4;
    padding: 10px;
    word-spacing: 5px;
    border-spacing: 20px;
    border-bottom: 1px #ccc dotted;
  }

</style>
