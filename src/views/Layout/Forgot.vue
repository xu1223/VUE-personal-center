<template>
  <div>
    <van-nav-bar
      title="Forgot"
      @click-left="onClickLeft"
      fixed
      z-index="2000"
      @click-right="onClickRight"
    >
      <i
        class="iconfont iconLQYfanhui p-lt"
        slot="left"
        style=" font-size: 0.53333rem;color: #161616;"
      ></i>
      <a
        slot="title"
        href="javascript:void(0)"
        style="width: 5.5rem; display: flex; margin-top: 0.12rem; justify-content: center; align-items: center;"
      >
        <img
          :src="config.logo_m"
          :alt="config.site ? config.site.name : ''"
          style="max-width: 100%; max-height: 35px;"
           @click="LINKURL"
        />

      </a>
      <a class="phone" href="tel:+" rel="nofollow" slot="right">
         <i class="icon-info-bg icon-phone-icon"></i>
      </a>
    </van-nav-bar>
    <div style="margin-top:1.5rem;">
      <div class="user-login-container">
        <div class="forget-password-row frame">
          <p class="tit">FORGOT YOUR PASSWORD?</p>
          <span>
            Please enter your contact details below and you will receive it later
            Reset the password link.
          </span>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Email</label>
            <div :class="['hx-input-block' , isemail ? 'result-success' : 'result-error']">
              <input
                type="text"
                name="email"
                placeholder=""
                class="hx-input"
                v-model="parms.email"
                @input="isemailfn"
                @blur="isemailblur"
              />
              <i class="iconfont" v-show="!isemail"></i>
            </div>
            <em class="hx-form-tips" style="display:block" v-show="!isemail">{{emailmsg}}</em>
          </div>

          <div class="hx-form-group btn-box">
            <div class="hx-input-block">
              <button
                id="reset-password-btn"
                class="hx-btn"
                type="button"
                @click="onSubmit"
              >CONTINUE</button>
            </div>
          </div>
          <!-- <a class="return-login" href="./user-login.html">RETURN TO THE LOGIN PAGE</a> -->
          <router-link class="return-login" to="/login">RETURN TO THE LOGIN PAGE</router-link>
          <!-- <a class="return-login" href="./user-login.html">RETURN TO THE LOGIN PAGE</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { sendParamInUrl } from "@/util/tools";
import {mapState} from 'vuex';
export default {
  data() {
    return {
      isemail: "1",
      emailmsg: "Required field",
      parms: {
        email: ""
      },
      configObj: {}
    };
  },
   computed: {
    ...mapState({
      config(state){
        return state.common.config ? state.common.config : {}
      }
    })
   },
  methods: {
    isemailfn() {
      if (this.parms.email !== "") {
        this.isemail = "1";
      }
      // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      // if (!myreg.test(this.parms.email)) {
      //   this.isemail = "";
      //   this.emailmsg = "Please enter the correct email address";
      // } else {
      //   this.isemail = "1";
      //   this.emailmsg = "Mailbox Input Error";
      // }
    },
    isemailblur(){
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.parms.email)) {
        this.isemail = "";
        this.emailmsg = "Please enter the correct email address";
      } else {
        this.isemail = "1";
        this.emailmsg = "Required field";
      }
    },
    LINKURL(){
      sendParamInUrl({page: 'index'});
    },
    onClickLeft() {
      window.history.back(-1);
    },
    onClickRight() {},
    onSubmit() {
      if (this.parms.email == "") {
        this.isemail = "";
        return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.parms.email)) {
        this.isemail = "";
        this.emailmsg = "Please enter the correct email address";
        return;
      } else {
        this.isemail = "1";
      }
      this.$Http.login.sendResetPasswdToEmail({
          ...this.parms
        }).then(res=>{
           let {code,msg} = res;
          if (code == 200) {
            Toast('Mail has been sent to your mailbox');
          } else {
            Toast(msg);
          }
        })
    }
  },
  created() {
  
  }
};
</script>

<style lang="scss" scoped>
.user-login-container {
  /* display: none; */
  background-color: #fff;
  padding: 0.8rem;
  .forget-password-row > .tit {
    font-family: "SH-Medium";
    font-size: 0.32rem;
    color: #252525;
  }

  .forget-password-row > span {
    font-size: 0.32rem;
    line-height: 0.32rem;
    display: block;
    color: #363636;
    margin: 0.66667rem 0 0.93333rem;
  }
  .forget-password-row .return-login {
    display: block;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: 0 auto;
    font-size: 0.32rem;
    color: #020202;
    cursor: pointer;
    border-bottom: 1px solid #020202;
  }
  
}
.phone img {
    width: 0.42667rem;
    height: 0.42667rem;
    cursor: pointer;
  }
</style>