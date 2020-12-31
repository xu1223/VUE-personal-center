<template>
  <div>
    <HeaderTab />
    <div
      class="user-controller"
      style="padding: 0.53333rem;"
    >
      <div class="title">
        <h3
          style="font-size: 0.42667rem;
    text-transform: Capitalize;
    color: #161616;"
        >
          Personal information
        </h3>
        <span
          style="
          font-size: 0.32rem;
          text-transform: Capitalize;
          color: #bfbfbf;"
          >Required field *</span
        >
      </div>
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Name</label>
        <div
          :class="[
            'hx-input-block',
            isReq.firstname ? 'result-success' : 'result-error'
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
          style="display:inline"
          v-show="!isReq.firstname"
          >Required field</em
        >
      </div>
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Last Name</label>
        <div
          :class="[
            'hx-input-block',
            isReq.lastname ? 'result-success' : 'result-error'
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
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.lastname"
          >Required field</em
        >
      </div>
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Address</label>
        <div
          :class="[
            'hx-input-block',
            isReq.address_1 ? 'result-success' : 'result-error'
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
          style="display:inline"
          v-show="!isReq.address_1"
          >Required field</em
        >
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
          style="display:inline"
          slot="tip"
          v-show="!isReq.shipment_country_id"
          >Required field</em
        >
      </Userselect>
      <Userselect
        :pr="'State'"
        :msg="'State'"
        :formdata="db_selectlist || []"
        :value.sync="forms.shipment_zone_id"
        @changes="zoneidChanges"
      >
        <em
          class="hx-form-tips"
          style="display:inline"
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
            isReq.city ? 'result-success' : 'result-error'
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
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.city"
          >Required field</em
        >
      </div>
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Zip Code</label>
        <div
          :class="[
            'hx-input-block',
            isReq.shipment_postcode ? 'result-success' : 'result-error'
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
          style="display:inline"
          v-show="!isReq.shipment_postcode"
          >Please enter the correct postcode.</em
        >
      </div>
      <div class="hx-form-group hx-must hx-focus">
        <label for class="hx-form-label">Phone</label>
        <div
          :class="[
            'hx-input-block',
            isReq.mobile ? 'result-success' : 'result-error'
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
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.mobile"
          >Please enter the correct telephone number.</em
        >
        <!-- <span data-isFocus="true" class="hx-point-out">If there is a problem with your order, we will
        conta-ct you by phone!</span>-->
      </div>
      <div class="hx-form-group btn-box">
        <div class="hx-input-block flex-center">
          <input
            type="button"
            class="hx-btn addr-hx-submit"
            value="CONFIRM"
            @click="onSubmit"
          />
          <button
            class="hx-btn hx-btn-primary cancel-btn"
            type="button"
            onclick="javascript:history.back(-1);"
          >
            CANCEL
          </button>
        </div>
      </div>
      <van-form @submit="onSubmit" style="display:none;">
        <van-field
          v-model="forms.shipment_firstname"
          name="Name"
          type="text"
          label="Name:"
          placeholder="Name"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <van-field
          v-model="forms.shipment_lastname"
          name="Email"
          type="text"
          label="Last Name:"
          placeholder="Last Name"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.shipment_address_1"
          name="Address"
          type="text"
          label="Address:"
          placeholder="Address"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.shipment_city"
          name="City"
          type="text"
          label="City:"
          placeholder="City"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <div style="padding: 0px 16px;">
          <van-field
            v-model="forms.shipment_zone_id"
            name="zone"
            type="text"
            label="State:"
            placeholder="State"
            :rules="[{ required: true, message: 'Required field' }]"
            class="fomrlogins"
            required
            style="color: #323233;
              font-size: 0.32rem;
              line-height: 24px;"
          >
            <div slot="input" style="display:-none"></div>
          </van-field>
          <Userselect
            :pr="'State'"
            :formdata="db_selectlist || []"
            :value.sync="forms.shipment_zone_id"
          />
        </div>
        <div style="padding: 0px 16px;">
          <van-field
            v-model="forms.shipment_country_id"
            name="Country"
            type="text"
            label="Country:"
            placeholder="Country"
            :rules="[{ required: true, message: 'Required field' }]"
            class="fomrlogins"
            required
            style="color: #323233;
              font-size: 0.32rem;
              line-height: 24px;"
          >
            <div slot="input" style="display:-none"></div>
          </van-field>
          <Userselect
            :pr="'Country'"
            :formdata="country_list || []"
            :value.sync="forms.shipment_country_id"
            @changes="countryChanges"
          />
        </div>
        <van-field
          v-model="forms.shipment_postcode"
          name="postcode"
          type="text"
          label="Zip Code:"
          placeholder="Zip Code"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.shipment_mobile"
          name="Phone"
          type="text"
          label="Phone:"
          placeholder="Phone"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <!-- <div class="fomrloginspwd" style="margin-top:10px">
          <van-checkbox v-model="checked">
            <em>Select as billing address.</em>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? activeIcon : inactiveIcon"
              style="width:14px;"
            />
          </van-checkbox>
        </div>-->
        <div style="margin: 10px; 0" class="formlogins-btn">
          <!-- <van-button round block type="info" >提交</van-button> -->
          <van-button
            type="primary"
            block
            native-type="submit"
            color="#252525"
            class="user-logins-btn"
            v-if="insendbtn == false"
            >CONFIRM</van-button
          >
          <van-button
            type="primary"
            block
            color="#252525"
            class="user-logins-btn"
            loading-text="lodaing..."
            v-if="insendbtn"
          ></van-button>
          <button
            class="hx-btn hx-btn-primary cancel-btn"
            type="button"
            onclick="javascript:history.back(-1);"
          >
            CANCEL
          </button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Userselect from "@/components/Userselect.vue";
import HeaderTab from "@/components/HeaderTab";
import { Dialog, Toast } from "vant";
export default {
  components: {
    Userselect,
    HeaderTab
  },
  data() {
    return {
      patter1: /^[A-Za-z0-9]+$/,
      patter2:/^[0-9()（）+-]+$/,
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
        shipment_postcode: "1"
      },
      insendbtn: false,
      checked: false,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
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
        shipment_zone_id: "" //	int	收货人-地区id
      },
      db_selectlist: [],
      country_list: []
    };
  },

  methods: {
    onClickLeft() {
      window.history.back(-1);
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
      if (this.forms.shipment_postcode == ""||!this.patter1.test(this.forms.shipment_postcode)) {
        this.isReq.shipment_postcode = "";
      } else {
        this.isReq.shipment_postcode = "1";
      }
    },
    mobileFn() {
      if (this.forms.shipment_mobile == ""||!this.patter2.test(this.forms.shipment_mobile)||this.forms.shipment_mobile.length<11||this.forms.shipment_mobile.length>16) {
        this.isReq.mobile = "";
      } else {
        this.isReq.mobile = "1";
      }
    },
    countryChanges(val, index) {
      this.$Http.common.getCountryZone({country_id: val}).then(res=>{
        let {code,data} = res;
          if (code == 200) {
            if (!index) {
              this.forms.shipment_zone_id = "";
            }
            this.db_selectlist = data;
            // this.db_selectlist["zone_list"] = data;
          }
      })
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
        shipment_country_id
      } = this.forms;
      if (shipment_firstname === "") {
        this.isReq.firstname = "";
        return false;
      } else if (shipment_lastname === "") {
        this.isReq.lastname = "";
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
      } else if (shipment_mobile === "") {
        this.isReq.mobile = "";
        return false;
      }
      delete this.forms["shipment_code"];
      this.$Http.order.modifyShippingAddress({
          ...this.forms
        },true).then(res=>{
       let {code} = res;
          if (code == 200) {
            window.history.back(-1);
          }
          this.insendbtn = false;
        });
     
    }
  },
  created() {
    //获取国家数据
    this.$Http.common.getCountries().then(res => {
       let {code,data} = res;
      if (code == 200) {
        this.country_list = data;
      }
    });
   
    if (this.$route.query.invoice_no) {
      this.$Http.order
        .getOrderDetail({ invoice_no: this.$route.query.invoice_no })
        .then(res => {
          let {code,data} = res;
          if (code == 200) {
            this.db_selectlist = data;
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
