<template>
    <v-form direction="horizontal" :model="forms" ref="forms" class="forget-forms">
      <b>Forgot your password?</b>
      <span>Please enter your email address below to receive a password reset link.</span>
      <hr>
      <v-form-item label="Email" prop="email" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback
        :rules="[{ required: true, message: 'Required field', trigger: 'blur' },
                 { type: 'email', message: 'Please enter the correct email address', trigger: 'blur' }]">
        <v-input type="email" size="default" v-model="forms.email" placeholder></v-input>
        <v-button type="primary" @click.prevent="submitForm('forms')">SUBMIT</v-button>
      </v-form-item>
      <router-link :to="{path:'/login'}">Back to Login >></router-link>
    </v-form>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      forms: {},
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 17
      }
    };
  },
  methods: {
    submitForm(forms) {
      this.$refs[forms].validate(valid => {
        if (valid) {
          this.$Http.login.sendResetPasswdToEmail({email:this.forms.email }).then(res => {
            let { code, data, msg } = res;
            if (code == 200) {
              this.$notification.open({
                message: "Tips",
                description: "Check your email to  reset your password",
                duration: 2
              });
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            } else {
              this.$notification.open({
                message: "Tips",
                description: msg,
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
  }
};
</script>
<style lang="less" scoped>
.forget-forms{
  width: 550px;
  margin: 240px auto;
  b{
    color:#FF6000;
    font-size:16px;
    display: block;
    font-weight: 550;
  }
  span{
    display: block;
    color:#999;
    margin-top: 6px;
    font-size:14px;
  }
  button{
    position: absolute;
    height: 50px;
    background:#0C0A26;
    border-color:#0C0A26;
    margin-left: 10px;
    width: 150px;
  }
  a{
    color:#999;
  }
}
</style>