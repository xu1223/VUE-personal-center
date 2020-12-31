<template>
  <div
    :style="{
      display: 'flex',
      alignItems: !account && 'baseline',
      justifyContent: account == 1 && 'center',
      flexWrap: 'wrap',
    }"
  >
    <img
      v-for="(item, index) in loginList"
      :src="item.image"
      :data-clinet-id="item.client_id"
      :data-id="item.id"
      :alt="item.name"
      class="login-api"
      @click="clientIdFn(item)"
      :key="index"
      style="display: none"
    />
    <div
      class="g-signin2"
      data-onsuccess="onSignIn"
      data-theme="dark"
      id="google-signin-button"
      v-if="!account"
    ></div>

    <div v-if="loginApi.facebook && !account" class="login-facebook">
      <img :src="loginApi.facebook.image" @click="handleFaceBookLogin" />
    </div>

    <div v-if="account == 1" class="login-api-aco">
      <div
        class="l-img"
        :d-id="loginApi.google && loginApi.google.is_bind == 1 ? 1 : ''"
      >
        <div
          class="g-signin2"
          data-onsuccess="onSignIn"
          data-theme="dark"
          id="google-signin-button"
        ></div>
      </div>
      <van-button
        :class="[
          loginApi.google && loginApi.google.is_bind == 1 ? 'p-active' : 'e',
        ]"
        :style="{
          color:
            loginApi.google && loginApi.facebook.is_bind == 1 ? '#fff' : '',
        }"
        @click="submitOut(loginApi.google)"
      >
        {{
          loginApi.google && loginApi.google.is_bind == 1
            ? "UNBIND"
            : "AUTHORIZE"
        }}
      </van-button>
    </div>
    <div
      v-if="loginApi.facebook && account == 1"
      class="login-api-aco"
      :d-id="loginApi.facebook && loginApi.facebook.is_bind == 1 ? 1 : ''"
    >
      <div class="l-img feac-img">
        <img :src="loginApi.facebook.image" @click="handleFaceBookLogin" />
      </div>
      <van-button
        :class="[
          loginApi.facebook && loginApi.facebook.is_bind == 1
            ? 'p-active'
            : 'e',
        ]"
        :style="{
          color:
            loginApi.facebook && loginApi.facebook.is_bind == 1
              ? '#fff'
              : 'block',
        }"
        @click="submitOut(loginApi.facebook)"
      >
        {{
          loginApi.facebook && loginApi.facebook.is_bind == 1
            ? "UNBIND"
            : "AUTHORIZE"
        }}
      </van-button>
    </div>
    <!-- <button
      class="login-third-btn facebook"
      type="button"
      @click="handleFaceBookLogin"
      style="dispplay: none"
    >
      Facebook
    </button> -->
  </div>
</template>

<script>
function ApiFebok(facebook_api = "") {
  setTimeout(() => {
    (function (d) {
      var js,
        id = "facebook-jssdk";
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement("script");
      js.id = id;
      js.async = true;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    })(window.document);
    window.fbAsyncInit = function () {
      FB.init({
        appId: facebook_api, //"2619777124768066", // 申请的appid
        cookie: true,
        xfbml: true,
        oauth: true,
        version: "v3.2",
      });
    };
  }, 500);
}
import { Toast } from "vant";
export default {
  name: "Thirdlogin",
  /* @desc:account 1 第三方  ; @author: zhangyunjiang;  @addDate: 2020-12-23 18:02:30 */
  props: ["account"],
  data() {
    return {
      loginList: [],
      loginApi: {},
      clientId: "",
      facebook_api: "",
    };
  },
  mounted() {
    this.fbecbok();
  },
  methods: {
    fbecbok() {
      const _self = this;
      ;(function (d) {
        var js,
          id = "facebook-jssdk";
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement("script");
        js.id = id;
        js.async = true;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        d.getElementsByTagName("head")[0].appendChild(js);
      })(window.document);
      window.fbAsyncInit = function () {
        console.log( _self.facebook_api,'-- _self.facebook_api')
       FB.init({
          appId:   _self.facebook_api || "1856477377838331", // 申请的appid 04ce78380f7e15595220a96535e8204e 1856477377838331
          cookie: true,
          xfbml: true,
          oauth: true,
          version: "v5.0",
        });
      };
      
    },
    /**
     * @method
     * @desc: 解绑
     * @author:  zhangyunjiang
     * @creatDate 2020-12-23 19:45:52
     * @param {*}  val
     */
    submitOut(item) {
      // console.log(item, "--item");
      let parms = {
        // third_party_user_id: item.id,
        type: item.name.toLowerCase(),
      };
      if (item.is_bind == 1) {
        this.$Http.common.unbindAccount(parms).then((res) => {
          const { code, msg = "" } = res;
          if (code == 200) {
            Toast(msg);
            this.initApiList();
          } else {
            Toast(msg);
          }
        });
      } else {
      }
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      const parms = {
        id: profile.getId(),
        third_party_user_id: profile.getId(),
        given_name: profile.getName(),
        lastname: profile.getGivenName(),
        firstname: profile.getFamilyName(),
        avatar: profile.getImageUrl(),
        email: profile.getEmail(),
        id_token: googleUser.getAuthResponse().id_token,
        type: "google",
      };
      if (this.account == 1) {
        this.$emit("change", parms);
      } else {
        this.$Http.common
          .thirdPartyLogin({
            type: "google",
            third_party_user_id: profile.getId(),
          })
          .then((res) => {
            const { bind_user = "" } = res.data;
            // third_party_login_data["type"] = type;
            // third_party_login_data["third_party_user_id"] = id;
            // third_party_login_data["firstname"] = family_name;
            // third_party_login_data["lastname"] = full_name;
            // third_party_login_data["email"] = email;
            // third_party_login_data["avatar"] = image_url;
            parms["bind_user"] = bind_user;
            this.$emit("change", parms);
            // console.log(res, "--res --google");
          });
        // Useful data for your client-side scripts:
        // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        // console.log("Full Name: " + profile.getName());
        // console.log("Given Name: " + profile.getGivenName());
        // console.log("Family Name: " + profile.getFamilyName());
        // console.log("Image URL: " + profile.getImageUrl());
        // console.log("Email: " + profile.getEmail());

        // // The ID token you need to pass to your backend:
        // var id_token = googleUser.getAuthResponse().id_token;
        // console.log("ID Token: " + id_token);
      }
    },
    clientIdFn() {},
    handleFaceBookLogin() {
      let vue_this = this;
      this.fbecbok();
      console.log( this.facebook_api,'== _self.facebook_api')
      if(!document.querySelector('#facebook-jssdk')) return false;
      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          //--{# 如果已经登录FaceBook #}--
          // auth_token = response.authResponse.accessToken;
          facebookLoginOnSuccess();
        } else {
          //--{# 未登录FaceBook #}--
          FB.login(function (response) {
            //--{# 弹出登录框 #}--
            if (response.authResponse) {
              //--{# 登录成功 #}--
              // auth_token = response.authResponse.accessToken;
              facebookLoginOnSuccess();
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          });
        }
      });
      function facebookLoginOnSuccess() {
        //--{# 登录成功后调用 #}--
        FB.api(
          "/me",
          { fields: "first_name,last_name,name,id,email,picture" },
          function (response) {
            // console.log(response, "--response--1");

            const parms = {
              id: response.id,
              third_party_user_id: response.id,
              given_name: "",
              lastname: response.last_name,
              firstname: response.first_name,
              avatar: response.picture.data.url,
              email: response.email,
              bind_user: "1",
              type: "facebook",
            };
            this.$emit("change", parms);
          }
        );
      }
    },
    initApiList() {
      let _API = "";
      if (this.account == 1) {
        _API = "getThirdPartyLoginWays";
      } else {
        _API = "getLoginWays";
      }
      this.$Http.common[_API]().then((res) => {
        const { data = {} } = res;
        this.loginApi = data;
        let _arr = [];
        if (!data.facebook) return;
        this.facebook_api = data.facebook.api_id;
        //   ApiFebok(data.facebook.app_id);
        for (var keys in data) {
          _arr.push(data[keys]);
        }
        this.loginList = _arr;
        if (
          document.querySelector("#google-signin-button") &&
          this.loginList.length > 0
        ) {
          setTimeout(() => {
            gapi.load("auth2", function () {}); // 加载auth2凭据
            gapi.signin2.render("google-signin-button", {
              //gapi.signin2.render渲染登录按钮
              onsuccess: this.onSignIn,
              // scope: 'email',
              width: 200,
              height: 50,
              longtitle: false,
              theme: "dark",
            });
          }, 200);
        }
      });
    },
  },
  created() {
    //   1029523934154-k3uv0e5ocbqt5b5vgudgbpvt60qp6bai.apps.googleusercontent.com
    if (document.querySelector("#google-client-id")) {
      const _gogle_id =
        "1029523934154-k3uv0e5ocbqt5b5vgudgbpvt60qp6bai.apps.googleusercontent.com";
      document
        .querySelector("#google-client-id")
        .setAttribute("content", _gogle_id);
    }
    this.initApiList();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.login-api-aco {
  width: pxto2(200px);
  .l-img {
    width: pxto2(140px);
    height: pxto2(140px);
    overflow: hidden;
    .abcRioButtonBlue {
      height: pxto2($px60) !important;
      width: pxto2($px60) !important;
    }
  }
}
</style>