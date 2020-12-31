<template>
  <div style="display: flex" :class="className">
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
    ></div>
    <div v-if="loginApi.facebook" class="login-facebook">
      <img :src="loginApi.facebook.image" @click="handleFaceBookLogin" />
    </div>
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
export default {
  name: "thirdlogin",
  props:['className'],
  data() {
    return {
      loginList: [],
      loginApi: {},
      clientId: "",
      facebook_api: "",
    };
  },
  mounted() {
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
        appId: "2619777124768066", // 申请的appid
        cookie: true,
        xfbml: true,
        oauth: true,
        version: "v3.2",
      });
    };
  },
  methods: {
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
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
          const parms = {
            id: profile.getId(),
            third_party_user_id: profile.getId(),
            given_name: profile.getName(),
            lastname: profile.getGivenName(),
            firstname: profile.getFamilyName(),
            avatar: profile.getImageUrl(),
            email: profile.getEmail(),
            id_token: googleUser.getAuthResponse().id_token,
            bind_user,
            type: "google",
          };
          this.$emit("change", parms);
          console.log(res, "--res --google");
        });
      // Useful data for your client-side scripts:
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
    clientIdFn() {},
    handleFaceBookLogin() {
      let vue_this = this;
      FB.login(
        function (response) {
          // get facebook user info
          // FB.api("/me?fields=id,name,picture", function(response) {
          //   // console.log('Good to see you, ' + response.name + '.')
          //   // console.log('picture=' + response.picture.data.url)
          // })
          // 登录回调函数
          vue_this.statusChangeCallBack(response);
        },
        { scope: "public_profile" }
      );
    },
    async statusChangeCallBack(response) {
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
    this.$Http.common.getLoginWays().then((res) => {
      const { data = {} } = res;
      this.loginApi = data;
      let _arr = [];
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
};
</script>

<style lang="scss" scoped>
</style>