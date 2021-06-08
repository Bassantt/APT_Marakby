<template>
    <div >
      
      <h1>Reservation Details</h1>
      <div class="Card">
      <img class = "logo" alt="logo" src="../assets/logo.png">
      <img class = "ship-img" alt="ship-img" src="../assets/norm2.jpg">
       <h3>Name: {{ships[0].Name}}</h3>
       <h3>Description: {{ships[0].Description}}</h3>
       <h3>Price: {{ships[0].Price}}</h3>
       <h3>Location: {{ships[0].Location}}</h3>
       <h3>Available: {{ships[0].Available}}</h3>

       <span><label for="res_date">Date of Reservation  </label></span>
       <input type="date" id="res_date" name="res_date">
       <br><br><br>
       <h2>Additional Features:</h2>
       
       <div class="features" v-show="ships[0].Features[0]" >
      <img class = "logo" alt="djlogo" src="../assets/dj_icon.png">
      <br>
      <label for="djlogo">DJ</label>
       </div>

        
       <div class="features" v-show="ships[0].Features[1]" >
      <img class = "logo" alt="lightlogo" src="../assets/light_icon.jpg">
      <br>
      <label for="lightlogo"> Light System</label>
       </div>

        <div class="features" v-show="ships[0].Features[2]" >
      <img class = "logo" alt="soundsyslogo" src="../assets/soundsys_icon.png">
      <br>
      <label for="soundsyslogo"> Sound System</label>
       </div>
       
      </div>
    <input type="submit" value="Reserve" class="btn" />
    </div>
</template>

<script>
export default {
    name:"ReservationCard",
    props:["ships"]
}
</script>


<style scoped>
 .Card {
 
    width: 80%;
    height: 800px;
    border: 5px solid rgb(116, 110, 110);
    text-align: left;
    padding-left: 5%;
    margin: 100px auto;
    background-position: 0 0, 0 100% ;
    background-repeat: no-repeat;
    background-size: 100% 10px;
  }

  .logo{
    display: inline;

    padding: auto;
    max-width: 100px;
    max-height: 100px;
    
  }

  .ship-img{

    display: inline;
    padding-left: 65%;
    max-width: 100px;
    max-height: 100px;
  }


 input[type=submit] {
   display:inline;
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
.features{
  
  display: inline-block;
  padding-left: 8%;
  padding-right: 8%;
}
</style>