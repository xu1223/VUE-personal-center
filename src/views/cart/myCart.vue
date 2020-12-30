<template>
  <div class="bag-container">
    <h2 class="title">{{name}}<em v-if="total>-1">({{total_}})</em> <span>> Checkout > Order Complete</span></h2>
    <div v-if="total_>0" class="bag-banner">
        <div class="bag-left">
            <button class="operation" @click="btn(1)">Move To Wishlist</button>
            <button class="operation" @click="btn(2)">Delete</button>
            <div class="bag-table">
                <div>
                    <a>
                        <v-checkbox v-model="checkAll" @click="btn(3)" :true-value="1" :false-value="0" class="checkout"></v-checkbox>
                    </a>
                    <a>Item</a>
                    <a>Price</a>
                    <a>Qty</a>
                    <a>Subtotal</a>
                    <a>Action</a>
                </div>
                <div v-for="(item,index) in list||[]" :key="index">
                    <div>
                        <v-checkbox v-model="item.checkout" :true-value="1" :false-value="0" @change="btn(6,item,index,$event)" class="checkout"></v-checkbox>
                    </div>
                    <div>
                        <img :src="item.img_m" @click="linkUrl({ 'url': item.product_url })">
                        <div>
                            <a class="title-ellipsis" @click="linkUrl({ 'url': item.product_url })">{{item.name}}</a>
                            <span>SKU: {{item.sku}}</span>
                            <div>Color: {{item.color}}</div>
                            <div>Size: 
                                <v-select :allowClear="false" @change="sizeChange(item)" label="name" clue="id" style="width:80px;" :data="item.product_option_value.Size" v-model="item.product_option_value_id"></v-select>
                            </div>
                            <a class="flex4" @click="btn(4,item,index)" v-if="wish_ids&&wish_ids.indexOf(item.product_id)==-1" ><i class="iconfont iconxihuan"></i><em>Move To Wishlist</em></a>
                            <a class="flex4" v-else><i class="iconfont iconxihuan2"></i></a>
                        </div>
                    </div>
                    <div :weight="item.pov_weight">
                        <span>{{data.currency_symbol}}{{item.pov_price | numFilter}}</span>
                        <span v-if="Number(item.pov_show_price)>Number(item.pov_price)" >{{data.currency_symbol}}{{item.pov_show_price| numFilter}}</span>
                    </div>
                    <div>
                        <InputNumber :data="item" :max="item.pov_quantity" 
                        :value="item.quantity"
                        :currIndex="index"
                        :list="list"
                          @change="changeQuantity"
                        ></InputNumber>
                    </div>
                    <div>{{data.currency_symbol}}{{item.pov_price*item.quantity| numFilter}}</div>
                    <div><i  @click="btn(5,item,index)" class="iconfont iconshanchu"></i></div>
                </div>
            </div>
        </div>
        <div class="bag-right">
            <div class="bag-info">
                <p class="flex1">Retail Price:<em>{{data.currency_symbol}}{{product_price_total | numFilter}}</em></p>
                <p class="flex1">Discount:<em>-${{discount | numFilter}}</em></p>
                <p class="flex1">Coupon Discount:<em>-${{coupon_discount | numFilter}}</em></p>
                <p class="flex1">Promotion Discount:<em>-${{promotion_discount | numFilter}}</em></p>
                <p class="flex1">Weight:<em>{{weight |numFilter}} kg</em></p>
                <p class="flex1">Total number of products:<em style="font-weight:bold">{{total}}</em></p>
                <p class="flex1">Total Price(Actual Payment):<em style="font-weight:bold">{{data.currency_symbol}}{{total_price | numFilter }}</em></p>
            </div>
            <a @click="chekout" class="checkout flex">CHECKOUT</a>
            <div class="bag-promotion" v-if="promotion_list!=''">
                <p>Choose your discount offer !</p>
                <div class="scroll">
                    <div v-for="(item,index) in promotion_list" :key="index" class="discount-item">
                        <div :class="[item.enable == 1 ? 'unselected' :'', item.selected == 1  ? 'pitchon' : '']" @click="promotion_pitchon(item,index)">
                            {{item.pro_discount}}<em>(ORDER {{item.pro_discount_}})</em>
                        </div>
                        <p v-if="item.enable!=1">{{ item.difference_prive }}</p>
                    </div>
                </div>
            </div>
            <div class="bag-coupon">
                <p>Please enter your coupon code</p>
                <v-form direction="horizontal">
                <v-form-item label :label-col="labelCol" :wrapper-col="wrapperCol" :help="coupon_help" 
                    :class="code_stage == 1 ? 'coupon-correct':code_stage == 0?'coupon-error':''"
                    prop="coupon_code" >
                    <div class="offer-coupon">
                        <v-input placeholder v-model="coupon_code"></v-input>
                        <i v-if="code_stage==1||code_stage==0" :class="['iconfont ',code_stage == 1 ? 'icondui' :'iconcuo1']"></i>
                    </div>
                    <a @click="codeApply(coupon_code)">APPLY</a>
                </v-form-item>
                </v-form>
            </div>
        </div>
    </div>
    <div v-if="total_==0">
      <div class="noneData">
        <img src="@/assets/img/cartNone.png">
        <p>Your shopping bag is currently empty.</p>
        <a @click="linkUrl({})">Shop Now!</a>
      </div>
      <div class="slick-banner">
        <div>
          <a :class="slick==1?'active':''" v-if="get_featured_products!=''" @click="slick=1">YOU MIGHT LIKE IT</a>
          <a :class="slick==2?'active':''" v-if="get_recently_viewed!=''" @click="slick=2">YOU HAVE RECENTLY VIEWED</a>
        </div>
        <div>  
          <Carousel :class="get_recently_viewed!=''&&slick==2?'slick-none':''" :data="get_featured_products" :limit="5" v-if="get_featured_products!=''"></Carousel>
          <Carousel :class="get_featured_products!=''&&slick==1?'slick-none':''" :data="get_recently_viewed" :limit="5" v-if="get_recently_viewed!=''"></Carousel>
        </div>
      </div>
    </div>
    <iDrawer width="500" :visible="idrawer" @confirmBtn="drawerConfirmBtn('drawerData')"  @cancelBtn="drawerCancelBtn" :border="false">
      <template slot="content">
        <div v-if="idrawerType==1">{{this.$hxmessage.CENTER.CART_MOVE_ALL}}</div>
        <div v-else-if="idrawerType==2">{{this.$hxmessage.CENTER.CART_EMPTY}}</div>
        <div v-else-if="idrawerType==4">{{this.$hxmessage.CENTER.CART_MOVE}}</div>
        <div v-else-if="idrawerType==5">{{this.$hxmessage.CENTER.CART_DELETE}}</div>
        <div v-else-if="idrawerType==6||idrawerType==7">
          <p>All events and coupons cannot be used at the same time. Please choose one of them.</p>
          <div class="flex" style="margin-top:10px">
              <v-radio style="margin:0 10px;" v-model="discountStatus" :label="1">${{promotion_discount_}} for promotion discount.</v-radio>
              <v-radio style="margin:0 10px;" v-model="discountStatus" :label="2">${{coupon_discount_}} for coupon discount.</v-radio>
          </div>
        </div>
        <div v-else>{{this.$hxmessage.CENTER.STOCK_OUT}}</div>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import InputNumber from "@/components/InputNumber";
import { sendParamInUrl , compare ,generateSessionId } from "@/util/tools";
import toolsMix from "@/util/tools_mixins";
import iDrawer from "@/components/Drawer";
import Carousel from "@/components/Carousel";
import { parse } from 'qs';

export default {
  components: {
    InputNumber,
    iDrawer,
    Carousel
  },
  data () {
    return {
      wish_ids:this.$storage.getWishlistIds(),
      cart_ids:[],
      item:{},
      index:-1,
      idrawerType:-1,
      idrawer:false,
      discountStatus:1,
      checkAll:1,
      name: this.$route.name,
      session_id:this.$route.query.session_id?this.$route.query.session_id:generateSessionId(),
      data:{},
      list:[],
      total:0,//购物车总数量
      total_:-1,//购物车总数量
      product_price_total: 0, //商品总原价
      discount: 0, //discount数据
      weight: 0, //总重量
      total_price: 0, //实际支付总价格
      //全场活动
      promotion_list:[], //promotion数据
      promotion_discount: 0, //promotion折扣数值
      promotion_discount_: 0, //promotion折扣数值
      activity_id: "", //全场活动id
      promotion_amount: 0,//全场活动折扣百分比
      promotion_preferential: 0,//全场活动折扣值
      //优惠券
      code_stage: -1, //优惠券输入验证码是否正确 1 0
      coupon_code: "", //优惠券验证码值
      coupon_discount: 0, //coupon折扣数值
      coupon_discount_: 0, //coupon折扣数值
      coupon_help: "", //优惠券提示
      coupon_type: "", //优惠券类型
      coupon_preferential: 0,//优惠券折扣值
      coupon_amount: 0,//优惠券折扣百分比
      vieweddata: [], //浏览商品数据
      likedata: [], //猜你喜欢数据
      off_shelves_to_wish: 0, //下架商品转移到心愿单
      difference_name: 0, //优惠卷差值
      difference_prive: 0, //优惠卷差值价格
      add_success: false,
      wish_success: false,
      remove_success: false,
      wishlist: [],
      bag_item: "",
      is_publish: 1,
      param: {},
      labelCol: {
        span:0
      },
      wrapperCol: {
        span: 24
      },
      get_recently_viewed:[],//浏览商品
      get_featured_products:[],//相识商品
      slick:0,
    }
  },
  mixins: [toolsMix],
  computed: {
    ...mapState({
      bag_prive(state) {
        //改变的价格
        return state.bag.bag_prive;
      },
      bag_show_prive(state) {
        //改变的价格
        return state.bag.bag_show_prive;
      },
      bag_weight(state) {
        //改变的重量
        return state.bag.bag_weight;
      },
      bag_mun(state) {
        // 改变的数量
        return state.bag.bag_mun;
      },
      bag_total(state) {
        // 购物车数量
        return state.bag.bag_total;
      },
      monitor(state) {
        // 监听使用
        return state.bag.monitor;
      },
      bag_discount_(state) {
        return state.bag.bag_discount_;
      },
      bag_total_num(state) {
        return state.bag.bag_total_num;
      },
      wish_total_num(state) {
        return state.bag.wish_total_num;
      }
    })
  },
  watch: {
    monitor(val) {
      this.total = Number(this.total) + Number(this.bag_mun); //总数量
      this.total_=Number(this.total_) + Number(this.bag_total); //总数量
      this.product_price_total = this.product_price_total + this.bag_show_prive; //商品总原价
      this.discount = this.discount + this.bag_discount_; //discount
      this.coupon_discount = 0; //coupon优惠
      this.promotion_discount = 0; //promotion优惠
      this.weight = this.weight + this.bag_weight; //总重量
      this.coupon_code = "";
      this.code_stage = -1;
      this.coupon_help = "";
      this.promotion_list.map(item => {
        item.selected = 0;
      });
      this.get_total_price();
    },
    total_() {
      this.$store.commit("bag/bag_total_num", this.total_);
      this.setCount(5,this.total_)
    },
    total_price() {
      this.get_promotion_list();
    }
  },
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
    changeQuantity(parms){
      const {currIndex,value} = parms
      this.list[currIndex]['quantity'] = value;
    },
    btn(type,item,index,val){
      if(type==1){
        //批量添加心愿清单
        if(this.cart_ids.length>0){
          this.idrawerType=1;
          this.idrawer=true;
        }else{
          this.$notification.open({
            message: "Tips",
            description:this.$hxmessage.CENTER.SELECTION_TIPS,
            duration: 2
          });
        }
      }else if(type==2){
        //批量删除心愿清单
        if(this.cart_ids.length>0){
          this.idrawerType=2;
          this.idrawer=true;
        }else{
          this.$notification.open({
            message: "Tips",
            description:this.$hxmessage.CENTER.SELECTION_TIPS,
            duration: 2
          });
        }
      }else if(type==3){
        //全选
        if(this.cart_ids.length==this.list.length){
          this.cart_ids=[];
          this.checkAll=0;
          this.list.map(item_=>{
            this.$set(item_,"checkout",0);
            item_.checkout=0;
          })
        }else{
          this.cart_ids=[];
          this.list.map(item_=>{
            item_.checkout=1;
            this.$set(item_,"checkout",1);
            this.cart_ids.push(item_.id)
          })
          this.checkAll=1;
        }
      }else if(type==4){
        //移入心愿清单
        this.idrawerType=4;
        this.idrawer=true;
        this.item=item;
        this.index=index;
      }else if(type==5){
        //删除购物车
        this.idrawerType=5;
        this.idrawer=true;
        this.item=item;
        this.index=index;
      }else if(type==6){
         //单选
         this.$set(item,"checkout",val);
         this.cart_ids=[];
         this.list.map(item_=>{
           if(item_.checkout==1){
            this.cart_ids.push(item_.id)
           }
         })
         this.checkAll=this.cart_ids.length==this.list.length?1:0;
         const bag_vux = {
            mun: item.quantity,
            mun_checkout:item.checkout==1?item.quantity:-item.quantity,
            data: item,
            checkout:item.checkout,
            checkout_:2,
         };
        this.$store.dispatch("bag/bag_data", {bag_vux});
      }
    },
    chooseOne(){
        if(this.discountStatus==1){
          this.clear_coupon_discount();
          this.promotion_discount =
              this.promotion_amount != 0 ? 
              Number( this.product_price_total - this.discount - this.coupon_discount ) * (100 - Number(this.promotion_amount)) * 0.01
              : this.promotion_preferential;
          this.get_total_price();
          this.code_stage = -1;
        }else{
          this.clear_promotion_discount();
          this.coupon_discount =
            this.coupon_amount != 0
              ? (this.product_price_total - this.discount) *
                (100 - this.coupon_amount) *
                0.01
              : this.coupon_preferential;
          this.get_total_price();
        }
    },
    drawerConfirmBtn(forms){
      let arr=this.list.filter(function (item) {
        return item.checkout == 1;
      });
      let arr1=[];
        arr.map(item=>{
            arr1.push(item.id)
        })
      let length=0;
      arr.map(item=>{
          length+=item.quantity
      })
      if(this.idrawerType==1){
        //批量添加心愿清单
        let arr2= [];
        let arr3= [];
        if((this.wish_ids&&this.wish_ids!=undefined&&this.wish_ids!='')||(!this.wish_ids||this.wish_ids=='')){
          arr.map(item=>{
            if(this.wish_ids.indexOf(item.product_id)==-1){
              arr2.push(item.id)
            }else{
              arr3.push(item.id)
            }
          })//筛选未在心愿清单的购物车id
        }
        if(arr2!=''){
          this.$Http.cart.wishDo({ cart_ids: arr2,session_id:this.session_id}).then(res => {
              let { code, msg, data } = res;
              if (code == 200) {
                  this.setCount(3,length,arr2.length);
                  if(arr3==''){
                    this.idrawer=false;
                    this.getCarts()
                    this.getAllWishlistProductIds();
                  }
              }
          });
        }
        if(arr3!=''){
          this.$Http.cart.cartDel({ cart_ids: arr3,session_id:this.session_id}).then(res => {
              let { code, msg, data } = res;
              if (code == 200) {
                  this.idrawer=false;
                  this.setCount(4,arr3.length);
                  this.getCarts()
                  this.getAllWishlistProductIds();
              }
          });
        }
      }else if(this.idrawerType==2){
        //批量删除购物车
        this.$Http.cart.cartDel({ cart_ids: arr1,session_id:this.session_id}).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
                this.idrawer=false;
                this.setCount(4,length);
                this.getAllWishlistProductIds();
                this.getCarts()
            }
        });
      }else if(this.idrawerType==4){
        //移入心愿清单
        let arr2=[];
        arr2.push(this.item.id)
        this.$Http.cart .wishDo({ cart_ids: arr2,session_id:this.session_id}).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
                this.idrawer=false;
                const bag_vux = {
                    mun: this.item.quantity,
                    mun_checkout:-this.item.quantity,
                    data: this.item,
                    checkout:this.item.checkout,
                    checkout_:2,
                };
                this.$store.dispatch("bag/bag_data", {bag_vux});
                this.list.splice(this.index, 1);
                this.setCount(3,this.item.quantity,1);
                this.getAllWishlistProductIds()
                this.total_=this.total_-this.item.quantity;
            }
        });
      }else if(this.idrawerType==5){
        //删除购物车
        let arr2=[];
        arr2.push(this.item.id)
        this.$Http.cart.cartDel({ cart_ids: arr2,session_id:this.session_id }).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
              this.idrawer=false;
              const bag_vux = {
                  mun: this.item.quantity,
                  mun_checkout:-this.item.quantity,
                  data: this.item,
                  checkout:this.item.checkout,
                  checkout_:2,
              };
              this.$store.dispatch("bag/bag_data", {bag_vux});
              this.list.splice(this.index, 1);
              this.setCount(4,this.item.quantity);
              this.total_=this.total_-this.item.quantity;
            }
        });
      }else if(this.idrawerType==6||this.idrawerType==7){
         //全换活动优惠券冲突
        this.chooseOne();
        this.idrawer=false;
      }else if(this.idrawerType==8){
        //商品过期
        this.idrawer=false;
        this.shelves();
      }
    },
    drawerCancelBtn(){
      if(this.idrawerType==6){
        this.clear_coupon_discount();
        this.code_stage = -1;
      }else if(this.idrawerType==7){
        this.clear_promotion_discount();
      }
      this.idrawer=false
    },
    sizeChange(item){
      this.$Http.cart.cartEdit({
          cart_id: item.id,
          product_option_value_id: item.product_option_value_id,
          quantity: item.quantity,
          session_id: this.session_id
        }).then(res => {
          let { code, data, msg } = res;
          if (code == 200) {
            // this.data = {};
            // this.getCarts();
          }else{
            this.$set(item,'product_option_value_id',item.size_id)
            this.$notification.open({
              message: "Tips",
              description:msg,
              duration: 2
            });
          }
        });
    },
    //下架商品
    shelves() {
      this.$Http.cart.moveShelvesToWishlist().then(options => {
        let { code, msg, data } = options;
        if (code == 200) {
          this.chekout();
          this.getTotalCartWishCount();
        }
      });
    },
    //去支付页面
    chekout(){
        let forms={
          cart_ids:this.cart_ids
        };
        forms.session_id=this.session_id;
        if(this.activity_id){
          forms.activity_id=this.activity_id;
        }
        if(this.coupon_code){
          forms.coupon_code=this.coupon_code;
        }
        this.$Http.cart.generateOrderFromCart(forms).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
                this.getTotalCartWishCount();
                let dataNext = {};
                this.$router.push({
                    path: "/payment_step_two",
                    query: {invoice_no:data.invoice_no}
                });
            } else {
                this.list.map(item => {
                    if (item.is_publish == 0) {
                        this.is_publish = 0;
                    }
                });
                if (this.is_publish == 0) {
                  this.idrawerType=8;
                  this.idrawer=true;
                }
            }
        });
    },
    //获得实际支付费用
    get_total_price() {
      this.total_price =
        this.product_price_total -
        this.discount -
        this.coupon_discount -
        this.promotion_discount;
        if (this.total_price < 0) {
            this.total_price = 0.0;
        }
    },
    //最后获得优惠券
    get_coupon_discount(){
      this.coupon_discount =
        this.coupon_amount != 0
          ? (this.product_price_total - this.discount) *
            (100 - this.coupon_amount) *
            0.01
          : this.coupon_preferential;
    },
    //最后获得全场活动优惠
    get_promotion_discount() {
      this.promotion_discount =
        this.promotion_amount != 0
          ? Number( this.product_price_total - this.discount - this.coupon_discount ) * (100 - Number(this.promotion_amount)) * 0.01
          : this.promotion_preferential;
    },
    //优惠券
    codeApply(coupon_code){
        this.coupon_preferential = 0;
        this.coupon_amount = 0;
        if (coupon_code == "") {
          this.coupon_help = "Required field.";
          this.code_stage = 0;
          this.coupon_discount = 0;
          this.get_total_price();
        } else {
          this.$Http.cart.checkCouponAvailabilityByCart({ cart_ids:this.cart_ids,coupon_code:coupon_code,session_id: this.session_id}).then(res => {
              let { data, msg, code } = res;
              if (code == 200) {
                this.code_stage = 1;
                this.coupon_type = data.type;
                this.coupon_help = data.name;
                if (data.discount == 0) {
                  this.coupon_preferential = Number(data.preferential);
                } else {
                  this.coupon_amount = Number(data.discount);
                }
                if (this.promotion_discount != 0) {
                  this.promotion_discount_=this.promotion_discount;
                  this.coupon_discount_= this.coupon_amount != 0 ? (this.product_price_total - this.discount) * (100 - this.coupon_amount) * 0.01  : this.coupon_preferential;
                  this.idrawerType=6;
                  this.idrawer=true;
                } else {
                  this.promotion_discount = 0;
                  this.get_coupon_discount();
                  this.get_promotion_discount();
                }
                this.get_total_price();
              } else {
                this.code_stage = 0;
                this.coupon_help = "This coupon does not exist or is invalid.";
                this.coupon_discount = 0;
              }
              this.get_total_price();
            });
        }
    },
    //优惠券类型
    couponType() {
      if (this.code_stage == 0 || this.code_stage == -1) {
        return true;
      }
      if (this.coupon_type != "R") {
        return false;
      }
      return true;
    },
    //清除优惠券
    clear_coupon_discount() {
      this.coupon_preferential = 0;
      this.coupon_amount = 0;
      this.coupon_code = "";
      this.coupon_discount = 0;
      this.coupon_type = "";
      this.coupon_help = "";
      this.code_stage = -1;
      this.get_total_price();
    },
    //清除全场活动
    clear_promotion_discount(){
      this.promotion_preferential = 0;
      this.promotion_amount = 0;
      this.activity_id = 0;
      this.promotion_discount = 0;
      this.promotion_list.map(item => {
        item.selected = 0;
      });
      this.get_total_price();
    },
    //全场活动选择
    promotion_pitchon(item,index){
        this.promotion_amount = 0;
        this.promotion_preferential = 0;
        if(item.enable==1){    
            if(item.selected!=1){
                this.promotion_list.map(item => {
                    item.selected = 0;
                });
                item.selected =1;
                this.activity_id = item.id;
                if (item.discount == 0) {
                    this.promotion_preferential = Number(item.preferential);
                } else {
                    this.promotion_amount = Number(item.discount);
                }
                if (this.coupon_discount != 0) {
                  this.coupon_discount_=this.coupon_discount;
                  this.promotion_discount_ =this.promotion_amount != 0 ?  Number( this.product_price_total - this.discount - this.coupon_discount ) * (100 - Number(this.promotion_amount)) * 0.01
                        : this.promotion_preferential;
                  this.idrawerType=7;
                  this.idrawer=true;
                }else{
                    this.get_promotion_discount();
                }
                this.get_total_price();
            }else{
                item.selected = 0;
                this.activity_id = 0;
                this.promotion_discount = 0;
                this.get_total_price();
            }
        }
    },
    //全场活动处理
    get_promotion_list() {
      this.promotion_list.map(item => {
          if(item.purchase_number_min==0){
            item.pro_discount = item.discount > 0 ? 100 - Number(item.discount).toFixed(2) + "% OFF" : item.preferential > 0
                ? "-$" + Number(item.preferential).toFixed(2)
                : 0;
            item.pro_discount_ = item.purchase_amount_min > 0 ? "OVER $" + Number(item.purchase_amount_min).toFixed(2)
                : "QUANTITY " + Number(item.purchase_number_min).toFixed(2);
            if ( this.product_price_total - this.discount >= item.purchase_amount_min) {
                item.enable = 1;
            } else {
                item.enable = 0;
            }
            item.final_promotion = item.discount!=0?Number(this.product_price_total-this.discount)*(100-Number(item.discount))*0.01:item.preferential;
            let difference_prive_=Number(item.purchase_amount_min) - (this.product_price_total - this.discount);
            item.difference_prive =`Add more US$`+(difference_prive_).toFixed(2)+ ` to get`+ item.pro_discount+`!`;
          }else{
            item.pro_discount = item.discount > 0 ? 100 - Number(item.discount).toFixed(2) + "% OFF" : item.preferential > 0
                ? "-$" + Number(item.preferential).toFixed(2)
                : 0;
            item.pro_discount_ = "OVER  " + Number(item.purchase_number_min).toFixed(0) +" PIECES";
            if ( this.total >= item.purchase_number_min && this.total < item.purchase_number_max ) {
                item.enable = 1;
            } else {
                item.enable = 0;
            }
            item.final_promotion = item.discount!=0?Number(this.product_price_total-this.discount)*(100-Number(item.discount))*0.01:item.preferential;
            let difference_prive_= Number(item.purchase_number_min) - (this.total);
            item.difference_prive =`Add more `+(difference_prive_).toFixed(2)+ ` pieces to get `+ item.pro_discount+`!`;
          }
      })
      this.promotion_list.sort(compare("enable"));
    },
    //全场活动接口
    fullMallActivityList() {
      this.promotion_list = [];
      this.$Http.cart.fullMallActivityList({ session_id: this.session_id }).then(res => {
          let { code, data ,msg } = res;
          if (code == 200) {
            if(data!=''){
              this.promotion_list=data;
              this.get_promotion_list();
            }
          }
      });
    },
    getCarts(){
        this.$Http.cart.getCarts({ session_id: this.session_id }).then(res => {
            let { code, msg, data } = res;
            if (code == 200) {
              this.total = data.total_num;
              this.total_= data.total_num;
              this.data = data;
              if(data.total_num!=0){
                data.data.map(item=>{
                    item.size_id=item.product_option_value_id,
                    item.checkout=1,
                    this.cart_ids.push(item.id)
                })
                this.list=data.data;
                this.product_price_total=Number(data.total_price)+Number(data.discounted_price);
                this.discount=Number(data.discounted_price);
                this.weight=Number(data.total_weight);
                this.total_price=Number(data.total_price)
                this.fullMallActivityList();
              }else{
                this.getRecentlyViewed()
                this.getFeaturedProducts()
              }
            }
      });
    },
    getFeaturedProducts(){
      this.$Http.cart.getFeaturedProducts({ session_id: this.session_id,}).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
            if(data['is_featured']){
              this.get_featured_products=data['is_featured'].products;
            }
         }
         this.slick=this.get_featured_products!=''?1:2
      });
    },
    getRecentlyViewed(){
      this.$Http.cart.getRecentlyViewed({ session_id: this.session_id,}).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
            if(data.total>0){
              this.get_recently_viewed=data.data;
            }
         }
      });
    }
  },
  created () {
      this.getCarts();
      this.getTotalCartWishCount();
      if(this.$route.query.session_id){
        this.$storage.setSessionId(this.$route.query.session_id);
      }
  }
}
</script>
<style scoped lang="less">
.bag-container{
    padding:20px;
    .title{
        span{
            color:#999;
        }
    }
    .bag-banner{
        display: flex;
        .operation{
            margin: 0 20px 20px 0;
            border-bottom:1px solid ;
            font-size:14px;
            display: inline-block;
        }
        .bag-right{
          padding:20px 10px;
          border: 1px solid #DADADA;
          height: min-content;
          width: 29%;
          .checkout{
              background: #0C0A26;
              color:#fff;
              font-size:16px;
              width: 90%;
              height: 45px;
              margin: 20px auto 40px;
              border-radius: 4px;
          }
          .bag-info{
              p{
                  line-height: 1.7;
                  font-size:14px
              }
              p:nth-child(5){
                  padding-bottom:20px
              }
              p:nth-child(6){
                  border-top:1px solid #DADADA;
                  padding-top:20px
              }
          }
          .bag-promotion{
              >p{
                  font-size:14px;
                  color:#333;
                  font-weight:700;
                  line-height: 2;
                  margin-bottom: 5px;
              }
              >div{
                max-height:300px;
                overflow: hidden;
                overflow-y: auto;
                .item{
                  margin-bottom: 10px;
                    p{
                        color: #FF6600;
                        font-size:11px;
                        text-align: center;
                    }
                }
              }
          }
          .bag-coupon{
              padding:10px;
              background: #F4F4F6;
              margin-top: 20px;
              >p{
                  font-size:14px;
                  color:#333;
                  font-weight:700;
                  line-height: 2;
                  margin-bottom: 5px;
              }
              .ant-form-item{
                  margin-bottom: 10px;
              }
              /deep/ .ant-form-item-control{
                  .offer-coupon{
                    width: 68%;
                    margin-right:2%;
                    position: relative;
                    i{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right:5px;
                        display: flex;
                        align-items: center;
                    }
                  }
                  a{
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 30%;
                      height:40px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color:#fff;
                      background: #0C0A26;
                      border-radius:4px;
                      margin-left: 10px;
                      font-size: 14px;
                  }
              }
            .coupon-correct{
                i{
                    color:#87d2ac
                }
                .has-error .ant-input, .has-error .ant-input:hover{
                    border-color: #bbb;
                }
            }
            .coupon-error{
                i{
                    color:#f04134
                }
            }
          }
        }
        .bag-left{
            width:70%;
            margin-right: 1%;
            .bag-page{
                text-align: center;
                margin:20px auto;
            }
            .bag-table{
                width: 100%;
                border: 1px solid #DADADA;
                border-bottom:none;
                >div{
                    display: flex;
                    align-items: center;
                        
                    >a,>div{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding:10px;
                        color:#333333;
                        font-weight: 400;
                        overflow: hidden;
                        border-bottom: 1px solid #DADADA;
                    }
                    >a{
                        border-right: 1px solid #DADADA;
                        font-size:14px;
                        height: 40px;
                        align-items: center;
                    }
                    >div{
                        height: 140px;
                    }
                    >a:first-child,>div:first-child{
                        width:5%;
                        border-right: 1px solid #DADADA;
                        align-items: flex-start;
                        /deep/ .ant-checkbox-inner{
                            border-radius: 50%;
                            width: 16px;
                            height: 16px;
                        }
                    }
                    >a:nth-child(2),>div:nth-child(2){
                        width: 40%;
                        >div{
                            >*{
                                margin:2px 0;
                                .title-ellipsis{
                                    font-size:14px;
                                }
                                em{
                                    border-bottom:1px solid ;
                                    margin-left: 2px;
                                }
                            }
                        }
                    }
                    >div:nth-child(2){
                        justify-content: flex-start;
                        align-items: flex-start;
                        img{
                            width: 90px;
                            margin-right: 10px;
                        }
                        .title-ellipsis{
                            font-size:12px;
                            font-weight: 550;
                            display: block;
                            max-width: 270px;
                        }
                        span{
                            display: block;
                            color:#999;
                        }
                        /deep/ .ant-select-selection--single{
                            height: 25px;
                            display: block;
                           .ant-select-selection__rendered{
                                line-height: 25px;
                            }
                        }
                    }
                    >a:nth-child(3),>div:nth-child(3){
                        width:15%;
                        >span{
                            display: block;
                            margin: 0 5px;
                            &:first-child{
                                font-size:14px;
                            }
                            &:nth-child(2){
                                text-decoration: line-through;
                                color:#999;
                            }
                        }
                    }
                    >a:nth-child(4),>div:nth-child(4){
                        width: 20%;
                    }
                    >a:nth-child(5),>div:nth-child(5){
                        width: 10%;
                        font-size: 14px;
                    }
                    >a:nth-child(6),>div:nth-child(6){
                        width: 10%;
                        border-right: none;
                        .iconfont{
                            font-size:25px;
                        }
                    }
                }
            }
        }
    }
}
.slick-banner{
  >div:first-child{
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 30px auto;
    a{
      font-size: 16px;
      margin: 0 20px;
      border-bottom:3px solid #fff ;
      &.active{
        border-bottom:3px solid #0C0A26 ;
      }
    }
  }
  >div:nth-child(2){
    position: relative;
    .slick-none{
      position: absolute;
      left: 0;
      width: 100%;
      top:0;
      z-index: -1;
    }
  }
}
.carousel-banner{
  /deep/ .ant-tabs-bar{
    border: none;
    .ant-tabs-nav{
      width: 100%;
      text-align: center;
      margin: 30px 0;
      .ant-tabs-ink-bar {
        display: none;
      }
      .ant-tabs-tab{
        border-bottom:3px solid #fff;
        font-size: 18px;
        padding: 0;
        margin: 0 30px;
      }
      .ant-tabs-tab-active{
        color:#0C0A26;
        border-bottom:3px solid #0C0A26;
      }
    }
  }
}
</style>