<template>
  <div class="payment-success-container">
    <h2 class="title"><span>Shopping Bag({{carts_id}}) > </span><span> Checkout  ></span> {{name}} </h2>
    <div class="flex">
      <div class="payment-success-banner">
        <img src="@/assets/img/payment_success.png">
        <b>Your order has been placed !</b>
        <p><span>Order Number:</span>{{data.invoice_no}}</p>
        <span>Delivery of goods to {{data.shipment_address_1?data.shipment_address_1:''}},{{data.shipment_city?data.shipment_city:''}},{{data.shipment_zone?data.shipment_zone:''}},{{data.shipment_country?data.shipment_country:''}}</span>
        <span v-if="data.manager!=''">Customer Service:{{data.manager?data.manager.mobile:''}}</span>
        <div class="payment-bank">
          <img src="@/assets/img/bank.png">
          <div v-for="(item,index) in data.something" :key="index">
            <p v-html="item"></p>
          </div>
        </div>
        <p v-if="signType">You can go to <router-link :to="{path:'/order/order_detail',query:{invoice_no:this.$route.query.invoice_no}}">My Order</router-link> to see the order details.</p>
        <p v-else>We will send an email to your mailbox to inform you of the order status, or you can choose to contact our customer
          <a>(Racahal:{{data.manager?data.manager.mobile:''}})</a> service for more information.</p>
        <div class="flex">
          <router-link class="toShop" v-if="!signType" :to="{path:'/order/order_detail',query:{invoice_no:this.$route.query.invoice_no,session_id:this.$route.query.session_id}}">Checking Order</router-link>
          <a class="toShop" @click="linkUrl({})">Continue Shopping</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toolsMix from "@/util/tools_mixins";
import GTM from '@/util/gtm.js'
import { sendParamInUrl } from "@/util/tools";
export default {
  data () {
    return {
      carts_id:this.$storage.getCount()?this.$storage.getCount().count_cart:0,
      name: this.$route.name,
      data: {},
      signType:JSON.stringify(this.$storage.getUserInfo())!='{}'&&this.$storage.getUserInfo()?true:false,
    }
  },
  mixins: [toolsMix],
  methods: {
    paymentSuccess(){
      let parms = {
        invoice_no: this.$route.query.invoice_no,
        session_id:this.$route.query.session_id
      }
      this.$Http.payment.paymentSuccess(parms).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
              this.data = data;
              //gtm交易统计
              GTM.purchase(data);
          }
      });
    }
  },
  created () {
    this.paymentSuccess()
  }
}
</script>
<style scoped lang="less">
.payment-success-container{
    .title{
        span{
            color:#999;
        }
    }
    >div{
      padding:70px 0;
      .payment-success-banner{
        width: 600px;
        >img{
          display: block;
          margin: 0 auto 40px;
        }
        >b{
          color:#333;
          font-size:20px;
          font-weight: bold;
          line-height: 2;
        }
        >p{
          font-size:14px;
          line-height: 2;
          span{
            font-weight:bold;
          }
          a{
            color:#0090FF;
            border-bottom:1px solid ;
          }
        }
        >span{
          line-height: 1.5;
          font-size:16px;
        }
        .toShop{
          color:#0090FF;
          border-bottom:1px solid ;
          font-size:16px;
          margin: 40px 35px;
          display: block;
          width: max-content;
        }
        .payment-bank{
          margin: 20px 0;
          padding: 20px;
          background: #F4F4F6;
          >div{
            p{
              margin-top: 10px;
            }
          }
        }
      }
    }
}
</style>