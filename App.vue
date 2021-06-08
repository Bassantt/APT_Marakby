
<template>
  <div id="app">

    
    <br>
    <ReservationCard v-bind:ships="ships" />

  </div>
</template>

<script>
//import Ships from './components/Ships.vue';
//import AddShip from './components/AddShip.vue';
import ReservationCard from './components/ReservationCard.vue';


export default {
  name: 'App',
  components: {
  //  Ships,
 //   AddShip,
    ReservationCard
    
  },
  data(){
    return{
    msg: "Welcome to Your Ships Page",

    ships:[
      {
        id:1,
        Name:"Normandy",
        Loc:"mazarita",
        ImageSrc:"./assets/norm2.jpg",
        Price:1500,
        Description:"This is a very good ship",
        Rate:5.0,
        Available:true,
        Features:[true,1,true]
      },
      
      {
        id:2,
        Name:"amirelb7ar",
        Loc:"kotmoto",
        ImageSrc:"./assets/amir_elb7ar.jpg",
        Price:500,
        Description:"This is a very bad ship",
        Rate:5.0,
        Available:true,
        Features:[true,true,false]

      }

    ]
    }
  },
  methods:{
deleteship(id){
  alert("You are going to delete");//+ {{ (ship=>ship.id == id).Name }} );
this.ships=this.ships.filter(ship=>ship.id != id);
},

addShip(newship)
{
  this.ships=[...this.ships,newship];
}



  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
