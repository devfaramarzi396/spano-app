<template>
  <div>
    <button
      type="button"
      class="btn btn-sm btn-success w-100 my-3"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal-attr"
    >
      اضافه کردن ویژگی
    </button>
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
            <h5 class="modal-title fs-6" id="exampleModalLabel">
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
              class="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
            >
              لغو
            </button>
            <button
              @click="sendAddAttributes"
              type="button"
              class="btn btn-sm btn-success"
              data-bs-dismiss="modal"
            >
              اضافه کردن ویژگی
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["attributesProps", "productIdProps", "getAttributesFnProps"],
  data() {
    return {
      addedAttributes: {
        id: null,
        attrId: null,
        attrValueId: null,
        attrText: null,
      },
    };
  },

  methods: {
    // ------ add attributes
    addAttrText(e) {
      this.addedAttributes.attrText = e.target.value;
    },
    addAttrId(e) {
      this.addedAttributes.attrId = e.target.value;
    },
    addAttrValueId(e) {
      this.addedAttributes.attrValueId = e.target.value;
    },

    async sendAddAttributes() {
      let flag = true;
      let randomId;
      // genarate randomId
      while (flag) {
        randomId = Math.floor(Math.random() * 100);
        flag = !!this.attributesProps.find((item) => item.id === randomId);
      }
      await axios
        .post("https://ramaapi.sepanodata.ir/api/Attributes/add", {
          id: randomId,
          productId: this.productIdProps,
          attrId: this.addedAttributes.attrId,
          attrValueId: this.addedAttributes.attrValueId,
          attrText: this.addedAttributes.attrText,
        })
        .then((res) => {
          this.addedAttributes.attrId = null;
          this.addedAttributes.attrValueId = null;
          this.addedAttributes.attrText = null;

          this.getAttributesFnProps();
          console.log(res);
        })
        .catch((err) => {
          console.log("ERROR", err.message);
        });
    },
  },
};
</script>