<template>
  <div class="cont">
    <HomeNavigation/>
    <div class="row col-12 justify-content-center px-0 m-0"></div>
    <h1>I Am The Admin</h1>
      <div class="user-profile-data">
        <h3>Name: {{user.userName}}</h3>
        <h3>Email: {{user.email}}</h3>
        <h3>Country: {{user.country}}</h3>
    </div>
        <h2 v-if="true">UnbookingUser</h2>
    <div class="row">
      <!-- when back intgrate -->
      <UnbookingUser
        class="col-lg-10% col-md-60% col-xs-6"
        v-for="user in users"
        :key="user.id"
        :Name="user.Name"
        :Email="user.Email"
        :Country="user.Country"
        :NoUnbookings="user.NoUnbookings"
      />
                
    </div>
    
</div>

</template>

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

button{
display: inline-block;
    margin: 5%;
    font-size: 20px;
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
</style>

<script>
import { mapGetters } from "vuex";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import UnbookingUser from "@/components/UnbookingUser.vue";
export default {
  name: "Admin",
  components: {
    HomeNavigation,UnbookingUser
  },
   data(){
    return{
    users:[
      {
        id:"1",
        Name:"akram",
        Email:"userEmail@gmail.com",
        Country:"Egypt",
        NoUnbookings:"10"
      },
      
 {
        id:"2",
        Name:"loo",
        Email:"loo@gmail.com",
        Country:"Egypt",
        NoUnbookings:"20"
      },
       {
        id:"3",
        Name:"hoda",
        Email:"hoda@gmail.com",
        Country:"Egypt",
        NoUnbookings:"100"
      },
      
          ]
    }
  },
  computed: {
    ...mapGetters({
      user: "Authorization/user"
    }),
  },
};
</script>
