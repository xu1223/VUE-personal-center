<template>
  <div class="order-review-container">
    <h2 class="title">{{name}}</h2>
    <a class="goBack" @click="$router.back(-1)" >＜ Back</a>
    <div class="order-review-banner">
      <div class="flex1">
        <div class="flex1">
          <v-checkbox v-model="checkAll" :true-value="1" :false-value="0" @click="btn(1)" class="operation" ></v-checkbox>
          <p>Order number: {{invoice_no}} </p>
        </div>
      </div>
      <div class="scroll">
        <div class="flex1 item" v-for="(item,index) in order_products" :key="index">
          <div>
            <v-checkbox v-model="item.checkout" :true-value="1" @change="btn(2,item,index,$event)" :false-value="0" class="operation" ></v-checkbox>
            <img :src="item.img_m" />
            <div>
              <a class="title-ellipsis">{{item.name}}</a>
              <span>Sku:{{item.zsku}}</span>
              <span>Qty:*{{item.quantity}}</span>
              <span>Color:{{item.color}}</span>
              <span>Size:{{item.size}}</span>
            </div>
          </div>
          <button class="button" @click="btn(3,item,index)" >Review</button>
        </div>
      </div>
      <div :class="['order-review-info',order_ids.length>0?'active':'']">
        <p>Thank you for your precious reviews,other buyers need your feedback.</p>
        <div>
          <v-form direction="horizontal" :model="forms" ref="forms">
            <v-form-item prop="rating" label="Product Rating" has-feedback
              :label-col="labelCol" :wrapper-col="wrapperCol" :rules="[{ required: true }]">
              <v-rate v-model="forms.rating"></v-rate>
            </v-form-item>
            <v-form-item prop="content" label="Content" has-feedback :label-col="labelCol" :wrapper-col="wrapperCol"
              :rules="[{ required: true, message: 'Required field' }]">
              <v-input type="textarea" placeholder :autosize="{ minRows:5, maxRows:10 }" style="height:150px" v-model="forms.content"></v-input>
            </v-form-item>
          </v-form>
          <button class="button" @click.prevent="submitForm('forms')">SUBMIT</button>
        </div>
      </div>
    </div>
    <iDrawer width="800" :visible="idrawer" title="Product Reviews" @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn('drawerData')" >
      <template slot="content">
        <div class="flex2 drawerInfo">
          <img :src="drawerData.img_m">
          <div>
            <p>Sku:{{drawerData.zsku}}</p>
            <p>Qty:{{drawerData.quantity}}</p>
            <p>Color:{{drawerData.color}}</p>
            <p>Size:{{drawerData.size}}</p>
          </div>
        </div>
          <v-form direction="horizontal" :model="drawerData" ref="drawerData">
            <v-form-item prop="rating" label="Product Rating" has-feedback :label-col="labelCol" :wrapper-col="wrapperCol" :rules="[{ required: true }]">
              <v-rate v-model="drawerData.rating"></v-rate>
            </v-form-item>
            <v-form-item prop="content" label="Content" has-feedback :label-col="labelCol" :wrapper-col="wrapperCol" :rules="[{ required: true, message: 'Required field' }]">
              <v-input type="textarea" placeholder :autosize="{ minRows:5, maxRows:10 }" style="height:70px" v-model="drawerData.content"></v-input>
            </v-form-item>              
            <IMG style="margin-left:16.6%" @imgGet="imgGet" @imgDelete="imgDelete" :data="drawerData.images" :length="5"/>
          </v-form>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import iDrawer from "@/components/Drawer";
import iJson from "@/util/iJson";
import FormRules from "@/util/form_mixins";
import toolsMix from "@/util/tools_mixins";
import IMG from "@/components/Image";
export default {
  components: {
    iDrawer,
    IMG
  },
  data () {
    const rulesAddress = this.getRulesOrderAddress()
    return {
      order_products: [],
      checkAll: 1,
      invoice_no:'',
      order_ids:[],
      forms: {//批量评价
        rating:5
      },
      images: [],
      drawerData:{},//单个评价
      idrawer: false,
      name: this.$route.name,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
    }
  },
  mixins: [FormRules, toolsMix],
  methods: {
    btn (type, item,index, val) {
      if(type==1){
        //全选
        if(this.order_ids.length==this.order_products.length){
          this.order_ids=[];
          this.checkAll=0;
          this.order_products.map(item_=>{
            this.$set(item_,"checkout",0);
            item_.checkout=0;
          })
        }else{
          this.order_ids=[];
          this.order_products.map(item_=>{
            item_.checkout=1;
            this.$set(item_,"checkout",1);
            this.order_ids.push(item_)
          })
          this.checkAll=1;
        }
      }else if(type==2){
        //单选
        this.$set(item,"checkout",val);
        this.order_ids=[];
        this.order_products.map(item_=>{
          if(item_.checkout==1){
          this.order_ids.push(item_)
          }
        })
        this.checkAll=this.order_ids.length==this.order_products.length?1:0;
      }else if(type==3){
        //单个评论
        this.drawerData=item;
        this.drawerData.rating=5;
        this.images=[];
        this.idrawer=true;
      }
    },
    drawerConfirmBtn(forms){
      this.$refs[forms].validate(valid => {
        if (valid) {
          let obj = {},order_id=this.drawerData.id;
          obj["reviews[" + order_id + "][order_product_id]"] = this.drawerData.id;
          obj["reviews[" + order_id + "][description]"] = this.drawerData.content;
          obj["reviews[" + order_id + "][rating]"] = this.drawerData.rating;
          if(this.images!=''){
            this.images.forEach((n, i) => {
              obj["reviews[" + order_id + "][images][" + i + "]"] = n;
            });
          } else {
            obj["reviews[" + order_id + "][images][]"] = "";
          }
          this.$Http.commont.multiReviewAdd({invoice_no: this.invoice_no,...obj},true).then(res => {
            let { code, data, msg } = res;
            if (code == 200) {
              this.$notification.open({
                message: "Tips",
                description:this.$hxmessage.CENTER.SUCCESS_OPERAT,
                duration: 2
              });
              this.idrawer=false;
              this.getWillCommentOrder();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    drawerCancelBtn(forms){
      this.idrawer=false;
      this.$refs[forms].resetFields();
    },
    submitForm(forms){
      if(this.order_ids.length==0){
        this.$notification.open({
          message: "Tips",
          description:this.$hxmessage.CENTER.SELECTION_TIPS,
          duration: 2
        });
      }else{
        let obj = {};
        this.order_ids.map(item=>{
          obj["reviews[" + item.id + "][order_product_id]"] = item.id;
          obj["reviews[" + item.id + "][description]"] = this.forms.content;
          obj["reviews[" + item.id + "][rating]"] = this.forms.rating;
        })
        this.$refs[forms].validate(valid => {
          if (valid) {
          this.$Http.commont
            .multiReviewAdd({invoice_no: this.invoice_no, ...obj},true).then(res => {
              let { code, data, msg } = res;
              if (code == 200) {
                this.$notification.open({
                  message: "Tips",
                  description: this.$hxmessage.CENTER.SUCCESS_OPERAT,
                  duration: 2
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 2000);
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      }
    },
    imgDelete(index) {
      this.images.splice(index, 1);
    },
    imgGet(file) {
      this.$Http.commont.reviewImageUpload({ file: file }, true).then(options => {
        let { code, data } = options;
        if (code == 200) {
          this.images.push(data);
        }
      });
    },
    getWillCommentOrder () {
      this.$Http.commont.getWillCommentOrder({ invoice_no: this.$route.query.invoice_no }).then(res => {
        let { data, code, msg } = res;
        let arrdata = [];
        if (code == 200) {
          data.order_products.map(item => {
            item.checkout = 1;
            this.order_ids.push(item)
          })
          this.invoice_no = data.invoice_no;
          if (data.order_products.length > 0) {
            this.order_products = data.order_products;
          }
        }
      });
    }
  },
  created () {
    this.getWillCommentOrder()
  }
}
</script>
<style scoped lang="less">
.order-review-container {
  position: relative;
  .goBack {
    position: absolute;
    top: 10px;
    left: 0;
  }
  .order-review-banner {
    /deep/ .operation {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .ant-checkbox {
        .ant-checkbox-inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
    >.flex1{
    /deep/ .operation {
      .ant-checkbox {
        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          &::after{
            left: 6px;
            top: 4px;
            height: 10px;
          }
        }
      }
    }

    }
    > div:first-child {
      background: #e6e6e6;
      padding: 0 10px;
      height: 50px;
    }
    .scroll {
      border: 1px solid #e6e6e6;
      max-height: 650px;
      .item {
        padding: 10px;
        border-bottom: 1px solid #e6e6e6;
        > div {
          display: flex;
          font-size: 14px;
          img {
            width: 80px;
            margin-right: 10px;
          }
          a {
            font-weight: 550;
          }
          span {
            display: block;
            color: #666;
            line-height: 1.4;
          }
        }
        .button {
          width: 90px;
          height: 30px;
        }
      }
    }
    .order-review-info {
      margin-top: 30px;
      border: 1px solid #f4f4f6;
      > p {
        height: 40px;
        line-height: 40px;
        background: #f4f4f6;
        padding: 0 10px;
      }
      > div {
        padding: 10px;
        position: relative;
        form {
          width: 85%;
        }
        button {
          width: 90px;
          height: 30px;
          background: #c1c1c1;
          color: #fff;
          position: absolute;
          right: 30px;
          bottom: 30px;
        }
      }
      &.active {
        > p {
          background: #0c0a26;
          color: #fff;
        }
        > div {
          background:#F4F4F6;
          button {
            width: 90px;
            height: 30px;
            background: #0c0a26;
            color: #fff;
          }
        }
      }
    }
  }
}
.drawerInfo{
  img{
    width: 60px;
    margin-right: 10px;
  }
  >div{
    color:#999;
    font-size: 12px;
  }
}
</style>