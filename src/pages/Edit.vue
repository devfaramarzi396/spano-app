<template>
  <div class="m-5">edit page {{ $route.params.id }}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit",
  data() {
    return {
      prouctId: null,
    }
  },
//   watch: {
//     $route(to) {
       
//         console.log('to.params',to.params.id);
      
//     },
//   },
  created() {
    this.prouctId = this.$route.params.id;
  },
  mounted() {
    this.getSingleProduct();
  },
  methods: {
    getSingleProduct() {
        console.log('this.prouctIdddd',this.prouctId);
      axios
        .get(`https://ramaapi.sepanodata.ir/api/Product/${this.prouctId}`)
        .then((res) => {
          const result = res.data;
          console.log("result", result);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>