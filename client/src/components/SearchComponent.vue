<template>
  <div class="search_contaner row col-12" id="search_contaner">
    <select v-model="searchwith" id="type">
          <option value="1" selected>search with name</option>
          <option value="2">search with country</option>
    </select>
    <input
      testid="search-box"
      id="search-box"
      placeholder="Search For A Ship ...... "
      v-model="Value"
      autocomplete="off"
    />
    <button
      type="button"
      class="search"
      id="searchbutton"
      v-if="Value.length !== 0"
      @click="Search"
    >
      <span
        aria-hidden="true"
        style="font-size: 25px; font-weight: 50px; color: black"
        >GO</span
      >
    </button>
  </div>
</template>
<style scoped>
.search {
  border-radius: 50px;
  background-color: rgba(207, 223, 204, 0.288);
  border: none;
  display: inline;
  float: left;
  margin-top: 3px;
  margin-bottom: 15px;
  height: 30px;
  width: 20%;
  display: inline;
}
*:focus {
  outline: none;
}
#search-box {
  background-color:transparent;
  width: 80%;
  height: 100%;
  border: rgba(0, 0, 0, 0.041);
  cursor: text;
  border-radius: 17px;
  font-family: sans-serif;
  font-size: large;
  color: white;
  float: right;
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
    width: 50%;
  }
}
@media screen and (max-width: 650px) {
  #search_contaner {
    width: 80%;
  }
}

.search_contaner {
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 40%;
  height: 100px;
  margin-left: 10%;
  margin-top: 400px;
  margin-bottom: 15px;
  border-radius: 25px;
  background-color: rgb(37, 91, 122);
  border: solid black;
}

::placeholder {
  color: white;
  opacity: 1;
}
</style>

<script>
export default {
  name: "searchcomponent",
  data() {
    return { Value: "",searchwith:1 };
  },
  methods: {
    reset() {
      this.Value = "";
    },
    Search() {
      this.$router.replace("/SearchResult/" + this.Value +"/"+ this.searchwith);
    },
  },
};
</script>
