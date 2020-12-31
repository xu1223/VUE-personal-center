<template>
  <div class="after-sale-container">
    <h2 class="title">{{name}}</h2>
    {{'return_action'+data.return_action}}  ------- {{'return_status'+data.return_status}}
     <p class="order-return-action">Application for return</p>
     
      <steps v-if="(data.return_action==1&&data.return_status==0)||
                   (data.return_action==1&&data.return_status==1)||
                   (data.return_action==1&&data.return_status==4)||
                   (data.return_action==3&&data.return_status==1)||
                   (data.return_action==3&&data.return_status==4)"
       :data="steps1" :current="0"></steps>

      <steps v-if="(data.return_action==3&&data.return_status==2)" :data="steps" :current="1"></steps>

      <steps v-if="(data.return_action==1&&data.return_status==2)||
                    (data.return_action==1&&data.return_status==3)||
                    (data.return_action==3&&data.return_status==3)" 
      :data="steps1" :current="2"></steps>

      <steps v-if="(data.return_action==2&&data.return_status==1)" :data="steps2" :current="0"></steps>
       
      <steps v-if="(data.return_action==2&&data.return_status==2)" :data="steps2" :current="2"></steps>

      <steps v-if="(data.return_action==2&&data.return_status==3)" :data="steps2" :current="3"></steps>

      <steps v-if="(data.return_action==1&&data.return_status==5)||
                    (data.return_action==2&&data.return_status==5)||
                    (data.return_action==3&&data.return_status==5)" 
      :data="steps3" :current="1"></steps>

      <hr />
      <hr />
    <div class="after-sale-banner">
        <div>
            <div v-if="(data.return_action==1&&data.return_status==0)||
                        (data.return_action==1&&data.return_status==1)||
                        (data.return_action==2&&data.return_status==1)||
                        (data.return_action==3&&data.return_status==1)||
                        (data.return_action==4&&data.return_status==1)">
                <a class="button white" @click="cancel(data.return_no)">Cancel Application</a>
                <hr />
                <v-form direction="horizontal" :model="data" ref="data">
                    <v-form-item prop="return_reason" label="Reasons For Return" has-feedback :label-col="labelCol" :wrapper-col="wrapperCol"
                        :rules="[{ required: true, message: 'Required field' }]">
                        <v-select allowClear placeholder search :data="this.return_reason_list" label="name" clue="name" v-model="data.return_reason"></v-select>
                    </v-form-item>
                    <v-form-item prop="refund_amount" label="Refund amount" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback
                        :rules="[{ required: true, message: 'Required field' }]">
                        <v-input v-model="data.refund_amount" placeholder="The maximum refund amount is the total amount of the goods."></v-input>
                    </v-form-item>
                    <v-form-item prop="remarks" label="Refund remarks" has-feedback :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input type="textarea" placeholder :autosize="{ minRows: 12, maxRows:24 }" style="height:150px" v-model="data.remarks"></v-input>
                    </v-form-item>
                    <v-form-item label="Upload certificate(Up to 6 sheets)" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                        <IMG @imgGet="imgGet" @imgDelete="imgDelete" :data="data.images" :length="6" />
                    </v-form-item>
                    <hr />                
                    <button class="button" @click.prevent="submitForm('data')">SUBMIT</button>
                </v-form>
            </div>
            <!-- 售后方式2 -->
            <div v-if="data.return_action==2">
                <div v-if="data.return_status==2">
                    <p class="order_action_msg">After-Sales Progress: Waiting For REVIEW</p>
                    <span
                        class="order_action_tips"
                    >You have successfully initiated a refund request, please be patient and wait for the merchant to process.</span>
                    <hr />
                    <div class="refund_dhl flex1">
                        <div>
                        <div class="flex1">
                            <span>LOGISTICS COMPANY *</span>
                            <p>{{ data.receive_shipment_method }}</p>
                        </div>
                        <div class="flex1">
                            <span>SHIPMENT NUMBER *</span>
                            <p>{{ data.receive_shipment_code }}</p>
                        </div>
                        <div class="flex1">
                            <span>RETURN INSTRUCTIONS</span>
                            <p>{{ data.receive_shipment_remark }}</p>
                        </div>
                        </div>
                        <img :src="refund_dhl_" />
                    </div>
                </div>
            </div>
            <!-- 售后方式3 -->
            <div v-if="data.return_action==3" class="order_action">
                <div v-if="data.return_status==3">
                    <p class="order_action_msg">
                        After-Sales Progress: Replacement Is Successful,
                        <br />Please Pay Attention To Check.
                    </p>
                    <hr />
                    <div class="refund_dhl flex1">
                        <div>
                        <div class="flex1">
                            <span>LOGISTICS COMPANY *</span>
                            <p>{{ data.receive_shipment_method }}</p>
                        </div>
                        <div class="flex1">
                            <span>SHIPMENT NUMBER *</span>
                            <p>{{ data.receive_shipment_code }}</p>
                        </div>
                        <div class="flex1">
                            <span>RETURN INSTRUCTIONS</span>
                            <p>{{ data.receive_shipment_remark }}</p>
                        </div>
                        </div>
                        <img :src="refund_dhl_" />
                    </div>
                    <hr />
                    <div class="refund_dhl flex1">
                        <div>
                        <div class="flex1">
                            <span>LOGISTICS COMPANY *</span>
                            <p>{{ data.send_shipment_method }}</p>
                        </div>
                        <div class="flex1">
                            <span>SHIPMENT NUMBER *</span>
                            <p>{{ data.send_shipment_code }}</p>
                        </div>
                        <div class="flex1">
                            <span>RETURN INSTRUCTIONS</span>
                            <p>{{ data.send_shipment_remark }}</p>
                        </div>
                        </div>
                        <img :src="refund_dhl_" />
                    </div>
                </div>
            </div>
            
            <div v-if="(data.return_action==1&&data.return_status==2)||
                        (data.return_action==1&&data.return_status==3)||
                        (data.return_action==2&&data.return_status==3)">
                <div class="after-detail-success">
                    <p>After-Sales Progress: Refund Is Successful, Please Pay Attention To Check.</p>
                    <span>Refund success time {{ data.refunded_at}}</span>
                    <span>Refund amount ${{ data.actual_refund_amount|numFilter }}</span>
                </div>
            </div>
        </div>
        <div class="after-sale-info">
            <p class="after-sale-info-title">Order Detail</p>
            <div>
                <p class="flex1"><span>Order number:</span>{{ data.order ? data.order.invoice_no : ''}}</p>
                <p class="flex1"><span>Total number:</span>{{ data.order ? data.order.total_number : 0}}</p>
                <p class="flex1"><span>Total amount of goods:</span>${{ data.order ? data.order.subtotal_price:0|numFilter}}</p>
                <p class="flex1"><span>Shipping cost:</span>${{ data.order ? data.order.shipping_fee: 0|numFilter}}</p>
                <p class="flex1"><span>Payment fee:</span>${{ data.order ? data.order.payment_fee :0|numFilter}}</p>
                <p class="flex1"><span>Acual payment:</span>${{ data.order ? data.order.total_price:0|numFilter}}</p>
            </div>
            <hr />
            <div style="background: #efefef">
                <p class="flex1"><span>After sales number:</span>{{ data.return_no ?data.return_no:'' }}</p>
                <p class="flex1"><span>Refund amount:</span>${{ data.refund_amount ? data.refund_amount:0|numFilter}}</p>
                <p class="flex1"><span>After sales type:</span>{{ data.return_action_en[data.return_action] ?data.return_action_en[data.return_action].value:'' }}</p>
                <p class="flex1"><span>Reason for refund:</span>{{ data.return_reason ? data.return_reason:''}}</p>
                <p class="flex1"><span>Refund note:</span>{{ data.remarks ? data.remarks:''}}</p>
                <ul class="flex1"><span>Upload certificate:</span>
                    <div class="flex2">
                        <img
                        style="width:30px"
                        :src="cont.image"
                        v-for="(cont,cond) in data.cert_imgs || []"
                        :key="cond"
                        />
                    </div>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import steps from "@/components/Steps";
import IMG from "@/components/Image";
import {timestampToTime} from "@/util/tools";
import FormRules from "@/util/form_mixins";
export default {
  components: {
    steps,
    IMG,
  },
  data () {
    return {
      name: this.$route.name,
      data: {},
      data: {},
      images: [],
      images_: [],
      refund_dhl_: require("@/assets/img/DHL_.png"),
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      },
      Changeimg: "",
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
          img: require("@/assets/img/refund7.png"),
          name: "Waiting for delivery"
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
      steps3: [
        {
          img: require("@/assets/img/refund4.png"),
          name: "Submit application"
        },
        {
          img: require("@/assets/img/time-axis5.png"),
          name: "Canceled"
        }
      ]
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
    imgDelete(index) {
      this.images.splice(index, 1);
    },
    imgGet(file) {
      this.$Http.order.orderReturnImageUpload({ file: file }, true).then(res => {
          let { code, data } = res;
          if (code == 200) {
            this.images.push(data);
          }
        });
    },
    submitForm(data) {
      let obj = {};
      if (this.images) {
        this.images.forEach((v, i) => {
          if (!obj["images[" + i + "]"]) {
            obj["images[" + i + "]"] = v;
          }
        });
      }
      obj["return_no"] = this.data.return_no;
      obj["return_reason"] = this.data.return_reason;
      obj["refund_amount"] = this.data.refund_amount;
      obj["remarks"] = this.data.remarks;
      this.$refs[data].validate(valid => {
        if (valid) {
          this.$Http.order.changeApplyOrdeReturn({ ...obj }, true).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
              this.$notification.open({
                message: "Tips",
                description: this.$hxmessage.CENTER.SUCCESS_OPERAT,
                duration: 2
              });
              this.data_get();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(return_no) {
      this.$Http.order.canceledOrderReturn({ return_no }, true).then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.data_get();
        }
      });
    },
    getOrderReturnDetail(){
        this.$Http.order.getOrderReturnDetail({ return_no: this.$route.query.return_no }).then(res => {
            let { code, data } = res;
            if (code == 200) {
                this.data = data;
                let imgArr = [];
                if (datacert_imgs) {
                datacert_imgs.forEach(v => {
                    imgArr.push(v);
                });
                this.images = imgArr;
                }
            }
        });
    }   
  },
  created () {
      if (this.$route.query.return_no) {
          this.getOrderReturnDetail()
      }
  }
}
</script>
<style scoped lang="less">
.after-detail-banner{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .after-detail-left{
        width: 58%;
        margin-right: 2%;
    }
    .after-sale-info{
        width: 40%;
        height: min-content;
    }
}
</style>