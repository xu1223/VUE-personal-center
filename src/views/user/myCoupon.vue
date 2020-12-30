<template>
  <div class="">
    <h2 class="title">{{name}}</h2>
    <p v-if="total>0" class="coupon-title">Available vouchers ({{total}})</p>
    <div v-if="total>0" class="coupon-banner">
      <div v-for="(item,index) in full_mall_activity_list" :key="index">
          <a class="full-image"><img src="@/assets/img/discounts.png"></a>
          <div class="coupon-item">
              <span>{{item.name}}</span>
              <span>(ORDER OVER ${{Number(item.purchase_amount_max).toFixed(2)}})</span>
          </div>
      </div>
    </div>
    <!-- <p v-if="total>0" class="coupon-title">Available ({{total}})</p>
    <div v-if="total>0" class="coupon-banner">
      <div v-for="(item,index) in data" :key="index">
          <a class="full-image"><img src="@/assets/img/coupon.png"></a>
          <div class="coupon-item-left">
              <b>US {{item.discount?item.discount+'%':item.preferential?'$'+item.preferential:0}} OFF</b>
              <p>For order over {{item.purchase_amount_max? 'US $'+item.purchase_amount_max:item.purchase_number_max?item.purchase_number_max+'piece':0}}</p>
              <span>1.{{item.date_start+'~'+item.date_end}}</span>
              <span>2.{{item.applicable_type_str}}</span>
          </div>
          <div class="coupon-item-right">
              Code
              <div class="flex">{{item.code||''}}</div>
              <button
              class="button"
              @click="copy"
              :data-clipboard-text="item.code"
              >Copy</button>
          </div>
      </div>
    </div> -->
    <div v-if="total==0">
      <div class="noneData">
          <img src="@/assets/img/couponNone.png">
          <p>It is empty here.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data () {
    return {
      name: this.$route.name,
      total:-1,
      data:[],
      full_mall_activity_list:[]
    };
  },
  methods: {
    getUsedCoupons (p) {
      this.$Http.common.getUsedCoupons({ limit: 9, p: p || 1 }).then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.total=data.total;
          if(data.total>0){
            this.data = data.data;
          }
        }
      })
    },
    fullMallActivityList() {
      this.$Http.cart.fullMallActivityList().then(res => {
          let { code, data ,msg } = res;
          if (code == 200) {
            if(data!=''){
                this.total=data.length;
                this.full_mall_activity_list=data;
            }else{
                this.total=0;
            }
          }
      });
    },
    copy (code) {
      let clipboard = new Clipboard(".button");
      clipboard.on("success", e => {
        this.$notification.open({
          message: "Tips",
          description:'Successful.',
          duration: 2
        });
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$notification.open({
          message: "Tips",
          description:'The browser does not support automatic replication.',
          duration: 2
        });
        clipboard.destroy();
      });
    }
  },
  created () {
    this.fullMallActivityList();
  }
};
</script>

<style lang="less" scoped>
.coupon-title {
  height: 40px;
  background: #f4f4f6;
  border: 1px solid #e6e6e6;
  line-height: 40px;
  padding:0 10px;
  margin-bottom:10px;
}
.coupon-banner{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    >div{
        position: relative;
        .coupon-item{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;
            font-size:17px;
            span{
              margin: 0 10px;
            }
        }
        .coupon-item-left{
            white-space:nowrap;
            position: absolute;
            padding:20px;
            width:65.7%;
            top: 0;
            left: 0;
            b{
                font-size:30px;
            }
            p{
                margin:10px 0 15px;
                @media (max-width: 1400px) {
                   margin:5px 0;
                }
            }
            span{
                display: block;
                color:#999999;
                font-size:12px;
            }
        }
        .coupon-item-right{
            position: absolute;
            padding:10px;
            width:34.3%;
            top: 0;
            right: 0;
            text-align:center;
            div{
                margin:6px 0;
                background: #CECDD5;
                border: 1px solid #DADADA;
                border-radius: 4px;
                width: 90%;
                height: 80px;
                word-break:break-all;
                padding:5px;
                @media (max-width: 1400px) {
                    height: 60px;
                }
            }
            button{
                width: 60px;
                height: 25px;
                font-size: 10px;
                margin:auto;
            }
        }
    }
}
</style>