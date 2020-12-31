<template>
  <div>
    <HeaderTab />
    <div class="user-controller">
      <div class="title">
        <h3
          style="font-size: 0.42667rem;
            text-transform: Capitalize;
            color: #161616;"
        >
          Edit Shopping Address
        </h3>
        <span
          style="
              font-size: 0.32rem;
              text-transform: Capitalize;
              color: #bfbfbf;
          "
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
            v-model="forms.firstname"
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
            v-model="forms.lastname"
            @input="lastnameFn"
          />
          <i class="iconfont" v-show="!isReq.lastname"></i>
        </div>
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.lastname"
          >Required field</em
        >
      </div>
      

      <Userselect
        :pr="'Country'"
        :msg="'Country'"
        :formdata="db_selectlist.country_list || []"
        :value.sync="forms.country_id"
        @changes="countryChanges"
      >
        <em
          class="hx-form-tips"
          style="display:inline"
          slot="tip"
          v-show="!isReq.country_id"
          >Required field</em
        >
      </Userselect>
      <Userselect
        :formdata="db_selectlist.zone_list || []"
        :value.sync="forms.zone_id"
        :pr="'State'"
        :msg="'State'"
        @changes="zoneidChanges"
      >
        <em
          class="hx-form-tips"
          style="display:inline"
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
            isReq.city ? 'result-success' : 'result-error'
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
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.city"
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
            v-model="forms.address_1"
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
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Zip Code</label>
        <div
          :class="[
            'hx-input-block',
            isReq.postcode ? 'result-success' : 'result-error'
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
        <em class="hx-form-tips" style="display:inline" v-show="!isReq.postcode"
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
            v-model="forms.mobile"
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
      <div class="hx-form-group checkbox-group">
        <div class="hx-input-block" id="default_checked">
          <div
            class="hx-form-checkbox"
            hx-data-checkname="default"
            @click="checkboxfn"
          >
            <span :class="['hx-checkbox', checked ? 'checked' : '']"></span>
            <em>Select as billing address.</em>
          </div>
          <input
            type="checkbox"
            name="default"
            title="Select as billing address."
            :checked="checked ? 'checked' : ''"
          />
        </div>
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
      <van-form @submit="onSubmit" style="display:none">
        <van-field
          v-model="forms.firstname"
          name="Name"
          type="text"
          label="Name:"
          placeholder="Name"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <van-field
          v-model="forms.lastname"
          name="Email"
          type="text"
          label="Last Name:"
          placeholder="Last Name"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.address_1"
          name="Address"
          type="text"
          label="Address:"
          placeholder="Address"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.city"
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
            v-model="forms.zone_id"
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
            :formdata="db_selectlist.zone_list || []"
            :value.sync="forms.zone_id"
          />
        </div>
        <div style="padding: 0px 16px;">
          <van-field
            v-model="forms.country_id"
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
            :formdata="db_selectlist.country_list || []"
            :value.sync="forms.country_id"
            @changes="countryChanges"
          />
        </div>
        <van-field
          v-model="forms.postcode"
          name="postcode"
          type="text"
          label="Zip Code:"
          placeholder="Zip Code"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="forms.mobile"
          name="Phone"
          type="text"
          label="Phone:"
          placeholder="Phone"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <div class="fomrloginspwd" style="margin-top:10px">
          <van-checkbox v-model="checked">
            <em>Select as billing address.</em>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? activeIcon : inactiveIcon"
              style="width:14px;"
            />
          </van-checkbox>
        </div>
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
            loading-text="登录中..."
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
import HeaderTab from "@/components/HeaderTab";
import Userselect from "@/components/Userselect.vue";
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
      insendbtn: false,
      checked: false,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
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
        zone: ""
      },
      db_selectlist: "",
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
        zone: "1"
      }
    };
  },

  methods: {
    onClickLeft() {
      window.history.back(-1);
    },
    firstnameFn() {
      if (this.forms.firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
      }
    },
    postcodeFn() {
      if (this.forms.postcode == ""||!this.patter1.test(this.forms.postcode)) {
        this.isReq.postcode = "";
      }else {
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
      if (this.forms.mobile == ""||!this.patter2.test(this.forms.mobile)||this.forms.mobile.length<11||this.forms.mobile.length>16) {
        this.isReq.mobile = "";
      } else {
        this.isReq.mobile = "1";
      }
    },
    checkboxfn() {
      this.checked = !this.checked;
    },
    countryChanges(val) {
      this.$Http.common.getCountryZone({ country_id: val }).then(res => {
       let {code,data} = res;
        if (code == 200) {
          this.forms.zone_id = "";
          // this.db_selectlist= data
          this.db_selectlist["zone_list"] = data;
        }
      });
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
        zone_id
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
      }else if (zone_id === "") {
        this.isReq.zone_id = "";
        return false;
      }else if (city === "") {
        this.isReq.city = "";
        return false;
      } else if (address_1 === "") {
        this.isReq.address_1 = "";
        return false;
      } else if (postcode === "") {
        this.isReq.postcode = "";
        return false;
      } else if (mobile === "") {
        this.isReq.mobile = "";
        return false;
      }
      this.insendbtn = true;
      delete this.forms["zone"];
      this.forms["address_id"] = this.forms.id;
      this.$Http.address.addressEdit({ ...this.forms }, true).then(res => {
       let {code} = res;
        if (code == 200) {
          window.history.back(-1);
          // Toast.success("Edit address successfully");
          // setTimeout(() => {
          // this.$router.push("/cart/address_book");
          // }, 200);
        }
        this.insendbtn = false;
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$Http.address
        .getAddressDetail({
          id: this.$route.query.id
        })
        .then(res => {
          let {code,data} = res;
          if (code == 200) {
            this.db_selectlist = data;
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
