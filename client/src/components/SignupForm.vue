<!--The v-model directive is used to bind the state to the input fields-->
<template>
  <form id="signup-form" v-on:submit.prevent="submit">
    <div class="row">
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >User Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          v-model="userName"
          :class="{ 'is-invalid': validationStatus($v.userName) }"
          class="form-control form-control-lg"
        />
        <div v-if="!$v.userName.required" class="invalid-feedback">
          The User Name field is required.
        </div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Email <span class="text-danger">*</span></label
        >
        <input
          type="email"
          v-model="email"
          :class="{ 'is-invalid': validationStatus($v.email) }"
          class="form-control form-control-lg"
        />
        <div v-if="!$v.email.required" class="invalid-feedback">
          The email field is required.
        </div>
        <div v-if="!$v.email.email" class="invalid-feedback">
          The email is not valid.
        </div>
      </div>

      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Country <span class="text-danger">*</span></label
        >
        <select
          v-model="country"
          :class="{ 'is-invalid': validationStatus($v.country) }"
          class="form-control form-control-lg"
        >
          <!--<option value="">Select Country</option>-->
          <option
            v-for="country in countryList"
            :key="country.value"
            :value="country.value"
            :disabled="country.disabled"
          >
            {{ country.text }}
          </option>
          <!--<option :value="c.iso" :key="c.iso" v-for="c in countryList">
            {{ c.country }}
          </option>
          -->
        </select>
        <div v-if="!$v.country.required" class="invalid-feedback">
          The country field is required.
        </div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Password <span class="text-danger">*</span></label
        >
        <input
          type="password"
          v-model="password"
          :class="{ 'is-invalid': validationStatus($v.password) }"
          class="form-control form-control-lg"
        />
        <div v-if="!$v.password.required" class="invalid-feedback">
          The password field is required.
        </div>
        <div v-if="!$v.password.minLength" class="invalid-feedback">
          You must have at least
          {{ $v.password.$params.minLength.min }} letters.
        </div>
        <div v-if="!$v.password.maxLength" class="invalid-feedback">
          You must not have greater then
          {{ $v.password.$params.maxLength.min }} letters.
        </div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Type<span class="text-danger">*</span></label
        >
        <div
          class="form-control form-control-lg"
          style="border:2px solid black width:5px"
        >
          <label class="radio-inline">
            <input
              type="radio"
              v-model="type"
              name="optradio"
              value="1"
              style="margin-right: 4"
              checked
              required
            /><strong> User </strong>
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              v-model="type"
              name="optradio"
              value="3"
              style="margin-right: 4"
              required
            />
            <strong> Admin </strong>
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              v-model="type"
              name="optradio"
              value="2"
              style="margin-right: 4"
              required
            />
            <strong>Manager</strong>
          </label>
          <!--<div>
            Selected: <strong>{{ type }}</strong>
          </div>-->
        </div>
      </div>
      <div class="col-12 form-group text-center">
        <button class="btn-lg col-4">Sign Up</button>
        <!--  <button
          @click.prevent="signUp()"
          class="costum-btn"
          id="signup-btn"
          type="submit"
          testid="sign up button"
        >  
          Sign Up 
        </button>-->
      </div>
    </div>
  </form>
</template>
<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "SignupForm",
  data: function () {
    return {
      type: 0,
      userName: "",
      email: "",
      country: "",
      password: "",
      countryList: [
        //  { text: "Choose a country", value: "0", disabled: true },
        { text: "Egypt", value: "Egypt", disabled: false },
        { text: "France", value: "France", disabled: false },
        { text: "USA", value: "USA", disabled: false },
        { text: "Britain", value: "Britain", disabled: false },
        { text: "Canada", value: "Canada", disabled: false },
        { text: "Australia", value: "Australia", disabled: false },
        { text: "Saudi Arabia", value: "Saudi Arabia", disabled: false },
        { text: "China", value: "China", disabled: false },
        { text: "Japan", value: "Japan", disabled: false },
        { text: "Korea", value: "Korea", disabled: false },
        { text: "Mexico", value: "Mexico", disabled: false },
        { text: "Brazil", value: "Brazil", disabled: false },
      ],
    };
  },
  validations: {
    userName: { required },
    email: { required, email },
    country: { required },
    password: { required, minLength: minLength(6), maxLength: maxLength(18) },
  },
  /*  mounted: function () {
    var v = this;
    v.$http
      .get(`http://localhost:4600/countries`)
      .then(function (resp) {
        v.countryList = resp.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
*/

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    submit: function () {
      console.log(this.type);
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      alert("you are successfully signed in ^^");
      setTimeout(() => {
        let newuser = {
          username: this.userName,
          password: this.password,
          country: this.country,
          email: this.email,
          type: parseInt(this.type),
        };
        console.log(newuser);
        this.$store.dispatch("Authorization/signUp", newuser);
      }, 200);
    },
  },
};
</script>
<style scoped>
button {
  background-color: rgb(33, 102, 141);
  max-width: 120px;
  font-weight: bold;
  color: #fdf7fc;
  width: 50%;
  height: 130%;
  max-height: 200px;
}

#type_radio {
  border-block: 3px solid black;
  border-block-color: rgb(37, 91, 122);
}
</style>
<style type="text/css">
input[type="radio"] {
  margin-left: 100px;
}
</style>
