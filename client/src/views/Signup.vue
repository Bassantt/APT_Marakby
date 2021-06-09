<template>
  <div id="signup" class="signup">
    <div class="signup1">
      <div class="row">
        <div
          class="
            col-md-3
            vue-bg
            d-flex
            justify-content-center
            align-items-center
          "
        >

          <img alt="Vue logo" src="../assets/logo.png" width="200" />
        </div>

        <div class="col-md-9 d-flex justify-content-center align-items-center">
          <div
            class="
              SignupForm1
              col-md-8
              rounded
              px-5
              py-4
              shadow
              bg-white
              text-left
            "
          >
              <div class="back">
        <router-link class="tohome" to="/" >
          <a class="as" >Back TO Home</a>
        </router-link>
    </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
export default {
  name: "Signup",
  components: {
    SignupForm,
  },
};
</script>

<style>
a {
  color: #ffffff;
  font-size: 15px;
  margin-top: 15px;
}
a:hover {
  color: #0f0f0f;
}
.signup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 700px;
  color: #2c3e50;
  background: rgb(37, 91, 122);
}
.signup1 {
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
