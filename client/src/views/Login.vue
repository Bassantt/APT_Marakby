<template>
  <div class="background px-0 m-0">
    <div class="navbar-list">
      <ul style="list-style-type: none">
        <router-link to="/" v-if="isLoggedIn != 'success'" tag="li">
          <a>Back TO Home</a>
        </router-link>
      </ul>
    </div>
    <div class="justify-content-center cont">
      <!-- login form -->
      <form>
        <input
          type="text"
          v-model="email"
          placeholder="Email address"
          required
          id="email"
        />
        <br />
        <p id="req_email" class="invalid">Please enter your email address.</p>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          id="password"
        />
        <br />
        <p class="invalid" id="req_password">Please enter your password.</p>
        <h4>You are</h4>
        <select v-model="type" id="type">
          <option value="1" selected>user</option>
          <option value="2">manager</option>
          <option value="3" selected>admin</option>
        </select>
        <div id="wrap">
          <button
            @click.prevent="login()"
            class="costum-btn"
            id="login-btn"
            type="submit"
          >
            LOG IN
          </button>
        </div>
        <h4>{{ isLoggedIn }}</h4>
        <h2>Don't have an account?</h2>
        <router-link class="costum-btn" id="signup_btn" to="/Signup" tag="button">
          SIGN up
        </router-link>
      </form>
    </div>
  </div>
  <!-- Login form -->
</template>

<style scoped>
.background {
  background-color: rgba(158, 185, 185, 0.596);
  margin: 0px 0px;
  height: 1000px;
}
.cont {
  padding: 100px 200px;
  background-color: rgb(37, 91, 122);
  margin: 100px 100px;
  border-radius: 50px;
  border-color: black;
}
h2 {
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 900;
  color: #1c1c1f;
  text-align: center;
  margin-bottom: 18px;
}
.unlogged {
  width: 100%;
  text-align: center;
  background-color: #e22134;
  color: #fff;
  font-size: 12px;
  padding: 14px 14px 12px;
  font-weight: 400;
}
input {
  width: 100%;
  height: 45px;
  padding: 0px 11px;
  margin-left: 50px;
  margin-bottom: 16px;
}

#wrap {
  overflow: auto;
}
#login-btn {
  background-color: rgb(19, 27, 31);
  width: 50%;
  display: inline-block;
  height: 60px;
  border-radius: 20px;
  margin: 50px 0px;
  color: white;
}
#login-btn:hover {
  background-color: rgb(96, 155, 189);
}

#signup_btn {
  color: #333;
  background-color: #ffffff;
  border: solid #adadad 2px;
  padding: 14px 14px 14px 18px;
  margin: 16px 42px;
  display: block;
  width: 100%;
  border-radius: 20px;
}
#signup_btn:hover {
  color: #fff;
  background-color: rgb(96, 155, 189);
  border: solid #616467 2px;
}
.navbar-list {
  background-color: rgb(37, 91, 122);
  width: 100%;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  padding: 13px;
}
a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  padding: 0%;
  display: block;
  margin-top: 15px;
}
a:hover {
  color: #0f0f0f;
}
h4,
p {
  color: white;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      type: 1,
      //validation
      trigger_validation: false,
      can_submit: true,
    };
  },

  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
      console.log(this.type);
      this.trigger_validation = true;
      this.can_submit = true;
      this.req_email;
      this.req_password;
      setTimeout(() => {
        if (this.can_submit) {
          let user = {
            email: this.email,
            password: this.password,
            type: parseInt(this.type),
          };
          this.$store.dispatch("Authorization/login", user);
        }
      }, 200);
    },
    cannotSubmit() {
      this.can_submit = false;
    },
    canSubmit() {
      this.can_submit = this.can_submit && true;
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "Authorization/GetStatus",
    }),
    req_email: function () {
      if (this.trigger_validation) {
        if (this.email == "") {
          this.cannotSubmit();
          return true;
        } else {
          this.canSubmit();
          return false;
        }
      } else {
        return false;
      }
    },
    req_password: function () {
      if (this.trigger_validation) {
        if (this.password == "") {
          this.cannotSubmit();
          return true;
        } else {
          this.canSubmit();
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>
