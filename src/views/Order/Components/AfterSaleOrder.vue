<template>
  <div class="user-allorder-lis">
    <div
      class="user-allorder"
      :data-id="item.id"
      :data-invoice_no="item.return_no"
    >
      <a href="javascript:void(0);">
        <div class="user-allorder-head">
          <b class="flyoon">{{ item.return_no }}</b>
          <b class="payment"></b>
        </div>
      </a>
      <div
        class="user-allorder-con clearfix"
        v-for="(v, n) in item.order_return_products"
        :key="n"
      >
        <a href="javascript:void(0);" @click="LINKURL(v)">
          <div class="user-order-cn-imgs">
            <img v-lazy="v.img_m" />
          </div>
        </a>
        <div class="user-order-cn-right clearfix">
          <a href="javascript:void(0);"></a>
          <a
            class="order-cn-right-title"
            href="javascript:void(0);"
            @click="LINKURL(v)"
            >{{ v.name }}</a
          >
          <div class="order-cn-right-type">
            <div class="right-type-lis">
              <span class="right-type-lis-type">Size: {{ v.size }}</span>
              <p class="right-type-lis-price">${{ v.price | numFilter }}</p>
            </div>
          </div>
          <div class="order-cn-right-type">
            <div class="right-type-lis">
              <span class="right-type-lis-type">Color: {{ v.color }}</span>
            </div>
          </div>
          <i class="user-order-nums">*{{ item.order_quantity }}</i>
        </div>
      </div>
<!--
      <div class="use-allorder-mos">
        <div class="user-order-total-cn">
          <div class="user-type-moneu-info clearfix">
            <span class="info-msg"></span>
            <span class="info-price"></span>
          </div>
          <div class="user-type-moneu-info clearfix">
            <span class="info-msg"></span>
            <span class="info-price">US $0.00</span>
          </div>
        </div>
 
        <div class="user-order-btns">
       
          <router-link
            class="buyagain user-order-btns"
            :to="{
              path: '/order/after_sale_details',
              query: { return_no: item.return_no }
            }"
            >DETAILS</router-link
          >
        </div>
      </div>
        -->
    </div>
  </div>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";
export default {
  props: ["item"],
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
    firstmobile(item) {
      let value = "";
      value = item.substring(0, 4);
      return value;
    },
    endmobile(item) {
      var Length = item.length;
      if (Length > 8) {
        var value = item.substring(Length - 4, Length);
      } else {
        value = "";
      }
      return value;
    }
  },
  methods: {
    LINKURL(item) {
      sendParamInUrl({url:item.product_url});
    },
  }
};
</script>

<style lang="scss" scoped>
.user-allorder-lis {
  .user-allorder {
    width: 100%;
    /* height: 520px; */
    background-color: #ffffff;
    // box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
    // border: solid 1px #f5f5f5;
    margin: 0 auto 0.26667rem;
    padding-bottom: 0.26667rem;
    margin: 0 auto 0.26667rem;
  }
  .user-allorder .user-allorder-head {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.26667rem;
    border-bottom: solid 1px #f5f5f5;
  }
  .user-allorder .user-allorder-head .flyoon {
    font-size: 0.32rem;
  }
  .user-allorder .user-allorder-head .payment {
    font-size: 0.29333rem;
    font-weight: 400;
    float: right;
  }
  .user-allorder .user-allorder-con {
    padding: 0 0.26667rem;
    margin-top: 0.25333rem;
    margin-bottom: 5px;
    position: relative;
  }
  .user-allorder .user-allorder-con .user-order-cn-imgs {
    float: left;
    width: 1.68rem;
    height: 2.18667rem;
    overflow: hidden;
  }
  .user-allorder .user-allorder-con .user-order-cn-imgs img {
    /* max-height: 100%; */
    width: 100%;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-title {
    display: block;
    font-size: 0.32rem;
    color: #252525;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-type {
    margin-top: 0.26667rem;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis {
    height: 0.4rem;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .right-type-lis-type {
    font-size: 0.32rem;
    display: block;
    // max-width: 2.66667rem;
    float: left;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .right-type-lis-price {
    float: right;
    font-size: 0.32rem;
    float: right;
    display: block;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .user-order-nums {
    color: #dbdbdb;
    font-size: 0.32rem;
    text-align: right;
    border: solid transparent;
    display: block;
    font-style: normal;
    // position: absolute;
    right: 0;
  }
  .user-allorder .use-allorder-mos {
    padding: 0 0.26667rem;
  }
  .user-allorder .use-allorder-mos .user-order-total-cn {
    margin-top: 10px;
    /* height: 182px; */
    border-top: solid 2px #ededed;
    border-top: solid 1px #ededed;
    padding-bottom: 15px;
  }
  .user-allorder .use-allorder-mos .user-type-moneu-info {
    width: 100%;
    font-size: 0.26667rem;
    line-height: 0.5rem;
  }
  .user-allorder .use-allorder-mos .user-type-moneu-info .info-msg,
  .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
    font-size: 0.32rem;
  }
  .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
    float: right;
    font-size: 0.32rem;
    font-weight: 400;
  }
  .user-allorder .use-allorder-mos .user-order-total-cn .info-price {
    font-weight: 700;
  }
  .user-allorder .use-allorder-mos .user-order-btns {
    height: 0.64rem;
    margin-top: 3px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: 0 0.26667rem;
  }
  .user-allorder .use-allorder-mos .user-order-btns button,
  .user-allorder .use-allorder-mos .user-order-btns .user-order-btns {
    padding: 0 0.33333rem;
    font-size: 0.32rem;
    border-radius: 5px;
    border: solid 1px #dbdbdb;
    background: none;
    cursor: pointer;
    margin-left: 4px;
    /* float: right; */
  }
  .user-allorder .use-allorder-mos .user-order-btns {
    height: 0.64rem;
    margin-top: 3px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: 0 0.26667rem;
  }
}
</style>
