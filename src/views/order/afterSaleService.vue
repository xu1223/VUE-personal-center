<template>
  <div class="after-sale-container">
    <h2 class="title">{{name}}</h2>
     <p class="order-return-action">
         {{this.$route.query.return_action==1?'REQUEST A REFUND':
            this.$route.query.return_action==2?'RETURN and REFUND':'APPLICATION FOR RETURN'}}
     </p>
    <steps :data="steps1" :current="0" v-if="this.$route.query.return_action==1"></steps>
    <steps :data="steps2" :current="0" v-if="this.$route.query.return_action==2"></steps>
    <steps :data="steps3" :current="0" v-if="this.$route.query.return_action==3"></steps>
    <hr />
    <hr />
    <div class="after-sale-banner">
        <div>
            <v-form direction="horizontal" :model="data" ref="data">
                <v-form-item label="Reasons For Return" :label-col="labelCol" :wrapper-col="wrapperCol" prop="return_reason"
                    :rules="[{ required: true, message: 'Required field' }]" has-feedback>
                <v-select allowClear placeholder search :data="this.return_reason_list" v-model="data.return_reason" label="name" clue="name"></v-select>
                </v-form-item>
                <v-form-item v-if="this.$route.query.return_action!=3" label="Refund amount" :label-col="labelCol" :wrapper-col="wrapperCol"
                    prop="max_return_amount" :rules="[{ required: true, message: 'Required field' }]" has-feedback >
                    <v-input v-model="data.max_return_amount" placeholder="The maximum refund amount is the total amount of the goods."></v-input>
                </v-form-item>
                <v-form-item label="Remarks" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remarks" has-feedback>
                    <v-input type="textarea" placeholder :autosize="{ minRows: 12, maxRows:24 }" style="height:150px" v-model="data.remarks"></v-input>
                </v-form-item>
                <v-form-item label="Upload certificate(Up to 6 sheets)" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                    <IMG @imgGet="imgGet" @imgDelete="imgDelete" :data="data.images" :length="6" />
                </v-form-item>
                <hr />
                <button class="button" @click.prevent="submitForm('data')">SUBMIT</button>
            </v-form>
        </div>
        <div class="after-sale-info">
            <p class="after-sale-info-title">Order Detail</p>
            <div>
                <div class="flex1">
                    <img :src="data.img_m" />
                    <div>
                    <a class="txt_pass">{{data.name}}</a>
                    <p>*{{data.total_number}}</p>
                    <p>${{data.price|numFilter}}</p>
                    </div>
                </div>
                <p class="flex1"><span>Order number:</span>{{ data.invoice_no ? data.invoice_no : ''}}</p>
                <p class="flex1"><span>Total number:</span>{{ data.total_number ? data.total_number : 0}}</p>
                <p class="flex1"><span>Total amount of goods:</span>${{ data.subtotal_price ? data.subtotal_price:0|numFilter}}</p>
                <p class="flex1"><span>Shipping cost:</span>${{ data.shipping_fee ? data.shipping_fee: 0|numFilter}}</p>
                <p class="flex1"><span>Payment fee:</span>${{ data.payment_fee ? data.payment_fee :0|numFilter}}</p>
                <p class="flex1"><span>Acual payment:</span>${{ data.actual_pay|numFilter}}</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import steps from "@/components/Steps";
import IMG from "@/components/Image";
export default {
  components: {
    steps,
    IMG
  },
  data () {
    return {
      data:{},
      images:[],
      name: this.$route.name,
      return_reason_list: [
        { name: "cargo damage" },
        { name: "Poor quality of goods" },
        { name: "Cancellation of order" }
      ],
      steps1: [
        {
          img: require("@/assets/img/refund4.png"),
          name: "Submit application"
        },
        {
          img: require("@/assets/img/refund5.png"),
          name: "Pending refund"
        },
        {
          img: require("@/assets/img/refund6.png"),
          name: "Refund successfully"
        }
      ],
      steps2: [
        {
          img: require("@/assets/img/refund4.png"),
          name: "Submit application"
        },
        {
          img: require("@/assets/img/refund5.png"),
          name: "Waiting for delivery"
        },
        {
          img: require("@/assets/img/refund6.png"),
          name: "Pending payment"
        },
        {
          img: require("@/assets/img/refund6.png"),
          name: "Refund successfully"
        }
      ],
      steps3: [
        {
          img: require("@/assets/img/refund4.png"),
          name: "Submit application"
        },
        {
          img: require("@/assets/img/refund5.png"),
          name: "Pending refund"
        },
        {
          img: require("@/assets/img/refund6.png"),
          name: "Successful replacement"
        }
      ],
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      }
    }
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = parseFloat(0).toFixed(2);
      }
      return realVal;
    }
  },
  methods: {
      imgGet(file){
        this.$Http.order .orderReturnImageUpload({ file: file }, true) .then(res => {
            let { code, data } = res;
             if (code == 200) {
                 this.images.push(data);
            }
        });
      },
      imgDelete(index){
         this.images.splice(index, 1);
      },
      submitForm(forms){
        let obj = {};
        if (this.images) {
            this.images.forEach((v, i) => {
                if (!obj["images[" + i + "]"]) {
                    obj["images[" + i + "]"] = v;
                }
            });
        }
        obj["return_action"] = this.$route.query.return_action;
        obj["order_product_id"] = this.data.id;
        obj["return_reason"] = this.data.return_reason;
        obj["refund_amount"] = this.data.max_return_amount;
        obj["remarks"] =this.data.remarks;
        this.$refs[forms].validate(valid => {
            if (valid) {
                this.$Http.order.generateOrderAfterSale({ ...obj }, true).then(res => {
                    let { code, msg, data } = res;
                    if (code == 200) {
                        this.$router.push({
                            path: "/order/after_sale_details",
                            query: {
                                return_no: data
                            }
                        });
                    }
                });
            } else {
                console.log("error submit!!");
                return false;
            }
        });
      },
      getOrderProductDetail(){
        this.$Http.order.getOrderProductDetail({ order_product_id: this.$route.query.id }).then(res => {
            let { code, data } = res;
            if (code == 200) {
                this.data = data;
                this.data.actual_pay = Number(data.subtotal_price) + Number(data.shipping_fee) + Number(data.payment_fee);
            }
        });
      }
  },
  created () {
      this.getOrderProductDetail()
  }
}
</script>
<style scoped lang="less">
</style>