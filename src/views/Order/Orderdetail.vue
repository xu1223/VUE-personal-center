<template>
  <div class="p-o-info">
    <HeaderTab />
    <div class="order-userinfo-detail msg-conten-top" style="background: #fff">
      <div class="hx-steps">
        <van-steps :active="active">
          <van-step>Order</van-step>
          <van-step>Paid</van-step>
          <van-step>Shipped</van-step>
          <van-step>Completed</van-step>
        </van-steps>
      </div>
    </div>
    <div class="order-no">
      <div class="o">
        <span>Order NO：{{ db_selectlist.invoice_no }} </span>
        <span class="info">{{ db_selectlist.created_at }} </span>
      </div>
      <div class="t">
        Order Date：<span> {{ db_selectlist.created_at }} </span>
      </div>
    </div>
    <div class="order-userinfo-detail msg-conten-top">
      <div class="bgclor">
        <div class="user-info-cn">
          <div class="p-info-cns">
            <div class="lis" v-for="(item, index) in db_selectlist.order_products || []" :key="index">
              <div class="lis-l">
                <div class="img">
                  <a class="user-order-cn-imgs" href="javascript:void(0)" @click="LINKURL(item)">
                    <img v-lazy="item.img_m" alt />
                  </a>
                </div>
                <div class="name">
                  <div class="title">
                    <div class="t-name"> <a class="user-order-cn-imgs" href="javascript:void(0)"
                        @click="LINKURL(item)">{{ item.name }}
                      </a>
                    </div>
                    <div class="t-type">
                      <b class="payment" v-show="db_selectlist.order_status === 'unpaid'">UNPAID</b>
                      <b class="payment" v-show="db_selectlist.order_status === 'shipped'">SHIPPED</b>
                      <b class="payment" v-show="db_selectlist.order_status === 'paid'">PAID</b>
                      <b class="payment" v-show="db_selectlist.order_status === 'completed'">COMPLATED</b>
                      <b class="payment" v-show="db_selectlist.order_status === 'canceled'">CANCELED</b>
                    </div>
                  </div>
                  <div class="sku h-l">SKU： {{ item.sku }}</div>
                  <div class="color h-l">Color： {{ item.color }}</div>
                  <div class="size h-l">Size：{{ item.size }}</div>
                  <div class="qty h-l">
                    <span> QTY：*{{ item.quantity }} </span>
                    <span class="b"> US ${{ item.price | numFilter }} </span>
                  </div>
                </div>
              </div>
              <div style="
                  width: 95%;
                  height: 0.7rem;
                  border-radius: 5px;
                  border: solid 1px #dbdbdb;
                  margin: 0.3rem auto;
                  display:none
                " v-if="
                  db_selectlist.order_status === 'completed' ||
                  db_selectlist.order_status === 'paid'
                ">
                <!--
                <router-link :to="{
                    path: '/order/apply_order_after_sale',
                    query: { id: item.id },
                  }" style="
                    display: block;
                    font-size: 0.32rem;
                    text-align: center;
                    line-height: 0.7rem;
                  ">REQUEST A REFUND</router-link>
                  -->
              </div>
            </div>
          </div>
        </div>
        <div class="user-info-cn">
          <div class="user-info-cns info-cns-msg">
            <div class="info-msg-cns">
              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Order Number:</p>
                <p class="info-msg-cns-vlues">{{ db_selectlist.invoice_no }}</p>
              </div>

              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Order Date:</p>
                <p class="info-msg-cns-vlues">{{ db_selectlist.created_at }}</p>
              </div>

              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Shipping Address:</p>
                <p class="info-msg-cns-vlues">
                  {{
                    db_selectlist.shipment_firstname
                      ? db_selectlist.shipment_firstname
                      : ""
                  }}{{
                    db_selectlist.shipment_lastname
                      ? db_selectlist.shipment_lastname
                      : ""
                  }},{{
                    db_selectlist.shipment_address_1
                      ? db_selectlist.shipment_address_1
                      : ""
                  }},{{
                    db_selectlist.shipment_city
                      ? db_selectlist.shipment_city
                      : ""
                  }},{{
                    db_selectlist.shipment_zone
                      ? db_selectlist.shipment_zone
                      : ""
                  }},{{
                    db_selectlist.shipment_postcode
                      ? db_selectlist.shipment_postcode
                      : ""
                  }},{{
                    db_selectlist.shipment_country
                      ? db_selectlist.shipment_country
                      : ""
                  }}
                </p>
              </div>

              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Delivery Method:</p>
                <p class="info-msg-cns-vlues">
                  {{ db_selectlist.shipment_method }}
                </p>
              </div>

              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Payment Method:</p>
                <p class="info-msg-cns-vlues">
                  {{ db_selectlist.shipping_status }}
                </p>
              </div>

              <div class="info-msg-cns-lis">
                <p class="info-msg-cns-names">Remarks:</p>
                <p class="info-msg-cns-vlues">{{ db_selectlist.comment }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="user-info-cn">
          <div class="user-info-cns info-cns-msg">
            <p class="info-msg-title">Order Amount</p>
            <div class="use-allorder-mos">
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Product Price:</span>
                <span class="info-price">${{ db_selectlist.subtotal_price | numFilter }}</span>
              </div>
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Discount:</span>
                <span class="info-price">${{ db_selectlist.discount | numFilter }}</span>
              </div>
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Coupon Discount:</span>
                <span class="info-price">${{
                    db_selectlist.coupon ? db_selectlist.coupon : 0 | numFilter
                  }}</span>
              </div>
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Promotion Discount:</span>
                <span class="info-price">${{
                    db_selectlist.activity_history
                      ? db_selectlist.activity_history.amount
                      : 0 | numFilter
                  }}</span>
              </div>
              <div class="user-type-moneu-info clearfix" v-if="db_selectlist.total_discount != 0">
                <span class="info-msg">Amount adjustment:</span>
                <span class="info-price" id="promotion_discount"
                  v-if="db_selectlist.total_discount < 0">-${{ amount_adjustment_positive | numFilter }}</span>
                <span class="info-price" id="promotion_discount"
                  v-if="db_selectlist.total_discount > 0">${{ amount_adjustment_positive | numFilter }}</span>
              </div>
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Delivery:</span>
                <span class="info-price">${{ db_selectlist.shipping_fee | numFilter }}</span>
              </div>
              <div class="user-type-moneu-info clearfix">
                <span class="info-msg">Payment Fee:</span>
                <span class="info-price">${{ db_selectlist.payment_fee | numFilter }}</span>
              </div>
              <!--<div class="user-type-moneu-info clearfix">
                                    <span class="info-msg">Preferential:</span>
                                    <span class="info-price">$10.00</span>
                  </div>-->

              <div class="user-order-total-cn">
                <div class="user-type-moneu-info clearfix">
                  <span class="info-msg">Total number of products:</span>
                  <span class="info-price" style="font-weight: 700">{{
                    db_selectlist.total_number
                  }}</span>
                  <!-- <span class="info-price">US $8.05</span> -->
                </div>
                <div class="user-type-moneu-info clearfix">
                  <span class="info-msg">Total Price ( Actual Payment ):</span>
                  <span class="info-price" style="font-weight: 700">US $
                    {{
                      db_selectlist.total_price
                        ? db_selectlist.total_price
                        : 0 | numFilter
                    }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-navbtn" style="padding: 0 20px; width: 9rem" v-if="db_selectlist.order_status === 'unpaid'">
      <!-- <a href="javascript:void(0);" class="btn-active">PAY</a> -->
      <a href="javascript:void(0);" class="btn-link" @click="order_canceled(db_selectlist.invoice_no)">CANCEL</a>
      <router-link class="btn-active" :to="{
          path: '/payment_step_two',
          query: { invoice_no: db_selectlist.invoice_no },
        }">PAY</router-link>
    </div>
    <div class="user-navbtn" style="padding: 0 20px; width: 9rem; justify-content: center"
      v-if="db_selectlist.order_status === 'canceled'">
      <a href="javascript:void(0);" class="btn-link" @click="order_del_by_no(db_selectlist.invoice_no)">DELET</a>
    </div>
    <div class="user-navbtn" style="padding: 0 20px; width: 9rem; justify-content: center"
      v-if="db_selectlist.order_status === 'shipped'">
      <a href="javascript:void(0);" class="btn-active" @click="order_completed(db_selectlist.invoice_no)">
        CONFIRM RECIPT
      </a>
    </div>
    <div class="user-navbtn" style="padding: 0 20px; width: 9rem; justify-content: center"
      v-if="db_selectlist.order_status === 'paid'">
      <a href="javascript:void(0);" class="btn-active" @click="buy_again(db_selectlist.invoice_no)">BUY AGAIN</a>
    </div>

    <div class="user-navbtn" style="padding: 0 20px; width: 9rem" v-if="db_selectlist.order_status === 'completed'">
      <a href="javascript:void(0);" class="btn-active" @click="buy_again(db_selectlist.invoice_no)">BUY AGAIN</a>
      <router-link :to="{
          path: '/order/order_review',
          query: { invoice_no: db_selectlist.invoice_no },
        }" class="btn-active">COMMNT</router-link>
    </div>
  </div>
</template>

<script>
  import {
    Dialog
  } from "vant";
  import HeaderTab from "@/components/HeaderTab";
  import {
    sendParamInUrl
  } from "@/util/tools";
  export default {
    data() {
      return {
        paymentshow:false,
        active: 1,
        db_selectlist: {},
        amount_adjustment_positive: 0,
      };
    },
    methods: {
      LINKURL(item) {
        sendParamInUrl({
          url: item.product_url,
        });
      },

      onClickLeft() {
        window.history.back(-1);
      },
      /**
       * 取消订单
       */
      order_canceled(item) {
        let invoice_no = item;
        let _self = this;
        let str =
          "Would you like to cancel this order? Cannot recover after cancellation";
        Dialog.confirm({
            className: "confirms-btns",
            cancelButtonText: "CONFIRM",
            confirmButtonText: "CANCEL",
            message: str,
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.$Http.order
              .orderCanceled({
                invoice_no,
              })
              .then((res) => {
                let {
                  code
                } = res;
                if (code == 200) {
                  this.get_order_detail(invoice_no);
                }
              });
          });
      },
      /**
       * 再次购买
       */
      buy_again(invoice_no) {
        Dialog.confirm({
            className: "confirms-btns",
            cancelButtonText: "CONFIRM",
            confirmButtonText: "CANCEL",
            message: "Do you want to add all the items in this order to the shopping bag again?",
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.$Http.order
              .buyAgain({
                invoice_no,
              })
              .then((res) => {
                let {
                  code
                } = res;
                if (code == 200) {
                  this.db_selelctlist = [];
                  this.pages = 1;
                  this.$router.push("/my_cart");
                }
              });
          });
      },
      /**
       * 删除订单
       */
      order_del_by_no(invoice_no) {
        Dialog.confirm({
            className: "confirms-btns",
            cancelButtonText: "CONFIRM",
            confirmButtonText: "CANCEL",
            message: "Do you want to delete this order? Cannot recover after deletion",
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.$Http.order
              .ordeDelByNo({
                invoice_no,
              })
              .then((res) => {
                let {
                  code
                } = res;
                if (code == 200) {
                  // this.db_selelctlist = data;
                  this.db_selelctlist = [];
                  this.pages = 1;
                  this.$router.push("/order");
                }
              });
          });
      },
      /**
       * 接收订单
       */
      order_completed(invoice_no) {
        let str =
          "Are you sure you want to confirm the goods receipt order? After confirmation, it cannot be recovered.";
        Dialog.confirm({
            className: "confirms-btns",
            cancelButtonText: "CONFIRM",
            confirmButtonText: "CANCEL",
            message: str,
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            this.$Http.order
              .orderCompleted({
                invoice_no,
              })
              .then((res) => {
                let {
                  code
                } = res;
                if (code == 200) {
                  this.get_order_detail(invoice_no);
                  // location.reload();
                }
              });
          });
      },
      get_order_detail(invoice_no) {

        let url = ''
        if (this.paymentshow) {
          url = 'getOrderDetailbsessionid'
        } else {
          url = 'getOrderDetail'
        }

        this.$Http.order[url]({
            invoice_no,
            session_id:'gusIdHUjKEa2pjmYoWzWwCil4Cup9qSSEJXMlNMoKvE12cQbUPo7i51608177564'
          })
          .then((res) => {
            let {
              code,
              data
            } = res;
            if (code == 200) {
              this.db_selectlist = data;
              if (data.total_discount) {
                this.amount_adjustment_positive = Math.abs(data.total_discount);
              }
            }
          });
      },
    },
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
      },
    },
    created() {
      // const _icon = "LBBB-200912-152550202";
      // let invoice_no = _icon;
      // this.db_selectlist = [];
      // this.get_order_detail(invoice_no);
      // return false;
      if (this.$route.query.payment) {
        this.paymentshow = true
      } else {
        this.paymentshow = false
      }
      if (this.$route.query.invoice_no) {
        let invoice_no = this.$route.query.invoice_no;
        this.db_selectlist = [];
        this.get_order_detail(invoice_no);
      }
    },
    components: {
      HeaderTab,
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/style/_var.scss";
  @import "@/assets/style/mixins.scss";

  .p-o-info {
    @include fontSize24();

    .p-info-cns {
      padding: 0 pxto2($px20);

      .lis {
        .lis-l {
          display: flex;

          .img {
            width: pxto2(180px);
            height: pxto2(200px);
            text-align: center;
            border: 1px solid $info-2;
            overflow: hidden;

            img {
              max-height: 100%;
            }
          }

          .name {
            width: pxto2(490px);
            margin-left: pxto2($px20);

            .title {
              display: flex;
              justify-content: space-between;

              .t-name {
                width: pxto2(400px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }

            .h-l {
              height: pxto2($px40);
              line-height: pxto2($px40);
            }

            .sku {
              margin-top: pxto2(5px);
              color: $info;
            }

            .qty {
              display: flex;
              justify-content: space-between;

              .b {
                font-weight: 700;
              }
            }
          }
        }
      }
    }

    .order-no {
      background: $withe;
      padding: pxto2($px20);

      .o {
        justify-content: space-between;
        display: flex;

        .info {
          color: $info;
        }
      }
    }

    .user-navbtn {
      position: relative !important;
      background: transparent;
      z-index: 1;

      .btn-active {
        background: $block;
      }
    }

    .info-msg-cns-names {
      font-weight: 700;
      color: $block !important;
    }

    .info-cns-msg {
      margin-top: 0 !important;
    }

    .user-type-moneu-info {
      display: flex;
      margin-bottom: pxto2(10px);

      .info-msg {
        width: pxto2(380px);
        display: block;
      }

      .info-price {
        font-weight: 400 !important;
      }
    }
  }

  .hx-steps {
    background: url("../../assets/img/u1.png");
    background-size: 100% 100%;
    padding: pxto2(20px);
  }

  .hx-steps /deep/ .van-step--finish .van-step__circle,
  .van-step--finish .van-step__line {
    background-color: #35e5bc;
  }

  .hx-steps /deep/ .van-step--finish .van-step__line {
    background-color: #35e5bc !important;
  }

  .hx-steps /deep/ .van-step__icon--active,
  .van-step__title--active {
    color: #35e5bc;
  }

  .hx-steps /deep/ .van-step__title--active {
    color: #161616;
  }

  .hx-steps /deep/.van-step--horizontal .van-step__icon {
    font-size: pxto2(48px);
  }

  .order-userinfo-detail {
    .user-allorder .use-allorder-mos .user-order-total-cn {
      margin-top: 10px;
      /* height: 182px; */
      border-top: solid 2px #ededed;
      border-top: solid 1px #ededed;
      padding: 5px 0;
    }

    .bgclor {
      background: #fafbfd;
      height: 100%;
      // margin-bottom: 1.73333rem;
    }

    .user-info-cn {
      background: #fff;
      margin-top: 10px;
      padding: 0.26667rem 0;
    }

    .user-info-cn .user-info-cns {
      margin: 0 auto;
    }

    .user-info-cn .user-info-cns .user-allorder-info {
      box-shadow: none;
    }

    .user-allorder {
      width: 100%;
      /* height: 520px; */
      background-color: #ffffff;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
      border: solid 1px #f5f5f5;
      margin: 0 auto 0.26667rem;
      padding-bottom: 0.26667rem;
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

    .user-allorder .user-allorder-head .flyoon {
      font-size: 0.32rem;
    }

    .user-allorder .user-allorder-con {
      padding: 0 0.26667rem;
      margin-top: 0.25333rem;
      margin-bottom: 5px;
      /* height: 164px; */
      /* border: solid 1px red; */
      position: relative;
    }

    .user-allorder .user-allorder-con .user-order-cn-imgs {
      float: left;
      width: 1.68rem;
      height: 2.18667rem;
      overflow: hidden;
      position: relative;
      z-index: 10;
    }

    .user-allorder .user-allorder-con .user-order-cn-imgs img {
      /* max-height: 100%; */
      width: 100%;
    }

    .user-allorder .user-allorder-con .user-order-cn-right {
      /* float: left; */
      margin-left: 0.26667rem;
      /* width: 6.26667rem; */
      width: 97%;
      position: relative;
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

    .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-type .right-type-lis {
      height: 0.4rem;
    }

    .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-type .right-type-lis .right-type-lis-type {
      font-size: 0.32rem;
      display: block;
      max-width: 2.66667rem;
      float: left;
    }

    .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-type .right-type-lis .right-type-lis-price {
      float: right;
      font-size: 0.32rem;
      float: right;
      display: block;
    }

    .user-allorder .user-allorder-con .user-order-cn-right .user-order-nums {
      color: #888;
      font-size: 0.32rem;
      text-align: right;
      border: solid transparent;
      display: block;
      font-style: normal;
      position: absolute;
      right: 0;
    }

    .user-allorder .use-allorder-mos {
      padding: 0 0.26667rem;
    }

    .user-allorder .use-allorder-mos .user-type-moneu-info {
      width: 100%;
      font-size: 0.26667rem;
      line-height: 0.5rem;
    }

    .user-allorder .user-allorder-head .payment {
      font-size: 0.29333rem;
      font-weight: 400;
      float: right;
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

    .user-info-cn .user-info-cns {
      margin: 0 auto;
      padding: 0 pxto2($px20);
    }

    .user-info-cn .info-cns-msg .info-msg-title {
      width: 100%;
      display: block;
      font-size: 0.32rem;
      font-weight: 700;
      color: #161616;
    }

    .user-info-cn .info-cns-msg .info-msg-cns .info-msg-cns-lis {
      width: 100%;
      /* height: 0.50667rem; */
      display: -ms-flexbox;
      display: flex;
    }

    .user-info-cn .info-cns-msg .info-msg-cns .info-msg-cns-lis p {
      font-size: 0.32rem;
      color: #6e6e6e;
      line-height: 0.53333rem;
      display: block;
    }

    .user-info-cn .info-cns-msg .info-msg-cns .info-msg-cns-lis .info-msg-cns-names {
      float: left;
      white-space: nowrap;
      width: 30%;
    }

    .user-info-cn .info-cns-msg .info-msg-cns .info-msg-cns-lis .info-msg-cns-vlues {
      float: left;
      margin-left: 10px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
</style>