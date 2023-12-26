<template>
  <div class="attribute">
    <div class="spinner-border text-success" role="status" v-if="loadingAttr">
      <span class="visually-hidden">Loading...</span>
    </div>
    <AddAttributeBtn
      :attributesProps="attributes"
      :productIdProps="prouctId"
      :getAttributesFnProps="getAttributes"
    />

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
              class="custom-select mr-sm-2 w-sm-50 py-2"
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
          <td class="d-flex justify-content-between align-items-center">
            <span>{{ attr.valueText ? attr.valueText : "ندارد" }}</span>

            <button
              @click="editAttrModal(attr)"
              type="button"
              class="btn btn-sm btn-outline-success p-2"
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
                  <h5 class="modal-title fs-6" id="exampleModalLabel">
                    ویرایش ویژگی‌ها
                  </h5>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3 ">
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
                    class="btn btn-sm btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    انصراف
                  </button>
                  <button
                    @click="sendEditAttributes"
                    type="button"
                    class="btn btn-sm btn-success"
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
  </div>
</template>

<script>
import AddAttributeBtn from "./Add-Attribute.vue";
import axios from "axios";
export default {
  data() {
    return {
      loadingAttr:true,
      prouctId: null,
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
    };
  },
  components: {
    AddAttributeBtn,
  },
  async created() {
    this.prouctId = this.$route.params.id;
    await this.getAttributes();
  },
  methods: {
    // ------ getAttributes
    async getAttributes() {
      await axios
        .get("https://ramaapi.sepanodata.ir/api/Attributes/")
        .then((res) => {
          const total = res.data;
          this.attributes = total;
          this.loadingAttr=false
        })
        .catch((err) => {
          this.loadingAttr=false
          console.log("ERROR", err.message);
        });
    },

    editAttrModal(attr) {
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
  },
};
</script>
<style lang="scss">
.attribute {
  table {
    tr {
      vertical-align: middle;
      th {
        color: #0c0e5d !important;
        font-weight: bold;
        font-size: 16px !important;
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
      }
    }
  }
}
</style>