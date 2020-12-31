<template>
  <div>
    <template v-for="(item, index) in loginList">
      <img
        v-if="item.name == 'Google'"
        :src="item.image"
        :data-clinet-id="item.client_id"
        :data-id="item.id"
        :alt="item.name"
        class="login-api"
        :id="item.name == 'Google' ? 'google-signin-button1' : ''"
        :key="index"
      />
    </template>
    <div id="google-signin-button"></div>

    <button id="twitter" @click="login()" class="profile">twitter</button>

    <button
      class="login-third-btn facebook"
      type="button"
      @click="handleFaceBookLogin"
    >
      Facebook
    </button>
    <fb-signin-button
      :params="fbSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >
      Sign in with Facebook
    </fb-signin-button>
  </div>
</template>

<script>
import hello from "hellojs/dist/hello.all.js";

export default {
  data() {
    return {
      loginList: [],
      fbSignInParams: {
        scope: 'first_name,last_name,name,id,email,picture',
        return_scopes: true
      }
    };
  },
  mounted() {
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1856477377838331',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v5.0' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
   if(FB){
      FB.logout(function(response) {
            console.log("用户已退出");
      })
    }
    this.twws();
  },
  methods: {
     onSignInSuccess (response) {
      //  console.log(response,'--response')
      FB.api('/me', dude => {
        console.log(`Good to see you, ${dude.name}.`)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    twws() {
      hello.init(
        {
          twitter: "REm8KjWsthsmKXZoVIYXNn1qqy",
        },
        {
          scope: "email",
          //   redirect_uri: "http://localhost:5000/",
        }
      );
    },
    login() {
      hello("twitter").login();
      // Listen to signin requests
      hello.on("auth.login", function (r) {
        // Get Profile
        hello(r.network)
          .api("/me")
          .then(function (p) {
            window.console.log(p); //输出用户信息
          });
      });
    },

    clientIdFn() {},
    onSignIn(user) {
      const profile = user.getBasicProfile(); // 用户登录信息
      console.log(profile, "--profile");
      console.log("ID: " + profile.getId());
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      var id_token = user.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
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
    this.$Http.common.getLoginWays().then((res) => {
      const { data = {} } = res;
      let _arr = [];
      for (var keys in data) {
        _arr.push(data[keys]);
      }
      this.loginList = _arr;
      if (
        document.querySelector("#google-signin-button") &&
        this.loginList.length > 0
      ) {
        // setTimeout(() => {
        //   if(gapi){
        //     gapi.load("auth2", function () {}); // 加载auth2凭据
        //     gapi.signin2.render("google-signin-button", {
        //       //gapi.signin2.render渲染登录按钮
        //       onsuccess: this.onSignIn,
        //       // scope: 'email',
        //       width: 200,
        //       height: 50,
        //       longtitle: false,
        //       theme: "dark",
        //     });
        //   }
          
        // }, 200);
      }
      console.log(this.loginList, "--this.loginList");
    });
  },
};
</script>

<style lang="scss" scoped>
</style>