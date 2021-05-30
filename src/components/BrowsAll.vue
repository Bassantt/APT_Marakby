<template>
  <div class="Brows-container">
      <ul class="list-unstyled"> 
         Here You Can Find What You want Or Search to Reach Fast...
                <li>
                    Ship for wedding                 
                </li>
                <li>
                    Ship for Meeting                 
                </li>
                 <li>
                    Ship for Birthday                 
                </li>
      </ul>  
      <div >
          <h1>Frequently Searched</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: "BrowsAll",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Brows-container {
  width: 100%;
  margin-top: 500px;
  background-color:rgb(37, 91, 122); 
  padding: 30px 50px;
}
h1 {
font-size: 50px;
font-weight: 400px;
  color: #ffffff;
 float: left;
 margin: 10px 20px;
 text-decoration: underline;
}
ul {
    margin: 0%;
    display: block;
     color: #ffffff;
     font-size: 30px;
}
li {
    text-align: center;
    color: #ffffff;
}
a {
  color: #ffffff;
    font-size: 15px;
    text-decoration: none;
    padding: 0%;
    display: block;
}
</style>
