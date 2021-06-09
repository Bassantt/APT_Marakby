<!--The v-model directive is used to bind the state to the input fields-->
<template>
  <form id="shape-form">
    <div class="row ">
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >Shipe name</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ shapename }}
        </label>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >Description</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ description }}
        </label>
      </div>

      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >Date</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ blockDate }}
        </label>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >Salary Per Hour</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ salaryPerHour }}
        </label>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >country</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ country }}
        </label>
      </div>
      <div class="col-12 form-group">
        <label class="col-form-label col-form-label-lg" style="color: #fdf7fc"
          >capacity</label
        >
        <label type="text" class="form-control form-control-lg"
          >{{ capacity }}
        </label>
      </div>
    <div class="col-2 form-group text-center">
      <button class="btn-vue1 form-control form-control-lg col-2" style="margin: 4">
        Get It
      </button>
    </div>
    </div>

  </form>
</template>
<script>
export default {
  name: "ShapeForm",
  data: function () {
    return {
      shapename: "Titanik",
      description: "night ship",
      blockDate: "10/2/2022",
      salaryPerHour: 1000,
      country: "Egypt",
      capacity: 50,
      ship_src: "../assets/logo.png",
    };
  },
};
</script>
<style>
#btn-vue1 {
  background-color: rgb(97, 167, 207);
  max-width: 100px;
  font-weight: bold;
  color: #fdf7fc;
  width: 10%;
  height: 110%;
  max-height: 200px;
}

#type_radio {
  border-block: 3px solid black;
  border-block-color: rgb(37, 91, 122);
}
</style>
<style type="text/css">
input[type="button"] {
  margin: 100px;
}
</style>
