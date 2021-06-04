<template>
  <div class="search_contaner row col-12" id="search_contaner">
    <i class="fa fa-search hover"></i>
    <input
      testid="search-box"
      id="search-box"
      placeholder="Search For A Ship ...... "
      v-model="Value"
      autocomplete="off"
    />
    <button
      type="button"
      class="delete"
      aria-label="Close"
      style="@click;"
      v-if="Value.length !== 0"
      @click="reset"
    >
      <span
        aria-hidden="true"
        style="
          font-size: 25px;
          color: white;
          background-color: rgb(37, 91, 122);
          border: none;
        "
        >&times;</span
      >
    </button>
  </div>
</template>
<style scoped>
.delete {
  color: white;
  background-color: rgb(37, 91, 122);
  border: none;
}
*:focus {
  outline: none;
}
#search-box {
  background-color: rgb(37, 91, 122);
  width: 80%;
  height: 100%;
  border: rgba(0, 0, 0, 0.041);
  cursor: text;
  border-radius: 17px;
  font-family: sans-serif;
  font-size: large;
  color: white;
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
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 40%;
  height: 50px;
  margin-left: 10%;
  margin-top: 400px;
  margin-bottom: 15px;
  border-radius: 25px;
  background-color: rgb(37, 91, 122);
  color: black;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}
</style>

<script>
export default {
  name: "searchcomponent",
  data() {
    return { Value: "" };
  },
  methods: {
    reset() {
      this.Value = "";
    },
  },
};
</script>
