<template>
  <div>
    <HeaderTab />
    <div class="payment_step_two">
      <div class="usr-char-cns">
        <div class="detail-message-main">
          <div class="user-addchar-cns clearfix p-cn">
            <div v-if="loginshow">
              <div class="p-pay-bg">
                <p class="user-addchar-title">Contact email</p>
                <div class="hx-form-group group-flex">
                  <div class="hx-input-block" style="width: 100%">
                    <input
                      class="hx-input"
                      type="text"
                      name="email"
                      id="email"
                      :value="
                        db_selectlist.customer
                          ? db_selectlist.customer.email
                          : ''
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="p-pay-bg">
                <div class="p-bg-addr">
                  <span>Shipping Address</span>
                  <i class="iconfont pers-icon-test" @click="edit_address(address_item.id)"
                      v-if="address_item"></i>
                </div>
                <div class="p-bg-addr-con">
                  <div class="icon">
                    <i class="iconfont pers-ico_site"   
                    
                    ></i>
                  </div>
                  <div class="info">
                    <div class="title">
                      <b>
                      {{ address_item.firstname ? address_item.firstname : "" }}
                        {{ address_item.lastname ? address_item.lastname : "" }}
                      </b>
                      <span class="addre-msg-con">
                        {{
                          address_item.address_1 ? address_item.address_1 : ""
                        }}, {{ address_item.city ? address_item.city : "" }},
                        {{
                          address_item.zone_name ? address_item.zone_name : ""
                        }},
                        {{ address_item.postcode ? address_item.postcode : "" }}
                      </span>
                    </div>
                    <div class="model">
                      <span>
                      {{
                        address_item.mobile
                          ? address_item.mobile
                          : "" | firstmobile
                      }}
                      </span>
                      <a
                    class="modify"
                    @click="
                      modifyFn({
                        id: db_selectlist.default_address
                          ? db_selectlist.default_address.id
                          : '',
                      })
                    "
                    >MODIFY</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!loginshow"  class="loginshow-false">
              <p class="user-addchar-title">
                Contact email
                <span> Already have an account? 
                <a href="/"> Sign in</a>
                </span>
              </p>

              <div class="hx-form-group group-flex hx-van-radio1">
                <div class="hx-input-block" style="width: 100%">
                  <input
                    class="hx-input"
                    type="text"
                    v-model="loginparam.email"
                  />
                </div>
                <van-checkbox v-model="loginparam.newsletter"
                  ><span class="checkboxtxt"
                    >Keep me up to date on news and exclusive offers ?</span
                  ></van-checkbox
                >
              </div>

              <p class="user-addchar-title">Choose Your Service</p>
              <div class="managers-main">
                <span
                  :class="[item.id == loginparam.manager_id ? 'ative' : '']"
                  v-for="(item, index) in AllManagers"
                  :key="index"
                  @click="manangerschange(item.id)"
                >
                  {{ item.name }}
                </span>
              </div>
              <p class="user-addchar-title">Shipping Address</p>
              <Addressform v-model="loginparam" :check="true" ref="addessforom" :isSuccess="true" @success="successFn">
              </Addressform>
            </div>
            <div class="user-info-addr-typeb p-pay-bg" >
              <p class="user-addchar-title">Choose Your Shipping Options</p>
              <van-swipe
                class="my-swipe"
                :show-indicators="false"
                :width="200"
                indicator-color="white"
              >
                <van-swipe-item
                  v-for="(item, index) in shipping_list"
                  :key="index"
                >
                  <li
                    :class="[
                      'm-shipments',
                      default_shipping_id == item.id ? 'ative' : '',
                    ]"
                    @click="shipment_change(item, index)"
                    :data-name="item.geozone.name"
                  >
                    <i class="pers-chenggong iconfont"></i>
                    <img
                      v-lazy="
                        '/cart/m/assets/img/' + item.geozone.img_name + '.png'
                      "
                    />
                    <span>{{ item.geozone.remark }}- ({{ item.price }} )</span>
                  </li>
                </van-swipe-item>
              </van-swipe>
            </div>

            <div class="user-info-addr-typeb  p-pay-bg pay-typeb-1">
              <p class="user-addchar-title">Payment Method</p>
              <van-swipe
                class="my-swipe1"
                :show-indicators="false"
                :width="200"
                indicator-color="white"
              >
                <van-swipe-item
                  v-for="(item, index) in db_selectlist.payment_list"
                  :key="index"
                >
                  <li
                    :class="['m-shipments', item.active ? 'ative' : '']"
                    @click="paymentActive(item, index)"
                    :data-payment_method="item.name"
                  >
                    <i class="pers-chenggong iconfont"></i>
                    <div class="icon-img-tu">
                      <i
                        class="icon-info-bg icon-paypal"
                        v-if="item.name === 'PayPal'"
                        :alt="item.name"
                      ></i>
                      <i
                        class="icon-info-bg icon-stripe"
                        v-if="item.name === 'Stripe'"
                        :alt="item.name"
                      ></i>
                      <i
                        class="icon-info-bg icon-westernunion"
                        v-if="item.name === 'Western Union'"
                        :alt="item.name"
                      ></i>
                      <i
                        class="icon-info-bg icon-banktransfer"
                        :alt="item.name"
                        v-if="item.name === 'Bank Transfer'"
                      ></i>
                      <i
                        class="icon-info-bg icon-Oceanpayment"
                        :alt="item.name"
                        v-if="item.name === 'Oceanpayment'"
                      ></i>
                      <i
                        class="icon-info-bg icon-paymentmoneygram"
                        :alt="item.name"
                        v-if="item.name === 'Money Gram'"
                      ></i>
                    </div>
                  </li>
                </van-swipe-item>
              </van-swipe>
            </div>
            <!-- <p class="user-char-click">Click "Save and Continue" to make a MasterCard payment</p> -->
          </div>
        </div>

        <div class="user-addchar-cns clearfix">
          <div class="user-info-cn">
            <div class="user-info-cns" style="width: 92%">
              <div class="user-allorder-lis">
                <div class="user-allorder user-allorder-info">
                  <div class="user-allorder-head">
                    <p class="user-addchar-title">Order Summary</p>
                    <!-- <b class="payment"></b> -->
                  </div>
                  <van-collapse v-model="activeNames" v-if="listdata.order_products">
                    <van-collapse-item
                      :title="`${listdata.order_products.length} Items`"
                      name="1"
                    >
                      <div
                        class="user-allorder-con clearfix"
                        v-for="(item, index) in listdata
                          ? listdata.order_products
                          : []"
                        :key="index"
                      >
                        <div class="user-order-cn-imgs" @click="LINKURL(item)">
                          <img v-lazy="item.img_m" :alt="item.name" />
                        </div>
                        <div class="user-order-cn-right clearfix">
                          <a
                            class="order-cn-right-title"
                            href="javascript:void(0);"
                            @click="LINKURL(item)"
                            >{{ item.name ? item.name : "" }}</a
                          >

                          <div class="order-cn-right-type">
                            <div class="order-txt">
                              <p>
                                Size:<span>{{ item.size }}</span>
                              </p>
                              <p>
                                Color:<span>{{ item.color }}</span>
                              </p>
                              <p>
                                QTY:<span>{{ item.quantity }}</span>
                              </p>
                            </div>
                            <div class="right-type-lis">
                              <p class="right-type-lis-price">
                                <span>
                                  $
                                  <em id="_price">{{
                                    (item.price * item.quantity) | numFilter
                                  }}</em>
                                </span>
                                <span
                                  style="
                                    text-decoration: line-through;
                                    color: #d1d1d1;
                                  "
                                >
                                  $
                                  <em id="show_price">{{
                                    (item.show_price * item.quantity)
                                      | numFilter
                                  }}</em>
                                </span>
                              </p>
                              <span class="right-type-lis-type"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </van-collapse-item>
                  </van-collapse>

                  <div class="use-allorder-mos">
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Product Price:</span>
                      <span class="info-price" id="product_price"
                        >${{
                          product_price_total
                            ? product_price_total
                            : 0 | numFilter
                        }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Discount:</span>
                      <span class="info-price" id="discounted_price"
                        >-${{ discount_ ? discount_ : 0 | numFilter }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Coupon Discount:</span>
                      <span class="info-price" id="coupon_discount"
                        >-${{
                          coupon_discount ? coupon_discount : 0 | numFilter
                        }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Promotion Discount:</span>
                      <span class="info-price" id="promotion_discount"
                        >-${{
                          promotion_discount
                            ? promotion_discount
                            : 0 | numFilter
                        }}</span
                      >
                    </div>
                    <div
                      class="user-type-moneu-info clearfix"
                      v-if="amount_adjustment != 0"
                    >
                      <span class="info-msg">Amount adjustment:</span>
                      <span
                        class="info-price"
                        id="promotion_discount"
                        v-if="amount_adjustment < 0"
                        >-${{ amount_adjustment_positive | numFilter }}</span
                      >
                      <span
                        class="info-price"
                        id="promotion_discount"
                        v-if="amount_adjustment > 0"
                        >${{ amount_adjustment_positive | numFilter }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Delivery:</span>
                      <span class="info-price" id="shipping_fee"
                        >${{ delivery ? delivery : 0 | numFilter }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Payment Fee:</span>
                      <span class="info-price" id="payment_fee"
                        >${{ payment_fee ? payment_fee : 0 | numFilter }}</span
                      >
                    </div>
                    <div class="user-type-moneu-info clearfix">
                      <span class="info-msg">Weight:</span>
                      <span class="info-price" id="all_weight"
                        >{{
                          weight_total ? weight_total : 0 | numFilter
                        }}kg</span
                      >
                    </div>

                    <div class="user-order-total-cn">
                      <div class="user-type-moneu-info clearfix">
                        <span class="info-msg">Total number of products:</span>
                        <span
                          class="info-price"
                          id="all_num"
                          style="font-weight: 700"
                          >{{ total_num ? total_num : 0 }}</span
                        >
                      </div>
                      <div class="user-type-moneu-info clearfix">
                        <span class="info-msg"
                          >Total Price(Actual Payment):</span
                        >
                        <span
                          class="info-price"
                          id="total_after_offer"
                          style="font-weight: 700"
                          >${{
                            total_price ? total_price : 0 | numFilter
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-char-remarks">
          <p class="user-addchar-title">Remarks</p>

          <div
            class="demoEdit user-char-edit"
            contenteditable="true"
            id="note"
            ref="remarks"
          >
            {{ remarks }}
          </div>
          <input type="hidden" :datas="remarks" />
        </div>
      </div>
    </div>
    <div class="user-navbtn" style="align-items: center">
      <div
        class="btn_char_user t-imgcenter"
        id="other-button-container"
        v-show="
          (db_selectlist.default_payment
            ? db_selectlist.default_payment.payment_key == 'western_union'
            : false) ||
          (db_selectlist.default_payment
            ? db_selectlist.default_payment.payment_key == 'bank_transfer'
            : false) ||
          (db_selectlist.default_payment
            ? db_selectlist.default_payment.payment_key == 'oceanpayment'
            : '')
        "
      >
        <a
          href="javascript:void(0);"
          @click="confirm_order(db_selectlist.default_payment.payment_key)"
          class="btn_char_user"
          data-type-id="4"
          style="margin: 0; width: 100%"
        >
          PAY WITH CARD
          <i class="char-settlement-icon iconfont iconLQYxiangyou"></i>
        </a>
      </div>
      <div
        class="btn_char_user t-imgcenter"
        id="paypal-button-container"
        v-show="
          db_selectlist.default_payment
            ? db_selectlist.default_payment.payment_key == 'paypal'
            : false
        "
        style="height: 33px; display: flex; align-items: center"
      >
        <a
          href="javascript:void(0);"
          id="stripe-button"
          class="btn_char_user"
          style="
            margin: 0;
            display: block;
            width: 100%;
            text-align: center;
            height: 100%;
          "
          @click="confirm_order()"
          >Paypal</a
        >
      </div>
      <div
        class="btn_char_user t-imgcenter"
        id="stripe-button-container"
        v-show="
          db_selectlist.default_payment
            ? db_selectlist.default_payment.payment_key == 'stripe'
            : false
        "
      >
        <a
          href="javascript:void(0);"
          id="stripe-button"
          class="btn_char_user"
          style="
            margin: 0;
            display: block;
            width: 100%;
            text-align: center;
            height: 100%;
          "
          @click="confirm_order()"
          >Pay with Car</a
        >
      </div>
    </div>
    <!-- 弹窗提示 -->
    <Poverlay :show.sync="show">
      <template name="default">
        <div>
          <HeaderTab :isFalse="true" @change="HeaderFn()" />
          <div @click.stop>
            <Useraddressbook
              :formdata="address_list"
              :listId.sync="listId"
              @changes="address_listdeflut"
              @changedel="address_listdefluts1"
              @onCallbak="addShowFn"
            ></Useraddressbook>
          </div>
          <div class="formlogins-btn">
            <van-button
              type="primary"
              block
              native-type="submit"
              color="#252525"
              class="user-logins-btn"
              @click="onAdd"
            >
              ADD NEW ADDRESS</van-button
            >
          </div>
        </div>
      </template>
    </Poverlay>
    <!-- CANCEL -->
    <van-dialog
      v-model="visible"
      @confirm="Cancel1"
      show-cancel-button
      class="confirms-btns"
      @cancel="CouponOk"
      confirmButtonText="CANCEL"
      cancelButtonText=" CONFIRM"
    >
      <p style="font-size: 0.32rem; padding: 14px">
        If the Coupon Discount is used, the Promotion Discount will be invalid.
        Are you still use the Coupon?
      </p>
    </van-dialog>
    <van-dialog
      v-model="visible2"
      @confirm="Cancel2"
      show-cancel-button
      class="confirms-btns"
      @cancel="PromotionOk"
      confirmButtonText="CANCEL"
      cancelButtonText=" CONFIRM"
    >
      <p style="font-size: 0.32rem; padding: 14px">
        If the Promotion Discount is used, the Coupon will be invalid. Are you
        still use the Promotion Discount?
      </p>
    </van-dialog>
    <form
      action="https://secure.oceanpayment.com/gateway/service/test"
      method="post"
      id="oceanpaymentSubmit"
    >
      <input
        type="hidden"
        :name="index"
        :value="item"
        v-for="(item, index) in oceanpayment_param"
        :key="index"
      />
    </form>
    <Pmodel :visible.sync="visible5" :title="''">
      <template slot="content">
        <i class="iconfont pers-cuo1 curson" @click="visible5 = !visible5"></i>
        <div v-if="visible5" class="fails-main">
          <img src="../../assets/img/errer.png" />
          <div class="error-con-font">
            <p><span>Payment status： </span>{{ listdata.order_status }}</p>
            <p><span>Reason：</span>{{ fail_msg }}</p>
            <p><span>Order Amount：</span> {{ listdata.total_price }}</p>
            <p><span>Order NO：</span> {{ listdata.invoice_no }}</p>
          </div>
          <p class="error-con-title">Please go to my order to pay</p>
          <a @click="toOrder">View my order</a>
          <!-- /* @desc: 登录跳转商品详情 未登录 几秒后消失 visible5; @author: zhangyunjiang;  @editDate: 2020-12-23 18:16:27 */ -->
        </div>
      </template>
    </Pmodel>
    <Pmodel :visible.sync="visible3" :title="'Edit Address'">
      <template slot="content">
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
              v-model="forms.firstname"
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
              v-model="forms.lastname"
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
        
        <input
          type="hidden"
          :value="JSON.stringify(addres_selectlist.country_list)"
        />
        <Userselect
          :pr="'Country'"
          :msg="'Country'"
          :formdata="addres_selectlist.country_list || []"
          :value.sync="forms.country_id"
          @changes="countryChanges"
        >
          <em
            class="hx-form-tips"
            style="display: inline"
            slot="tip"
            v-show="!isReq.country_id"
            >Required field</em
          >
        </Userselect>
        <Userselect
          :formdata="addres_selectlist.zone_list || []"
          :value.sync="forms.zone_id"
          :pr="'State'"
          :msg="'State'"
          @changes="zoneidChanges"
        >
          <em
            class="hx-form-tips"
            style="display: inline"
            slot="tip"
            v-show="!isReq.zone_id"
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
              v-model="forms.city"
              @input="cityFn"
            />
            <i class="iconfont" v-show="!isReq.city"></i>
          </div>
          <em class="hx-form-tips" style="display: inline" v-show="!isReq.city"
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
              v-model="forms.address_1"
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
              isReq.postcode ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="postcode"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.postcode"
              @input="postcodeFn"
            />
            <i class="iconfont" v-show="!isReq.postcode"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.postcode"
            >Please enter the correct postcode.</em
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
              v-model="forms.mobile"
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
        <div class="hx-form-group checkbox-group">
          <div class="hx-input-block" id="default_checked">
            <div
              class="hx-form-checkbox"
              hx-data-checkname="default"
              @click="checkboxfn"
            >
              <span :class="['hx-checkbox', checked ? 'checked' : '']"></span>
              <em> Save new address to address book </em>
            </div>
            <input
              type="checkbox"
              name="default"
              title="Select as billing address."
              :checked="checked ? 'checked' : ''"
            />
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
    <Insetadd :visible.sync="visible4" @succes="onSubmit4" />
  </div>
</template>

<script>
import PlayType from "./PlayType";
import StripeCheckoutsApl from "./StripeCheckoutsApl";
import Useraddressbook from "@/components/Useraddressbook.vue";
import Poverlay from "@/common/Poverlay";
import HeaderTab from "@/components/HeaderTab";
import Addressform from "../Address/Addressform";
import Insetadd from "../Address/Insetadd";
import { Toast } from "vant";
import {
  sendParamInUrl,
  matchImageName,
  sha256Encryption,
  getCartHost,
} from "@/util/tools";
import Userselect from "@/components/Userselect.vue";
export default {
  name: "Paymentsteptwo",
  data() {
    return {
      activeNames: ["1"],
      checked: false,
      fail_msg: "payment failure",
      visible5: false,
      loginshow: localStorage.getItem("cart.m.userInfo"),
      iscodemsg: "This coupon does not exist or is invalid",
      isCodes: "1",
      insendbtn: false,
      issuccess: false,
      visible: false,
      visible3: false,
      visible2: false,
      visible4: false,
      listId: "",
      show: false,
      discount_thimg: require("@/assets/img/discount_th.png"),
      radio_imgs: require("@/assets/img/char-type--radio-active.png"),
      radio_img: require("@/assets/img/char-type-radio.png"),
      db_selectlist: [],
      remarks: "",
      payment_method: "",
      shipping_method_id: {},
      oceanpayment_param: {},
      payment_methods: {},
      marketplace: "",
      publishable_key: "",
      client_id: "",
      pro_discount: "",
      pro_discount_: "",
      enable: 0,
      selected: 0,
      listdata: [], //列表数据
      total_num: 0, //总数量
      product_price_total: 0, //商品总原价
      discount_: 0, //discount数据
      coupon_discount: 0, //coupon折扣数值
      coupon_code: this.$route.query.coupon_code || "", //coupon验证码值
      coupon_help: "", //coupon提示
      code_stage: 1, //coupon输入验证码是否正确 1 0
      coupon_type: "", //coupon类型
      promotion_discount: 0, //promotion折扣数值
      promotion_preferential: 0,
      promotion_amount: 0,
      coupon_preferential: 0,
      coupon_amount: 0,
      amount_adjustment_positive: 0,
      amount_adjustment: 0,
      weight_total: 0, //总重量
      total_price: 0, //实际支付总价格
      promotion_list: [], //promotion数据
      activity_id: "", //全场活动id
      coupon_list: [], //coupon数据
      vieweddata: [], //浏览商品数据
      likedata: [], //猜你喜欢数据
      off_shelves_to_wish: 0, //下架商品转移到心愿单
      shipping_list: [], //物流列表数据
      default_shipping_id: 0, //默认物流方式
      payment_list: [], //支付方式列表数据
      delivery: 0, //运费
      payment_fee: 0, //付款费
      payment_fee_cost: 0, //手续费百分比
      address_list: [], //地址列表数据
      address_item: "", //显示地址数据
      difference_name: 0, //优惠卷差值
      difference_prive: 0, //优惠卷差值价格
      address_id: "",
      param: {
        invoice_no: "",
        address_id: "",
        shipping_method_id: "",
        coupon_code: "",
        payment_method: "",
        remarks: "",
        email: "",
      },
      loginparam: {
        email: "",
        shipment_zone_id: "",
        shipment_firstname: "",
        shipment_lastname: "",
        shipment_mobile: "",
        shipment_address_1: "",
        shipment_address_2: "",
        shipment_city: "",
        shipment_postcode: "",
        newsletter: "",
        manager_id: "",
      },

      isParms: {
        address_id: "",
      },
      pay_item_stage: 1,
      addrestage: -1, //地址默认选中
      test: [
        {
          img: require("@/assets/img/time-axis3.png"),
          name: "DELIVERY",
        },
        {
          img: require("@/assets/img/time-axis8.png"),
          name: "PURCHASE SUCCESS",
        },
      ],
      forms: {
        firstname: "",
        lastname: "",
        mobile: "",
        address_1: "",
        country_id: "",
        zone_id: "",
        city: "",
        postcode: "",
        default: "",
        country: "",
        zone: "",
      },
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
      },
      addres_selectlist: {},
      // xyx
      addre_change_data: "", //选中地址临时数据
      adder_show: false, //地址弹窗
      coupon: 0, //优惠卷金额
      AllManagers: [],
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
    //去订单页
    toOrder(){
      if(!this.loginshow){
         this.visible5 = !this.visible5;
      } else {
        let to_order={
          invoice_no:this.invoice_no,
        }
        if(!this.signType){
            to_order.session_id=this.session_id
        }
        this.$router.push({
          path: "/order/order_detail",
          query: {
            ...to_order
          },
        });
      }
      
    },
    successFn(val){
      this.shippingAsync(val)
    },
    // 获得物流接口
    shippingAsync(val) {
      let params={
        weight_total: this.weight_total,
        shipment_country_id:val,
      }
      if(localStorage.getItem('cart.m.session_id')){
          let session_id = localStorage.getItem('cart.m.session_id')
          params['session_id'] = session_id;
      }
      this.$Http.payment.shippingAsync({...params}).then(res => {
        let { data, code , msg } = res;
        if (code == 200) {
          this.shipping_list=data;
          this.param.shipping_method_id=data[0].geozone.id
        }
      });
    },
    manangerschange(id) {
      this.loginparam.manager_id = id;
    },
    HeaderFn() {
      this.css("#app", "overflow", "hiden");
    },
    LINKURL(item) {
      sendParamInUrl({
        url: item.product_url,
      });
    },

    Cancel1() {
      this.visible = false;
      this.coupon_code = "";
      this.coupon_help = "";
      this.code_stage = 1;
      this.isCodes = "1";
      this.issuccess = false;
    },
    Cancel2() {
      this.visible2 = false;
      this.isCodes = "1";
      this.issuccess = false;
      this.promotion_list.map((item) => {
        item.selected = 0;
      });
    },
    code_applyfn() {
      // api/cart/check_coupon_availability_by_cart
      this.$Http.cart
        .checkCouponAvailabilityByCart({
          coupon_code: this.coupon_code,
        })
        .then((res) => {
          let { code } = res;
          if (code == 200) {
            let { code, msg, data } = options;
            if (code == 200) {
              this.isCodes = "1";
              this.issuccess = true;
              this.iscodemsg = data.name;
              this.coupon_codes = this.coupon_code;
            }
          } else {
            this.isCodes = "";
          }
        });
    },
    onAdd() {
      // Toast("新增地址");
      // this.$router.push({path:"/cart/add_address"});

      // this.$router.push("/cart/add_address");
      this.visible4 = !this.visible4;
    },

    edit_address(id) {
      this.show = !this.show;
      this.listId = id;
      this.css("#app", "overflow", "hiden");
    },
    addShowFn(v) {
      this.show = v;
      this.apiLoading();
    },
    address_listdefluts1(index) {
      this.address_list.splice(index, 1);
      this.address_list = this.address_list;
    },
    address_listdeflut(parse) {
      let { item } = parse;
      this.isParms["address_id"] = [];
      this.show = false;
      this.css("#app", "overflow", "auto");
      this.address_id = item.id;
      let obj1 = this.isDatas();
      obj1["address_id"] = item.id;
      this.address_item = JSON.parse(JSON.stringify(item));
      this.isParmsfn(obj1);
      if (this.oceanpayment_param) {
        this.oceanpayment_param["billing_firstName"] = parse.item.firstname;
        this.oceanpayment_param["billing_lastName"] = parse.item.lastname;
        this.oceanpayment_param["billing_country"] = parse.item.country_code_2;
        this.oceanpaymentSignValue();
      }
    },
    CouponOk() {
      this.clear_promotion_discount();
      this.get_coupon_discount();
      this.visible = false;
      this.get_total_price();
    },
    PromotionOk() {
      this.clear_coupon_discount();
      this.get_promotion_discount();
      this.visible2 = false;
      this.get_total_price();
      this.isCodes = "1";
      this.issuccess = false;
    },
    //获得实际支付费用
    get_total_price() {
      this.total_price =
        this.product_price_total -
        this.discount_ -
        this.coupon_discount -
        this.promotion_discount +
        this.delivery +
        this.amount_adjustment +
        this.payment_fee;
      if (this.oceanpayment_param) {
        this.oceanpayment_param["order_amount"] = this.total_price.toFixed(2);
        this.oceanpaymentSignValue();
      }
    },
    //获得优惠券码
    get_coupon_discount() {
      this.coupon_discount =
        this.coupon_amount != 0
          ? (this.product_price_total - this.discount_) *
            (100 - this.coupon_amount) *
            0.01
          : this.coupon_preferential;
      this.get_payment_fee();
    },
    //获得全场活动优惠
    get_promotion_discount() {
      this.promotion_discount =
        this.promotion_amount != 0
          ? Number(
              this.product_price_total - this.discount_ - this.coupon_discount
            ) *
            (100 - Number(this.promotion_amount)) *
            0.01
          : this.promotion_preferential;
      this.get_payment_fee();
    },
    //清除全场活动
    clear_promotion_discount() {
      this.promotion_preferential = 0;
      this.promotion_amount = 0;
      this.activity_id = 0;
      this.promotion_discount = 0;
      this.promotion_list.map((item) => {
        item.selected = 0;
      });
      this.get_total_price();
    },
    //清除优惠券
    clear_coupon_discount() {
      this.coupon_preferential = 0;
      this.coupon_amount = 0;
      this.coupon_code = "";
      this.coupon_discount = 0;
      this.coupon_type = "";
      this.coupon_help = "";
      this.code_stage = 1;
      this.get_total_price();
    },
    //优惠券类型
    coupon_type_() {
      if (this.coupon_code == "") {
        return true;
      }
      if (this.coupon_type != "R") {
        return false;
      }
      return true;
    },
    //选择全场活动
    promotion_pitchon(item) {
      this.promotion_amount = 0;
      this.promotion_preferential = 0;
      if (item.enable != 0) {
        if (item.selected == 0) {
          this.promotion_list.map((item) => {
            item.selected = 0;
          });
          item.selected = 1;
          this.activity_id = item.id;
          this.coupon_type = item.type;
          if (item.discount == 0) {
            this.promotion_preferential = Number(item.preferential);
          } else {
            this.promotion_amount = Number(item.discount);
          }
          if (!this.coupon_type_()) {
            this.visible2 = true;
          } else {
            this.get_promotion_discount();
          }
        } else {
          item.selected = 0;
          this.activity_id = 0;
          this.promotion_discount = 0;
        }
        this.get_total_price();
      }

      let obj = this.isDatas();
      this.isParmsfn(obj);
    },
    isDatas() {
      let remarksk = this.$refs["remarks"].innerHTML,
        remarks = remarksk,
        email = this.db_selectlist.customer.email,
        msg = "",
        invoice_no = this.db_selectlist.invoice_no,
        address_id = this.db_selectlist.default_address.id,
        shipping_method_id = this.param.shipping_method_id,
        payment_method = this.payment_method,
        activity_id = this.activity_id,
        coupon_code = this.coupon_code;
      let obj = {
        remarks,
        email,
        invoice_no,
        address_id,
        payment_method,
        shipping_method_id,
        key: this.payment_methods.publishable_key,
        image: this.payment_methods.marketplace,
        coupon_code: coupon_code,
        activity_id,
      };
      obj.coupon_code ? obj.coupon_code : delete obj.coupon_code;
      return obj;
    },
    isParmsfn(obj) {
      for (var key in obj) {
        this.isParms[key] = obj[key];
      }
      if(localStorage.getItem('cart.m.session_id')){
            let session_id = localStorage.getItem('cart.m.session_id')
            this.isParms['session_id'] = session_id;
        }
      this.$Http.payment
        .syncOrderTradingInfo({
          ...this.isParms,
        })
        .then((options) => {});
    },
    //判断是否有coupon
    coupon_code_get() {
      if (this.coupon_code != "") {
        this.code_apply();
      }
    },
    coupon_codeval() {
      this.isCodes = true;
      this.iscodemsg = "";
      this.issuccess = false;
    },
    //提交验证码
    code_apply(coupon_code) {
      if (this.coupon_code === "") {
        this.isCodes = false;
        this.iscodemsg = "Required field";
        return;
      }
      this.coupon_preferential = 0;

      this.coupon_amount = 0;
      if (coupon_code == "") {
        this.coupon_help = "This coupon does not exist or is invalid.";
        this.code_stage = 0;
        this.coupon_discount = 0;
        this.get_total_price();

        return;
      } else {
        this.$Http.cart
          .checkCouponAvailabilityByCart({
            coupon_code: this.coupon_code,
          })
          .then((res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              this.coupon_type = data.type;
              this.code_stage == 1;
              this.coupon_help = data.name;
              this.iscodemsg = data.name;
              this.issuccess = true;
              if (data.discount == 0) {
                this.coupon_preferential = Number(data.preferential);
              } else {
                this.coupon_amount = Number(data.discount);
              }
              if (!this.coupon_type_() && this.promotion_discount != 0) {
                this.visible = true;
              } else {
                this.promotion_discount = 0;
                this.get_coupon_discount();
                this.get_promotion_discount();
              }
              this.get_total_price();
            } else {
              this.code_stage = 1;
              this.coupon_help = msg;
              this.coupon_discount = 0;
              Toast(msg);
            }
            this.get_total_price();
          });
      }
    },
    //获得手续费
    get_payment_fee() {
      this.payment_fee =
        this.payment_fee_cost *
        Number(
          this.product_price_total -
            this.discount_ -
            this.coupon_discount -
            this.promotion_discount +
            this.delivery +
            this.amount_adjustment
        );
      this.get_total_price();
    },
    // 同步信息
    trading_info(item) {
        if(localStorage.getItem('cart.m.session_id')){
            let session_id = localStorage.getItem('cart.m.session_id')
            item['session_id'] = session_id;
        }
      this.$Http.payment.syncOrderTradingInfo(item).then((res) => {
        let { code } = res;
        if (code == 200) {
        } else {
          this.code_stage = 0;
        }
      });
    },
    payment_change_stage(index) {
      if (index == "paypal") {
        this.pay_item_stage = 2;
      } else if (index == "stripe") {
        this.pay_item_stage = 3;
      } else {
        this.pay_item_stage = 1;
      }
    },
    shipment_change(item, index) {
      this.default_shipping_id = item.id;
      this.delivery = Number(item.shipping_fee);
      this.param.shipping_method_id = item.geozone.id;
      this.trading_info({
        invoice_no: this.listdata.invoice_no,
        shipping_method_id: item.geozone.id,
      });
      this.get_payment_fee();
    },
    dom(dom) {
      return document.querySelector(dom);
    },
    css(o, key, value) {
      this.dom(o).style[key] = value;
    },
    paymentActive(item) {
      this.db_selectlist.payment_list.forEach((v) => {
        v.active = false;
      });
      item.active = true;
      let payment_method = item.v_keys_name;
      this.payment_method = item.v_keys_name;
      this.payment_methods = item;
      if (payment_method == "paypal") {
        setTimeout(() => {
          this.playType(payment_method);
        }, 2000);
        this.css("#paypal-button-container", "display", "block");
        this.css("#other-button-container", "display", "none");
        this.css("#stripe-button-container", "display", "none");
      } else if (payment_method == "stripe") {
        if (document.querySelector("#clint_id"))
          document.removeChild(document.querySelector("#clint_id"));
        this.css("#stripe-button-container", "display", "block");
        this.css("#other-button-container", "display", "none");
        this.css("#paypal-button-container", "display", "none");
      } else if (payment_method == "stripe") {
        this.css("#other-button-container", "display", "block");
        this.css("#paypal-button-container", "display", "none");
        this.css("#stripe-button-container", "display", "none");
      } else {
        this.css("#other-button-container", "display", "block");
        this.css("#paypal-button-container", "display", "none");
        this.css("#stripe-button-container", "display", "none");
      }
      this.payment_fee_cost = Number(item.cost) || 0;
      this.get_payment_fee();

      let obj1 = this.isDatas();
      this.isParmsfn(obj1);
    },
    /**
     * play支付
     */
    playType(payment_method) {
      // var remarks = this.remarks,
      //   email = this.db_selectlist.customer.email,
      //   msg = "",
      //   invoice_no = this.db_selectlist.invoice_no,
      //   shipping_method_id = this.param.shipping_method_id ?
      //   this.param.shipping_method_id :
      //   "",
      //   payment_method = payment_method,
      //   address_id = this.address_item.id,
      //   coupon_code = this.coupon_code,
      //   activity_id = this.activity_id;
      // if (invoice_no == "") {
      //   msg = "Order error!";
      // }
      // if (address_id <= 0) {
      //   msg = "Please select your Shipping address!";
      // }
      // if (shipping_method_id <= 0) {
      //   msg = "Please select your Shipment method!";
      // }
      // if (payment_method == "") {
      //   msg = "Please select your Payment method!";
      // }
      // if (email == "") {
      //   msg = "Please fill in the Contact email!";
      // }
      // if (msg != "") {
      //   Toast.fail(msg);
      //   return false;
      // }
      // let parms = {
      //   remarks,
      //   email,
      //   invoice_no,
      //   address_id,
      //   payment_method: "paypal",
      //   shipping_method_id,
      //   activity_id,
      //   coupon_code: coupon_code,
      // };
      // new PlayType("#paypal-button-container", {
      //   qs: parms
      // });
    },
    /**
     * 支付方式 western_union bank_transfer oceanpayment
     */
    confirm_order() {

      // address_1: "5464"
      // city: "546"
      // email: "18259412892@163.com"
      // firstname: "zyj56"
      // lastname: "lhaoty6"
      // manager_id: 1
      // mobile: "18259412892"
      // newsletter: ""
      // postcode: "546"
      var remarks = this.remarks,
        email = this.db_selectlist.customer&& this.db_selectlist.customer.email || this.loginparam.email|| '',
        msg = "",
        invoice_no = this.db_selectlist.invoice_no||'',
        address_id = this.db_selectlist.default_address.id||this.loginparam.address_1||'',
        shipping_method_id = this.param.shipping_method_id||this.loginparam.manager_id||'',
        payment_method = this.payment_method||'',
        activity_id = this.activity_id||'',
        coupon_code = this.coupon_code;
      var msg = "";
      if (invoice_no == "") {
        msg = "Order error!";
      }
      if (address_id <= 0) {
        msg = "Please select your Shipping address!";
      }
      if (shipping_method_id <= 0) {
        msg = "Please select your Shipment method!";
      }
      if (payment_method == "") {
        msg = "Please select your Payment method!";
      }
      if (email == "") {
        msg = "Please fill in the Contact email!";
      }
      if (msg != "") {
        Toast.fail(msg);
        return false;
      }
      // this.loginparam['address'] = address_id;
      // console.log(this.db_selectlist, 22222)
      // return
      if (this.loginshow) {
        this.loginparam = {};
      }
      
      // if (!this.loginshow && this.$refs.addessforom.submit()) {
      //   return;
      // }
      let obj = {
        remarks,
        email,
        invoice_no,
        address_id,
        payment_method,
        shipping_method_id,
        key: this.payment_methods.publishable_key || this.payment_methods.v_keys_name,
        image: this.payment_methods.marketplace,
        coupon_code: coupon_code,
        activity_id,
        ...this.loginparam,
      };
    if(!this.loginshow){
//       shipment_address_1: "add"
// shipment_city: "city"
// shipment_country_id: 244
// shipment_firstname: "last"
// shipment_lastname: "name"
// shipment_mobile: "18259412892"
// shipment_postcode: "55"
// shipment_zone_id: 4261
// shipping_method_id: 565
        obj = {
          remarks,
          email:this.loginparam.email,
          invoice_no,
          key: this.payment_methods.publishable_key || this.payment_methods.v_keys_name,
          image: this.payment_methods.marketplace,
          payment_method,
          shipment_address_1: this.loginparam.address_1 || '',
          shipment_city:this.loginparam.city || '',
          shipment_country_id:this.loginparam.country_id || '',
          shipment_lastname:this.loginparam.lastname || '',
          shipment_firstname:this.loginparam.firstname || '',
          shipment_mobile:this.loginparam.mobile || '',
          shipment_postcode:this.loginparam.postcode || '',
          shipping_method_id: shipping_method_id|| payment_method||'',
          shipping_method: payment_method||''
        };
        if(localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id') ){
            let session_id = localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id');
            obj['session_id'] = session_id;
        }
        if(localStorage.getItem('cart.m.access_token')){
            const access_token = localStorage.getItem('cart.m.access_token')
            // formData.append('access_token',access_token);
            obj['access_token'] = access_token
        }
      }
      obj.coupon_code ? obj.coupon_code : delete obj.coupon_code;
      // console.log(obj,'--obj')
      // return false;
      if (payment_method === "stripe") {
        new StripeCheckoutsApl({
          key: obj.key,
          image: obj.image,
          email: obj.email,
          invoice_no: obj.invoice_no,
          tokenfn: function (token, args) {
            this.$Http.payment
              .confirmOrder(
                {
                  ...obj,
                  ...this.loginparam,
                },
                true
              )
              .then((options) => {
                this.$router.push({
                  path: "/payment_success",
                  query: {
                    invoice_no,
                  },
                });
              });
          },
        });
      } else if (payment_method === "paypal") {
        this.$Http.payment
          .confirmOrder(
            {
              ...obj,
            },
            true
          )
          .then((res) => {
            const { data, code } = res;
            if (code == 200) {
              window.location.href = data.paypal
                ? data.paypal.approve_link
                : "";
            }
            // this.$router.push({
            //   path: "/payment_success",
            //   query: {
            //     invoice_no
            //   },
            // });
          });
        // new StripeCheckoutsApl({
        //   key: obj.key,
        //   image: obj.image,
        //   email: obj.email,
        //   invoice_no: obj.invoice_no,
        //   tokenfn: function (token, args) {
        //     this.$Http.payment
        //       .confirmOrder({
        //         ...obj
        //       }, true)
        //       .then((options) => {
        //         // this.$router.push({
        //         //   path: "/payment_success",
        //         //   query: {
        //         //     invoice_no
        //         //   },
        //         // });
        //       });
        //   },
        // });
      } else {
        delete obj.image;
        delete obj.key;
        this.$Http.payment
          .confirmOrder(
            {
              ...obj,
            },
            true
          )
          .then((res) => {
            let { code } = res;
            if (code == 200) {
              setTimeout(() => {
                this.$router.push({
                  path: "/payment_success",
                  query: {
                    invoice_no,
                  },
                });
              }, 300);
            } else {
              Toast.fail("Order created successfully, payment failed.");
            }
          });
      }
    },
    scriptCreate() {
      if (document.querySelector("#clint_id"))
        document.removeChild(document.querySelector("#clint_id"));
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "client_id";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=" +
        this.client_id +
        "&currency=USD&disable-funding=card";
      document.querySelector("head").appendChild(script);
    },
    createStripeCheckout() {
      if (!document.getElementById("stripe_checkout")) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "stripe_checkout";
        script.src = "https://checkout.stripe.com/checkout.js";
        document.querySelector("head").appendChild(script);
      }
    },
    oceanpaymentSignValue() {
      this.oceanpayment_param["signValue"] = sha256Encryption(
        this.oceanpayment_param["account"] +
          this.oceanpayment_param["terminal"] +
          this.oceanpayment_param["backUrl"] +
          this.oceanpayment_param["order_number"] +
          this.oceanpayment_param["order_currency"] +
          this.oceanpayment_param["order_amount"] +
          this.oceanpayment_param["billing_firstName"] +
          this.oceanpayment_param["billing_lastName"] +
          this.oceanpayment_param["billing_email"] +
          this.oceanpayment_secureCode
      );
    },
    modifyFn(item) {
      this.visible3 = !this.visible3;
      this.$Http.address.getAddressDetail(item).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.addres_selectlist = data;
          // id: 3193
          // firstname: "魏联铸"
          // lastname: "魏联铸"
          // mobile: "2222222222222"
          // address_1: "魏联铸"
          // country_id: 44
          // zone_id: 684
          // city: "123"
          // postcode: "123"
          // default: 0
          // country: "China"
          // zone: "Anhui"
          let itmes = data.address;
          this.forms["id"] = itmes.id;
          this.forms["firstname"] = itmes.firstname;
          this.forms["lastname"] = itmes.lastname;
          this.forms["mobile"] = itmes.mobile;
          this.forms["address_1"] = itmes.address_1;
          this.forms["zone_id"] = itmes.zone_id;
          this.forms["city"] = itmes.city;
          this.forms["country_id"] = itmes.country_id;
          this.forms["postcode"] = itmes.postcode;
          this.forms["default"] = itmes.default;
          this.forms["country"] = itmes.country;
          this.forms["zone"] = itmes.zone;
          this.checked = itmes.default == 0 ? false : true;
        }
      });
    },
    firstnameFn() {
      if (this.forms.firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
      }
    },
    postcodeFn() {
      if (
        this.forms.postcode == "" ||
        !this.patter1.test(this.forms.postcode)
      ) {
        this.isReq.postcode = "";
      } else {
        this.isReq.postcode = "1";
      }
    },
    lastnameFn() {
      if (this.forms.lastname == "") {
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
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    zone_idFn() {
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    mobileFn() {
      if (
        this.forms.mobile == "" ||
        !this.patter2.test(this.forms.mobile) ||
        this.forms.mobile.length < 11 ||
        this.forms.mobile.length > 16
      ) {
        this.isReq.mobile = "";
      } else {
        this.isReq.mobile = "1";
      }
    },
    checkboxfn() {
      this.checked = !this.checked;
    },
    countryChanges(val) {
      this.$Http.common
        .getCountryZone({
          country_id: val,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            this.forms.zone_id = "";
            // this.db_selectlist= data
            this.db_selectlist["zone_list"] = data;
          }
        });
    },
    onSubmit4() {
      this.visible4 = !this.visible4;
      this.apiLoading();
    },
    onSubmit() {
      this.forms["default"] = this.checked === false ? 0 : 1;
      let {
        firstname,
        lastname,
        mobile,
        address_1,
        country_id,
        city,
        postcode,
        zone_id,
      } = this.forms;
      if (firstname === "") {
        this.isReq.firstname = "";
        return false;
      } else if (lastname === "") {
        this.isReq.lastname = "";
        return false;
      } else if (country_id === "") {
        this.isReq.country_id = "";
        return false;
      } else if (zone_id === "") {
        this.isReq.zone_id = "";
        return false;
      } else if (city === "") {
        this.isReq.city = "";
        return false;
      }else if (address_1 === "") {
        this.isReq.address_1 = "";
        return false;
      }  else if (postcode === "") {
        this.isReq.postcode = "";
        return false;
      } else if (mobile === "") {
        this.isReq.mobile = "";
        return false;
      }
      this.insendbtn = true;
      delete this.forms["zone"];
      this.forms["address_id"] = this.forms.id;
      this.$Http.address
        .addressEdit(
          {
            ...this.forms,
          },
          true
        )
        .then((res) => {
          let { code } = res;
          this.insendbtn = false;
          this.visible3 = !this.visible3;
          this.apiLoading();
        });
    },
    apiLoading() {
      if (this.$route.query.invoice_no) {
        let params = {};
        let invoice_no = this.$route.query.invoice_no;
        if(localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id') ){
            let session_id = localStorage.getItem('cart.m.session_id') || localStorage.getItem('cart.m.session_id');
            params['session_id'] = session_id;
        }
        if(localStorage.getItem('cart.m.access_token')){
            const access_token = localStorage.getItem('cart.m.access_token')
            // formData.append('access_token',access_token);
            params['access_token'] = access_token
        }
        this.$Http.payment
          .getOrderPaymentDetail({
            invoice_no,
            ...params
          })
          .then((res) => {
            let { code, data } = res;
            if (code == 200) {
              let _discount = 0;
              this.promotion_list = [];
              this.db_selectlist = data;
              this.client_id = data.payment_list["paypal"].client_id;
              this.scriptCreate();
              let payment_list = [],
                payment_list_main = data.payment_list;
              let arr = [];
              for (var n in data.payment_list) {
                arr.push(n);
                payment_list.push(data.payment_list[n]);
              }
              payment_list.forEach((v, index) => {
                v["v_keys_name"] = arr[index];
                if (v.active) {
                  this.payment_method = v["v_keys_name"];
                  this.payment_methods = v;
                }
              });

              this.db_selectlist["payment_list"] = payment_list;
              if (data.shipping_list) {
                data.shipping_list.forEach((v) => {
                  if (v.active) {
                    this.shipping_method_id = v;
                  }
                });
              }

              if (data.order_total.discount) {
                this.amount_adjustment = Number(
                  data.order_total.discount.value
                );
                this.amount_adjustment_positive = Math.abs(
                  this.amount_adjustment
                );
              }
              this.listdata = data;
              if (data.shipping_list) {
                data.shipping_list.forEach((item) => {
                  item.geozone.img_name = matchImageName(item.geozone.name);
                  this.shipping_list.push(item);
                }); //物流方式列表
              }
              this.payment_list = data.payment_list; //支付方式列表
              for (let i in data.order_products) {
                if (
                  data.order_products[i].show_price >=
                  data.order_products[i].price
                ) {
                  _discount =
                    (Number(data.order_products[i].show_price) -
                      Number(data.order_products[i].price)) *
                    Number(data.order_products[i].quantity);
                }
                this.discount_ += _discount; //discount
              }
              this.total_num = data.total_number; //总数量
              this.product_price_total =
                Number(data.subtotal_price) + Number(this.discount_); ///商品总原价
              this.weight_total = Number(data.total_weight); //总重量
              if (data.default_shipping != "") {
                this.delivery = Number(data.default_shipping.shipping_fee); //默认送货费用
              }
              this.default_shipping_id = data.default_shipping.id; //默认物流方式
              this.payment_method = data.default_payment.payment_key; //默认付款方式
              this.payment_fee_cost = Number(data.default_payment.cost) || 0; //默认手续费百分比
              this.get_total_price(); //实际支付总价格
              this.coupon_code_get(); //优惠券码
              this.get_payment_fee(); //获得支付手续费

              this.address_item = data.default_address || ""; //默认地址数据
              this.address_list = data.address || []; //地址列表
              const { geozone = {} } = data.default_shipping;
              const { id = "" } = geozone;
              this.param.shipping_method_id = id; //data.default_shipping.geozone.id || '';
              this.param.payment_method = data.default_payment.payment_key;
              this.param.invoice_no = this.listdata.invoice_no; //用户订单
              this.param.email = data.customer && data.customer.email || ''; //用户邮箱
              this.param.address_id = data.default_address.id;
              this.param.coupon_code = this.$route.query.coupon_code
                ? this.$route.query.coupon_code
                : "";
              if (data.default_payment.payment_key == "paypal") {
                this.client_id = data.default_payment.client_id;
                this.scriptCreate();
                setTimeout(() => {
                  this.playType("paypal");
                }, 1500);
              } else if (data.default_payment.payment_key == "stripe") {
                this.marketplace = data.default_payment.marketplace;
                this.publishable_key = data.default_payment.publishable_key;
              } else {
                this.css("#other-button-container", "display", "block");
              }
              if (payment_list_main.oceanpayment) {
                let oceanpayment_data = payment_list_main.oceanpayment;
                this.oceanpayment_param["account"] = oceanpayment_data.account;
                this.oceanpayment_param["terminal"] =
                  oceanpayment_data.terminal;
                this.oceanpayment_param["backUrl"] = getCartHost()
                  ? "http:" + getCartHost() + data.invoice_no
                  : "";
                this.oceanpayment_param["methods"] = "Credit Card";
                this.oceanpayment_param["pages"] = "1";
                this.oceanpayment_param["order_number"] = data.invoice_no;
                this.oceanpayment_param["order_currency"] = "USD";
                this.oceanpayment_param[
                  "billing_firstName"
                ] = data.default_address ? data.default_address.firstname : "";
                this.oceanpayment_param[
                  "billing_lastName"
                ] = data.default_address ? data.default_address.lastname : "";
                this.oceanpayment_param["billing_email"] = data.customer && data.customer.email || '';
                this.oceanpayment_param[
                  "billing_country"
                ] = data.default_address
                  ? data.default_address.country_code_2
                  : "";
                this.oceanpayment_param[
                  "order_amount"
                ] = this.total_price.toFixed(2);
                this.oceanpayment_secureCode = oceanpayment_data.secure_code;
                this.oceanpaymentSignValue();
              }
              this.payment_change_stage(this.param.payment_method);

              return;
            } else {
              this.$router.push("/cart/my_cart");
            }
          });
      }
    },
  },
  watch: {
    db_selectlist: function () {
      if (this.db_selectlist) {
        if (this.dom("#paypal-button-container")) {
          if (this.db_selectlist.default_payment.client_id) {
            setTimeout(() => {
              this.playType("PayPal");
            }, 2000);
          }
        }
      }
    },
  },
  created() {
    const { paystatus, fail_msg, invoice_no } = this.$route.query;
    if (paystatus == "fail") {
      this.visible5 = true;
      this.fail_msg = fail_msg ? fail_msg : "payment failure";
    } else if (paystatus == "success") {
      this.$router.push({
        path: "/payment_success",
        query: {
          invoice_no,
        },
      });
    }
    this.createStripeCheckout();
    if (this.$route.query.coupon) {
      //  this.coupon =this.$route.query.coupon
      this.coupon_code = this.$route.query.coupon
        ? this.$route.query.coupon
        : "";
    }
    this.apiLoading();

    if (!this.loginshow) {
      this.$Http.login.getAllManagers({}).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.AllManagers = data;
        }
      });
    }
  },
  components: {
    Useraddressbook,
    HeaderTab,
    Userselect,
    Addressform,
    Insetadd,
    Poverlay,
  },
};

function sortBykey(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.loginshow-false{
  background: $withe;
  padding:pxto2($px20);
}
.curson{
  @include pointer();
  width: pxto2($px40);
  height: pxto2($px40);
  background: transparent;
  position: absolute;
  right:0;
  top:0;
  font-size: pxto2($px40);
}
.detail-message-main {
  background: transparent !important;
  @include fontSize24();
  .p-pay-bg {
    background: $withe;
    padding: pxto2($px20);
    margin-bottom: pxto2($px10);
    @include bRadius4();
    .user-addchar-title {
      @include fontSize24();
    }
    .p-bg-addr {
      display: flex;
      justify-content: space-between;
      i {
        font-size: pxto2($px30);
      }
    }
    .p-bg-addr-con {
      margin-top: pxto2($px30);
      height: pxto2(130px);
      border: solid 1px $info;
      padding: pxto2($px20);
      display: flex;
      @include bRadius4();
      .info {
        margin-left: pxto2($px20);
        .title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        }
        .model{
          margin-top:pxto2($px30);
          color:$info;
          display: flex;
          justify-content: space-between;
          a{
            color:$info;
            display: block;
            height: pxto2(40px);
            border-bottom: solid 1px $info;
          }
        }
      }
    }
  }
}
.error-con-font {
  p {
    @include fontSize24();
    display: flex;
    align-items: flex-start;

    span {
      color: #161616;
      display: block;
      width: pxto2(280px);
      text-align: right;
      margin-right: pxto2(10px);
    }
  }

  p:nth-child(1),
  p:nth-child(2) {
    color: #e4535c;
  }
}
.pay-typeb-1{
  margin-bottom: 0 !important;
}
.error-con-title {
  font-size: pxto2(30px);
  font-weight: 700;
  color: #333333;
  margin-top: pxto2(40px);
}

.order-txt {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    width: 50%;
    overflow: hidden;
    color: #888888;
    @include fontSize24();

    span {
      color: #161616;
    }
  }
}

.m-shipments {
  border-radius: 5px;
  position: relative;
  margin-right: pxto2(20px);

  img {
    border: 1px solid #dadada;
    width: 100%;
    height: pxto2(90px);
  }

  span {
    @include fontSize24();
    display: block;
    width: 100%;
    text-align: center;
  }

  .pers-chenggong {
    display: none;
    position: absolute;
    right: pxto2(6px);
    top: pxto2(30px);
  }

  .icon-img-tu {
    border: 1px solid #dadada;
    width: 100%;
    height: pxto2(90px);
  }
}

.ative {
  .pers-chenggong {
    display: block;
  }
}

.fails-main {
  min-height: pxto2(300px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  i {
    width: 100%;
    font-size: pxto2(100px);
    text-align: center;
    color: #e4535c;
  }

  a {
    margin-top: pxto2(40px);
    cursor: pointer;
    display: flex;
    @include fontSize24();
    justify-content: center;
    align-items: center;
    width: pxto2(250px);
    height: pxto2(70px);
    background: #ffffff;
    border: 1px solid #333333;
    border-radius: 4px;
  }
}

.managers-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: pxto2(10px) pxto2(10px);

  span {
    cursor: pointer;
    border: 1px solid #dadada;
    border-radius: pxto2(5px);
    @include fontSize24();
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;
    height: pxto2(50px);
  }

  .ative {
    color: #fff;
    background: #0c0a26;
  }
}

.checkboxtxt {
  @include fontSize24();
  color: #999999;
}

.user-char-remarks {
  // height: 4.73333rem;
  margin-top: 0.44rem;
  margin-bottom: 0.26667rem;
  display: flex;
  padding: pxto2(20px);
  .user-addchar-title{
  width: 16% !important;

  }
}

.user-char-remarks .user-char-edit {
  margin-top: 0.26667rem;
  margin-left: pxto2(10px);
  height: 2.26667rem;
  background-color: #ffffff;
  border-radius: 5px;
  border: solid 1px #dddddd;
  font-size: 0.32rem;
  padding: 5px 5px;
  width: 85%;
}

.user-addchar-title {
  font-size: 0.32rem;
  color: #161616;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-addchar-title {
  font-size: 0.32rem;
  color: #161616;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.payment_step_two {
  .usr-char-cns {
    margin-bottom: 0.73333rem;
  }

  .detail-message-main {
    background-color: #fff;
    padding: pxto2($px20);
  }

  .user-addchar-cns .user-addchar-cns .user-info-addrs-cn {
    margin: 0.26667rem 0;
    /* height: 3.13333rem; */
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #030000;
    display: -ms-flexbox;
    display: flex;
    padding: 0.50667rem 0.26667rem;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-img {
    height: 0.22667rem;
    width: 0.22667rem;
    background-color: #f5f5f5;
    float: left;
    margin-top: 3px;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-img img {
    width: 100%;
    display: block;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg {
    float: left;
    margin-left: 0.26667rem;
    /* height: 1.33333rem; */
    // font-family: SourceHanSansCN-Medium;
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #252525;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .addre-msg-name {
    font-size: 0.32rem;
    display: -ms-flexbox;
    display: flex;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .addre-msg-name b {
    font-weight: 700;
    float: left;
    font-size: 0.32rem;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .addre-msg-name p {
    color: #bfbfbf;
    float: left;
    margin-left: 0.53333rem;
    font-size: 0.32rem;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .addre-msg-con {
    font-size: 0.32rem;
    color: #252525;
    margin-top: 0.26667rem;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .addre-msg-usa {
    font-size: 0.32rem;
    margin: 5px 0;
  }

  .user-addchar-cns .user-info-addrs-cn .addre-msg .modify {
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #8e8e8e;
    border-bottom: solid 1px #8e8e8e;
  }

  .user-addchar-cns .info-addrs-edit-btn {
    height: 0.88rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #dbdbdb;
    display: block;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.90667rem;
  }

  .user-addchar-cns .user-info-addr-typeb {
  }

  .user-addchar-cns .user-addchar-title {
    font-size: 0.32rem;
    color: #161616;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-addchar-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: pxto2(20px);
    span {
      font-weight: 100;

      a {
        color: #ff6600;
        cursor: pointer;
      }
    }
  }

  .user-addchar-cns .user-info-addr-typeb ul {
    margin-top: 0.48rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .user-addchar-cns .user-info-addr-typeb ul li {
    width: 4.2rem;
    /* height: 1.33333rem; */
    border-radius: 5px;
    background-color: #ffffff;
    border: solid 1px #b7b7b7;
    float: left;
    margin: 0.26667rem 5px;
    position: relative;
    text-align: center;
    cursor: pointer;
  }

  .user-addchar-cns .user-info-addr-typeb ul li:nth-child(even) {
    margin-right: 0;
  }

  .user-addchar-cns .user-info-addr-typeb ul .user-active {
    background-color: #ffffff;
    border: solid 1px #61b3af;
  }

  .user-addchar-cns .user-info-addr-typeb ul li i.type-radio {
    // background: url(@/assets/img/char-type-radio.png) no-repeat;
    background-size: cover;
  }

  .user-addchar-cns .user-info-addr-typeb ul li i {
    width: 0.29333rem;
    height: 0.29333rem;
    display: block;
    position: absolute;
    top: -5px;
    right: -4px;
  }

  .user-addchar-cns .user-info-addr-typeb ul li .user-addchar-type-img {
    height: 1.2rem;
    font-size: 0;
    overflow: hidden;
  }

  .user-addchar-cns .user-info-addr-typeb ul li .user-addchar-type-img img {
    /* display: block; */
    /* max-height: 100%; */
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .user-addchar-type-span {
    position: absolute;
    // margin: 32px auto;
    width: 100%;
    left: 0;
    top: 100%;
  }

  .user-addchar-cns .user-info-cn .user-info-cns .user-allorder-info {
    box-shadow: none;
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

  .user-allorder-con {
    display: flex;
  }

  .user-allorder .user-allorder-con .user-order-cn-imgs {
    width: 1.68rem;
    height: 2.18667rem;
    overflow: hidden;
    margin-right: pxto2(10px);
  }

  .user-allorder .user-allorder-con .user-order-cn-imgs img {
    /* max-height: 100%; */
    width: 100%;
  }

  .user-allorder .user-allorder-con .user-order-cn-right {
    /* float: left; */
    margin-left: 0.26667rem;
    width: 6.26667rem;
    // width: 97%;
    flex: 1;
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
    max-width: 2.66667rem;
    float: left;
  }

  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .right-type-lis-price {
    font-size: pxto2(30px);
    display: block;
  }

  .user-allorder .user-allorder-con .user-order-cn-right .user-order-nums {
    color: #dbdbdb;
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

  .user-allorder .use-allorder-mos .user-type-moneu-info .info-msg,
  .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
    font-size: 0.32rem;
  }

  .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
    float: right;
    font-size: 0.32rem;
    font-weight: 400;
  }

  .user-info-cn {
    background: #fff;
    padding: 0.26667rem 0;
  }

  .user-info-cn .user-info-cns {
    width: 8.93333rem;
    margin: 0 auto;
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

  .bigger_discount_all {
    padding: 0.33333rem 0.53333rem;
    background: #fff;
  }

  .bigger_discount_all .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    color: #252525;
    padding: 0.26667rem;
    background: #eeeeee;
  }

  .bigger_discount_all .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    color: #252525;
    padding: 0.26667rem;
    background: #eeeeee;
  }

  .bigger_discount_div {
    padding: 10px;
  }

  .bigger_discount_div {
    border: 1px solid #efefef;
  }

  .discount_th {
    // background: url(require('/assets/img/discount_th.png');
    background-size: 100% 100%;
    background-repeat: round;
  }

  .bigger_discount {
    display: flex;
    align-items: center;
    margin: 5px 20px;
    height: 50px;
    position: relative;
    font-size: 0.35rem;
    color: #252525;
    margin: 5px auto;
  }

  .bigger_discount p {
    width: 32%;
    text-align: center;
  }

  .bigger_discount span {
    width: 60%;
    text-align: center;
  }

  .bigger_discount span {
    width: 60%;
    text-align: center;
  }

  .user-addchar-yhmbtn {
    // height: 3.16rem;
    background-color: #eeeeee;
    padding: 0.50667rem 0.26667rem;
  }

  .user-addchar-yhmbtn p {
    font-size: 0.32rem;
    color: #c9666a;
  }

  .user-addchar-yhmbtn .yhum-form {
    display: -ms-flexbox;
    display: flex;
    margin: 6px 0;
    position: relative;
  }

  .user-addchar-yhmbtn .yhum-form .youhunma-error {
    color: #c9666a;
    display: none;
  }

  .user-addchar-yhmbtn .yhum-form i {
    position: absolute;
    top: 5px;
    right: 2.10667rem;
    width: 0.48rem;
    height: 0.48rem;
    display: block;
    font-size: 0.53333rem;
    font-style: normal;
  }

  .user-addchar-yhmbtn .yhum-form {
    display: -ms-flexbox;
    display: flex;
    margin: 6px 0;
    position: relative;
  }

  .user-addchar-yhmbtn .yhum-form .yhum-btn {
    width: 2rem;
    height: 1.08rem;
    border: 0;
    background-color: #161616;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 0.32rem;
    color: #fff;
  }

  .paypal-logo {
    position: absolute !important;
    left: 20px !important;
  }

  .paypal-button-text,
  .paypal-button-space {
    position: absolute !important;
    left: 30px !important;
  }

  .paypal-logo {
    position: absolute !important;
    left: 50px !important;
  }
}
</style>