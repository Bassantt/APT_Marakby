
<template>
  <div id="app">
  

    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{msg}}</h1>
    <Ships v-bind:ships="ships" v-on:del-ship="deleteship"/>
    <br>
    <h3>To Add a new ship:</h3>
    <AddShip v-on:add-ship="addShip"/>
    <br>
    

  </div>
</template>

<script>
import Ships from './components/Ships.vue';
import AddShip from './components/AddShip.vue';



export default {
  name: 'App',
  components: {
    Ships,
    AddShip    
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
        Available:true
      },
      
      {
        id:2,
        Name:"amirelb7ar",
        Loc:"kotmoto",
        ImageSrc:"./assets/amir_elb7ar.jpg",
        Price:500,
        Description:"This is a very bad ship",
        Rate:5.0,
        Available:true

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
