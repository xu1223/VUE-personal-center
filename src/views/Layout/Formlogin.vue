<template>
  <div>
    <div class="hx-form-group hx-must">
      <label class="hx-form-label">Email</label>
      <!-- result-success -->
      <div
        :class="['hx-input-block', emailsu ? 'result-success' : 'result-error']"
      >
        <input
          type="text"
          v-model="formparms.email"
          id="login-password"
          name="Email"
          autocomplete="off"
          class="hx-input login-email"
          @input="emailfn"
          @blur="emailfocus"
        />
        <i class="iconfont" v-show="!emailsu"></i>
      </div>
      <em class="hx-form-tips" style="display: inline" v-show="!emailsu">
        {{ emailmsg }}
      </em>
    </div>
    <div class="hx-form-group hx-must">
      <label class="hx-form-label">Password</label>
      <div
        :class="['hx-input-block', pwdsu ? 'result-success' : 'result-error']"
      >
        <input
          type="password"
          id="login-password"
          name="password"
          autocomplete="off"
          class="hx-input login-email"
          v-model="formparms.password"
          @input="pwdfn"
          @blur="passwordfocus"
        />
        <i class="iconfont" v-show="!pwdsu"></i>
      </div>
      <em class="hx-form-tips" style="display: inline" v-show="!pwdsu">
        {{ passwordmsg }}
      </em>
    </div>
    <div class="hx-form-group checkbox-group">
      <div class="hx-input-block">
        <div
          class="hx-form-checkbox"
          hx-data-checkname="checkbox"
          @click="checkboxfn"
        >
          <span :class="['hx-checkbox', checked ? 'checked' : '']"></span>
          <em>Stay logged in</em>
        </div>
        <input
          type="checkbox"
          name="checkbox"
          title="Stay logged in"
          :checked="checked ? 'checked' : ''"
        />
        <!-- <a class="forget-password" href="/cart/forgot">Forget password</a> -->
        <router-link class="forget-password" to="/forgot"
          >Forget password</router-link
        >
      </div>
    </div>
    <div class="hx-form-group btn-box">
      <div class="hx-input-block">
        <input
          type="button"
          value="LOGIN"
          class="hx-btn loginsendform"
          @click="onSubmit"
        />
      </div>
    </div>
    <div style="display: none">
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Contact Email</label>
        <div
          :class="[
            'hx-input-block',
            youkeEmil ? 'result-success' : 'result-error',
          ]"
        >
          <input
            type="text"
            id="login-email"
            name="email"
            class="hx-input login-email login-bottom-email"
            v-model="youkemail"
            @input="youkeEmilfn"
            @blur="youkeEmilfocus"
          />
          <i class="iconfont" v-if="!youkeEmil"></i>
        </div>
        <em class="hx-form-tips" style="display: inline" v-if="!youkeEmil">
          {{ youkeEmilmsg }}
        </em>
      </div>
      <div class="hx-form-group btn-box">
        <div class="hx-input-block">
          <input
            type="button"
            value="Checkout As Guest"
            class="hx-btn guestloginsendform"
            @click="onSubmitemin"
          />
        </div>
      </div>
    </div>

    <div style="display: none">
      <Thirdlogin @change="apiLoginCallback" />
    </div>
    <Poverlay
      :show.sync="show"
      :className="'login-overlay-1'"
      @change="changeLoginApi"
    >
      <template name="default">
        <div @click.stop>
          <HeaderLogin />
          <div class="p-add-con" v-if="show_create == 1">
            <div class="hx-form-group hx-must">
              <label class="hx-form-label">Email</label>
              <!-- result-success -->
              <div
                :class="[
                  'hx-input-block',
                  emailsu ? 'result-success' : 'result-error',
                ]"
              >
                <input
                  type="text"
                  v-model="formparms.email"
                  id="login-password"
                  name="Email"
                  autocomplete="off"
                  class="hx-input login-email"
                  @input="emailfn"
                  @blur="emailfocus"
                />
                <i class="iconfont" v-show="!emailsu"></i>
              </div>
              <em
                class="hx-form-tips"
                style="display: inline"
                v-show="!emailsu"
              >
                {{ emailmsg }}
              </em>
            </div>
            <div class="hx-form-group hx-must">
              <label class="hx-form-label">Password</label>
              <div
                :class="[
                  'hx-input-block',
                  pwdsu ? 'result-success' : 'result-error',
                ]"
              >
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  autocomplete="off"
                  class="hx-input login-email"
                  v-model="formparms.password"
                  @input="pwdfn"
                  @blur="passwordfocus"
                />
                <i class="iconfont" v-show="!pwdsu"></i>
              </div>
              <em class="hx-form-tips" style="display: inline" v-show="!pwdsu">
                {{ passwordmsg }}
              </em>
            </div>
            <div class="hx-form-group btn-box">
              <div class="hx-input-block">
                <input
                  type="button"
                  value="BIND ACCOUNT AND SIGN IN"
                  class="hx-btn loginsendform"
                  @click="onSubmit1"
                />
              </div>
            </div>
            <div class="hx-form-group btn-box">
              <div class="to-link-create" @click="showCreateFn(2)">
                No account yet, please register first ▶
              </div>
            </div>
          </div>
          <div class="p-reg-cr" v-if="show_create == 2">
            <div>
              <span class="to-lin-close" @click="showCreateFn(1)"
                >◀ Return To Sign In</span
              >
            </div>
            <formregs :api="2" :values="values" />
          </div>
        </div>
      </template>
    </Poverlay>
  </div>
</template>

<script>
import Message from "@/util/message.js";
import { loadJs } from "@/util/tools.js";
import Thirdlogin from "@/common/Thirdlogin.vue";
import Poverlay from "@/common/Poverlay.vue";
import HeaderLogin from "@/common/HeaderLogin";
import formregs from "./Formregs";
import { Toast } from "vant";
function foreach()
{
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  for(var i=0;i<arrCookie.length;i++)
 {
    var arr=arrCookie[i].split("=");
    if(arr.length>0)
    DelCookie(arr[0]);
 }
}
function GetCookieVal(offset)
{
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return decodeURIComponent(document.cookie.substring(offset, endstr));
}
function DelCookie(name)
{
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}
function GetCookie(name)
{
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen)
{
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return GetCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}
function clearCookie(){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
          document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
    }
}

export default {
  components: {
    Thirdlogin,
    Poverlay,
    HeaderLogin,
    formregs,
  },
  data() {
    return {
      values: {},
      show: false,
      show_create: 1,
      isMode: 2, //1 是第三方登录 2是本地登录
      clientId:
        "874283618921-a9c3846erj7e389qspa1qkakumgh4fs5.apps.googleusercontent.com",
      emailsu: "1",
      pwdsu: "1",
      youkeEmil: "1",
      youkeEmilmsg: "Required field",
      emailmsg: "Required field",
      passwordmsg: "Required field",
      checked: false,
      youkemail: "",
      loginList: [],
      formparms: {
        email: "",
        password: "",
      },
      formparm: {
        email: "",
      },
      db_selectlist: [],
    };
  },
  mounted() {
    if (this.$route.path) {
      this.$router.push({ path: "/login", query: {} });
    }
    clearCookie();
  },
  methods: {
    changeLoginApi() {
      this.isMode = 2;
    },
    showCreateFn(index) {
      this.show_create = index;
    },
    onSubmit1() {
      this.isMode = 1;
      this.onSubmit();
    },

    apiLoginCallback(values = {}) {
      this.show = !this.show;
      this.values = values;
    },
    clientIdFn(item) {
      // this.clientId = clientId
      if (item.name == "FaceBook") {
        this.handleFaceBookLogin(item);
      } else if (item.name == "Google") {
        if (document.querySelector("#google-client-id")) {
          document
            .querySelector("#google-client-id")
            .setAttribute(
              "content",
              "1029523934154-k3uv0e5ocbqt5b5vgudgbpvt60qp6bai.apps.googleusercontent.com"
            );
        }
        var googleUser = {};
        gapi.load("auth2", function () {
          // 1029523934154-k3uv0e5ocbqt5b5vgudgbpvt60qp6bai.apps.googleusercontent.com
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          auth2 = gapi.auth2.init({
            client_id:
              "1029523934154-k3uv0e5ocbqt5b5vgudgbpvt60qp6bai.apps.googleusercontent.com", //item.client_id, //客户端ID
            cookiepolicy: "single_host_origin",
            scope: "profile", //可以请求除了默认的'profile' and 'email'之外的数据
          });
        });
      }
    },

    handleFaceBookLogin() {
      window.fbAsyncInit = function () {
        FB.init({
          appId: item.app_id,
          cookie: true, //--{# 启用cookies以允许服务器访问会话 #}--
          xfbml: false, //--{# 是否显示按钮 #}--
          version: "v5.0",
        });
      };
      (function (d, s, id) {
        //--{# 异步加载SDK #}--
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      function facebookLogin() {
        FB.getLoginStatus(function (response) {
          if (response.status === "connected") {
            //--{# 如果已经登录FaceBook #}--
            auth_token = response.authResponse.accessToken;
            facebookLoginOnSuccess();
          } else {
            //--{# 未登录FaceBook #}--
            FB.login(function (response) {
              //--{# 弹出登录框 #}--
              if (response.authResponse) {
                //--{# 登录成功 #}--
                auth_token = response.authResponse.accessToken;
                facebookLoginOnSuccess();
              } else {
                console.log("User cancelled login or did not fully authorize.");
              }
            });
          }
        });
      }
      function facebookLoginOnSuccess() {
        //--{# 登录成功后调用 #}--
        FB.api(
          "/me",
          { fields: "first_name,last_name,name,id,email,picture" },
          function (response) {
            third_party_user_id = response.id;
            email = response.email;
            firstname = response.first_name;
            lastname = response.last_name;
            avatar = response.picture.data.url;
            type = "facebook";
            third_party_login();
          }
        );
      }
    },
    async statusChangeCallBack(response) {
      console.log(response, "--response");
      if (response.status === "connected") {
        var params = {
          id_token: response.authResponse.accessToken,
        };
        const res = await FaceBookCallBack(params);
        if (res.code === 0) {
          console.log("Facebook login success");
        }
      }
    },
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken, "tokesdasdasd"); //返回第三方结果信息 默认是全token 要用jsonwebtoken 解析
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    checkboxfn() {
      this.checked = !this.checked;
    },
    passwordfocus() {
      if (this.formparms.password == "") {
      } else if (this.formparms.password.length < 6) {
        this.pwdsu = "";
        this.passwordmsg = "Password must no be less than 6 bits";
      }
    },
    youkeEmilfocus() {
      if (this.youkeEmil == "") {
        this.youkeEmil = "";
        this.youkeEmilmsg = "Required field";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.youkeEmil)) {
        this.youkeEmil = "";
        this.youkeEmilmsg = "Please enter the correct email address";
      } else {
        this.youkeEmil = "1";
        this.youkeEmilmsg = "Required field";
      }
    },
    emailfn(val) {
      if (this.formparms.email !== "") {
        this.emailsu = "1";
      }
      // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      // if (!myreg.test(this.formparms.email)) {
      //   this.emailsu = "";
      //   this.emailmsg = "Please enter the correct email address";
      // } else {
      //   this.emailsu = "1";
      //   this.emailmsg = "Required field";
      // }
    },
    emailfocus() {
      if (this.formparms.email == "") {
        this.emailsu = "";
        this.emailmsg = "Required field";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.formparms.email)) {
        this.emailsu = "";
        this.emailmsg = "Please enter the correct email address";
      } else {
        this.emailsu = "1";
        this.emailmsg = "Required field";
      }
    },
    pwdfn(val) {
      this.pwdsu = "";
      if (this.formparms.password !== "") {
        this.pwdsu = "1";
        this.passwordmsg = "Required field";
      } //else {
      //   this.pwdsu = "";
      //   this.passwordmsg = "Password must no be less than 6 bits";
      // }
    },
    onSubmit() {
      // let {remember_me} = this.formparms
      if (this.formparms.email == "") {
        this.emailsu = "";
        this.emailmsg = "Required field";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.formparms.email)) {
        this.emailsu = "";
        this.emailmsg = "Please enter the correct email address";
        return false;
      } else {
        this.emailsu = "1";
      }
      if (this.formparms.password == "") {
        this.pwdsu = "";
        return false;
      } else if (this.formparms.password.length < 6) {
        this.pwdsu = "";
        this.passwordmsg = "Password must no be less than 6 bits";
        return false;
      }

      this.formparms["remember_me"] = this.checked == true ? 1 : 0;
      let _API = "";
      let _parms = {};
      if (this.isMode == 1) {
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
        // let third_party_login_data = null;
        // third_party_login_data[type]	string	是	登录方式 [google,facebook,twitter]
        // third_party_login_data[third_party_user_id]	string	是	第三方登录返回用户id
        // third_party_login_data[firstname]	string	否	名
        // third_party_login_data[lastname]	string	否	姓
        // third_party_login_data[email]	string	否	邮箱
        // third_party_login_data[avatar]	string	否	头像
        let arr = [
          "type",
          "third_party_user_id",
          "firstname",
          "lastname",
          "email",
          "avatar",
        ];
        arr.forEach((item) => {
          if (!obj[`third_party_login_data[${item}]`]) {
            obj[`third_party_login_data[${item}]`] = this.values[item];
          }
        });
        _parms = {
          ...obj,
          type: type,
          ...this.formparms,
        };
        _API = this.$Http.common.bindAccount;
      } else {
        _API = this.$Http.login.get_customer_info;
        _parms = this.formparms;
      }
      _API(_parms).then((res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          this.$Storage.setUserInfo(data);
          this.$Http.common.sessionConvertToCustomer({
            session_id: this.$Storage.getSessionId(),
          });
          if (this.$Storage.getAccessToken()) {
            this.$Http.common
              .getAllWishlistProductIds({ session_id: this.session_id })
              .then((res) => {
                let { code, data } = res;
                if (code == 200) {
                  this.$Storage.setWishlistIds(data);
                }
              });
            setTimeout(() => {
              this.$router.push({
                path: "/",
                query: {},
              });
            }, 300);
          }
        } else {
          Message.info({ msg: msg });
        }
      });
    },
    youkeEmilfn() {
      if (this.youkemail != "") {
        this.youkeEmil = "1";
      }
      // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      // if (!myreg.test(this.youkemail)) {
      //   this.youkeEmil = "";
      //   this.youkeEmilmsg = "Please enter the correct email address";
      // } else {
      //   this.youkeEmil = "1";
      //   this.youkeEmilmsg = "Required field";
      // }
    },
    onSubmitemin() {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (this.youkemail === "") {
        this.youkeEmil = "";
        this.youkeEmilmsg = "Required field";
        return false;
      }
      if (!myreg.test(this.youkemail)) {
        this.youkeEmil = "";
        this.youkeEmilmsg = "Please enter the correct email address";
        return;
      } else {
        this.youkeEmil = "1";
        this.youkeEmilmsg = "Required field";
      }
      this.$Http.login.guestLogin({ email: this.youkemail }).then((res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          this.$Storage.setUserInfo(data);
          this.$Http.common.sessionConvertToCustomer({
            session_id: this.$Storage.getSessionId(),
          });
          if (this.$Storage.getAccessToken()) {
            setTimeout(() => {
              this.$router.push("/");
            }, 300);
          }
        } else {
          Message.info({ msg: msg });
        }
      });
    },
  },

  async created() {
    this.emailsu = "1";
    this.pwdsu = "1";
    this.youkeEmil = "1";
    this.youkeEmilmsg = "Required field";
    this.emailmsg = "Required field";
    this.passwordmsg = "Required field";

    clearCookie();
    if (gapi && gapi.auth2) {
      var auth2 = gapi.auth2.getAuthInstance();
      console.log(auth2, "--auth2");
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
    }
    if (document.querySelector("#facebook-jssdk")) {
      if (FB) {
        FB.logout(function (response) {
          // Person is now logged out
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.login-overlay-1 {
  .van-nav-bar {
    padding: 0;
  }
  .p-add-con {
    margin-top: pxto2(170px);
    padding: 0 pxto2($px100);
  }
  .to-link-create {
    color: $yello;
    @include fontSize24();
    text-align: center;
  }
  .p-reg-cr {
    padding: 0 pxto2($px100);
    margin-top: pxto2(117px);
  }

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
  .to-lin-close {
    @include fontSize24();
    height: pxto2($px60);
    line-height: pxto2($px60);
    border-bottom: solid 1px $block;
    display: inline-block;
    margin-bottom: pxto2($px20);
  }
}
.login-api {
  width: pxto2($px60);
  height: pxto2($px60);
  margin-right: pxto2($px10);
  @include pointer();
}
.fomrloginspwd .forget-password {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.32rem;
  color: #bebebe;
  cursor: pointer;
  border-bottom: 1px solid #bebebe;
}
</style>
