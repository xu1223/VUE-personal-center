<template>
  <div :class="[isMode == 1 ? 'login-container-api' : 'login-container']">
    <img src="@/assets/img/log-banner.jpg" v-if="isMode == 2" />
    <v-tabs active-tab-key="0" v-if="isMode == 2">
      <v-tab-pane tab-key="0" tab="SIGN IN">
        <v-form direction="horizontal" :model="formLogin" ref="formLogin" :rules="rulesLogin">
          <v-form-item label="Email Address" :label-col="labelCol" :wrapper-col="wrapperCol" prop="email" has-feedback >
            <v-input type="email" v-model="formLogin.email" placeholder></v-input>
          </v-form-item>
          <v-form-item label="Password" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password" has-feedback >
            <v-input type="password" v-model="formLogin.password" placeholder></v-input>
          </v-form-item>
          <router-link :to="{ path: '/forget' }" class="login-tips">Forgot your password ?</router-link>
          <v-button class="button" @click="loginSubmit('formLogin')" :loading="loading">SIGN IN</v-button>
        </v-form>
        <p class="login-or">Or</p>
        <Thirdlogin @change="apiLoginCallback" :className="'api-login-reg'" />
        <!--<a class="login-google flex"><img src="@/assets/img/google.png"/>Sign in with Google</a>-->
      </v-tab-pane>
      <v-tab-pane tab-key="1" tab="REGISTER">
        <v-form direction="horizontal" :model="formRegister" ref="formRegister" :rules="rulesRegister">
          <v-form-item
            label="Email Address"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="email"
            has-feedback
          >
            <v-input
              type="email"
              v-model="formRegister.email"
              placeholder
            ></v-input>
          </v-form-item>
          <div>
            <v-form-item
              label="Password"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="password"
              has-feedback
            >
              <v-input
                type="password"
                v-model="formRegister.password"
                placeholder
              ></v-input>
            </v-form-item>
            <v-form-item
              label="Confirm Password"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="password2"
              has-feedback
            >
              <v-input
                type="password"
                v-model="formRegister.password2"
                placeholder
              ></v-input>
            </v-form-item>
          </div>
          <v-button class="button" @click="registerSubmit('formRegister')" :loading="loading">
            REGISTER
          </v-button>
          <v-checkbox
            v-model="formRegister.subscribe"
            :true-value="1"
            :false-value="0"
            >Sign up for newsletter.</v-checkbox
          >
          <p>
            By registering, you agree to our <em>Privacy Policy</em> and
            <em>Terms Of Service</em>.
          </p>
          <v-form-item
            style="margin-top: 50px"
            label="Choose Customer Service"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="manager_id"
            has-feedback
          >
            <ul class="flex2 managers">
              <li
                v-for="(item, index) in all_managers"
                :key="index"
                :class="formRegister.manager_id == item.id ? 'active' : ''"
                @click="formRegister.manager_id = item.id"
              >
                {{ item.name }}
              </li>
            </ul>
          </v-form-item>
        </v-form>
      </v-tab-pane>
    </v-tabs>
    <div v-if="isMode == 1">
      <div class="api-login-login" v-if="isShow == 2">
        <v-form
          direction="horizontal"
          :model="formLogin"
          ref="formLogin"
          :rules="rulesLogin"
        >
          <v-form-item
            label="Email Address"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="email"
            has-feedback
          >
            <v-input
              type="email"
              v-model="formLogin.email"
              placeholder
            ></v-input>
          </v-form-item>
          <v-form-item
            label="Password"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="password"
            has-feedback
          >
            <v-input
              type="password"
              v-model="formLogin.password"
              placeholder
            ></v-input>
          </v-form-item>
          <router-link :to="{ path: '/forget' }" class="login-tips"
            >Forgot your password ?</router-link
          >
          <v-button
            class="button"
            @click="loginSubmit('formLogin')"
            :loading="loading"
          >
            BIND ACCOUNT AND SIGN IN
          </v-button>
          <div class="hx-form-group btn-box">
            <div class="to-link-create" @click="showCreateFn(3)">
              <span> No account yet, please register first ▶</span>
            </div>
          </div>
        </v-form>
      </div>
      <div class="api-login-res" v-if="isShow == 3">
        <div class="p-reg-cr">
          <span class="to-lin-close" @click="showCreateFn(2)"
            >◀ Return To Sign In</span
          >
        </div>
        <v-form
          direction="horizontal"
          :model="formRegister"
          ref="formRegister"
          :rules="rulesRegister"
        >
          <v-form-item
            label="Email Address"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="email"
            has-feedback
          >
            <v-input
              type="email"
              v-model="formRegister.email"
              placeholder
            ></v-input>
          </v-form-item>
          <div>
            <v-form-item
              label="Password"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="password"
              has-feedback
            >
              <v-input
                type="password"
                v-model="formRegister.password"
                placeholder
              ></v-input>
            </v-form-item>
            <v-form-item
              label="Confirm Password"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              prop="password2"
              has-feedback
            >
              <v-input
                type="password"
                v-model="formRegister.password2"
                placeholder
              ></v-input>
            </v-form-item>
          </div>
          <button class="button" @click="registerSubmit('formRegister')">
            BIND ACCOUNT AND SIGN IN
          </button>
          <v-checkbox
            v-model="formRegister.subscribe"
            :true-value="1"
            :false-value="0"
            >Sign up for newsletter.</v-checkbox
          >
          <p>
            By registering, you agree to our <em>Privacy Policy</em> and
            <em>Terms Of Service</em>.
          </p>
          <v-form-item
            style="margin-top: 50px"
            label="Choose Customer Service"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            prop="manager_id"
            has-feedback
          >
            <ul class="flex2 managers">
              <li
                v-for="(item, index) in all_managers"
                :key="index"
                :class="formRegister.manager_id == item.id ? 'active' : ''"
                @click="formRegister.manager_id = item.id"
              >
                {{ item.name }}
              </li>
            </ul>
          </v-form-item>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import FormRules from "@/util/form_mixins";
import toolsMix from "@/util/tools_mixins";
import Thirdlogin from "@/components/Thirdlogin.vue";
//清除所有cookie函数
function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  // console.log("需要删除的cookie名字：" + keys);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie =
        keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
  }
}

export default {
  components: {
    Thirdlogin,
  },
  data() {
    const rulesLogin = this.getRulesLogin();
    const rulesRegister = this.getRulesRegister();
    return {
      loading: false,
      values: {},
      isMode: 2, //1是第三方 2本地登录
      isShow: 1, //1正常登录 2 第三方登录 3注册
      formLogin: {
        email: "",
        password: "",
      },
      formRegister: {
        email: "",
        password: "",
        password2: "",
        manager_id: 1,
        subscribe: 1,
      },
      all_managers: [],
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
      rulesLogin,
      rulesRegister,
    };
  },
  mixins: [FormRules, toolsMix],
  methods: {
    showCreateFn(index) {
      this.isShow = index;
    },
    apiLoginCallback(values = {}) {
      console.log(values, "values");
      this.isMode = 1;
      this.isShow = 2;
      this.values = values;
    },
    /*登录*/
    loginSubmit(forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          this.loading = true;
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
            let _parms = {
              ...obj,
              type: type,
              ...this.formLogin,
            };
            this.$Http.common.bindAccount(_parms).then((res) => {
              this.loading = false;
              let { code, data, msg } = res;
              if (code == 200) {
                this.$storage.setUserInfo(data);
                if (this.$storage.getAccessToken()) {
                  this.$Http.common
                    .getAllWishlistProductIds()
                    .then((options) => {
                      let { code, data } = options;
                      if (code == 200) {
                        this.$storage.setWishlistIds(data);
                      }
                    });
                  this.getTotalCartWishCount();
                  setTimeout(() => {
                    this.$router.push({
                      path: "/",
                      query: {},
                    });
                  }, 300);
                }
              } else {
                this.$notification.open({
                  message: "Tips",
                  description: msg,
                  duration: 2,
                });
              }
            });
          } else {
            this.$Http.login.getCustomerInfo(this.formLogin).then((res) => {
              this.loading = false;
              let { code, data, msg } = res;
              if (code == 200) {
                this.$storage.setUserInfo(data);
                if (this.$storage.getAccessToken()) {
                  this.$Http.common
                    .getAllWishlistProductIds()
                    .then((options) => {
                      let { code, data } = options;
                      if (code == 200) {
                        this.$storage.setWishlistIds(data);
                      }
                    });
                  this.getTotalCartWishCount();
                  setTimeout(() => {
                    this.$router.push({
                      path: "/",
                      query: {},
                    });
                  }, 300);
                }
              } else {
                this.$notification.open({
                  message: "Tips",
                  description: msg,
                  duration: 2,
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*注册*/
    registerSubmit(forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isMode == 1) {
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
              type: type,
              ...this.formparms,
            };
            this.$Http.common.register(_parms).then((res) => {
              let { code, data, msg } = res;
              this.loading=false;
              if (code == 200) {
                this.$Storage.setUserInfo(data);
                this.$router.push("/");
              } else {
                this.$notification.open({
                  message: "Tips",
                  description: msg,
                  duration: 2,
                });
              }
            });
          } else {
            this.$Http.login.register(this.formRegister).then((res) => {
              let { code, data, msg } = res;
              this.loading=false;
              if (code == 200) {
                this.$storage.setUserInfo(data);
                setTimeout(() => {
                  this.$router.push("/");
                }, 300);
              } else {
                this.$notification.open({
                  message: "Tips",
                  description: msg,
                  duration: 2,
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getManagers() {
      this.$Http.login.getAllManagers().then((res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          data.sort(function (a, b) {
            return Math.random() - 0.5;
          });
          this.all_managers = data;
          this.formRegister.manager_id = data[0].id;
        }
      });
    },
  },
  created() {
    clearAllCookie();
    this.getManagers();
    if(FB){
        FB.logout(function(response) {
              console.log("用户已退出");
        })
    }
    if(gapi && gapi.auth2){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  },
};
</script>

<style lang="less" scoped>
.api-login-reg {
  .login-facebook {
    height: 50px;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
}
.login-container,
.login-container-api {
  display: grid;
  grid-template-columns: 37.5% 62.5%;
  > img {
    width: 100%;
  }
  > div {
    background: #f4f4f6;
    width: 500px;
    margin: 10% 0 0 12%;
    /deep/ .ant-tabs-nav {
      width: 100%;
      .ant-tabs-ink-bar {
        display: none;
      }
      .ant-tabs-tab {
        width: 50%;
        text-align: center;
        font-size: 16px;
        color: #333;
        border-bottom: 3px solid #15141e;
        margin: 0;
      }
      .ant-tabs-tab-active {
        background: #15141e;
        color: #fff;
      }
    }
    button {
      background: #0c0a26;
      color: #fff;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: 100%;
      font-weight: 550;
      font-size: 16px;
      margin-top: 35px;
    }
    .login-tips {
      color: #999999;
      font-size: 12px;
      text-decoration: underline;
      text-align: right;
      display: block;
    }
    .login-or {
      position: relative;
      font-size: 16px;
      text-align: center;
      margin: 40px 0;
      &::before,
      &::after {
        position: absolute;
        content: "";
        background: #7c7c84;
        width: 46%;
        height: 1px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .login-google {
      width: 400px;
      height: 60px;
      background: #ffffff;
      border: 1px solid #e6e6e6;
      margin: auto;
      font-size: 14px;
      color: #7c7c84;
      img {
        margin-right: 20px;
      }
    }
    .ant-checkbox-wrapper {
      margin: 10px 0;
    }
    em {
      color: #00d8ff;
    }
  }
}
.login-container-api {
  display: block;
  margin: 100px auto;
  width: 500px;
  .to-link-create {
    color: #ff6000;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
    span {
      border-bottom: solid 1px #ff6000;
      height: 30px;
      display: inline-block;
    }
  }
  .p-reg-cr {
    font-size: 16px;
    color: #333333;
    margin-bottom: 30px;
    span {
      cursor: pointer;
      border-bottom: solid 1px #333;
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>