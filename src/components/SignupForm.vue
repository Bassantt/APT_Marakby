<!--The v-model directive is used to bind the state to the input fields-->
<template>
  <form id="signup-form" v-on:submit.prevent="submit">
    <div class="row">
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Full Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          v-model.trim="$v.fullname.$model"
          :class="{ 'is-invalid': validationStatus($v.fullname) }"
          class="form-control form-control-lg"
        />
        <div v-if="!$v.fullname.required" class="invalid-feedback">
          The full name field is required.
        </div>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg"
          >Email <span class="text-danger">*</span></label
        >
        <input
          type="email"
          v-model.trim="$v.email.$model"
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
          v-model.trim="$v.country.$model"
          :class="{ 'is-invalid': validationStatus($v.country) }"
          class="form-control form-control-lg"
        >
          <option value="">Select Country</option>
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
          v-model.trim="$v.password.$model"
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
      <div class="col-12 form-group text-center">
        <!--  <button class="btn btn-vue btn-lg col-4">Sign Up</button>-->
        <button
          @click.prevent="signUp()"
          class="costum-btn"
          id="signup-btn"
          type="submit"
          testid="sign up button"
        >
          Sign Up
        </button>
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
      fullname: "",
      email: "",
      country: "",
      password: "",
      countryList: [
      //  { text: "Choose a country", value: "0", disabled: true },
        { text: "Egypt", value: "eg", disabled: false },
        { text: "France", value: "fr", disabled: false },
        { text: "USA", value: "us", disabled: false },
        { text: "Britain", value: "uk", disabled: false },
        { text: "Canada", value: "ca", disabled: false },
        { text: "Australia", value: "au", disabled: false },
        { text: "Saudi Arabia", value: "sa", disabled: false },
        { text: "China", value: "cn", disabled: false },
        { text: "Japan", value: "jp", disabled: false },
        { text: "Korea", value: "kp", disabled: false },
        { text: "Mexico", value: "mx", disabled: false },
        { text: "Brazil", value: "br", disabled: false },
      ],
    };
  },
  validations: {
    fullname: { required },
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
    resetData: function () {
      this.fullname = "";
      this.email = "";
      this.country = "";
      this.password = "";
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    submit: function () {
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      alert("Data Submit");
      this.$v.$reset();
      this.resetData();
    },
  },
};
</script>
<style>
/*.btn-vue {
  background-color: rgb(37, 91, 122);
  color: #fdf7fc;
  font-weight: bold;

}
*/
#signup-btn {
  background-color: rgb(37, 91, 122);
  max-width: 120px;
  font-weight: bold;
  color: #fdf7fc;
  width: 50%;
  height: 160%;
  max-height: 200px;
}
#signup-btn:hover {
  background-color: #77b3eb;
}
</style>
