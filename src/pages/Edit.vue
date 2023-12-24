<template>
  <div class="m-5 w-100 p-3">
    edit page {{ $route.params.id }}

    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">عنوان</label>
          <input
            v-model="singleProduct.title"
            type="text"
            class="form-control"
            id="inputEmail4"
            placeholder="Title"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="col-auto my-1 py-2">
          <label class="mr-sm-2" for="inlineFormCustomSelect">وضیعت</label>
          <br />
          <select
            class="custom-select mr-sm-2 w-50 py-2"
            id="inlineFormCustomSelect"
          >
            <option selected>{{ singleProduct.status }}</option>

            <option
              v-for="status in listStatus"
              :value="status.value"
              :key="status.value"
            >
              {{ status.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <div class="form-check d-flex flex-row justify-content-start">
          <input :checked="singleProduct.isPublished" class="form-check-input" type="checkbox" id="gridCheck" />
          <label class="form-check-label me-5" for="gridCheck">
          وضیعت انتشار
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">ارسال</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit",
  data() {
    return {
      prouctId: null,
      singleProduct: {
        title:null,
        status:null,
        isPublished:null,
      },
      listStatus: [
        { text: "منتشرشده", value: "منتشرشده" },
        { text: "درانتظار تایید", value: "درانتظار تایید" },
        { text: "نیاز به ویرایش", value: "نیاز به ویرایش" },
      ],
    };
  },
  //   watch: {
  //     $route(to) {

  //         console.log('to.params',to.params.id);

  //     },
  //   },
  async created() {
    this.prouctId = this.$route.params.id;
    await this.getSingleProduct();
  },
  mounted() {},
  methods: {
    async getSingleProduct() {
      console.log("this.prouctIdddd", this.prouctId);
      await axios
        .get(`https://ramaapi.sepanodata.ir/api/Product/${this.prouctId}`)
        .then((res) => {
          const result = res.data;
          this.singleProduct.title = result.title;
          this.singleProduct.status = result.status;
          this.singleProduct.isPublished = result.isPublished;
          console.log("result single", result);
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