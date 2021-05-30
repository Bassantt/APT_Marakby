<template>
  <div class="justify-content-center cont">
    <!-- login form -->
          <form >
            <input
              type="text"
              placeholder="Email address"
              required
              id="email"
            />
            <br />
            <p
              id="req_email"
              class="invalid"
            >
              Please enter your  email address.
            </p>
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
            />
            <br />
            <p
              class="invalid"
              id="req_password"
            >
              Please enter your password.
            </p>
            <div id="wrap">
              <button
                class="costum-btn"
                id="login-btn"
                type="submit"
              >
                LOG IN
              </button>
            </div>
            <h2>Don't have an account?</h2>
            <router-link
              class="costum-btn"
              id="signup_btn"
              to=""
              tag="button"
            >
              SIGN up 
            </router-link>
          </form>
        </div>
    <!-- Login form -->
</template>

<style  scoped>
.cont
{
  padding: 100px 200px;
   background-color:  rgb(37, 91, 122);;
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
  margin:  50px 0px;
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
  margin: 16px 42px ;
  display: block;
  width: 100%;
  border-radius: 20px;
}
#signup_btn:hover {
  color: #fff;
  background-color: rgb(96, 155, 189);
  border: solid #616467 2px;

}
</style>

<script>

export default {
  name: "Login"
  

};
</script>
