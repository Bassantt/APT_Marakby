<template>
  <div id="shapeview" class="shapeview">
    <div class="shapeview1">
      <div class="row">
        <div
          class="
            col-md-5
            vue-bg
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <img
            src="../assets/ship5.jpg"
            class="form-control form-control-lg"
            alt="Vue logo"
            width="100"
          />
        </div>
        <div
          class="
            SignupForm1
            col-md-7
            rounded
            px-5
            py-4
            shadow
            bg-black
            text-left
          "
        >
          <form id="shape-form" v-on:submit.prevent="submit">
            <div class="row">
              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >Shipe name</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_name }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >Description</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_description }}
                </label>
              </div>

              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >Date</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_blockDate }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >Salary Per Hour</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_salaryPerHour }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >country</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_country }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label
                  class="col-form-label col-form-label-lg"
                  style="color: #fdf7fc"
                  >capacity</label
                >
                <label type="text" class="form-control form-control-lg"
                  >{{ ship_capacity }}
                </label>
              </div>
              <div class="col-2 form-group text-center">
                <button
                  class="btn-vue1 form-control form-control-lg col-2"
                  style="margin: 4"
                >
                  Get It
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Shipview",
  computed: {
    ...mapGetters({
      ship_name: "shipview/ship_name",
      ship_image: "shipview/ship_image",
      //ship_id: "shipview/ship_id",
      ship_description: "shipview/ship_description",
      ship_blockDate: "shipview/ship_blockDate",
      ship_salaryPerHour: "shipview/ship_salaryPerHour",
      ship_country: "shipview/ship_country",
      ship_capacity: "shipview/ship_capacity",
    }),
  },
  created: function () {
    this.ship_id = this.$route.params.ship_id;
    this.$store.dispatch("shipview/ship", this.$route.params.ship_id);
  },
};
</script>

<style scoped>
.shapeview {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 700px;
  color: #2c3e50;
  background: rgb(37, 91, 122);
}
.shapeview1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #14202c;
}
.row {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px;
  color: #4850a8;
}

.vue-bg {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 700px;
  background: rgb(132, 184, 226);
}
</style>
<!-- <router-link to="/">Home</router-link> |
     <router-link to="/about">About</router-link> -->
