<template>
  <div>
    <HeaderTab />
    <div class="my_message">
      <div class="user-security">
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Old Password</label>
          <div :class="['hx-input-block' , old_passwordsu ? 'result-success' : 'result-error']">
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
            style="display: inline;"
            v-show="!old_passwordsu"
          >{{old_passwordsumsg}}</em>
          <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
          password.</span>-->
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">New Password</label>
          <div :class="['hx-input-block' , new_passwordsu ? 'result-success' : 'result-error']">
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
            style="display: inline;"
            v-show="!new_passwordsu"
          >{{new_passwordmsg}}</em>
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Password Confirmation</label>
          <div :class="['hx-input-block' , confirm_passwordsu ? 'result-success' : 'result-error']">
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
            style="display: inline;"
            v-show="!confirm_passwordsu"
          >{{confirm_passwordsg}}</em>
          <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
          password.</span>-->
        </div>
        <div class="hx-form-group btn-box box-up">
          <div class="hx-input-block flex-center">
            <input type="submit" class="hx-btn" value="TO UPDATE" @click="onSubmit" />
            <button
              class="hx-btn hx-btn-primary cancel-btn"
              type="button"
              @click="onClickLeft"
            >CANCEL</button>
          </div>
        </div>
      </div>

      <van-form @submit="onSubmit" style="display:none">
        <van-field
          v-model="formparms.old_password"
          name="old_password"
          type="password"
          label="Old password:"
          placeholder="Old password"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />
        <van-field
          v-model="formparms.new_password"
          type="password"
          name="new_password"
          label="New Confirmation:"
          placeholder="New Confirmation"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <van-field
          v-model="formparms.confirm_password"
          type="password"
          name="new_password"
          label="Password Confirmation:"
          placeholder="Password Confirmation"
          :rules="[{ required: true, message: 'Required field' }]"
          class="fomrlogins"
          required
        />

        <div style="margin: 10px; 0" class="formlogins-btn">
          <!-- <van-button round block type="info" >提交</van-button> -->
          <van-button
            type="primary"
            block
            native-type="submit"
            color="#252525"
            class="user-logins-btn"
          >TO UPDATE</van-button>
          <a class="hx-btn hx-btn-primary cancel-btn" @click="onClickLeft">CANCEL</a>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import HeaderTab from "@/components/HeaderTab";
export default {
  data() {
    return {
      old_passwordsu: "1",
      new_passwordsu: "1",
      confirm_passwordsu: "1",
      old_passwordsumsg: "Required field",
      new_passwordmsg: "Required field",
      confirm_passwordsg: "Required field",
      formparms: {
        old_password: "",
        new_password: "",
        confirm_password: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
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
      this.$Http.login.changePasswd({...this.formparms}).then(res=>{
         let {code,msg} = res;
          if (code == 200) {
            this.$router.push("/login");
          } else {
            Toast(msg);
          }
      })
    }
  },
  components: {
    HeaderTab
  }
};
</script>

<style lang="scss" scoped>
.user-security {
  background: #fff;
  padding: 0.53333rem;
}
</style>