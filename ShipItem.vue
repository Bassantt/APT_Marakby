<template>
    <div class="Ship-item">
      
      <tr>
      <td><h3>Name: {{ship.Name}}</h3></td>
      <td><h3>Id: {{ship.id}}</h3></td>
      <td><h3>Price: {{ship.Price}}</h3></td>
      <td><img src= "ImageSrc"></td>
      <td><button @click="$emit('del-ship',ship.id)" class="Delete">X</button></td>
      
      </tr>

    
    </div>
</template>

<script>
export default {
    name:"ShipItem",
    props:["ship"]
}
</script>


<style scoped>
 .ship-item {
    background: #f4f4f4;
    padding: 10px;
    word-spacing: 5px;
    border-spacing: 20px;
    border-bottom: 1px #ccc dotted;
  }

  
  .Delete {
    
    background: #af0909;
    color: #fff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
  }

</style>