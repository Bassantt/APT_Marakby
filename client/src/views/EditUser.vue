<template>
<div id="editUser" v-on:submit.prevent="submit">
    <HomeNavigation/>
    <div class="container">
        <h3>Edit Your Data Here:</h3>
  <form action="action_page.php">
    <div class="row">
      <div class="col-25">
        <label for="name">Name</label>
      </div>
      <div class="col-75">
        <h4>{{user.userName}}</h4>
        <input type="text" v-model="inputName" id="name" name="name" placeholder="edit name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Phone">Phone</label>
      </div>
      <div class="col-75">
        <input type="text" v-model="inputPhone" id="Phone" name="Phone" placeholder=" Add Your Phone number..">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Country</label>
      </div>
      <div class="col-75">
        <h4>{{user.country}}</h4>
        <input type="text" v-model="inputCountry" id="Country" name="Country" placeholder="Edite value">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="oldpass">Credit Card</label>
      </div>
      <div class="col-75">
        <input type="text" v-model="CreditCard" id="CreditCard" name="CreditCard" placeholder=" Add Credit Card ..">
      </div>
    </div>
    <div class="row">
      <input @click.prevent ="EditValues" type="submit" value="Submit">
    </div>
  </form>
</div>

</div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
export default {
   name: "EditUser",
     components: {
    HomeNavigation,
  },
    data() {
    return {
        inputName: "",
        inputCountry:"",
        CreditCard:"",
        inputPhone:""

    }},

   computed: {
    ...mapGetters({
      user: "Authorization/user"
    }),
  },
    methods:
    {

      EditValues() {
      setTimeout(() => {
        let edituser = {
          userName: this.inputName,
          Phone: this.inputPhone,
          country: this.inputCountry,
          CreditCard: this.CreditCard,
        };
        console.log(edituser);
        this.saved = "1";
        this.$store.dispatch("Authorization/saveEdit", edituser);
      }, 200);
    },



    }
    
     
    
    
    }

   
    </script>


<style scoped>
input[type=text], input[type=password]{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
input[type=submit] {
  background-color: #2259f1;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

/* Style the container */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}   
</style>




