  
<template>
  <div class="navbar-container justify-content-center">
    <img src="../assets/logo.png" class="imgg" />
    <div class="navbar-list">
      <ul>
        <router-link to="/Signup"  tag="li">
          <a> Sign up</a>
          <a> {{ isLoggedIn }}</a>
        </router-link>
        <li id="separator">|</li>
        <router-link to="/Login" v-if="isLoggedIn != 'success'" tag="li">
          <a>Log In</a>
        </router-link>
        <router-link
          to="/Manager"
          v-if="isLoggedIn == 'success' && usertype == 2"
          tag="li"
        >
          <a> My Home Page</a>
        </router-link>
        <router-link
          to="/user"
          v-if="isLoggedIn == 'success' && usertype == 1"
          tag="li"
        >
          <a> My Home Page</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeNavigation",
  computed: {
    ...mapGetters({
      isLoggedIn: "Authorization/GetStatus",
      usertype: "Authorization/usertype",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgg {
  width: 50px;
  height: 50px;
  float: left;
}
.navbar-container {
  width: 100%;
  margin: 0%;
  height: 80px;
  z-index: 2000;
}
ul {
  margin: 0%;
  list-style-type: none;
  display: inline-flex;
}
li {
  padding: 28px 17px;
  text-align: center;
  float: right;
  color: #ffffff;
}
a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  padding: 0%;
  display: block;
}
a:hover {
  color: #0f0f0f;
}
#separator {
  color: #ffffff;
}
.navbar-list {
  background-color: rgb(37, 91, 122);
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  position: fixed;
  margin: 0;
}
</style>