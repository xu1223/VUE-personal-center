<template>
  <div>
    <HeaderTab />
    <!--style="margin-top:1.1rem;"-->
    <div class="user-iorder">
      <van-tabs
        animated
        v-model="active"
        style="padding: 1px 0"
        sticky
        lazy-render
        @click="onClickTable"
        offset-top="42"
        :ellipsis="false"
        title-active-color="#161616"
        title-inactive-color="#bfbfbf"
      >
        <!-- @change="onClickTable"
        swipeable-->
        <van-tab
          v-for="(item, index) in listArr"
          :title="item.title"
          :name="item.type"
          :key="index"
        >
          <div>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text
                @load="onLoad"
                @refresh="onRefresh"
                loading-text="loading..."
              >
                <div
                  v-if="db_selectlist.length === 0"
                  style="justify-content: center; text-align: center"
                >
                  <!-- <img src="@/assets/img/web__wu.png" /> -->
                  <i class="icon-info-bg icon-web-wu"></i>
                  <div style="margin: 0.3rem 0 0.7rem; font-size: 0.4rem">
                    No related record found...
                  </div>
                  <div style="margin: 0 auto">
                    <a
                      href="javascript:void(0);"
                      rel="nofollow"
                      class="hx-btn"
                      @click="LINKURLT"
                      >CONTINUE SHOPPING &gt;&gt;</a
                    >
                  </div>
                </div>
                <van-cell
                  v-for="(item, index) in db_selectlist || []"
                  :key="index"
                  style=""
                  class="van-clearfix1 order-list-cons"
                >
                  <div slot="default" v-if="isOrder == false">
                    <OrderList
                      :item="item ? item : {}"
                      @change="orderOnload"
                      @editAddres="editAddres"
                    />
                  </div>
                  <div slot="default" v-if="isOrder == true">
                    <AfterSaleOrder :item="item ? item : {}" />
                  </div>
                  <!--v-if="isOrder == false"-->
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Pmodel :visible.sync="visible" :title="'Edit Address'">
      <template slot="content">
        <div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Name</label>
            <div
              :class="[
                'hx-input-block',
                isReq.firstname ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="firstname"
                placeholder
                autocomplete="off"
                class="hx-input"
                v-model="forms.shipment_firstname"
                @input="firstnameFn"
              />
              <i class="iconfont" v-show="!isReq.firstname"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.firstname"
              >Required field</em
            >
          </div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Last Name</label>
            <div
              :class="[
                'hx-input-block',
                isReq.lastname ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="lastname"
                placeholder
                autocomplete="off"
                class="hx-input"
                v-model="forms.shipment_lastname"
                @input="lastnameFn"
              />
              <i class="iconfont" v-show="!isReq.lastname"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.lastname"
              >Required field</em
            >
          </div>
          <div class="hx-form-group hx-must hx-focus">
            <label for class="hx-form-label">Phone</label>
            <div
              :class="[
                'hx-input-block',
                isReq.mobile ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="mobile"
                hx-rule-phone
                placeholder
                autocomplete="off"
                data-isfocus="true"
                hx_form_focus="phone"
                class="hx-input"
                v-model="forms.shipment_mobile"
                @input="mobileFn"
              />
              <i class="iconfont" v-show="!isReq.mobile"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.mobile"
              >Please enter the correct telephone number.</em
            >
            <!-- <span data-isFocus="true" class="hx-point-out">If there is a problem with your order, we will
          conta-ct you by phone!</span>-->
          </div>
          
          <Userselect
            :pr="'Country'"
            :msg="'Country'"
            :formdata="country_list || []"
            :value.sync="forms.shipment_country_id"
            @changes="countryChanges"
          >
            <em
              class="hx-form-tips"
              style="display: inline"
              slot="tip"
              v-show="!isReq.shipment_country_id"
              >Required field</em
            >
          </Userselect>
          <Userselect
            :pr="'State'"
            :msg="'State'"
            :formdata="addres_selectlist || []"
            :value.sync="forms.shipment_zone_id"
            @changes="zoneidChanges"
          >
            <em
              class="hx-form-tips"
              style="display: inline"
              slot="tip"
              v-show="!isReq.shipment_zone_id"
              >Required field</em
            >
          </Userselect>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">City</label>
            <div
              :class="[
                'hx-input-block',
                isReq.city ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="city"
                placeholder
                autocomplete="off"
                class="hx-input"
                v-model="forms.shipment_city"
                @input="cityFn"
              />
              <i class="iconfont" v-show="!isReq.city"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.city"
              >Required field</em
            >
          </div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Address</label>
            <div
              :class="[
                'hx-input-block',
                isReq.address_1 ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="address_1"
                placeholder
                autocomplete="off"
                class="hx-input"
                v-model="forms.shipment_address_1"
                @input="addressFn"
              />
              <i class="iconfont" v-show="!isReq.address_1"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.address_1"
              >Required field</em
            >
          </div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Zip Code</label>
            <div
              :class="[
                'hx-input-block',
                isReq.shipment_postcode ? 'result-success' : 'result-error',
              ]"
            >
              <input
                type="text"
                name="postcode"
                placeholder
                autocomplete="off"
                class="hx-input"
                v-model="forms.shipment_postcode"
                @input="zone_idFn"
              />
              <i class="iconfont" v-show="!isReq.shipment_postcode"></i>
            </div>
            <em
              class="hx-form-tips"
              style="display: inline"
              v-show="!isReq.shipment_postcode"
              >Please enter the correct postcode.</em
            >
          </div>
        </div>
      </template>
      <template slot="footer">
        <van-button
          type="primary"
          :loading="insendbtn"
          class="p-btn-submint"
          @click="onSubmit"
          >Submit</van-button
        >
      </template>
    </Pmodel>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import { sendParamInUrl } from "@/util/tools";
import msgTip from "@/lang";
import OrderList from "./Components/OrderList";
import AfterSaleOrder from "./Components/AfterSaleOrder";
import Userselect from "@/components/Userselect.vue";
export default {
  watch: {
    list: function () {
      if (this.list) {
        this.isFalse = false;
      }
    },
  },
  data() {
    return {
      visible: false,
      isFalse: true,
      msgTip: msgTip.CENTER,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      db_selectlist: [],
      addres_selectlist: [],
      country_list: [],
      insendbtn: false,
      isOrder: false, //是否售后订单
      listArr: [
        // 订单状态 [processing:处理中,unpaid:未支付,paid:已支付,partial:部分支付,shipped:运输中,canceled:已取消,completed:已完成refunded,退款,partially_refunded:部分退款]
        {
          id: "11",
          type: "",
          name: "",
          title: "All orders",
        },
        {
          id: "111",
          type: "unpaid",
          name: "unpaid",
          title: "Pending Payment",
        },
        {
          id: "12411", //unpaid // shipped //paid //completed //canceled //after_sale_order
          type: "paid",
          name: "paid",
          title: "To Be Deliveried",
        },
        {
          id: "12131",
          type: "shipped",
          name: "shipped",
          title: "Pending Receipt",
        },

        {
          id: "12171",
          type: "completed",
          name: "completed",
          title: "Completed",
        },
        {
          id: "121731",
          type: "canceled",
          name: "canceled",
          title: "Cancelled",
        },
        {
          id: "124171",
          type: "after_sale_order",
          name: "after_sale_order",
          title: "After-Sale Order",
        },
      ],
      active: "",
      pages: 1,
      return_order_count: 0,
      forms: {
        invoice_no: "", //订单号
        shipment_firstname: "", //	string	收货人-名
        shipment_lastname: "", //: '',//	string	收货人-姓
        shipment_mobile: "", //	string	收货人-手机号码
        shipment_address_1: "", //	string	收货人-详细地址
        shipment_city: "", //	string	收货人-城市
        shipment_postcode: "", //	string	收货人-邮编
        shipment_country: "", //	string	收货人-国家
        shipment_country_id: "", //	int	收货人-国家id
        shipment_zone: "", //	string	收货人-地区
        shipment_zone_id: "", //	int	收货人-地区id
      },
      patter1: /^[A-Za-z0-9]+$/,
      patter2: /^[0-9()（）+-]+$/,
      isReq: {
        firstname: "1",
        lastname: "1",
        mobile: "1",
        address_1: "1",
        country_id: "1",
        zone_id: "1",
        city: "1",
        postcode: "1",
        default: "1",
        country: "1",
        zone: "1",
        shipment_country_id: "1",
        shipment_zone_id: "1",
        shipment_postcode: "1",
      },
    };
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
  methods: {
    editAddres(item) {
      this.visible = true;
      this.addreslist(item);
    },
    /**
     * @method
     * @desc: 地址请求列表
     * @author:  zhangyunjiang
     * @creatDate 2020-12-14 13:54:50
     * @param {*}  val
     */
    addreslist(item) {
      this.$Http.order.getOrderDetail(item).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.addres_selectlist = data;
          // invoice_no: '',//订单号
          // shipment_firstname: "321"
          // shipment_lastname: "321"
          // shipment_mobile: "333333"
          // shipment_address_1: "321"
          // shipment_city: "123"
          // shipment_postcode: "7777777777777777"
          // shipment_country: "Algeria"
          // shipment_country_id: 3
          // shipment_zone: "Adrar"
          // shipment_zone_id: 69
          // shipment_method: "DHL"
          // shipment_code: ""
          let itmes = data;
          this.forms["invoice_no"] = itmes.invoice_no;
          this.forms["shipment_firstname"] = itmes.shipment_zone_id;
          this.forms["shipment_lastname"] = itmes.shipment_lastname;
          this.forms["shipment_mobile"] = itmes.shipment_mobile;
          this.forms["shipment_address_1"] = itmes.shipment_address_1;
          this.forms["shipment_city"] = itmes.shipment_city;
          this.forms["shipment_postcode"] = itmes.shipment_postcode;
          this.forms["shipment_country"] = itmes.shipment_country;
          this.forms["shipment_country_id"] = itmes.shipment_country_id;
          this.forms["shipment_zone"] = itmes.shipment_zone;
          this.forms["shipment_method"] = itmes.shipment_method;
          this.forms["shipment_code"] = itmes.shipment_code;
          this.forms["shipment_zone_id"] = itmes.shipment_zone_id;
          this.checked = itmes.default == 0 ? false : true;
          if (itmes.shipment_country_id) {
            this.countryChanges(itmes.shipment_country_id, 1);
          }
        }
      });
      //获取国家数据
      this.$Http.common.getCountries().then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.country_list = data;
        }
      });
    },
    onSubmit() {
      // this.forms["default"] = this.checked === false ? 0 : 1;
      //  invoice_no: "", //订单号
      //   shipment_firstname: "", //	string	收货人-名
      //   shipment_lastname: "", //: '',//	string	收货人-姓
      //   shipment_mobile: "", //	string	收货人-手机号码
      //   shipment_address_1: "", //	string	收货人-详细地址
      //   shipment_city: "", //	string	收货人-城市
      //   shipment_postcode: "", //	string	收货人-邮编
      //   shipment_country: "", //	string	收货人-国家
      //   shipment_country_id: "", //	int	收货人-国家id
      //   shipment_zone: "", //	string	收货人-地区
      //   shipment_zone_id: "" //	int	收货人-地区id
      this.insendbtn = true;
      let {
        invoice_no,
        shipment_firstname,
        shipment_lastname,
        shipment_mobile,
        shipment_postcode,
        shipment_zone_id,
        shipment_city,
        shipment_address_1,
        shipment_country_id,
      } = this.forms;
      if (shipment_firstname === "") {
        this.isReq.firstname = "";
        return false;
      } else if (shipment_lastname === "") {
        this.isReq.lastname = "";
        return false;
      } else if (shipment_mobile === "") {
        this.isReq.mobile = "";
        return false;
      } else if (shipment_address_1 === "") {
        this.isReq.address_1 = "";
        return false;
      } else if (shipment_city === "") {
        this.isReq.city = "";
        return false;
      } else if (shipment_country_id === "") {
        this.isReq.shipment_country_id = "";
        return false;
      } else if (shipment_zone_id === "") {
        this.isReq.shipment_zone_id = "";
        return false;
      } else if (shipment_postcode === "") {
        this.isReq.shipment_postcode = "";
        return;
      }
      delete this.forms["shipment_code"];
      this.$Http.order
        .modifyShippingAddress(
          {
            ...this.forms,
          },
          true
        )
        .then((res) => {
          let { code, msg } = res;
          this.insendbtn = false;
          this.visible = false;
          this.$toast("ok");
        });
    },
    firstnameFn() {
      if (this.forms.shipment_firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
      }
    },
    lastnameFn() {
      if (this.forms.shipment_lastname == "") {
        this.isReq.lastname = "";
      } else {
        this.isReq.lastname = "1";
      }
    },
    addressFn() {
      if (this.forms.address_1 == "") {
        this.isReq.address_1 = "";
      } else {
        this.isReq.address_1 = "1";
      }
    },
    cityFn() {
      if (this.forms.city == "") {
        this.isReq.city = "";
      } else {
        this.isReq.city = "1";
      }
    },
    zoneidChanges() {
      if (this.forms.shipment_zone_id == "") {
        this.isReq.shipment_zone_id = "";
      } else {
        this.isReq.shipment_zone_id = "1";
      }
    },
    zone_idFn() {
      if (
        this.forms.shipment_postcode == "" ||
        !this.patter1.test(this.forms.shipment_postcode)
      ) {
        this.isReq.shipment_postcode = "";
      } else {
        this.isReq.shipment_postcode = "1";
      }
    },
    mobileFn() {
      if (
        this.forms.shipment_mobile == "" ||
        !this.patter2.test(this.forms.shipment_mobile) ||
        this.forms.shipment_mobile.length < 11 ||
        this.forms.shipment_mobile.length > 16
      ) {
        this.isReq.mobile = "";
      } else {
        this.isReq.mobile = "1";
      }
    },
    countryChanges(val, index) {
      this.$Http.common.getCountryZone({ country_id: val }).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          if (!index) {
            this.forms.shipment_zone_id = "";
          }
          this.addres_selectlist = data;
          // this.db_selectlist["zone_list"] = data;
        }
      });
    },
    onClickLeft() {
      this.$router.push("/");
    },
    LINKURLT() {
      sendParamInUrl({ page: "index" });
    },
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },
    orderOnload() {
      let _self = this;
      _self.db_selelctlist = [];
      this.refreshing = true;
      this.pages = 1;
      _self.onLoad({ order_status: this.active, page: 1 });
    },
    async onClickTable(name, title) {
      this.pages = 1;
      this.active = name;
      if (name === "after_sale_order") {
        this.isOrder = true;
        this.onLoadOder();
      } else {
        this.isOrder = false;
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        this.db_selectlist = [];
        this.refreshing = false;

        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;

        this.onLoad({ order_status: this.active });
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.pages = 1;
      // 重新加载数据
      this.db_selectlist = [];
      this.refreshing = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      if (!this.isOrder) {
        this.onLoad({ order_status: this.active });
      } else {
        this.onLoadOder();
      }
    },
    onLoadOder(opts) {
      if (this.refreshing) {
        this.db_selectlist = [];
        this.refreshing = false;
      }

      this.db_selectlist = [];
      this.pages = 1;

      this.$Http.order
        .getOrderReturns({
          page: this.pages++,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            setTimeout(() => {
              data.data.forEach((item) => {
                this.db_selectlist.push(item);
              });
              this.loading = false;
              this.return_order_count = data.total;
              if (this.db_selectlist.length >= this.return_order_count) {
                this.finished = true;
              }
            }, 200);
          } else {
            this.loading = false;

            this.finished = true;
          }
        });
    },
    onLoad(opts) {
      // opts['order_status'] = order_status
      if (this.refreshing) {
        this.db_selectlist = [];

        this.refreshing = false;
      }
      // if (opts) {
      if (this.isOrder) {
        this.$Http.order
          .getOrderReturns({
            page: this.pages++,
          })
          .then((res) => {
            let { code, data } = res;
            if (code == 200) {
              setTimeout(() => {
                data.data.forEach((item) => {
                  this.db_selectlist.push(item);
                });
                this.loading = false;
                this.return_order_count = data.total;
                if (this.db_selectlist.length >= this.return_order_count) {
                  this.finished = true;
                }
              }, 200);
            } else {
              this.loading = false;

              this.finished = true;
            }
          });

        return;
      }

      this.$Http.order
        .getOrders({
          page: this.pages++,
          order_status: this.active,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            setTimeout(() => {
              data.data.forEach((item) => {
                this.db_selectlist.push(item);
              });
              this.return_order_count = data.total;
              this.loading = false;
              if (this.db_selectlist.length >= this.return_order_count) {
                this.finished = true;
              }
            }, 200);
          } else {
            this.loading = false;

            this.finished = true;
          }
        });
    },
  },
  async created() {
    // active

    if (this.$route.query) {
      let names = this.$route.query.name;
      this.active = names;
      // this.onLoad({ order_status: names });
      if (names == "after_sale_order") {
        this.isOrder = true;
        this.onLoadOder();
      } else {
        this.isOrder = false;
      }
    }
  },
  components: {
    HeaderTab,
    OrderList,
    AfterSaleOrder,
    Userselect,
  },
};
</script>

<style lang="scss" scoped>
.user-iorder {
  background: #fff;
  .van-clearfix1 {
    // box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border: solid 1px #f5f5f5;
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
    .user-allorder
      .user-allorder-con
      .user-order-cn-right
      .order-cn-right-title {
      display: block;
      font-size: 0.32rem;
      color: #252525;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user-allorder
      .user-allorder-con
      .user-order-cn-right
      .order-cn-right-type {
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
}
</style>
