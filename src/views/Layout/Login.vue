<template>
  <div class="pers-login" >
    <!-- <van-nav-bar title="登录" fixed /> -->
    <HeaderLogin :isOut="true" />
    <div class="login-conts pers-login-conts">
      <div class="nav-box">
        <span
          data-hx-tab
          :class="[currindex == 1 ? 'active' : '']"
          @click="currindexFn(1)"
          >Sign in</span
        >
        <span
          data-hx-tab
          :class="[currindex == 2 ? 'active' : '']"
          @click="currindexFn(2)"
          >Register</span
        >
      </div>
      <div v-if="currindex == 1">
        <formlogin />
      </div>
      <div v-if="currindex == 2">
        <formregs />
      </div>
    </div>
  </div>
</template>

<script>
import formlogin from "./Formlogin";
import formregs from "./Formregs";
import { mapState } from "vuex";
import HeaderLogin from "@/common/HeaderLogin";
export default {
  data() {
    return {
      active: "login", // reg  login
      checked: false,
      currindex: 1,
      formparms: {
        username: "",
        password: "",
      },

      configObj: {},
    };
  },
  methods: {
    currindexFn(index) {
      this.currindex = index;
    },
    regsfn() {
      location.reload();
    },
    onSubmit() {
      this.$router.push("/");
    },
    show1() {
      setTimeout(() => {
        this.show = true;
      }, 400);
    },
    inputNone() {
      document.activeElement.blur();
    },
    login() {
      if (this.username == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.password == "") {
        this.$toast("密码不能为空");
        return false;
      }
    },
  },
  computed: {
    ...mapState({
      config(state) {
        return state.common.config ? state.common.config : {};
      },
    }),
  },
  created() {
    //进入页面清除
    this.$Storage.removeUserInfo();
    this.$Storage.removeWishlistIds();
  },
  components: {
    formregs,
    formlogin,
    HeaderLogin,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/_var.scss';
@import '@/assets/style/mixins.scss';
.pers-login{
  background:$withe;
      &-conts{
          // padding: ($height60 / $num2) ($height100/ $num2);
          padding: (pxto2($height60)) (pxto2($height100));
          .nav-box{
            @include textCenter();
            font-size: pxto2($font30);
            span{
                color:$info-1;
                margin: 0 10px;
                &.active{
                  color:$block;
                }
            }
          }
      }
      .login-header {
          height: $height40 / 2;
      }
}

// .login-header {
//   height: 40px;
//   border: solid 1px red;
//   .logo-box {
//     display: block;
//     width: 2.13333rem;
//     height: 0.93333rem;
//   }
// }
// .login-conts {
//   position: relative;
//   background: rgb(255, 255, 255);
//   padding-bottom: 0.2rem;
//   // margin-top: 1.6rem;
//   .nav-box {
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-align: center;
//     align-items: center;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     margin-bottom: 0.8rem;
//   }
//   .user-login-container .nav-box span.active {
//     color: #161616;
//     border-color: #161616;
//   }
//   .nav-box span {
//     cursor: pointer;
//     font-size: 0.32rem;
//     color: #bfbfbf;
//     padding-bottom: 5px;
//     border-bottom: 2px solid transparent;
//     transition: all 0.2s;
//     -webkit-transition: all 0.2s;
//     -moz-transition: all 0.2s;
//     -ms-transition: all 0.2s;
//     -o-transition: all 0.2s;
//   }
// }
// .index-header .logo-box img {
//   /* width: 100%; */
//   height: 100%;
// }
// .index-header .icon-box img {
//   width: 0.42667rem;
//   height: 0.42667rem;
//   cursor: pointer;
// }
// .fonrm-logins {
//   position: absolute;
//   top: 2vh;
//   left: 0;
//   /* margin-right: 100%; */
//   width: 100%;
// }
// .index-header {
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 996;
//   padding: 10px 0.53333rem;
//   text-align: center;
//   background-color: #fff;
//   box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
//   height: 1.2rem;
//   display: -ms-flexbox;
//   display: flex;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   -ms-flex-align: center;
//   align-items: center;
// }
// .index-header .logo-box {
//   display: block;
//   width: 2.13333rem;
//   height: 0.93333rem;
// }
// .index-header .icon-box img {
//   width: 0.42667rem;
//   height: 0.42667rem;
//   cursor: pointer;
// }
// .flex1 {
//   display: -ms-flexbox;
//   display: flex;
//   display: -webkit-flex;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   -ms-flex-align: center;
//   align-items: center;
// }
</style>
