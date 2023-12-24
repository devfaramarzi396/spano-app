<template>
  <div class="m-5 w-100 p-3">
    edit page {{ $route.params.id }}

    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">عنوان</label>
          <input
            @change="handleTitle($event)"
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
            @change="handleStatus($event)"
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
          <input
            @change="handleIsPublished($event)"
            :checked="singleProduct.isPublished"
            class="form-check-input"
            type="checkbox"
            id="gridCheck"
          />
          <label class="form-check-label me-5" for="gridCheck">
            وضیعت انتشار
          </label>
        </div>
      </div>
      <button
        @click="saveProduct($event)"
        type="button"
        class="btn btn-primary"
      >
        ارسال
      </button>
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
        title: null,
        status: null,
        isPublished: null,
      },

      listStatus: [
        { id: 1, text: "درانتظار تایید", value: "درانتظار تایید" },
        { id: 2, text: "منتشرشده", value: "منتشرشده" },
        { id: 3, text: "نیاز به ویرایش", value: "نیاز به ویرایش" },
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
    handleTitle(e) {
      this.singleProduct.title = e.target.value;
    },
    handleStatus(e) {
      this.singleProduct.status = e.target.value;
    },
    handleIsPublished() {
      this.singleProduct.isPublished = !this.singleProduct.isPublished;
    },
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
    saveProduct(e) {
      e.preventDefault();
      console.log("new single Product", this.singleProduct);
      let statusId = this.listStatus.find(
        (item) => item.value === this.singleProduct.status
      ).id;
      let isPublished = this.singleProduct.isPublished === true ? 1 : 0;
      console.log("id", this.prouctId);
      console.log("this.singleProduct.title", this.singleProduct.title);
      console.log("statusId", statusId);
      console.log("isPublished", isPublished);
      axios
        .post("https://ramaapi.sepanodata.ir/api/Product/Save", {
          id: this.prouctId,
          title: this.singleProduct.title,
          statusId: statusId,
          isPublished: isPublished,
        })
        .then((res) => {
          console.log("res.data new single",res);
          setTimeout(()=>{
          this.$router.push('/')
          },1000)
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