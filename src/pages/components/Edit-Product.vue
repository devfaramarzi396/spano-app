<template>
  <div class="m-3 w-100 p-2 text-success">
    <div class="spinner-border text-success" role="status" v-if="loadingEditProduct">
      <span class="visually-hidden">Loading...</span>
    </div>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4"
            ><span class="text-dark small">عنوان</span></label
          >
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
        <div class="col-auto  my-1 py-2 text-dark">
          <label class="mr-sm-2 text-dark small" for="inlineFormCustomSelect"
            >وضیعت</label
          >
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
            class="form-check-input p-2"
            type="checkbox"
            id="gridCheck"
          />
          <label class="form-check-label me-5 text-dark small" for="gridCheck">
            وضیعت انتشار
          </label>
        </div>
      </div>
      <button
        @click="saveProduct($event)"
        type="button"
        class="btn btn-sm btn-primary mt-3"
      >
        ارسال
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loadingEditProduct:true,
      prouctId: null,
      singleProduct: {
        title: null,
        status: null,
        isPublished: null,
      },

      listStatus: [
        { id: 1, text: "در انتظار تایید", value: "در انتظار تایید" },
        { id: 2, text: "منتشر شده", value: "منتشر شده" },
        { id: 3, text: "نیاز به ویرایش", value: "نیاز به ویرایش" },
      ],
    };
  },
  async created() {
    this.prouctId = this.$route.params.id;
    await this.getSingleProduct();
  },
  mounted() {
    this.loadedComponent();
  },

  methods: {
    loadedComponent() {
      const tabs = document.querySelectorAll(".tabs-container .tab");
      const contents = document.querySelectorAll(".tabs-container .content");

      const removeActiveClass = () => {
        tabs.forEach((t) => {
          t.classList.remove("active");
        });

        contents.forEach((c) => {
          c.classList.remove("active");
        });
      };

      tabs.forEach((t, i) => {
        t.addEventListener("click", () => {
          removeActiveClass();
          contents[i].classList.add("active");
          t.classList.add("active");
        });
      });
    },
    //  ------ get single product
    async getSingleProduct() {
      await axios
        .get(`https://ramaapi.sepanodata.ir/api/Product/${this.prouctId}`)
        .then((res) => {
          const result = res.data;
          this.singleProduct.title = result.title;
          this.singleProduct.status = result.status;
          this.singleProduct.isPublished = result.isPublished;
          this.loadingEditProduct=false
          
        })
        .catch((err) => {
          this.loadingEditProduct=false
          console.log("ERROR", err.message);
        });
    },
    handleTitle(e) {
      this.singleProduct.title = e.target.value;
    },
    handleStatus(e) {
      this.singleProduct.status = e.target.value;
    },
    handleIsPublished() {
      this.singleProduct.isPublished = !this.singleProduct.isPublished;
    },
    saveProduct(e) {
      e.preventDefault();
      let statusId = this.listStatus.find(
        (item) => item.value === this.singleProduct.status
      ).id;
     
      let isPublished = this.singleProduct.isPublished === true ? 1 : 0;
    
      axios
        .post("https://ramaapi.sepanodata.ir/api/Product/Save", {
          id: this.prouctId,
          title: this.singleProduct.title,
          statusId: statusId,
          isPublished: isPublished,
        })
        .then((res) => {
          console.log("res", res);
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
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