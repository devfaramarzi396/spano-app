<template>
  <div class="tabs-container">
    <div class="tabs">
      <div class="tab active">Edit</div>
      <div class="tab" @click="getAttributes">Attributes</div>
    </div>

    <div class="content-container">
      <!-- EDIT -->
      <div class="content active">
        <EditProduct  />
        <!-- <div class="m-3 w-100 p-2 text-success">
          edit page {{ $route.params.id }}

          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4"
                  ><span class="text-dark fs-6">عنوان</span></label
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
              <div class="col-auto my-1 py-2 text-dark">
                <label
                  class="mr-sm-2 text-dark fs-6"
                  for="inlineFormCustomSelect"
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
                <label
                  class="form-check-label me-5 text-dark fs-6"
                  for="gridCheck"
                >
                  وضیعت انتشار
                </label>
              </div>
            </div>
            <button
              @click="saveProduct($event)"
              type="button"
              class="btn btn-primary mt-3"
            >
              ارسال
            </button>
          </form>
        </div> -->
      </div>

      <!-- ATTRIBUTES -->
      <div class="content">
        <!-- <Todos ref="accessTodo" /> -->
        Attributes page
        <button
          type="button"
          class="btn btn-success w-100 my-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal-attr"
        >
          اضافه کردن ویژگی
        </button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">عنوان ویژگی</th>
              <th scope="col">مقدار ویژگی</th>
              <th scope="col">مقادیر پیشفرض</th>
              <th scope="col">مقدار دلخواه ثبت شده</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(attr, index) in attributes" :key="attr.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ attr.attrText }}</td>
              <td>{{ attr.attrId }}</td>
              <td>
                <select
                  @change="handleDefaultValues($event)"
                  class="custom-select mr-sm-2 w-50 py-2"
                  id="inlineFormCustomSelect"
                >
                  <option
                    v-for="v in attr.defaultValues"
                    :value="v.value"
                    :key="v.id"
                  >
                    {{ v.value }}
                  </option>
                </select>
              </td>
              <td class="d-flex justify-content-between">
                <span>{{ attr.valueText ? attr.valueText : "ندارد" }}</span>
                <button
                  @click="editAttrModal(attr)"
                  type="button"
                  class="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  ویرایش
                </button>
              </td>
              <!-- modal edit attributes -->
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        ویرایش ویژگی‌ها
                      </h5>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label"
                            >عنوان ویژگی</label
                          >
                          <input
                            @change="handleAttrText($event)"
                            v-model="attribute.attrText"
                            type="text"
                            class="form-control"
                            id="recipient-name"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label"
                            >مقدار ویژگی</label
                          >
                          <input
                            @change="handleAttrId($event)"
                            v-model="attribute.attrId"
                            type="number"
                            class="form-control"
                            id="recipient-name"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        انصراف
                      </button>
                      <button
                        @click="sendEditAttributes"
                        type="button"
                        class="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        ویرایش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>

        <!-- modal ADD attributes -->
        <div
          class="modal fade"
          id="exampleModal-attr"
          tabindex="-1"
          aria-labelledby="exampleModalLabel-attr"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  اضافه کردن ویژگی‌ها
                </h5>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label"
                      >عنوان ویژگی</label
                    >
                    <input
                      @change="addAttrText($event)"
                      v-model="addedAttributes.attrText"
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >مقدار ویژگی</label
                    >
                    <input
                      @change="addAttrId($event)"
                      v-model="addedAttributes.attrId"
                      type="number"
                      class="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >مقدار ارزش ویژگی</label
                    >
                    <input
                      @change="addAttrValueId($event)"
                      v-model="addedAttributes.attrValueId"
                      type="number"
                      class="form-control"
                      id="recipient-name"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  لغو
                </button>
                <button
                  @click="sendAddAttributes"
                  type="button"
                  class="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  اضافه کردن ویژگی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProduct from "./components/Edit-Product.vue";
import axios from "axios";
export default {
  name: "edit",
  components:{
    EditProduct
  },
  data() {
    return {
      prouctId: null,
      // singleProduct: {
      //   title: null,
      //   status: null,
      //   isPublished: null,
      // },
      attributes: null,
      attribute: {
        id: null,
        attrId: null,
        attrValueId: null,
        attrText: null,
      },
      newAttrId: null,
      newValueText: null,
      newAttrText: null,

      // listStatus: [
      //   { id: 1, text: "درانتظار تایید", value: "درانتظار تایید" },
      //   { id: 2, text: "منتشرشده", value: "منتشرشده" },
      //   { id: 3, text: "نیاز به ویرایش", value: "نیاز به ویرایش" },
      // ],
      addedAttributes: {
        id: null,
        attrId: null,
        attrValueId: null,
        attrText: null,
      },
    };
  },
 
  // async created() {
  //   this.prouctId = this.$route.params.id;
  //   await this.getSingleProduct();
  // },
  // mounted() {
  //   this.loadedComponent();
  // },
  methods: {
    // loadedComponent() {
    //   const tabs = document.querySelectorAll(".tabs-container .tab");
    //   const contents = document.querySelectorAll(".tabs-container .content");

    //   const removeActiveClass = () => {
    //     tabs.forEach((t) => {
    //       t.classList.remove("active");
    //     });

    //     contents.forEach((c) => {
    //       c.classList.remove("active");
    //     });
    //   };

    //   tabs.forEach((t, i) => {
    //     t.addEventListener("click", () => {
    //       removeActiveClass();
    //       contents[i].classList.add("active");
    //       t.classList.add("active");
    //     });
    //   });
    // },
    //  ------ get single product
    // async getSingleProduct() {
    //   await axios
    //     .get(`https://ramaapi.sepanodata.ir/api/Product/${this.prouctId}`)
    //     .then((res) => {
    //       const result = res.data;
    //       this.singleProduct.title = result.title;
    //       this.singleProduct.status = result.status;
    //       this.singleProduct.isPublished = result.isPublished;
    //     })
    //     .catch((err) => {
    //       console.log("ERROR", err.message);
    //     });
    // },
    // ------ save
    // handleTitle(e) {
    //   this.singleProduct.title = e.target.value;
    // },
    // handleStatus(e) {
    //   this.singleProduct.status = e.target.value;
    // },
    // handleIsPublished() {
    //   this.singleProduct.isPublished = !this.singleProduct.isPublished;
    // },
    // saveProduct(e) {
    //   e.preventDefault();
    //   console.log("new single Product", this.singleProduct);
    //   let statusId = this.listStatus.find(
    //     (item) => item.value === this.singleProduct.status
    //   ).id;
    //   let isPublished = this.singleProduct.isPublished === true ? 1 : 0;
    //   console.log("id", this.prouctId);
    //   console.log("this.singleProduct.title", this.singleProduct.title);
    //   console.log("statusId", statusId);
    //   console.log("isPublished", isPublished);
    //   axios
    //     .post("https://ramaapi.sepanodata.ir/api/Product/Save", {
    //       id: this.prouctId,
    //       title: this.singleProduct.title,
    //       statusId: statusId,
    //       isPublished: isPublished,
    //     })
    //     .then((res) => {
    //       console.log("res.data new single", res);
    //       setTimeout(() => {
    //         this.$router.push("/");
    //       }, 1000);
    //     })
    //     .catch((err) => {
    //       console.log("ERROR", err.message);
    //     });
    // },
    // ------ getAttributes
    async getAttributes() {
      await axios
        .get("https://ramaapi.sepanodata.ir/api/Attributes/")
        .then((res) => {
          const total = res.data;
          this.attributes = total;
          // console.log(" this.attributes ", this.attributes);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
    editAttrModal(attr) {
      console.log("attr", attr);
      this.attribute.attrText = attr.attrText;
      this.attribute.attrId = attr.attrId;
      this.attribute.id = attr.id;
      this.attribute.attrValueId = attr.attrValueId;
    },
    handleAttrId(e) {
      this.newAttrId = e.target.value;
    },
    handleAttrText(e) {
      this.newAttrText = e.target.value;
    },

    async sendEditAttributes() {
      if (this.newAttrId === null || this.newAttrId === undefined) {
        this.newAttrId = this.attribute.attrId;
      }
      if (this.newAttrText === null || this.newAttrText === undefined) {
        this.newAttrText = this.attribute.attrText;
      }
      await axios
        .post("https://ramaapi.sepanodata.ir/api/Attributes/save", {
          id: this.attribute.id,
          productId: this.prouctId,
          attrId: this.newAttrId,
          attrValueId: this.attribute.attrValueId,
          attrText: this.newAttrText,
        })
        .then((res) => {
          this.attribute.id = null;
          this.attribute.attrId = null;
          this.attribute.attrValueId = null;
          this.attribute.attrText = null;
          this.newAttrId = null;
          this.newAttrText = null;
          this.getAttributes();
          console.log(res);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
    // ------ add attributes
    addAttrText(e) {
      this.addAttributes.attrText = e.target.value;
    },
    addAttrId(e) {
      this.addAttributes.attrId = e.target.value;
    },
    addAttrValueId(e) {
      this.addAttributes.attrValueId = e.target.value;
    },

    async sendAddAttributes() {
      let flag = true;
      let randomId;
      // genarate randomId
      while (flag) {
        randomId = Math.floor(Math.random() * 100);
        flag = !!this.attributes.find((item) => item.id === randomId);
      }
      console.log("randomId", randomId);
      await axios
        .post("https://ramaapi.sepanodata.ir/api/Attributes/add", {
          id: randomId,
          productId: this.prouctId,
          attrId: this.addedAttributes.attrId,
          attrValueId: this.addedAttributes.attrValueId,
          attrText: this.addedAttributes.attrText,
        })
        .then((res) => {
          this.addedAttributes.attrId = null;
          this.addedAttributes.attrValueId = null;
          this.addedAttributes.attrText = null;
          this.getAttributes();
          console.log(res);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
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
  }
}
.tabs-container .tabs {
  /* width: 300px; */
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
  font-weight: bold;
}
@media (max-width: 600px) {
  .tabs-container .tabs .tab {
    width: 50%;
    background: #000;
    padding: 13px 21px;
    font-weight: normal;
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
.dark {
  background-color: #000 !important;
  color: #eee !important;
}

.tabs-container .content-container .content {
  display: none;
  padding: 13px 32px;
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