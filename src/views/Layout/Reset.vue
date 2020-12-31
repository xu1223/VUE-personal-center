<template>
  <div>
  <HeaderLogin/>
    <div >
      <div class="user-login-container">
        <!-- 忘记密码 -->
        <div class="forget-password-row frame">
          <p class="tit">RESET PASSWORD</p>
          <span>Enter a new password</span>

          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Email</label>
            <div :class="['hx-input-block' , parms.email ? 'result-success' : 'result-error']">
              <input
                type="text"
                name="email"
                placeholder
                class="hx-input register_email"
                v-model="formparms.email"
                @input="emailfn"
              />
              <i class="iconfont" v-show="!parms.email"></i>
            </div>
            <em class="hx-form-tips" style="display: inline;" v-show="!parms.email">{{emailmsg}}</em>
          </div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Password</label>
            <div :class="['hx-input-block' , parms.password ? 'result-success' : 'result-error']">
              <input
                type="password"
                name="password"
                placeholder
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
            <em class="hx-form-tips" style="display: inline;" v-show="!parms.password">{{pawdmsg}}</em>
            <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
            password.</span>-->
          </div>
          <div class="hx-form-group hx-must">
            <label class="hx-form-label">Confirm password</label>
            <div :class="['hx-input-block' , parms.password2 ? 'result-success' : 'result-error']">
              <input
                type="password"
                name="password2"
                v-model="formparms.password2"
                placeholder
                autocomplete="off"
                data-isfocus="true"
                hx_form_focus="confirm_psw"
                @input="password2fn"
                class="hx-input password2 register_password2"
                @blur="password2blur"
              />
              <i class="iconfont" style="display: inline;" v-show="!parms.password2"></i>
            </div>
            <em class="hx-form-tips" style="display: inline;" v-show="!parms.password2">{{pawd2msg}}</em>
          </div>
          <div class="hx-form-group btn-box">
            <div class="hx-input-block">
              <button id="reset-password-btn" class="hx-btn" type="button" @click="Submit">CONTINUE</button>
            </div>
          </div>
          <!-- <a class="return-login" href="./user-login.html">RETURN TO THE LOGIN PAGE</a> -->
          <router-link class="return-login" to="/login">RETURN TO THE LOGIN PAGE</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from "vant";
import HeaderLogin from '@/common/HeaderLogin'
export default {
  data() {
    return {
      pawd2msg: "Required field",
      pawdmsg: "Required field",
      emailmsg: "Required field",
      parms: {
        email: "1",
        password: "1",
        password2: "1"
      },
      formparms: {
        email: "", //	string	是	邮箱
        password: "", //	string	是	密码
        password2: "", //	string	是	确认密码,
        token: ''
      },
      configObj:{}
    };
  },
  methods: {
  
    passwordblur() {
      if (this.formparms.password == "") {
        Toast("Password must no be less than 6 bits");
      }
    },
    password2blur() {
      if (this.formparms.password2 == "") {
        Toast("Password must no be less than 6 bits");
      }
    },
    emailfn() {
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
      this.parms.password = "";
      if (
        this.formparms.password !== "" &&
        this.formparms.password.length >= 6
      ) {
        this.parms.password = "1";
        this.pawdmsg = "Required field";
      } else {
        this.parms.password = "";
        this.pawdmsg = "Password must no be less than 6 bits";
      }
    },
    password2fn() {
      if (
        this.formparms.password2 !== "" &&
        this.formparms.password2.length >= 6
      ) {
        this.parms.password2 = "1";
        this.pawdmsg = "Required field";
      } else {
        this.parms.password2 = "";
        this.pawd2msg = "Password must no be less than 6 bits";
      }
      if (this.formparms.password2 != this.formparms.password) {
        this.parms.password2 = "";
        this.pawd2msg = " The inconsisency of two password inputs";
      }
    },
    Submit() {
      let { email, password, password2,token} = this.formparms;
      if (email === "") {
        this.parms.email = "";
        return false;
      } else if (password === "") {
        this.parms.password = "";
        return false;
      } else if (password2 === "") {
        this.parms.password2 = "";
        return false;
      }

      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(email)) {
        this.parms.email = "";
        Toast("Please enter the correct email adderss");
        return false;
      } else {
        this.parms.email = "1";
      }
      if (password2 != password) {
        this.parms.password2 = "";
        return false;
      }
    //   email	string	是	邮箱
    //     token	string	是	token,邮箱重置密码链接附带
    //     new_password	string	是	新密码
    //     confirm_password	string	是	确认密码

        let objParms = {
            email,
            token,
            new_password:password,
            confirm_password: password2
        }
        this.$Http.login.resetPassword({...objParms}).then(res=>{
           let  {code,data,msg} = res;
            if(code == 200){
                Toast(msg);
                setTimeout(()=>{
                    this.$route.push('/login')
                },300)
            }else{
              Toast(msg);
            }
        })
        
    }
  },
  created () {
      if(window.location.href.indexOf('token=')!=-1){
        this.formparms.token=window.location.href.split('token=')[1];
      }
  },
  components:{
    HeaderLogin
  }
};
</script>

<style lang="scss" scoped>
.login-header {
  height: 40px;
  border: solid 1px red;
  .logo-box {
    display: block;
    width: 2.13333rem;
    height: 0.93333rem;
  }
}
.user-login-container {
  /* display: none; */
  background-color: #fff;
  padding: 0.8rem;
}
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
.login-conts {
  position: relative;
  background: rgb(255, 255, 255);
  padding-bottom: 0.2rem;
  // margin-top: 1.6rem;
  .nav-box {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }
  .user-login-container .nav-box span.active {
    color: #161616;
    border-color: #161616;
  }
  .nav-box span {
    cursor: pointer;
    font-size: 0.32rem;
    color: #bfbfbf;
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
  }
}
.index-header .logo-box img {
  /* width: 100%; */
  height: 100%;
}
.index-header .icon-box img {
  width: 0.42667rem;
  height: 0.42667rem;
  cursor: pointer;
}
.fonrm-logins {
  position: absolute;
  top: 2vh;
  left: 0;
  /* margin-right: 100%; */
  width: 100%;
}
.index-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 996;
  padding: 10px 0.53333rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
  height: 1.2rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
.index-header .logo-box {
  display: block;
  width: 2.13333rem;
  height: 0.93333rem;
}
.index-header .icon-box img {
  width: 0.42667rem;
  height: 0.42667rem;
  cursor: pointer;
}
.flex1 {
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
</style>