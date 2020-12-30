<template>
  <div class="payment-container">
    <h2 class="title"><span>Shopping Bag({{carts_id}}) > </span> {{name}} <span> > Order Complete </span></h2>
     <router-link class="back" :to="{path:'/my_cart'}">＜ Back To Shopping Bag</router-link>
    <div class="payment-banner">
        <div class="payment-left">
            <div class="payment-item">
                <p class="payment-title">Contact information<a v-if="!signType">Already have an account? Already have an account?<em @click="logOut">Log in</em></a></p>
                <v-input placeholder v-model="sync.email" @blur="syncOrderTradingInfo" style="width:350px"></v-input>
                <v-checkbox v-if="!signType" style="margin-left:10px;" v-model="newsletter" :true-value="1" :false-value="0" class="checkout">Register at the same time</v-checkbox>
            </div>
            <div class="payment-item" v-if="!signType">
                <p class="payment-title">Choose Your Service</p>
                <ul class="flex2 managers">
                    <li v-for="(item,index) in all_managers" :key="index" :class="manager_id==item.id?'active':''" @click="manager_id=item.id">{{item.name}}</li>
                </ul>
            </div>
            <div class="payment-item">
                <p class="payment-title">Shipping Address</p>
                <div class="action-open" v-if="signType&&data.default_address!=''">
                    <a class="action" @click="btn(1)">Choose another address</a>
                    <a class="action" @click="btn(2)">Add new address</a>
                </div>
                <div class="address-item flex1 active" v-if="signType&&data.default_address!=''">
                    <i class="iconfont icondizhi"></i>
                    <div class="flex2">
                        <div>
                            <p>{{data.default_address?data.default_address.firstname:'' }} {{data.default_address?data.default_address.lastname:'' }}</p>
                            <p>{{data.default_address?data.default_address.mobile:''}}</p>
                        </div>
                        <div>
                            <p>{{data.default_address?data.default_address.zone_name:''}},{{ data.default_address?data.default_address.country_name:''}}</p>
                            <p>{{data.default_address?data.default_address.postcode:''}}</p>
                            <p>{{data.default_address?data.default_address.address_1:''}},{{data.default_address?data.default_address.city:''}}</p>
                        </div>
                    </div>
                    <div>
                        <a class="action" @click="btn(3,data.default_address)">Edit</a>
                    </div>
                </div>
                <div class="add-address" style="width:100%;height:60px" @click="btn(2)" v-if="signType&&data.default_address==''">+ Add New Address</div>
                <v-form v-if="!signType" class="address-form" direction="horizontal" :model="addressForm" ref="addressForm" :rules="getRulesOrderAddress_">
                    <v-form-item :label="item.title" :label-col="index==0||index==1?labelCol1:index==5||index==6||index==7?labelCol3:labelCol2" :wrapper-col="index==0||index==1?wrapperCol1:index==5||index==6||index==7?wrapperCol3:wrapperCol2" :prop="item.key" has-feedback v-for="(item,index) in iJsonData.orderAddress" :key="index">
                        <v-select :filter="filter" v-model="addressForm[item.key]"  search :data="item.options" label="name" clue="id" v-if="item.type=='select'" @change="drawerSelectChange(1,item.key,$event)"></v-select>
                        <v-input v-else v-model="addressForm[item.key]" placeholder @blur="addressFormBlur(item.key,$event)"></v-input>
                    </v-form-item>
                </v-form>
            </div>
            <div class="payment-item">
                <p class="payment-title">Choose Your Shipping Options</p>
                <div class="shipment-main" v-if="shipping_list&&shipping_list!=''">
                    <div :class="['item', sync.shipping_method_id == cont.geozone.id ?  'active' :'']"
                        @click="shipmentChange(cont,v)" v-for="(cont,v) in shipping_list" :key="v">
                        <div :title="cont.geozone.name" :img-title="cont.geozone.img_name">
                        <img v-lazy="'/carts/assets/img/' + cont.geozone.img_name + '.png'" />
                        <i v-if="sync.shipping_method_id == cont.geozone.id" class="iconfont icondui flex"></i>
                        </div>
                        <p>{{cont.geozone.remark}} - ({{cont.price}})</p>
                    </div>
                </div>
                <a v-else class="add-address"><i class="iconfont iconjia"></i>Fill In The Address.</a>
            </div>
            <div class="payment-item">
                <p class="payment-title">Payment Method</p>
                <div class="shipment-main">
                    <div :class="['item', sync.payment_method  == index ? 'active' :'']"
                        v-for="(item,index) in payment_list" :key="index" @click="paymentChange(item,index)">
                        <img :src="require('@/assets/img/'+item.name+'.png')" />
                        <i v-if="sync.payment_method  == index" class="iconfont icondui flex"></i>
                    </div>
                </div>
            </div>
            <div class="payment-item">
                <p class="payment-title">Remarks</p>
                <v-input type="textarea" placeholder :autosize="{ minRows: 12, maxRows: 12 }" style="height:150px" v-model="sync.note" @blur="syncOrderTradingInfo"></v-input>
            </div>
        </div>
        <div class="payment-right">
            <p>Order Summary</p>
            <div class="scroll">
                <div v-for="(item,index) in data ? data.order_products : [] " :key="index" class="item" >
                  <img :src="item.img_m?item.img_m:''" />
                  <div>
                    <a class="title-ellipsis">{{item.name?item.name:''}}</a>
                    <p>${{item.price?item.price:0 | numFilter}} <em>${{item.show_price?item.show_price:0 | numFilter}}</em></p>
                    <p>*{{item.quantity?item.quantity:0}}</p>
                    <p>${{item.total?item.total:0 | numFilter}}</p>
                  </div>
                </div>
            </div>
            <div class="payment-info">
                <p class="flex1">Retail Price:<em>${{product_price_total?product_price_total:0 | numFilter}}</em></p>
                <p class="flex1">Discount:<em>-${{discount?discount:0 | numFilter }}</em></p>
                <p class="flex1">Coupon Discount:<em>-${{coupon_discount?coupon_discount:0 | numFilter}}</em></p>
                <p class="flex1">Promotion Discount:<em>-${{promotion_discount?promotion_discount:0 | numFilter}}</em></p>
                <p class="flex1" v-if="amount_adjustment!=0">Amount adjustment:
                    <em v-if="amount_adjustment<0">-${{amount_adjustment_positive|numFilter}}</em>
                    <em v-if="amount_adjustment>0">${{amount_adjustment_positive|numFilter}}</em>
                </p>
                <p class="flex1">Delivery:<em>${{delivery?delivery:0|numFilter}}</em></p>
                <p class="flex1">Payment Fee:<em>${{payment_fee?payment_fee:0 |numFilter}}</em></p>
                <p class="flex1">Weight:<em>{{weight?weight:0 | numFilter}} kg</em></p>
                <p class="flex1" style="border-top:1px solid #efefef;margin-top:10px;padding-top:7px">Total number of products:<em style="font-weight:bold;">{{total?total:0}}</em></p>
                <p class="flex1" style="">Total Price(Actual Payment):<em style="font-weight:bold;">${{total_price?total_price:0| numFilter}}</em></p>
            </div>
            <v-button @click="payment('addressForm')" class="flex payment" :loading="loading">PAY NOW</v-button>
        </div>
    </div>
    <iDrawer width="800" :visible="idrawer" :title="iTitle"
      @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn('drawerData')">
      <template slot="content">
        <v-form direction="horizontal" :model="drawerData" ref="drawerData" :rules="rulesAddress">
          <div v-if="address_type==1">
            <div :class="['address-item','flex1',address_stage == item.id ? 'active' : ' ']"
                  v-for="(item,index) in address_list" :key="index" @click="addressStage(item)">
                <i class="iconfont icondizhi"></i>
                <div class="flex2">
                  <div>
                      <p>{{ item.firstname }} {{ item.lastname }}</p>
                      <p>{{ item.mobile }}</p>
                  </div>
                  <div>
                    <p>{{ item.zone_name }},{{item.country_name}}</p>
                    <p>{{ item.postcode }}</p>
                    <p>{{ item.address_1 }},{{ item.city }}</p>
                  </div>
                </div>
            </div>
          </div>
          <div v-else>
            <v-form-item :label="item.title" :label-col="labelCol" :wrapper-col="wrapperCol" :prop="item.key" has-feedback v-for="(item,index) in iJsonData.addressTitle" :key="index">
                <v-select :filter="filter" v-model="drawerData[item.key]"  search :data="item.options" label="name" clue="id" v-if="item.type=='select'" @change="drawerSelectChange(2,item.key,$event)"></v-select>
                <v-input v-model="drawerData[item.key]" placeholder v-else ></v-input>
            </v-form-item>
            <v-checkbox v-if="address_type==2" style="margin-left:12.5%" v-model="drawerData.default" :true-value="1" :false-value="0">Save new address to address book</v-checkbox>
          </div>
        </v-form>
      </template>
    </iDrawer>
    <iDrawer width="800" :visible="payError" :btn="false" @cancelBtn="payErrorBtn">
      <template slot="content">
        <div class="payment-error flex">
          <div>
            <img v-lazy="'/carts/assets/img/payment_error.png'" />
            <p><span>Payment status：</span><em>{{paystatus}}</em></p>
            <p><span>Reason：</span><em>{{fail_msg}}</em></p>
            <p v-if="signType"><span>Order Amount：</span><span>US{{total_price?total_price:0| numFilter}}</span></p>
            <p v-if="signType"><span>Order NO：</span><span>{{invoice_no}}</span></p>
            <div v-if="signType">
              <b>Please go to my order to pay.</b>
              <a class="flex" @click="toOrder">View My Order</a>
            </div>
            <div v-else>
              <b>Your order has not been paid, please continue to pay.</b>
            </div>
          </div>
        </div>
      </template>
    </iDrawer>
    <div class="loader" v-if="transitionName" >
      <div class="loading"></div>
    </div>
  </div>
</template>

<script>
import PlayType from "@/util/PlayType";
import StripeCheckoutsApl from "@/util/StripeCheckoutsApl";
import message from "@/util/message";
import { matchImageName,sha256Encryption,getCartHost,generateSessionId } from "@/util/tools";
import qs from "qs";
import iDrawer from "@/components/Drawer";
import iJson from "@/util/iJson";
import FormRules from "@/util/form_mixins";
import toolsMix from "@/util/tools_mixins";

export default {
  components: {
    iDrawer,
  },
  data () {
    const rulesAddress=this.getRulesAddress();
    const getRulesOrderAddress_=this.getRulesOrderAddress()
    return {
      transitionName:false,
      carts_id:this.$storage.getCount()?this.$storage.getCount().count_cart:0,
      loading:false,
      invoice_no:'',
      paymethod:'',
      fail_msg:'',
      paystatus:'',
      payError:false,
      //登录失败
      zip_code:0,
      signType:JSON.stringify(this.$storage.getUserInfo())!='{}'&&this.$storage.getUserInfo()?true:false,
      session_id: this.$route.query.session_id?this.$route.query.session_id:generateSessionId(),
      getRulesOrderAddress_,
      manager_id:-1,
      all_managers:[],
      newsletter:1,
      addressForm:{},
      //未登录
      address_type:0,//地址弹窗type
      idrawer:false,
      iTitle:'',
      name: this.$route.name,
      param:{},
      drawerData:{},//弹窗数据
      rulesAddress,//地址rules
      addressParam:{},//地址选中数据
      data: {},//详情数据
      sync: {},//同步
      shipping_list:[], //物流列表数据
      address_list: [], //地址列表数据
      address_stage: -1, //地址默认选中
      //支付
      client_id: "",
      pay_type:-1,//支付按钮
      payment_list:[],
      marketplace: "",
      publishable_key: "",
      //数据
      total:-1,//购物车总数量
      product_price_total: 0, //商品总原价
      discount: 0, //discount数据
      weight: 0, //总重量
      total_price: 0, //实际支付总价格
      promotion_discount: 0, //promotion折扣数值
      coupon_discount: 0, //coupon折扣数值
      delivery: 0, //运费
      payment_fee: 0, //付款费
      payment_fee_cost: 0, //手续费百分比
      amount_adjustment: 0,
      //优惠券
      amount_adjustment_positive:0,
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 21
      },
      labelCol1: {
        span: 6
      },
      wrapperCol1: {
        span: 18
      },
      labelCol2: {
        span: 3
      },
      wrapperCol2: {
        span: 21
      },
      labelCol3: {
        span: 9
      },
      wrapperCol3: {
        span: 15
      },
    };
  },
  mixins: [FormRules,toolsMix],
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    }
  },
  methods: {
    logOut(){
        this.$storage.remove('wishlist_ids');
        this.$storage.remove('userInfo');
        this.$storage.remove('access_expired');
        this.$storage.remove('access_token');
        this.$storage.remove('count');
        sessionStorage.clear();
        this.$router.push("/login");
    },
    //去订单页
    toOrder(){
      let to_order={
        invoice_no:this.invoice_no,
      }
      if(!this.signType){
          to_order.session_id=this.session_id
      }
      this.$router.push({
        path: "/order/order_detail",
        query: {
          ...to_order
        },
      });
    },
    addressFormBlur(key,val){
      this.sync[key]=val;
      this.syncOrderTradingInfo()
    },
    //地址国家选择
    drawerSelectChange(type,key,val){
      if(key=='shipment_country_id'||key=='country_id'){
        this.getCountryZone(val)
      }
      if(type==1&&key=='shipment_country_id'){
        this.sync[key]=val;
        this.shippingAsync();
      }else if(type==1){
        this.sync[key]=val;
        this.syncOrderTradingInfo()
      }
    },
    // 获得物流接口
    shippingAsync() {
      let params={
        weight_total:this.weight,
        shipment_country_id:this.addressForm.shipment_country_id,
      }
      this.$Http.payment.shippingAsync({...params,session_id:this.session_id}).then(res => {
        let { data, code , msg } = res;
        if (code == 200) {
          this.shipping_list=data;
          this.sync.shipping_method_id=data[0].geozone.id;
          this.syncOrderTradingInfo()
        }
      });
    },
    btn(type,item){
      switch(type) {
          case 1:
            this.address_stage=this.sync.address_id;
            this.iTitle='CHHOODSE AOOTHER ADDRESS';
            this.idrawer=true;
            this.address_type=1;
           break;
          case 2:
            this.iTitle='ADD NEW ADDRESS';
            this.address_type=2;
            this.drawerData={};
            this.idrawer=true;
            break;
          case 3:
            this.iTitle='EDIT ADDRESS';
            this.idrawer=true;
            this.drawerData=JSON.parse(JSON.stringify(item));
            this.address_type=3;
            break;
      }
    },
    //弹窗确定按钮
    drawerConfirmBtn(forms){     
      if(this.address_type==2||this.address_type==3){
        this.$refs[forms].validate(valid => {
          if (valid) {
                  let params={
                    firstname: this.drawerData.firstname,
                    lastname: this.drawerData.lastname,
                    mobile: this.drawerData.mobile,
                    address_1: this.drawerData.address_1,
                    country_id: this.drawerData.country_id,
                    zone_id:this.drawerData.zone_id,
                    city: this.drawerData.city,
                    postcode: this.drawerData.postcode,
                  }
                  if(this.address_type==2){
                    params.default=this.drawerData.default;
                    this.$Http.address.addressAdd(params).then(res => {
                      let { code } = res;
                      if (code == 200) {
                        this.idrawer=false;
                        if(this.data.default_address==''){
                          this.getOrderPaymentDetail()
                        }
                      }
                    });
                  }else{
                    params.address_id=this.drawerData.id;
                    this.$Http.address.addressEdit(params).then(res => {
                        let { code,data,msg } = res;
                        if (code == 200) {
                          this.idrawer=false;
                          this.data.default_address=this.drawerData;
                        }
                    });
                  }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }else{
        this.sync.address_id=this.address_stage;
        this.data.default_address=this.addressParam;
        this.syncOrderTradingInfo();
        this.idrawer=false;
      }
    },
    //弹窗取消按钮
    drawerCancelBtn(forms){
      this.idrawer=false;
      this.$refs[forms].resetFields();
    },
    //地址选择
    addressStage(item){
      this.addressParam=item;
      this.address_stage=item.id;
    },
    //修改支付方式
    paymentChange(item,index){
        this.sync.payment_method=index;
        this.syncOrderTradingInfo()
        this.payment_fee_cost = Number(item.cost)||0;
        this.get_payment_fee();
    },
    //修改物流方式
    shipmentChange(item,index){
        this.sync.shipping_method_id=item.geozone.id;
        this.syncOrderTradingInfo();
        this.delivery = Number(item.shipping_fee);
        this.get_payment_fee();
    },
    //获得手续费
    get_payment_fee() {
      this.payment_fee =this.payment_fee_cost *
      Number(
          this.product_price_total -
            this.discount -
            this.coupon_discount -
            this.promotion_discount +
            this.delivery +
            this.amount_adjustment
        );
      this.get_total_price();
    },
    // 同步信息
    syncOrderTradingInfo() {
      this.$Http.payment.syncOrderTradingInfo({...this.sync,session_id:this.session_id}).then(res => {
        let { data, code , msg } = res;
        if (code == 200) {
        }
      });
    },
    //支付
    payment() {
      let params={};
        if(this.signType){
          params=this.sync;
        }else{
          params={
            invoice_no:this.invoice_no,
            session_id:this.session_id,
            shipment_country_id:this.addressForm.shipment_country_id,
            shipping_method_id:this.sync.shipping_method_id,
            payment_method:this.sync.payment_method,
            email:this.sync.email,
            shipment_zone_id:this.addressForm.shipment_zone_id,
            shipment_firstname:this.addressForm.shipment_firstname,
            shipment_lastname:this.addressForm.shipment_lastname,
            shipment_mobile:this.addressForm.shipment_mobile,
            shipment_address_1:this.addressForm.shipment_address_1,
            shipment_city:this.addressForm.shipment_city,
            shipment_postcode:this.addressForm.shipment_postcode,
            manager_id:this.manager_id,
            newsletter:this.newsletter,
          }
        }
        this.loading=true;
        this.transitionName=true;
        this.$Http.payment.confirmOrder(params).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
            this.getTotalCartWishCount();
            if(params.payment_method=='paypal'){
              window.location.href=data.paypal.approve_link;
            }else{
              this.$router.push({
                path: "/payment_success",
                query: {
                  invoice_no:this.invoice_no,
                  session_id:this.session_id
                },
              });
            }
          } else {
            this.$notification.open({
              message: "Tips",
              description: 'Order created successfully, payment failed.',
              duration: 2
            });
          }
          this.loading=false;
          this.transitionName=false;
        });
    },
    //获得实际支付费用
    get_total_price() {
      this.total_price =
        this.product_price_total -
        this.discount -
        this.coupon_discount -
        this.promotion_discount +
        this.delivery +
        this.amount_adjustment+
        this.payment_fee;
    },
    //获得数据
    getOrderPaymentDetail () {
      this.$Http.payment.getOrderPaymentDetail({ invoice_no: this.$route.query.invoice_no,session_id:this.session_id }).then(res => {
        let { code, data, msg } = res;
        if (code == 200) {
            this.data=data;
            this.invoice_no=data.invoice_no;
            this.address_list = data.address;
            this.payment_list=data.payment_list;
            if (data.shipping_list) {
              data.shipping_list.forEach(item => {
                item.geozone.img_name = matchImageName(item.geozone.name);
                this.shipping_list.push(item);
              }); //物流方式列表
            }
            if(!this.signType&&data.default_address!=''&&data.default_address!=undefined&&data.default_address!=null&&data.default_address!=false){
              this.addressForm={
                shipment_country_id:data.default_address.country_id,
                shipment_zone_id:data.default_address.zone_id,
                shipment_firstname:data.default_address.firstname,
                shipment_lastname:data.default_address.lastname,
                shipment_mobile:data.default_address.mobile,
                shipment_address_1:data.default_address.address_1,
                shipment_mobile:data.default_address.mobile,
                shipment_city:data.default_address.city,
                shipment_postcode:data.default_address.postcode,
              }
            }

            this.total=Number(data.total_number);
            this.product_price_total=Number(data.subtotal_show_price);
            this.discount=Number(data.subtotal_show_price)-Number(data.subtotal_price);
            this.coupon_discount=Number(data.coupon_discount);
            this.promotion_discount=Number(data.promotion_discount);
            this.weight = Number(data.total_weight);
            this.delivery = Number( data.default_shipping!=''&& data.default_shipping!=undefined ? data.default_shipping.shipping_fee : 0 ); //默认送货费用
            if(data.order_total.discount){
              this.amount_adjustment=Number(data.order_total.discount.value)
              this.amount_adjustment_positive=Math.abs(this.amount_adjustment)
            }
            this.payment_fee_cost = Number(data.default_payment.cost)||0; //默认手续费百分比
            //同步
            this.get_payment_fee(); //获得支付手续费
            this.address_stage=data.default_address?data.default_address.id:'';
            this.sync={
                invoice_no:data.invoice_no,
                address_id:data.default_address!='' && data.default_address!=undefined?data.default_address.id:'',
                shipping_method_id: data.default_shipping!=''&& data.default_shipping!=undefined ? data.default_shipping.geozone.id: "",
                payment_method:data.default_payment.payment_key,
                email:data.email?data.email:'',
                note:data.note?data.note:''
            }
            this.getCountryZone(data.default_address.country_id);
        }
      })
    },
    //客服
    getManagers () {
      this.$Http.login.getAllManagers().then(res => {
        let { code, data, msg } = res;
        if (code == 200) {
          data.sort(function(a,b){
            return Math.random()-0.5;
          });
          this.all_managers =data;
          this.manager_id = data[0].id;
        }
      });
    },
    //stripe支付
    createStripeCheckout() {
      if (!document.getElementById("stripe_checkout")) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "stripe_checkout";
        script.src = "https://checkout.stripe.com/checkout.js";
        document.querySelector("head").appendChild(script);
      }
    },
    //paypal支付
    dom(dom) {
      return document.querySelector(dom);
    },
    css(o, key, value) {
      this.dom(o).style[key] = value;
    },
    playType() {
      setTimeout(() => {
        new PlayType("#paypal-button-container", {
          qs: this.sync
        });
      }, 1500);
    },
    //paypal创建
    scriptCreate(src) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "client_id";
        script.src = src
        document.querySelector("head").appendChild(script);
    },
    //stripe创建
    StripeCheckoutsApl() {
      setTimeout(() => {
        let obj = {
          note: this.sync.note,
          email: this.sync.email,
          invoice_no: this.sync.invoice_no,
          address_id: this.sync.address_id,
          payment_method: this.sync.payment_method,
          shipping_method_id: this.sync.shipping_method_id,
          coupon_code: this.sync.coupon_code,
          activity_id: this.sync.activity_id,
          key: this.publishable_key,
          image: this.marketplace
        };
        new StripeCheckoutsApl({
          key: obj.key,
          image: obj.image,
          email: obj.email,
          invoice_no: obj.invoice_no,
          tokenfn: function(token, args) {
            this.$Http.payment.confirmOrder(...obj).then(options => {
              let { code, msg } = options;
              if (code == 200) {
                this.$router.push({
                  path: "/payment_success",
                  query: { invoice_no }
                });
              }else{
                this.$notification.open({
                  message: "Tips",
                  description: 'Order created successfully, payment failed.',
                  duration: 2
                });
              }
            });
          }
        });
      }, 300);
    },
    payErrorBtn(){
      this.payError=false;
    }
  },
  created () {
    if(this.$route.query.invoice_no){
        this.getOrderPaymentDetail()
        this.getCountries();
    }
    if(!this.signType){
        this.getManagers()
    }
    if(this.$route.query.session_id){
      this.$storage.setSessionId(this.$route.query.session_id);
    }
    if(this.$route.query.paystatus){
      const {
        paystatus,//订单支付状态 fail successs
        fail_msg,//失败返回信息原因
        paymethod,//支付方式
        invoice_no,
      } = this.$route.query;
      this.invoice_no=invoice_no;
      this.paystatus=paystatus;
      this.paymethod=paymethod;
      this.fail_msg=fail_msg;
      if (paystatus == 'fail') {
        this.payError=true;
        if(!this.signType){
         setTimeout(() => {
          this.payError=false;
         },3000)
        }
      } else if (paystatus == 'success') {
        this.$router.push({
          path: "/payment_success",
          query: {
            invoice_no,
            session_id:this.session_id
          },
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.payment-container{
    padding:20px;
    position: relative;
    .back{
        position: absolute;
        top: 30px;
    }
    .title{
        span{
            color:#999;
        }
    }
    .payment-banner{
        display: grid;
        grid-template-columns: 67% 30%;
        gap:3%;
        .payment-left{
            .payment-item{
                margin-left: 10px;
                margin-bottom: 20px;
                .payment-title{
                    color:#333;
                    font-size:14px;
                    font-weight:700;
                    position: relative;
                    margin-bottom: 10px;
                    &::before{
                        position: absolute;
                        content: '';
                        width: 4px;
                        height: 80%;
                        background: #0C0A26;
                        top: 0;
                        bottom:0 ;
                        left:-10px;
                        border-radius:4px;
                        margin: auto;
                    }
                    a{
                      margin-left: 20px;
                      font-weight: 400;
                      color:#999;
                      em{
                        font-weight: 550;
                        margin-left: 5px;
                        border-bottom:1px solid ;
                        color:#333;
                      }
                    }
                }
                .action{
                    font-size:14px;
                    border-bottom:1px solid ;
                    font-weight: 550;
                    margin-left: 20px;
                }
                .action-open{
                    margin-bottom: 20px;
                    text-align: right;
                }
                .shipment-main{
                    display: flex;
                    flex-wrap: wrap;
                    .item{
                        position: relative;
                        text-align: center;
                        margin: 0 20px 10px 0;
                        img{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 130px;
                            height: 50px;
                            border: 1px solid #BBBBBB;
                            border-radius:4px;
                            overflow: hidden;
                            padding: 5px;
                        }
                        i{
                            position: absolute;
                            top: -5px;
                            right: -5px;
                            width: 15px;
                            height: 15px;
                            color:#fff;
                            background: #0C0A26;
                            border-radius:50% ;
                        }
                        p{
                            color:#999;
                        }
                        &.active{
                            p{
                                color:#0C0A26
                            }
                        }
                    }
                }
                .address-form{
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  >div:first-child,>div:nth-child(2){
                    width: 50%;
                  }
                  >div:nth-child(3),>div:nth-child(4),>div:nth-child(5){
                    width: 100%;
                  }
                  >div:nth-child(6),>div:nth-child(7),>div:nth-child(8){
                    width: 33.3%;
                  }
                }
                .add-address{
                  cursor: pointer;
                  width: 130px;
                  height: 50px;
                  border-radius:4px;
                  border:1px dashed #999;
                  display: flex;
                  align-items: center;
                  justify-content:center;  
                  color:#999;
                  i{
                    font-size: 20px;
                    color:#999;
                  }          
                }
            }
        }
        .payment-right{
            height: min-content;
            border: 1px solid #DADADA;
            >p{
                height: 50px;
                background: #0C0A26;
                color:#fff;
                font-size:16px;
                line-height: 50px;
                padding:0 20px;
            }
            >div{
                padding:20px;
                &:nth-child(3){
                  font-size:14px;
                  >p{
                    line-height: 1.7;
                  }
                }
                .item{
                    display: flex;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    overflow: hidden;
                    border-bottom:1px solid #efefef;
                    img{
                        width: 75px;
                        padding-right: 10px;
                    }
                    >div{
                        width: 80%;
                        a{
                            font-weight: 550;
                        }
                        p{
                            em{
                                color:#999;
                                text-decoration: line-through;
                                margin-left:5px;
                            }
                        }
                        >*{
                            line-height: 1.5;
                        }
                    }
                }
                .payment-info{
                    margin:  20px 0;
                    p{
                        line-height: 1.5;
                        font-size:14px;
                    }
                    p:nth-child(7){
                        padding-bottom:5px;
                    }
                    p:nth-child(8){
                        padding-top:5px;
                        border-top:1px solid #DADADA ;
                    }
                }
            }
            .scroll{
              max-height: 430px;
            }
            .payment{
                height: 50px;
                background: #0C0A26;
                border-radius: 4px;
                color:#fff;
                width:90%;
                margin:0 auto 20px;
                font-size:16px;
            }
        }
    }
  .address-item {
      cursor: pointer;
    background: #ffffff;
    border: 1px solid #e6e6e6;
      border-radius: 4px;
      width: 100%;
      margin-bottom: 10px;
      height: 100px;
      .icondizhi{
          width: 55px;
          text-align: center;
          display: inline-table;
          font-size:23px;
          color:#BBB;
      }
      &.active{
        background: #F4F4F6;
        border:1px solid #DADADA;
        .icondizhi{
          color:#0C0A26;
        }
      }
      >div:nth-child(2){
          height: 100%;
          width: 100%;
          border-left:1px solid #e6e6e6;
          padding:20px;
          color:#333;
          font-size:14px;
          >div:first-child{
              width:25%;
          }
          >div:nth-child(2){
              width:63%;
          }
          em{
              display: flex;
              align-items: flex-end;
              border-bottom: 1px solid;
              font-size:12px;
          }
      }
      >div:nth-child(3){
          width: 100px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding:10px;
      }
  }
}
.payment-error{
  margin: 40px auto;
  img{
    display: block;
    margin: 0 auto 20px;
  }
  p{
    display: flex;
    align-items: center;
    font-size: 20px;
    em{
      color:#E4535C;
    }
    span:first-child{
      width: 200px;
      text-align: right;
      display: block;
    }
  }
  >div{
    text-align: center;
    b{
      font-size: 24px;
      font-weight: 550;
      margin: 30px auto 30px;
      display: block;
    }
    a{
      width: 160px;
      height: 40px;
      background: #FFFFFF;
      border: 1px solid #333333;
      border-radius: 4px;
      margin: auto;
      font-size: 18px;
    }
  }
}
</style>