<template>
  <div class="tabs-container">
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="clmn in clmns" :key="clmn.id">
            {{ clmn.header }}
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.status  }}</td>
          <td class="d-flex justify-content-between ">
            <span>{{ product.isPublished  }}</span>
             <router-link :to="{name:'editProduct',params:{id:product.id} }" class=" text-success"> ویرایش</router-link></td>
             <!-- <router-link :to=`/edit/${product.id}` class=" text-success"> ویرایش</router-link></td> -->
        
       

        </tr>
      
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tab",
  components: {},
  data() {
    return {
      products: null,
      clmns: null,
    };
  },
  created() {},

  mounted() {
    this.getProduct();
  },

  methods: {
    getProduct() {
      // let url_attributes = "https://ramaapi.sepanodata.ir/api/Attributes/";
      // let url_category = "https://ramaapi.sepanodata.ir/api/Category/";
      let url_product = "https://ramaapi.sepanodata.ir/api/Product/";
      axios
        .get(url_product)
        .then((res) => {
          const result = res.data;
          this.clmns = result.clmns;
          this.products = result.data;
          // console.log("result", result);
          console.log("products", this.products);
          console.log("clmns", this.clmns);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
  },
};
</script>

<style lang="scss">
.tabs-container {
  padding: 60px 33px;
  background-color: #011313;
  width: 100%;
  height: 100vh;
}
</style>