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
          Add Shopping Address
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
        :formdata="country_list ? country_list : []"
        :value.sync="forms.country_id"
        :pr="'Country'"
        @changes="countryChanges"
        :msg="'Country'"
        :req="true"
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
        :formdata="db_selectlist ? db_selectlist : []"
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
    </div>
  </div>
</template>

<script>
import Userselect from "@/components/Userselect.vue";
import HeaderTab from "@/components/HeaderTab";
import { Toast } from "vant";
export default {
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
        postcode: "",
        default: this.checked ? 1 : 0
      },
      country_id: "",
      db_selectlist: {},
      country_list: [],
      isReq: {
        firstname: "1",
        lastname: "1",
        mobile: "1",
        address_1: "1",
        country_id: "1",
        zone_id: "1",
        postcode: "1",
        city: "1",
        default: "1",
        country: "1",
        zone: "1"
      }
    };
  },
  methods: {
    firstnameFn() {
      if (this.forms.firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
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
    postcodeFn() {
      if (this.forms.postcode == ""||!this.patter1.test(this.forms.postcode)) {
        this.isReq.postcode = "";
      } else {
        this.isReq.postcode = "1";
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
    zoneidChanges() {
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    countryChanges(val) {
      this.$Http.common.getCountryZone({
          country_id: val
        }).then(res=>{
          let {code,data} = res;
          if (code == 200) {
            this.forms.zone_id = "";
            this.db_selectlist = data;
            this.isReq.country_id = "1";
          }
      });
    },
    onClickLeft() {
      window.history.back(-1);
    },
    onSubmit() {
      // firstname: "",
      //   lastname: "",
      //   mobile: "",
      //   address_1: "",
      //   country_id: "",
      //   zone_id: "",
      //   city: "",
      //   postcode: "",
      //   default: "",
      //   country: "",
      //   zone: "",
      let {
        firstname,
        lastname,
        mobile,
        address_1,
        city,
        zone_id,
        country_id,
        postcode
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
      this.forms["default"] = this.checked === false ? 0 : 1;
      this.insendbtn = true;
      this.$Http.address.addressAdd({ ...this.forms }, true).then(res => {
         let {code} = res;
        if (code == 200) {
          window.history.back(-1);
        }
        this.insendbtn = false;
      });
     
    }
  },
  created() {
    this.$Http.common.getCountries().then(res => {
      let {code,data,msg} = res;
      if (code == 200) {
        this.country_list = data;
      }
    });
    
  },
  components: {
    Userselect,
    HeaderTab
  }
};
</script>

<style lang="scss" scoped></style>
