<template>
  <div class="user-allorder-lis">
    <div
      class="user-allorder pres-order-list"
      :data-id="item.order_id"
      :data-invoice_no="item.invoice_no"
    >
      <div
        v-for="(v, n) in (Array.isArray(item.order_products) && item.order_products.length > 0 && 
        [item.order_products[0]] || [])"
        :key="n"
        class="pres-order-list-link"
        :data-link="v.product_url"
      >
      <!-- @click="LINKURL(v)" -->
        <a href="javascript:void(0);" @click="orderInfo(item)">
          <div class="pres-order-list-flex">
            <div class="pres-img">
              <img v-lazy="v.img_m" />
            </div>
            <div class="p-oreder-r">
              <div class="per-order">
                <div class="title">Order NO:{{ item.invoice_no }}</div>
                <b class="payment" v-show="item.order_status === 'unpaid'"
                  >UNPAID</b
                >
                <b class="payment" v-show="item.order_status === 'shipped'"
                  >SHIPPED</b
                >
                <b class="payment" v-show="item.order_status === 'paid'"
                  >PAID</b
                >
                <b class="payment" v-show="item.order_status === 'completed'"
                  >COMPLATED</b
                >
                <b class="payment" v-show="item.order_status === 'canceled'"
                  >CANCEL</b
                >
              </div>
              <div class="title">{{item.created_at}}</div>
              <div class="total num">*{{ v.quantity }}</div>
              <div class="total">
                <span>Total:</span>
                <span class="price">${{ v.price | numFilter }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="user-order-btns" v-if="item.order_status == 'unpaid'">
        <!-- <button
                           
                            data-invoice_no="LBB20200226-102248691"
                          >Pay</button>-->
        <router-link
          :to="{
            path: '/payment_step_two',
            query: { invoice_no: item.invoice_no },
          }"
          class="buyagain user-order-btns btns-pay pay-active"
          >PAY</router-link
        >
        <!-- <a
                            href="/carts/modify_shipping_address?invoice_no=LBB20200226-102248691"
                            class="buyagain user-order-btns btns-pay"
                            style="display: flex;align-items: center;"
                          >Modify Address</a>
                          :to="{
              path: '/carts/modify_shipping_address',
              query: { invoice_no: item.invoice_no },
            }" 
                          -->

        <a
          class="buyagain user-order-btns btns-pay"
          href="javascript:void(0);"
          @click="editAddres({ invoice_no: item.invoice_no })"
          >Edit Address</a
        >
        <button
          class="buyagain user-order-btns btns-cancel"
          @click="order_canceled(item)"
        >
          CANCEL
        </button>
      </div>
      <div class="user-order-btns" v-if="item.order_status == 'canceled'">
        <button
          class="buyagain user-order-btns btns-del"
          @click="order_del_by_no(item)"
        >
          DELETE
        </button>
      </div>
      <div class="user-order-btns" v-if="item.order_status == 'shipped'">
        <button
          class="buyagain user-order-btns btns-again"
          @click="buy_again(item)"
        >
          BUY AGAIN
        </button>
        <a
          href="javascript:void(0);"
          class="buyagain user-order-btns btns-completed"
          @click="order_completed(item)"
          >CONFIRM RECEIPT</a
        >
      </div>
      <div class="user-order-btns" v-if="item.order_status == 'paid'">
        <button
          class="buyagain user-order-btns btns-again"
          @click="buy_again(item)"
        >
          BUY AGAIN
        </button>
      </div>
      <!-- completed -->
      <div class="user-order-btns" v-if="item.order_status == 'completed'">
        <!-- <button class="buyagain user-order-btns btns-again">Buy again</button> -->
        <!-- <a
                            href="/order/order_review?invoice_no=LBB20200106-135145704"
                            class="buyagain user-order-btns btns-pay"
                          >Comment</a>-->

        <router-link
          :to="{ path: '/user/my_review' }"
          class="buyagain user-order-btns btns-completed"
          v-if="item.no_comment_num == 0"
          style="display: -none"
          >EVALUATION</router-link
        >
        <router-link
          :to="{
            path: '/order/order_review',
            query: { invoice_no: item.invoice_no },
          }"
          class="buyagain user-order-btns btns-pay"
          v-if="item.no_comment_num != 0"
          >COMMONT</router-link
        >
        <button
          class="buyagain user-order-btns btns-again"
          @click="buy_again(item)"
        >
          BUY AGAIN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";
import message from "@/util/message";
import mesgTip from "@/lang";

export default {
  props: ["item"],
  data() {
    return {
      msgTip: mesgTip.CENTER,
    };
  },
  components: {},
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
  methods: {
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },
    orderInfo(item){
      this.$router.push({
        path:'/order/order_detail',
        query:{
          invoice_no:item.invoice_no
        }
      })
    },
    /**
     * @method
     * @desc: 修改地址
     * @author:  zhangyunjiang
     * @creatDate 2020-12-14 13:49:24
     * @param {*}  val
     */
    editAddres(item = {}) {
      this.$emit("editAddres", item);
    },
    /**
     * 取消订单
     */
    order_canceled(item) {
      let { invoice_no } = item;
      let _self = this;
      let str = this.msgTip.ORDER_CANCEL;

      message.confirms({
        className: "confirms-btnswhis",
        msg: str,
        rightBtnFn: () => {
          this.$Http.order
            .orderCanceled({
              invoice_no,
            })
            .then((res) => {
              let { code } = res;
              if (code == 200) {
                // this.db_selelctlist = data;
                // _self.db_selelctlist = [];
                // this.refreshing = true;
                // this.pages = 1;
                // Toast.success(msg);
                // setTimeout(() => {
                // this.onLoad({ order_status: this.active });
                // location.reload()
                // _self.onLoad({ order_status: this.active, page: 1 });
                this.$emit("change");
                // }, 300);
              }
            });
        },
      });
    },
    /**
     * 删除订单
     */
    order_del_by_no(item) {
      let { invoice_no } = item;
      let _self = this;
      message.confirms({
        className: "confirms-btnswhis",
        msg: this.msgTip.ORDER_DELETE,
        rightBtnFn: () => {
          this.$Http.order.ordeDelByNo({ invoice_no }).then((res) => {
            let { code } = res;
            if (code == 200) {
              this.refreshing = true;
              // this.db_selelctlist = data;
              _self.db_selelctlist = [];
              _self.pages = 1;
              this.$emit("change");
              // Toast.success(msg);
              //   setTimeout(() => {
              //     // _self.onLoad({ order_status: _self.active, page: 1 });
              //     this.$emit('change')
              //     // location.reload()
              //   }, 300);
            }
          });
        },
      });
    },
    /**
     * 再次购买
     */
    buy_again(item) {
      let { invoice_no } = item;
      let _self = this;
      message.confirms({
        className: "confirms-btnswhis",
        msg: this.msgTip.ORDER_AGAIN,
        rightBtnFn: () => {
          this.$Http.order
            .buyAgain({
              invoice_no,
            })
            .then((res) => {
              let { code } = res;
              if (code == 200) {
                // this.db_selelctlist = data;
                // _self.db_selelctlist = [];
                // this.refreshing = true;
                // Toast.success(msg);
                // this.pages = 1;
                // setTimeout(() => {
                // this.onLoad({ order_status: this.active });
                // location.reload()
                // _self.onLoad({ order_status: _self.active,page:1 });
                this.$emit("change");
                this.$router.push("/my_cart");
                // }, 300);
              }
            });
        },
      });
    },
    /**
     * 接收订单
     */
    order_completed(item) {
      let { invoice_no } = item;
      let _self = this;
      let str = this.msgTip.ORDER_RECEIPT;
      message.confirms({
        className: "confirms-btnswhis",
        msg: str,
        rightBtnFn: () => {
          this.$Http.order
            .orderCompleted({
              invoice_no,
            })
            .then((res) => {
              let { code } = res;
              if (code == 200) {
                // this.db_selelctlist = data;
                // _self.db_selelctlist = [];
                // this.refreshing = true;
                // this.pages = 1;
                // Toast.success(msg);
                // setTimeout(() => {
                // this.onLoad({ order_status: this.active });
                // location.reload()
                // _self.onLoad({ order_status: this.active, page: 1 });
                this.$emit("change");
                // }, 300);
              }
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.pres-order-list {
  padding: pxto2($px20);
  min-height: pxto2($px280);
  &-link {
    min-height: pxto2($px200);
    margin-bottom: pxto2($px5);
    padding-right: pxto2($px10);
    a {
      display: block;
      width: 100%;
      height: 100%;
      .pres-img {
        width: pxto2($px180);
        height: pxto2($px200);
        border: $input-border;
        display: flex;

        justify-content: center;
        align-items: center;
      }
      img {
        max-width: pxto2($px180);
        max-height: pxto2($px200);
      }
    }
    .title {
      @include fontSize24();
      color: $info;
      line-height: 1;
      padding: 0 pxto2($px5);
      width:5.5rem;
    }
    .p-oreder-r {
      padding: pxto2($px20);
      .per-order {
        display: flex;
        @include fontSize24();
        align-items: center;
      }
      .num {
        margin-top: pxto2($px10);
      }
      .total {
        @include fontSize24();
        .price {
          color: $pick;
          margin-left: pxto2($px10);
        }
      }
    }
  }
  &-flex {
    display: flex;
  }
  .user-order-btns {
    display: flex;
    margin-top: pxto2($px10);
    justify-content: flex-end;
    padding-right: pxto2($px10);
    a,
    button {
      display: block;
      @include btnsFn();
      @include fontSize24();
      text-align: center;
      margin-right: pxto2($px20);
    }
    button {
      width: pxto2(220px);
      height: pxto2(64px);
      background: $withe;
    }
    .pay-active {
      background: $block;
      color: $withe;
      border: solid 1px $block;
    }
  }
}
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
    //padding: 0 0.33333rem;
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
