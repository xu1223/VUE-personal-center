<template>
  <div class="p-my-set">
    <HeaderTab :isFalse="true" />
    <div>
      <div class="p-my-tab">
        <van-tabs type="card" class="p-my-tab-set">
          <van-tab title="Personal Information" >
            <div class="personal-info-modify p-model">
              <div class="hx-form-group hx-must">
                <label class="hx-form-label"> Avatar </label>
                <div class="avatar">
                  <input
                    @change="uploadImage"
                    type="file"
                    placeholder
                    class="file"
                    accept="image/*"
                  />
                  <v-icon type="plus"></v-icon>
                  <img :src="parms.avatar" />
                </div>
              </div>
              <div class="hx-form-group hx-must">
                <label class="hx-form-label">Name</label>
                <div
                  :class="[
                    'hx-input-block',
                    isPre.firstname ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="text"
                    name="firstname"
                    placeholder
                    autocomplete="off"
                    class="hx-input"
                    v-model="parms.firstname"
                    @input="firstnamefn"
                  />
                  <i class="iconfont" v-show="!isPre.firstname"></i>
                </div>
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!isPre.firstname"
                  >Required field</em
                >
              </div>
              <div class="hx-form-group hx-must">
                <label class="hx-form-label">Email</label>
                <div
                  :class="[
                    'hx-input-block',
                    isPre.email ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="text"
                    name="email"
                    hx-rule-email
                    data-result="false"
                    placeholder
                    class="hx-input"
                    v-model="parms.email"
                    @input="emailfn"
                  />
                  <i class="iconfont" v-show="!isPre.email"></i>
                </div>
                <em
                  class="hx-form-tips"
                  v-show="!isPre.email"
                  style="display: inline"
                  >Please enter the correct email address</em
                >
              </div>
              <div class="hx-form-group hx-must">
                <label for class="hx-form-label">Phone</label>
                <div
                  :class="[
                    'hx-input-block',
                    isPre.mobile ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="text"
                    name="mobile"
                    hx-rule-phone
                    data-result="false"
                    placeholder
                    class="hx-input"
                    v-model="parms.mobile"
                    @input="mobilefn"
                  />
                  <i class="iconfont" v-show="!isPre.mobile"></i>
                </div>
                <!-- <span>We will only ask you for a phone number if you need to
                                be notified about your order.</span>-->
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!isPre.mobile"
                  >Please enter the correct telephone number.</em
                >
              </div>
              <div class="hx-form-group hx-must">
                <label for class="hx-form-label">Gender</label>
                <div class="hx-input-block">
                  <van-radio-group
                    v-model="parms.gender"
                    direction="horizontal"
                  >
                    <van-radio
                      checked-color="#0C0A26"
                      :name="item.id"
                      v-for="(item, index) in genderdata"
                      :key="index"
                      >{{ item.name }}</van-radio
                    >
                  </van-radio-group>
                  <!--
                  <FormSelect
                    :id.sync="parms.gender"
                    :pr="'Gender'"
                    :formdata="
                      genderdata: [
                        { id: 1, name: 'Man' },
                        { id: 2, name: 'Woman' },
                        { id: 0, name: 'Confidentiality' },
                      ] || []
                    "
                  />
                  -->
                </div>
              </div>
              <div class="hx-form-group hx-must">
                <label for class="hx-form-label">Birthday</label>
                <div
                  :class="[
                    'hx-input-block',
                    isPre.datys1 ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="text"
                    name="mobile"
                    hx-rule-phone
                    data-result="false"
                    placeholder
                    class="hx-input"
                    v-model="parms.datys1"
                    readonly
                    id="dateShowBtn"
                    @click="datys()"
                  />
                  <i class="iconfont" v-show="!isPre.datys1"></i>
                </div>
                <!-- <span>We will only ask you for a phone number if you need to
                                be notified about your order.</span>-->
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!isPre.datys1"
                  >Please enter the correct telephone number.</em
                >
              </div>
              <div class="hx-form-group btn-box box-up box-up-info">
                <div class="hx-input-block flex-center">
                  <van-button class="hx-btn"  style="padding-top:0;padding-bottom:0;" @click="onSubmitInfo" 
                  :disabled="isLoading">SUBMIT</van-button>
                  <button class="hx-btn cancel"  style="padding-top:0;padding-bottom:0;" @click="onCancelInfo">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="Password">
            <div class="user-security p-model">
              <div class="hx-form-group hx-must hx-set-top">
                <label class="hx-form-label">Old Password</label>
                <div
                  :class="[
                    'hx-input-block',
                    old_passwordsu ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="password"
                    name="old_password"
                    placeholder="Please enter the old password"
                    autocomplete="off"
                    class="hx-input"
                    v-model="formparms.old_password"
                    @input="old_passwordfn"
                    @blur="old_passwordfn"
                  />
                  <i class="iconfont" v-show="!old_passwordsu"></i>
                </div>
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!old_passwordsu"
                  >{{ old_passwordsumsg }}</em
                >
                <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
          password.</span>-->
              </div>
              <div class="hx-form-group hx-must">
                <label class="hx-form-label">New Password</label>
                <div
                  :class="[
                    'hx-input-block',
                    new_passwordsu ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm-password"
                    data-isfocus="true"
                    hx_form_focus="confirm_psw"
                    placeholder="Please enter a New password"
                    autocomplete="off"
                    class="hx-input password2"
                    v-model="formparms.new_password"
                    @input="new_passwordfn"
                    @blur="new_passwordfn"
                  />
                  <i class="iconfont" v-show="!new_passwordsu"></i>
                </div>
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!new_passwordsu"
                  >{{ new_passwordmsg }}</em
                >
              </div>
              <div class="hx-form-group hx-must">
                <label class="hx-form-label">Password Confirmation</label>
                <div
                  :class="[
                    'hx-input-block',
                    confirm_passwordsu ? 'result-success' : 'result-error',
                  ]"
                >
                  <input
                    type="password"
                    name="new_password"
                    id="newpassword"
                    data-isfocus="true"
                    hx_form_focus="psw"
                    placeholder="Please enter the New password again"
                    autocomplete="off"
                    class="hx-input password1"
                    v-model="formparms.confirm_password"
                    @input="confirm_passwordfn"
                    @focus="confirm_passwordfn"
                  />
                  <i class="iconfont" v-show="!confirm_passwordsu"></i>
                </div>
                <em
                  class="hx-form-tips"
                  style="display: inline"
                  v-show="!confirm_passwordsu"
                  >{{ confirm_passwordsg }}</em
                >
                <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
          password.</span>-->
              </div>
              <div class="hx-form-group btn-box box-up">
                <div class="hx-input-block flex-center">
                  <button class="hx-btn" @click="onSubmit">SUBMIT</button>
                  <button class="hx-btn cancel cancel" @click="onCancel">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </van-tab>
           <van-tab title="Account Binding " style="display:none">
            <div class="user-security p-api">
              <Thirdlogin @change="apiLoginCallback" :account="1" />
            </div>
           </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        show-toolbar
        @confirm="confirmfn"
        @cancel="cancelfn"
      />
    </van-popup>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import Thirdlogin from "@/common/Thirdlogin.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      isLoading:false, //个人信息
      showTime: false,
      minDate: new Date(1971, 0, 1),
      maxDate: new Date(2060, 10, 1),
      currentDate: new Date(),
      old_passwordsu: "1",
      new_passwordsu: "1",
      confirm_passwordsu: "1",
      old_passwordsumsg: "Required field",
      new_passwordmsg: "Required field",
      confirm_passwordsg: "Required field",
      _id: "",
      formparms: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      parms: {
        email: "", //	string	是	邮箱
        firstname: "", //	string	是	名
        lastname: "", //	string	是	姓
        mobile: "", //	string	是	手机
        year: "", //	string	是	生日-年
        month: "", //	string	是	生日-月
        day: "", //	string	是	生日-日
        gender: 0, //	string	是	性别 0:保密,1:男,2:女
        avatar: "", //	string	是	头像
        datys1: "",
        avatar1: ''
      },
      isNav: {
        prsinfo: false,
        msg: false,
        conmment: false,
        code: false,
        order: true,
      },
      isPre: {
        firstname: "1",
        lastname: "1",
        email: "1",
        mobile: "1",
        datys1: "1",
      },
      genderdata: [
        { id: 1, name: "Man" },
        { id: 2, name: "Woman" },
      ],
    };
  },
  methods: {
    uploadImage() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        _this.parms["avatar"] = e.target.result;
      };
      reader.readAsDataURL(file);
      this.$Http.user
        .CustomerAvatarUpload({ file: file }, true)
        .then((res) => {
            this.parms['avatar1'] = res.data;

        });
    },
    onCancelInfo() {
      this.parms = {
        email: "", //	string	是	邮箱
        firstname: "", //	string	是	名
        lastname: "", //	string	是	姓
        mobile: "", //	string	是	手机
        year: "", //	string	是	生日-年
        month: "", //	string	是	生日-月
        day: "", //	string	是	生日-日
        gender: 0, //	string	是	性别 0:保密,1:男,2:女
        avatar: "", //	string	是	头像
        datys1: "",
      };
    },
    onCancel() {
      this.formparms = {
        old_password: "",
        new_password: "",
        confirm_password: "",
      };
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    confirmfn(val) {
      this.showTime = false;
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.parms.datys1 = resDate;
    },
    cancelfn() {
      this.showTime = false;
    },
    datys() {
      this.showTime = true;
    },
    firstnamefn() {
      if (this.parms.firstname === "") {
        this.isPre.firstname = "";
      } else {
        this.isPre.firstname = "1";
      }
    },
    lastnamefn() {
      if (this.parms.lastname === "") {
        this.isPre.lastname = "";
      } else {
        this.isPre.lastname = "1";
      }
    },
    emailfn() {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.parms.email)) {
        this.isPre.email = "";
      } else {
        this.isPre.email = "1";
      }
    },
    old_passwordfn() {
      if (this.formparms.old_password !== "") {
        this.old_passwordsu = "1";
      }
      //  if (this.formparms.old_password == "") {
      //   this.old_passwordsumsg = "Required field";
      //   this.old_passwordsu = "";
      // } else if (this.formparms.old_password.length < 6) {
      //   this.old_passwordsumsg = "Password must no be less than 6 bits";
      //   this.old_passwordsu = "";
      // } else {
      //   this.old_passwordsu = "1";
      // }
    },
    new_passwordfn() {
      if (this.formparms.new_password !== "") {
        this.new_passwordsu = "1";
      }
      // if (this.formparms.new_password == "") {
      //   this.new_passwordmsg = "Required field";
      //   this.new_passwordsu = "";
      // } else if (this.formparms.new_password.length < 6) {
      //   this.new_passwordmsg = "Password must no be less than 6 bits";
      //   this.new_passwordsu = "";
      // } else {
      //   this.new_passwordsu = "1";
      // }
    },
    mobilefn() {
      if (this.parms.mobile === "") {
        this.isPre.mobile = "";
      } else {
        this.isPre.mobile = "1";
      }
    },
    confirm_passwordfn() {
      if (this.formparms.confirm_password !== "") {
        this.confirm_passwordsu = "1";
      }
    },
    onSubmit() {
      // formparms: {
      //   old_password: "",
      //   new_password: "",
      //   confirm_password: ""
      // }
      let { old_password, new_password, confirm_password } = this.formparms;
      if (old_password === "") {
        this.old_passwordsu = "";
        return;
      } else if (this.formparms.old_password.length < 6) {
        this.old_passwordsumsg = "Password must no be less than 6 bits";
        this.old_passwordsu = "";
        return;
      } else if (new_password === "") {
        this.new_passwordsu = "";
        return;
      } else if (this.formparms.new_password.length < 6) {
        this.new_passwordmsg = "Password must no be less than 6 bits";
        this.new_passwordsu = "";
        return;
      } else if (this.formparms.confirm_password === "") {
        this.confirm_passwordmsg = "Required field";
        this.confirm_passwordsu = "";
        return;
      } else if (this.formparms.confirm_password.length < 6) {
        this.confirm_passwordsg = "Password must no be less than 6 bits";
        this.confirm_passwordsu = "";
        return;
      } else if (confirm_password !== new_password) {
        this.confirm_passwordsu = "";
        this.confirm_passwordsg = "The inconsisency of two password inputs";
        return;
      }
      this.$Http.login.changePasswd({ ...this.formparms }).then((res) => {
        let { code, msg } = res;
        if (code == 200) {
          this.$router.push("/login");
        } else {
          Toast(msg);
        }
      });
    },
    onSubmitInfo() {
      //  email: "", //	string	是	邮箱
      //   firstname: "", //	string	是	名
      //   lastname: "", //	string	是	姓
      //   mobile: "", //	string	是	手机
      //   year: "", //	string	是	生日-年
      //   month: "", //	string	是	生日-月
      //   day: "", //	string	是	生日-日
      //   gender: "", //	string	是	性别 0:保密,1:男,2:女
      //   avatar: "", //	string	是	头像
      //   datys1: ""
      let { email, firstname, lastname, mobile, datys1, gender } = this.parms;
      if (firstname === "") {
        this.isPre.firstname = "";
        console.log(1)
        return false;
      }  else if (email === "") {
        console.log(3)
        this.isPre.email = "";
        return false;
      } else if (mobile === "") {
        console.log(4)
        this.isPre.mobile = "";
        return false;
      } else if (datys1 === "") {
        console.log(5)
        this.isPre.datys1 = "";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(email)) {
        console.log(6)
        this.isPre.email = "";
        return false;
      } else {
        this.isPre.email = "1";
      }
      if (document.querySelector("#dateShowBtn")) {
        let dateShowBtn = document.querySelector("#dateShowBtn");
        // let data_year = dateShowBtn.getAttribute("data-year");
        // let data_month = dateShowBtn.getAttribute("data-month");
        // let data_day = dateShowBtn.getAttribute("data-day");
        if (dateShowBtn.value) {
          let dt = dateShowBtn.value.split("-");
          this.parms["year"] = dt[0];
          this.parms["month"] = dt[1];
          this.parms["day"] = dt[2];
          delete this.parms["datys1"];
        }
      }
      console.log(7)
      this.parms['avatar'] = this.parms['avatar1'];
      console.log(this.parms,'--this.parms')
      this.isLoading = true;
      this.$Http.user.customerEdit({ ...this.parms }).then((res) => {
        this.isLoading = false;
        let { code } = res;
        if (code == 200) {
          // Toast.success(msg);
          this.isModey = false;
          setTimeout(() => {
            // location.reload();
            this.isrender();
          }, 300);
        }
      });
    },
    isrender() {
      this.db_selectlist = [];
      this.$Http.user.personal().then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.db_selectlist = data;
          let _id = "";
          if (data.customer.gender == "Man") {
            // {id:1,name:'Man'},{id:2,name:'Woman'},{id:0,name:'Confidentiality'}
            _id = 1;
          } else if (data.customer.gender == "Woman") {
            _id = 2;
          } else if (data.customer.gender == "Confidentiality") {
            _id = 0;
          }
          this._id = _id;
          //   this.parms.gender = _id;
          if (data.customer.default_address) {
            let itme = data.customer.default_address;
            this.parms["firstname"] = data.customer.firstname;
            this.parms["avatar"] = data.customer.avatar;
            this.parms["lastname"] = data.customer.lastname;
            this.parms["mobile"] = data.customer.mobile;
            this.parms["email"] = data.customer.email;
            this.parms["datys1"] = data.customer.birthday;
            this.parms.gender = data.customer.gender == "Man" ? 1 : 0;
          }
        }
      });
    },
    apiLoginCallback(parms){
      const {
          email = "",
          family_name = "",
          full_name = "",
          given_name = "",
          id = "",
          id_token = "",
          image_url = "",
          type = "",
        } = parms;
        let obj = {}
//       type	string	是	登录方式 [google,facebook,twitter]
// third_party_login_data	array	是	第三方登录数据
// third_party_login_data[type]	string	是	登录方式 [google,facebook,twitter]
// third_party_login_data[third_party_user_id]	string	是	第三方登录返回用户id
// third_party_login_data[firstname]	string	否	名
// third_party_login_data[lastname]	string	否	姓
// third_party_login_data[email]	string	否	邮箱
// third_party_login_data[avatar]	string	否	头像
        let arr = ['type','third_party_user_id','firstname','lastname','email','avatar'];
        arr.forEach(item=>{
          if(!obj[`third_party_login_data[${item}]`]){
            obj[`third_party_login_data[${item}]`] = parms[item];
          }
        })
        let _parms = {
          ...obj,
          type:type
        };
      this.$Http.common.bindAccountByCustomer(_parms).then(res=>{
        const {code=1,msg} = res;
        if(code == 200){
           Toast(msg);
        } else{
           Toast(msg);
        }
      })
    }
  },
  created() {
    this.isrender();
  },
  components: {
    HeaderTab,
    Thirdlogin
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-my-set {
  @include fontSize24();
  padding: pxto2($px20) 0;
  .p-my-tab {
   
    .van-tab {
      border: none;
    }
    .van-tabs__nav--card{
      margin:pxto2($px20) 0;
    }
    .van-tabs__nav--card .van-tab.van-tab--active {
      background-color: $block !important;
    }
     .van-tabs__content{
      padding:pxto2($px40) !important;
    }
    .box-up {
      margin-top: pxto2(300px);
    }
    .box-up-info {
      margin-top: pxto2(80px);
    }
    .hx-set-top {
      margin-top: pxto2($px70);
    }
    // color:;
    .flex-center {
      display: flex;
      text-align: center;
      justify-content: center;
    }
    
    button {
      width: auto;
      height: auto;
      padding: pxto2($px20) pxto2($px32);
      @include fontSize24();
    }
    .cancel {
      background: transparent;
      color: $block;
      box-shadow: none;
      border: $input-border;
      margin-left: pxto2($px40);
    }
    .p-api{
      padding:pxto2(260px) 0;
    }
  }
  .avatar {
    width: pxto2($px80);
    height: pxto2($px80);
    position: relative;
    border: 1px dashed #DADADA;
    input{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
  .hx-input, .hx-select, .hx-textarea{
    width:94%
  }
}
</style>