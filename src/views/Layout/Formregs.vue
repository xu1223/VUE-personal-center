<template>
  <div>
    <div class="hx-form-group hx-must">
      <label class="hx-form-label">Email</label>
      <div
        :class="[
          'hx-input-block',
          parms.email ? 'result-success' : 'result-error',
        ]"
      >
        <input
          type="text"
          name="email"
          placeholder=""
          class="hx-input register_email"
          v-model="formparms.email"
          @input="emailfn"
          @blur="emailblur"
        />
        <i class="iconfont" v-show="!parms.email"></i>
      </div>
      <em class="hx-form-tips" style="display: inline" v-show="!parms.email">{{
        emailmsg
      }}</em>
    </div>
    <!-- parms.email -->
    <div class="hx-form-group hx-must">
      <label class="hx-form-label">Password</label>
      <div
        :class="[
          'hx-input-block',
          parms.password ? 'result-success' : 'result-error',
        ]"
      >
        <input
          type="password"
          name="password"
          placeholder=" "
          autocomplete="off"
          data-isfocus="true"
          hx_form_focus="psw"
          v-model="formparms.password"
          class="hx-input password1 register_password"
          @input="passwordfn"
          @blur="passwordblur"
        />
        <i class="iconfont" v-show="!parms.password"></i>
      </div>
      <em
        class="hx-form-tips"
        style="display: inline"
        v-show="!parms.password"
        >{{ pawdmsg }}</em
      >
      <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
      password.</span>-->
    </div>
    <div class="hx-form-group hx-must">
      <label class="hx-form-label">Confirm password</label>
      <div
        :class="[
          'hx-input-block',
          parms.password2 ? 'result-success' : 'result-error',
        ]"
      >
        <input
          type="password"
          name="password2"
          v-model="formparms.password2"
          placeholder=""
          autocomplete="off"
          data-isfocus="true"
          hx_form_focus="confirm_psw"
          @input="password2fn"
          class="hx-input password2 register_password2"
          @blur="password2blur"
        />
        <i
          class="iconfont"
          style="display: inline"
          v-show="!parms.password2"
        ></i>
      </div>
      <em
        class="hx-form-tips"
        style="display: inline"
        v-show="!parms.password2"
        >{{ pawd2msg }}</em
      >
    </div>
    <!-- <div class="hx-form-group hx-must">
      <label class="hx-form-label">CHOOSE SERVICE</label>
      <div class="hx-input-block">
        <FormSelect
          :id.sync="formparms.manager_id"
          :formdata="db_selectlist || []"
        />
      </div>
      <em class="hx-form-tips">Required field</em>
    </div> -->
    <div
      class="hx-form-group btn-box"
      style="margin-bottom: 0; padding-bottom: 0"
    >
      <div class="hx-input-block">
        <input
          type="submit"
          value="REGISTER"
          class="hx-btn"
          @click="onSubmit"
        />
      </div>
    </div>
    <div
      class="hx-form-group hx-must"
      style="margin-bottom: 0; padding-bottom: 0"
    >
      <label class="hx-form-label">Choose Customer Service:</label>
      <div class="hx-input-block">
        <!--
        <FormSelect
          :id.sync="formparms.manager_id"
          :formdata="db_selectlist || []"
        />
        -->
        <van-radio-group
          v-model="formparms.manager_id"
          class="hx-van-radio"
          checked-color="#fff"
        >
          <van-radio
            v-for="(item, index) in db_selectlist"
            :key="index"
            :name="item.id"
          >
            <span
              class="name"
              :style="{ color: formparms.manager_id == item.id ? '#fff' : '' }"
            >
              {{ item.name }}</span
            >
            <template #icon="props">
              <img
                class="img-icon"
                :src="props.checked ? activeIcon : inactiveIcon"
                style="display: none"
              />
            </template>
          </van-radio>
          <!-- <van-radio name="1">
            单选框 1
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio>
          <van-radio name="2" class="hx-van-radio-checked" >
            单选框 2
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </van-radio> -->
        </van-radio-group>
      </div>
      <em class="hx-form-tips">Required field</em>
    </div>
    <div class="hx-form-group checkbox-group">
      <p class="p-f-reg">
        By registering, you agree to our <em>Privacy Policy</em> and
        <em>Terms Of Service</em>.
      </p>
      <div class="hx-input-block">
        <div
          class="hx-form-checkbox checkbox"
          hx-data-checkname="checkbox"
          @click="checkboxfn"
        >
          <span :class="['hx-checkbox', checked ? 'checked' : '']"></span>
          <em class="sign">Sign up for newsletter.</em>
        </div>
        <input
          type="checkbox"
          name="checkbox"
          class="register_checkbox"
          :checked="checked ? 'checked' : ''"
          title="Sign up for newsletter."
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormSelect from "@/components/Formselect";
import { Toast } from "vant";
export default {
  props: ["api", "values"],
  data() {
    return {
      pawd2msg: "Required field",
      pawdmsg: "Required field",
      emailmsg: "Required field",
      vids: "",
      parms: {
        email: "1",
        password: "",
        password2: "1",
        manager_id: "1",
      },
      formparms: {
        email: "", //	string	是	邮箱
        password: "", //	string	是	密码
        password2: "", //	string	是	确认密码
        manager_id: "", //	int	否	客服id
      },
      checked: false,
      activeIcon: "",
      inactiveIcon: "",
      value1: 0,

      db_selectlist: [],
    };
  },

  methods: {
    passwordblur() {
      // if (this.formparms.password !== "") {
      //   // Toast("Password must no be less than 6 bits");
      //    this.parms.password = "1"
      // }
      if (this.formparms.password == "") {
        this.parms.password = "1";
        this.pawdmsg = "Required field";
      } else if (this.formparms.password.length < 6) {
        this.parms.password = "";
        this.pawdmsg = "Password must no be less than 6 bits";
      }
    },
    password2blur() {
      // if (this.formparms.password2 !== "") {
      //   // Toast("Password must no be less than 6 bits");
      //   this.parms.password2 = "1";
      // }
      if (this.formparms.password2 !== "") {
        this.parms.password2 = "1";
        this.pawd2msg = "Required field";
      } else if (this.formparms.password2.length < 6) {
        this.parms.password2 = "";
        this.pawd2msg = "Password must no be less than 6 bits";
      }
      if (this.formparms.password2 !== this.formparms.password) {
        this.pawd2msg = " The inconsisency of two password inputs";
        this.parms.password2 = "";
      }
    },
    checkboxfn() {
      this.checked = !this.checked;
    },
    emailfn() {
      if (this.formparms.email != "") {
        this.parms.email = "1";
        this.emailmsg = "Required field";
      }
      // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      // if (!myreg.test(this.formparms.email)) {
      //   this.parms.email = "";
      //   this.emailmsg = "Please enter the correct email address";
      // } else {
      //   this.parms.email = "1";
      //   this.emailmsg = "Required field";
      // }
    },
    emailblur() {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.formparms.email)) {
        this.parms.email = "";
        this.emailmsg = "Please enter the correct email address";
      } else {
        this.parms.email = "1";
        this.emailmsg = "Required field";
      }
    },
    passwordfn() {
      if (this.formparms.password !== "") {
        this.parms.password = "1";
        this.pawdmsg = "Required field";
      }
    },
    password2fn() {
      if (this.formparms.password2 !== "") {
        this.parms.password2 = "1";
        this.pawdmsg = "Required field";
      }
    },
    onSubmit() {
      //  formparms: {
      //   email: "", //	string	是	邮箱
      //   password: "", //	string	是	密码
      //   password2: "", //	string	是	确认密码
      //   manager_id: "" //	int	否	客服id
      // }
      let { email, password, password2, manager_id } = this.formparms;
      if (email === "") {
        this.parms.email = "";
        this.emailmsg = "Required field";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(email)) {
        this.parms.email = "";
        this.emailmsg = "Please enter the correct email address";
        // Toast("Please enter the correct email adderss");
        return false;
      }
      if (password === "") {
        this.parms.password = "";
        return false;
      } else if (password2 === "") {
        this.parms.password2 = "";
        return false;
      }
      if (this.formparms.password2 !== this.formparms.password) {
        this.pawd2msg = " The inconsisency of two password inputs";
        this.parms.password2 = "";
      }

      // if (password2 != password) {
      //   this.parms.password2 = "";
      //   return false;
      // }
      this.formparms["customer_token"] = "";
      if (this.api == 2) {
        let arr = [
          "type",
          "third_party_user_id",
          "firstname",
          "lastname",
          "email",
          "avatar",
        ];
        const {
          email = "",
          family_name = "",
          full_name = "",
          given_name = "",
          id = "",
          id_token = "",
          image_url = "",
          type = "",
        } = this.values;
        let obj = {};
        arr.forEach((item) => {
          if (!obj[`third_party_login_data[${item}]`]) {
            obj[`third_party_login_data[${item}]`] = this.values[item];
          }
        });
        let _parms = {
          ...obj,
          type:type,
          ...this.formparms,
        };
        this.$Http.common.register(_parms).then((res) => {
          let { code, data, msg } = res;
          if (code == 200) {
            this.$Storage.setUserInfo(data);
            this.$Http.common.sessionConvertToCustomer({
              session_id: this.$Storage.getSessionId(),
            });
            this.$router.push("/");
          } else {
            Toast(msg);
          }
        });
      } else {
        this.$Http.login
          .register(this.formparms)
          .then((res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              // this.$Storage.setUserInfo(data);
              // location.reload();
              this.$Storage.setUserInfo(data);
              this.$Http.common.sessionConvertToCustomer({
                session_id: this.$Storage.getSessionId(),
              });
              this.$router.push("/");
              Toast("Registered successfully");
              // this.$emit('change',data)
            } else {
              Toast(msg);
            }
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
    onSubmitemin() {},
  },
  components: {
    FormSelect,
  },
  created() {
    //获取客户列表
    this.$Http.login.getAllManagers().then((res) => {
      let { code, data } = res;
      if (code == 200) {
        this.db_selectlist = data;
        this.formparms.manager_id = this.db_selectlist[0].id;
      }
    });
    this.pawd2msg = "Required field";
    this.pawdmsg = "Required field";
    this.emailmsg = "Required field";
    this.parms = {
      email: "1",
      password: "1",
      password2: "1",
      manager_id: "1",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.sign {
  color: $info;
}
.p-f-reg {
  @include fontSize20();
  color: $info;
  margin-top: pxto2($px10) 0;
  em {
    color: $blue-1;
  }
}
</style>
