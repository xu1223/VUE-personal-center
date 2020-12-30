<template>
  <div class="reset-container">
      <v-form class direction="horizontal" :model="formPassword" ref="formPassword" :rules="resetRules">
        <v-form-item label="Email" :label-col="labelCol" :wrapper-col="wrapperCol" prop="email" has-feedback>
          <v-input  type="email" v-model="formPassword.email" placeholder></v-input>
        </v-form-item>
        <v-form-item label="New Password" :label-col="labelCol" :wrapper-col="wrapperCol" prop="new_password" has-feedback>
          <v-input type="password" v-model="formPassword.new_password" placeholder></v-input>
        </v-form-item>
        <v-form-item label="Password Confirmation" :label-col="labelCol" :wrapper-col="wrapperCol" prop="confirm_password" has-feedback>
          <v-input type="password" v-model="formPassword.confirm_password" placeholder></v-input>
        </v-form-item>
        <hr>
        <button class="button" @click="submitForm('formPassword')">SUBMIT</button>
      </v-form>
  </div>
</template>
<script>
import FormRules from "@/util/form_mixins";
export default {
  data() {
    const resetRules = this.getRulesByConfig(['email','new_password','confirm_password']);
    return {
      resetRules,
      formPassword: {
        email:'',
        token:'',
        new_password:'',
        confirm_password:''
      },
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      }
    };
  },
  mixins: [FormRules],
  methods: {
    submitForm(forms) {
      this.$refs[forms].validate(valid => {
        if (valid) {
          this.$Http.login.resetPassword(this.formPassword).then(res => {
            let { code, msg } = res;
            if (code == 200) {
              this.$notification.open({
                message: "Tips",
                description:msg,
                duration:1
              });
              setTimeout(() => {
               this.$router.push({
                  path: "/login"
                });
              }, 2000);
            } else {
              this.$notification.open({
                message: "Tips",
                description:msg,
                duration: 2
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    if(window.location.href.indexOf('token=')!=-1){
      this.formPassword.token=window.location.href.split('token=')[1];
    }
  }
};
</script>
<style lang="less" scoped>
.reset-container{
  width: 500px;
  margin: 150px auto;
  button{
    width: 90px;
    height: 30px;
    margin: auto;
  }
}
</style>