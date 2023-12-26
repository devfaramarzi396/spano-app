<template>
  <div class="home-page-container">
    <div class="spinner-border text-success" role="status" v-if="loadingProduct">
      <span class="visually-hidden">Loading...</span>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="cell" scope="col">#</th>
          <th scope="col" v-for="clmn in clmns" :key="clmn.id">
            {{ clmn.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.status }}</td>
          <td class="d-flex justify-content-between">
            <span>{{ product.isPublished }}</span>
            <router-link
              :to="{ name: 'editProduct', params: { id: product.id } }"
            >
              ویرایش</router-link
            >
          </td>
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
      loadingProduct: true,
    };
  },
  async created() {
    await this.getProduct();
  },

  methods: {
    async getProduct() {
      let url_product = "https://ramaapi.sepanodata.ir/api/Product/";
      await axios
        .get(url_product)
        .then((res) => {
          const result = res.data;
          this.clmns = result.clmns;
          this.products = result.data;
          this.loadingProduct=false
          // console.log("result", result);
          // console.log("products", this.products);
          // console.log("clmns", this.clmns);
        })
        .catch((err) => {
          this.loadingProduct=false
          console.log("ERROR", err.message);
        });
    },
  },
};
</script>

<style lang="scss">
.home-page-container {
  margin: 120px auto;
  max-width: 700px;
  width: 100%;
  height: 100vh;
  @media (max-width: 600px) {
    max-width: 460px;
  }
  tr {
    border: 0px solid transparent !important;

    th {
      font-size: 15px !important;
      color: #0c0e5d !important;
      @media (max-width: 600px) {
        font-size: 13px !important;
      }
    }
    td {
      font-size: 15px !important;
      color: #24242c !important;
      @media (max-width: 600px) {
        font-size: 14px !important;
      }
      a {
        color: #02b91e !important;
        text-decoration: none !important;
        @media (max-width: 600px) {
          font-size: 14px !important;
        }
      }
    }
  }
}
</style>