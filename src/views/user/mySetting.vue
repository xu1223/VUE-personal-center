<template>
  <div class="info-container">
    <h2 class="title">{{name}}</h2>
    <v-tabs active-tab-key="key1">
        <v-tab-pane tab-key="key1" tab="Personal Information">
                <v-form direction="horizontal" :model="formInfo" ref="formInfo" :rules="ruleInfo">
                        <v-form-item label="Avatar" :label-col="labelCol" :wrapper-col="wrapperCol" prop="avatar" has-feedback>
                            <div class="avatar">
                                <input @change="uploadImage" type="file" placeholder />
                                <v-icon type="plus"></v-icon>
                                <img :src="formInfo.avatar"/>
                            </div>
                        </v-form-item>
                        <v-form-item label="First Name" :label-col="labelCol" :wrapper-col="wrapperCol" prop="firstname" has-feedback>
                            <v-input type="text" v-model="formInfo.firstname" placeholder></v-input>
                        </v-form-item>
                        <v-form-item label="Last Name" :label-col="labelCol" :wrapper-col="wrapperCol" prop="lastname" has-feedback>
                            <v-input type="text" v-model="formInfo.lastname" placeholder></v-input>
                        </v-form-item>
                        <v-form-item label="Email" :label-col="labelCol" :wrapper-col="wrapperCol" prop="email" has-feedback>
                            <v-input type="email" v-model="formInfo.email" placeholder></v-input>
                        </v-form-item>
                        <v-form-item label="Phone" :label-col="labelCol" :wrapper-col="wrapperCol" prop="mobile" has-feedback>
                            <v-input type="text" v-model="formInfo.mobile" placeholder></v-input>
                        </v-form-item>
                        <!-- <v-form-item label="Gender" :label-col="labelCol" :wrapper-col="wrapperCol" prop="gender"  has-feedback style="text-align: left;">
                             <v-checkbox v-model="formInfo.gender" :true-value="1" :false-value="0">Man</v-checkbox>
                             <v-checkbox v-model="formInfo.gender" :true-value="0" :false-value="1">Woman</v-checkbox>
                        </v-form-item>
                        <v-form-item label="Birthday" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                            <div class="birthday">
                                <v-select allowClear placeholder search :data="yearArr"  v-model="formInfo.year" label="id" clue="id" @change="yearChange">
                                </v-select>
                                <v-select allowClear placeholder search :data="monthArr" v-model="formInfo.month" label="id" clue="id" @change="monthChange">
                                </v-select>
                                <v-select allowClear placeholder search :data="dateArr" v-model="formInfo.day" label="id" clue="id">
                                </v-select>
                            </div>
                        </v-form-item> -->
                        <hr>
                        <div class="flex">
                            <button class="button" @click.prevent="infoReset('formInfo')">CANCEL</button>
                            <button class="button" @click.prevent="infoSubmit('formInfo')">SUBMIT</button>
                        </div>
                </v-form>
        </v-tab-pane>
        <v-tab-pane tab-key="key2" tab="Password">
            <v-form direction="horizontal" :model="formPassword" ref="formPassword" :rules="rulePassword">
                <v-form-item label="Old Password" :label-col="labelCol" :wrapper-col="wrapperCol" prop="old_password" has-feedback>
                    <v-input type="password" v-model="formPassword.old_password" placeholder="Please enter the old password."></v-input>
                </v-form-item>
                <v-form-item label="New Password" :label-col="labelCol" :wrapper-col="wrapperCol" prop="new_password" has-feedback>
                    <v-input type="password" v-model="formPassword.new_password" placeholder="Please enter the new password."></v-input>
                </v-form-item>
                <v-form-item label="Confirm Password" :label-col="labelCol" :wrapper-col="wrapperCol" prop="confirm_password" has-feedback>
                    <v-input type="password" v-model="formPassword.confirm_password" placeholder="Please enter the new password again."></v-input>
                </v-form-item>
                <hr />
                <div class="flex">  
                    <button class="button" @click.prevent="passwordReset('formPassword')">CANCEL</button>
                    <button class="button" @click.prevent="passwordSubmit('formPassword')">SUBMIT</button>
                </div>
            </v-form>
        </v-tab-pane>
    </v-tabs>
  </div>
</template>

<script>
import FormRules from "@/util/form_mixins";
import { dateArr } from "@/util/tools";
export default {
  data () {
    const ruleInfo = this.getRulesByConfig(['email', 'firstname','lastname','mobile'])
    const rulePassword = this.getRulesByConfig(['old_password', 'new_password','confirm_password'])
    return {
      ruleInfo,
      rulePassword,
      name: this.$route.name,
      yearArr:dateArr('year'),
      monthArr:dateArr('month'),
      dateArr:[],
      formInfo: {
          email:'',
          firstname:'',
          lastname:'',
          mobile:'',
      },
      formPassword: {},
      file: null,
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 10
      }
    };
  },
  mixins: [FormRules],
  methods: {
    uploadImage(){
        var _this = this;
        var event = event || window.event;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.formInfo["avatar"] = e.target.result;
        };
        reader.readAsDataURL(file);
        console.log(file,'file')
        this.$Http.user.CustomerAvatarUpload({file: file}, true).then(res => {});
    },
    infoSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            this.$Http.user.customerEdit(this.formInfo).then(res => {
                let {code, msg, data} = res;
                if (code == 200) {
                    let UserInfo = this.$storage.getUserInfo();
                    this.$Http.user.personal().then(options => {
                        let {code, msg, data} = options;
                        if (code == 200) {
                            UserInfo.customer_id = data.customer.id;
                            UserInfo.email = data.customer.email;
                            UserInfo.name = data.customer.name;
                            UserInfo.avatar = data.customer.avatar;
                            this.$storage.setUserInfo(UserInfo);
                        }
                    });
                }
            });
        } else {
            this.$notification.open({
                message: "Tips",
                description:'Fail',
                duration: 2
            });
        }
      })
    },
    infoReset (name) {
       this.$refs[name].resetFields();
    },
    passwordSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Http.login.changePasswd(this.formPassword).then(res => {
                    let { msg, code, data } = res;
                    if (code == 200) {
                        setTimeout(() => {
                            this.$router.push("/login");
                        }, 1500);
                    } else {
                        this.$notification.open({
                            message: "Tips",
                            description:msg,
                            duration: 2
                        });
                    }
                });
            }
        })
    },
    passwordReset(name){
       this.$refs[name].resetFields();
    },
    // yearChange(val){
    //     this.dateArr=dateArr('date',this.formInfo.year,this.formInfo.month)
    // },
    // monthChange(val){
    //     this.dateArr=dateArr('date',this.formInfo.year,this.formInfo.month);
    // },
    getInfo(){
        this.$Http.user.personal().then(res => {
            let {code, msg, data} = res;
            if (code == 200) {
                this.formInfo=data.customer;
                // this.formInfo.gender=data.customer.gender=='Man'?1:0;
                // this.formInfo.year = data.customer.birthday.slice(0, 4);
                // this.formInfo.month = data.customer.birthday.slice(5, 7);
                // this.formInfo.day = data.customer.birthday.slice(8, 10);
                // this.dateArr=dateArr('date',this.formInfo.year,this.formInfo.month);
                // delete this.formInfo.birthday;
                delete this.formInfo.default_address;
                delete this.formInfo.id;
                delete this.formInfo.is_newsletter;
            }
        })
    },
  },
  created () {
      this.getInfo();
  },
};
</script>
<style scoped lang="less">
.info-container{
    /deep/ .ant-form-item-label{
        line-height: 40px;
    }
    /deep/ .ant-upload{
        width: 80px;
        height: 80px;
    }
    /deep/ .ant-tabs-nav-wrap{
        border-bottom:3px solid #0C0A26;
        .ant-tabs-ink-bar{
            display: none;
        }
        .ant-tabs-tab{
            text-align: center;
            width: 150px;
            margin: 0;
            color:#999;
            background: #F4F4F6;
            border-radius: 4px;
            padding:0;
            height: 40px;
            line-height: 40px;
        }
        .ant-tabs-tab-active{
            background: #0C0A26;
            color:#fff;
        }
    }
    .button{
        width: 90px;
        height: 35px;
        margin: 0 10px;
    }
    .button:first-child{
        color:#0C0A26;
        border: 1px solid #0C0A26;
        background: #fff;
    }
    form{
        text-align: center;
        margin-top: 45px;
        .avatar{
            width: 80px;
            height: 80px;
            position: relative;
            border: 1px dashed #DADADA;
            input{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0;
                cursor: pointer;
                z-index: 1;
            }
            i{
                position: absolute;
                font-size: 20px;
                top: 0;
                bottom: 0;
                margin: auto;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color:#BBBBBB;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        .birthday{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap:5px;
        }
        /deep/ .ant-select-selection--single{
            height: 40px;
            .ant-select-selection__rendered{
                line-height: 40px;
            }
        }
        /deep/ .ant-checkbox-wrapper{
            margin-top: 5px;
        }
    }
}
</style>