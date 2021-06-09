<template>
<div class="All">

  <div class="user-profile-data">
        <h3>Name: {{Name}}</h3>
        <h3>Email: {{Email}}</h3>
        <h3>Country: {{Country}}</h3>
        <h3>UnBookings:{{NoUnbookings}}</h3>
    </div>
    <br>
    
  
</div>
</template>

<script>


export default {
   
    name: "UnbookingUser",

    props:{
        Name:{type:String,},
        Email:{type:String,},
        Country:{type:String,},
        Phone:{type:String,},
        NoUnbookings:{type:String,},
      },      
  
};
</script>

<style scoped>
.user-profile-data{
    margin-top: 2%;
    border: 10px solid rgba(255, 255, 255, 0.877);
    background: #ffffff;
    
    display: inline-block;
    padding:20px;
    text-align: justify;
    margin-left: auto;
    margin-right: auto;
}
.res-item{
    padding: 0;
    text-align: center;
    margin-block: 10px;
}

.ProfilePic{
    float: left;
    margin-left: 20%;
    margin-top: 5%;
    max-width: 300px;
    max-height: 300px;
    vertical-align: top;    
    border-radius: 20%;
}

h3{
     border-bottom: 2px solid rgb(158, 156, 156);
}


input[type=text], input[type=password]{
  width: 30%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.All{
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3px;
max-width: 70%;
    border: 2px solid rgb(221, 221, 221);
}


  .Delete {
    display: inline-block;
    margin: 5%;
    font-size: 20px;
    background: #af0909;
    color: #fff;
    border: none;
    border-radius: 10%;
    cursor: pointer;

  }

</style>

