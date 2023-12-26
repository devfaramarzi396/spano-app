<template>
  <div class="tabs-container">
    <div class="tabs">
      <div class="tab active">ویرایش محصول</div>
      <div class="tab">ویژگی‌های‌ محصول</div>
    </div>

    <div class="content-container">
      
      <!-- EDIT -->
      <div class="content active">
        <EditProduct />
      </div>

      <!-- ATTRIBUTES -->
      <div class="content">
        <Attributes />
      </div>
    </div>
  </div>
</template>

<script>
import EditProduct from "./components/Edit-Product.vue";
import Attributes from "./components/Attributes/Index.vue";
export default {
  name: "edit",
  components: {
    EditProduct,
    Attributes,
  },
};
</script>

<style>
.tabs-container {
  font-family: "Roboto", sans-serif;
  max-width: 700px;
  min-height: 400px;
  margin: 60px auto;
  display: flex;
  box-shadow: 0 4px 40px -8px rgba(0, 0, 0, 0.2);

  flex-direction: column;
  align-items: center;
}
@media (max-width: 600px) {
  .tabs-container {
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    min-height: 100vh !important;
    max-width: 100%;
    overflow: scroll;
  }
}
.tabs-container .tabs {
  width: 100%;
  background: #000;
  color: #fff;
  text-transform: uppercase;
  text-align: center;

  display: flex;
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .tabs-container .tabs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
   
  }
}
.tabs-container .tabs .tab {
  padding: 24px 32px;
  background: #222;
  cursor: pointer;
  /* font-weight: bold; */
  font-size: 14px;
}
@media (max-width: 600px) {
  .tabs-container .tabs .tab {
    width: 50%;
    background: #000;
    padding: 13px 21px;
    font-weight: normal;
  font-size: 12px;

  }
}
.tabs-container .tabs .tab.active {
  background: #f6fdff;
  color: #222;
}

.tabs-container .content-container {
  background-color: #f6fdff;
  width: 100%;
}
@media (max-width: 600px) {
  .tabs-container .content-container {
   overflow: scroll;
   
  }
}


.tabs-container .content-container .content {
  display: none;
  padding: 13px 32px;
}
@media (max-width: 600px) {
  .tabs-container .content-container .content{
  padding: 0;
   
  }
}
.tabs-container .content-container .content.active {
  /* display: block; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.tabs-container .content-container p {
  line-height: 2;
}
</style>