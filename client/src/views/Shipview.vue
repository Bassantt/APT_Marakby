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
              <div class="col-6 form-group text-center">
                <router-link to="/Login" v-if="isLoggedIn != 'success'" tag="li">
                <a>Please Login First To can Book</a>
                </router-link>
                <router-link
                  v-if="isLoggedIn == 'success'"
                  :to="{ path: '/Book/' + this.$route.params.shipID }"
                  class="btn-vue1 form-control form-control-lg col-2"
                  id="carglink"
                  testid="cardlink"
                  >Book</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
      isLoggedIn: "Authorization/GetStatus",
    }),
  },
  created: function () {
    this.ship_id = this.$route.params.ship_id;
    this.$store.dispatch("shipview/ship", this.$route.params.shipID);
  },
};
</script>

<style scoped>
.shapeview {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: calc(200vh);
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

