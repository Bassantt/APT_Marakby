<template>
  <div id="book">
    <HomeNavigation/>
    <h1>Reservation Details</h1>
    <h1>You can choose what you want from Features: and know the Salary</h1>

    <span><label for="res_date">Date of Reservation </label></span>
    <input type="date" id="res_date" name="res_date" v-model="date" />
    <br /><br /><br />
    <h1>name</h1>
    <h2>{{ ShipsData.name }}</h2>
    <h1>capcity</h1>
    <h2>{{ ShipsData.capcity }}</h2>
    know that : salaryPerHour is
    <h2>{{ ShipsData.salaryPerHour }}</h2>
    want to book from
    <input type="number" id="checkdeaths" v-model="staratHour" /> to
    <input type="number" id="checkdeaths" v-model="endHour" />
    <h1>partySalary</h1>
    <h2>{{ ShipsData.partySalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="partySalary" />
    <h1>soundSalary</h1>
    <h2>{{ ShipsData.soundSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="soundSalary" />
    <h1>lightSalary</h1>
    <h2>{{ ShipsData.lightSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="lightSalary" />
    <h1>foodPartySalary</h1>
    <h2>{{ ShipsData.foodPartySalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="foodPartySalary" />
    <h1>decorationSalary</h1>
    <h2>{{ ShipsData.decorationSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="decorationSalary" />
    <h1>meetingSalary</h1>
    <h2>{{ ShipsData.meetingSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="meetingSalary" />
    <h1>hallSalary</h1>
    <h2>{{ ShipsData.hallSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="hallSalary" />
    <h1>foodMeetingSalary</h1>
    <h2>{{ ShipsData.foodMeetingSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="foodMeetingSalary" />
    <h1>travelSalary</h1>
    <h2>{{ ShipsData.travelSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="travelSalary" />
    <h1>roomSalary</h1>
    <h2>{{ ShipsData.roomSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="roomSalary" />
    <h1>foodTravelSalary</h1>
    <h2>{{ ShipsData.foodTravelSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="foodTravelSalary" />
    <h1>swingSalary</h1>
    <h2>{{ ShipsData.swingSalary }}</h2>
    Do you want :
    <input type="checkbox" id="checkdeaths" v-model="swingSalary" />
    <h3 >Salary is {{ totalsalary }}</h3>
    <button type="button" class="btn" id="searchbutton" @click="submit">
      submit
    </button>
    <h4 v-if="done==true">Book done</h4>
    <h4 v-if="done==false">{{getmsg}}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
export default {
  name: "Book",
    components: {
    HomeNavigation,
  },
  data() {
    return {
      date: "",
      staratHour: 0,
      endHour: 0,
      partySalary: false,
      soundSalary: false,
      lightSalary: false,
      foodPartySalary: false,
      decorationSalary: false,
      meetingSalary: false,
      hallSalary: false,
      foodMeetingSalary: false,
      travelSalary: false,
      roomSalary: false,
      foodTravelSalary: false,
      swingSalary: false,
      totalsalary: 0,
    };
  },
  watch: {
    partySalary:function(){
      if (this.partySalar == true) {
        this.totalsalary += this.ShipsData.partySalary;
      }
    },
    soundSalary:function(){
      if (this.soundSalary == true) {
        this.totalsalary += this.ShipsData.soundSalary;
      }
    } ,
    lightSalary:function(){
      if (this.lightSalary == true) {
        this.totalsalary += this.ShipsData.lightSalary;
      }
    },
    foodPartySalary:function(){
      if (this.foodPartySalary == true) {
        this.totalsalary += this.ShipsData.foodPartySalary;
      }
    },
    decorationSalary:function(){
      if (this.decorationSalary == true) {
        this.totalsalary += this.ShipsData.decorationSalary;
      }
       else
      {
        this.totalsalary -= this.ShipsData.decorationSalary;
      }
    },
    meetingSalary:function(){
      if (this.meetingSalary == true) {
        this.totalsalary += this.ShipsData.meetingSalary;
      }
       else
      {
        this.totalsalary -= this.ShipsData.meetingSalary;
      }
    },
    foodMeetingSalary:function(){
      if (this.foodMeetingSalary == true) {
        this.totalsalary += this.ShipsData.foodMeetingSalary;
      }
    },
    travelSalary:function(){
      if (this.travelSalary == true) {
        this.totalsalary += this.ShipsData.travelSalary;
      }

    },
    roomSalary:function(){
      if (this.roomSalary == true) {
        this.totalsalary += this.ShipsData.roomSalary;
      }

    },
    foodTravelSalary:function(){
      if (this.foodTravelSalary == true) {
        this.totalsalary += this.ShipsData.foodTravelSalary;
      }
    },
      swingSalary:function(){
      if (this.swingSalary == true) {
        this.totalsalary += this.ShipsData.swingSalary;
      }
      },
    
   
},
  methods: {
    submit() {
        console.log(this.totalsalary);
      let newbook = {
        bookDate: this.date,
        salary: this.totalsalary,
        availableFunctions: ["Party", "food", "light"],
        fromHour: parseInt(this.staratHour),
        endHour: parseInt(this.endHour),
      };

      console.log(newbook);
      this.$store.dispatch("Ship/setShip", this.$route.params.shipID);
      this.$store.dispatch("Ship/bookShip", newbook);
    },
  },
  computed: {
    ...mapGetters({
      ShipsData: "Ship/getShipsData",
      getuser_discount: "Authorization/getuser_discount",
      done: "Ship/donebook",
      getmsg:"Ship/getmsg"
    }),
  },
  created: function () {
    this.$store.dispatch("Ship/getShipInfo", this.$route.params.shipID);
  },
};
</script>

<style scopd>
#book {
  margin-top: 0px;
  height: calc(700vh);
  background-repeat: no-repeat;
}
.Card {
  width: 80%;
  height: 800px;
  border: 5px solid rgb(116, 110, 110);
  text-align: left;
  padding-left: 5%;
  margin: 100px auto;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 10px;
}
.logo {
  display: inline;
  padding: auto;
  max-width: 100px;
  max-height: 100px;
}
.ship-img {
  display: inline;
  padding-left: 65%;
  max-width: 100px;
  max-height: 100px;
}
#searchbutton {
  display: inline;
  background-color: #1389e9;
  border: none;
  color: white;
  border-radius: 50%;
  padding: 16px 42%;
  text-decoration: none;
  font-size: 175%;
  margin: 4px 2px;
  cursor: pointer;
}
.features {
  display: inline-block;
  padding-left: 8%;
  padding-right: 8%;
}
h1 {
  background-color: rgb(96, 155, 189);
  border-radius: 50px;
  border: solid black;
  margin-left: 100px;
}
h2 {
  background-color: rgb(96, 155, 189);
  border-radius: 50px;
  border: solid black;
  margin-left: 100px;
  color: white;
}
</style>
