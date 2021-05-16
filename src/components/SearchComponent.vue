<template>
  <div class="search_contaner" id="search_contaner">
    <i class="fa fa-search hover"></i>
    <input
      testid="search-box"
      id="search-box"
      placeholder="Search for SHIP "
      v-model="Value"
      autocomplete="off"
    />
    <button
      type="button"
      class="delete"
      aria-label="Close"
      style=" @click"
      v-if="Value.length !== 0"
      @click="reset"
    >
      <span aria-hidden="true" style="font-size: 25px; color:white; background-color: rgb(132, 184, 226); border: none;">&times;</span>
    </button>
  </div>
</template>
<style scoped>
.delete
{ 
  color:white;
 background-color: rgb(132, 184, 226);
  border: none;

}
*:focus {
  outline: none;
}
#search-box {
   background-color: rgb(132, 184, 226);
  width: 80%;
  height: 100%;
  border: rgba(0, 0, 0, 0.041);
  cursor: text;
  border-radius: 17px;
  font-family: sans-serif;
  font-size: large;
  color: black;
  font-weight: 500;
}
@media screen and (max-width: 900px) {
  #search-box {
    width: 80%;
  }
  #search_contaner {
    width: 50%;
  }
}
@media screen and (max-width: 300px) {
  #search_contaner {
    width: 30%;
  }
}
@media screen and (max-width: 650px) {
  #search_contaner {
    width: 80%;
  }
}

.search_contaner {
  padding-left: 15px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 30%;
  height: 40px;
  margin-left: 10%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 17px;
  background-color: rgb(132, 184, 226);
  color: rgb(26, 24, 9);
}
</style>

<script>

export default {
  name: "searchcomponent",
  data() {
    return { Value: ""};
  },
  methods: {
   reset() {
      this.Value = "";
   }

  }
  
};
</script>
