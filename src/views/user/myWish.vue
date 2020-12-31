<template>
  <div class="wish-container">
    <h2 class="title">{{name}}</h2>
    <div v-if="total>0">
      <div class="flex2">
        <v-checkbox v-model="checkAll" :true-value="1" :false-value="0" @click="btn(3)" class="operation">SELECT ALL</v-checkbox>
        <button @click="btn(1)" class="operation"><i class="iconfont iconshoutidai"></i>ADD TO BAG</button>
        <button @click="btn(2)" class="operation"><i class="iconfont iconshanchu"></i>DELETE</button>
      </div>
      <div class="wish-banner">
        <div v-for="(item,index) in data" :key="index" class="wish-item">
          <a class="full-image">
            <img :src="item.img_l" @click="linkUrl({'url':item.product_url })">
          </a>
          <i class="iconfont iconshanchu wish-delete" @click="btn(4,item,index)"></i>
          <v-checkbox v-model="item.checkout" class="wish-select" :true-value="1" :false-value="0" @change="btn(6,item,index,$event)"></v-checkbox>
          <a class="title-ellipsis" @click="linkUrl({'url':item.product_url })">{{item.name}}</a>
          <div class="flex1 item-info">
            <span>SKU:{{ item.sku }}</span>
            <span>${{ item.currency_price }}</span>
          </div>
          <div class="item-select">

              <v-select label="name" clue="id"
                :data="item.product_option_value.Color" v-model="item.color_id"
                :value="item.product_option_value.Color?item.product_option_value.Color[0].id:''"></v-select>
              <v-select label="name" clue="id"
                :data="item.product_option_value.Size"
                :value="item.product_option_value.Size[0].id"
                v-model="item.size_id"></v-select>
          </div>
          <button class="button" @click="btn(5,item,index)">ADD TO BAG</button>
        </div>
      </div>
    </div>
    <v-pagination v-if="total>0&&last_page>1" class="page" :total="total" @change="loadPage" :pageSize="20"></v-pagination>
    <div v-if="total==0">
      <div class="noneData">
        <img src="@/assets/img/wishNone.png">
        <p>You currently have nothing saved to your Wishlist.</p>
        <a @click="linkUrl({})">Continue Shopping</a>
      </div>
    </div>
    <iDrawer :visible="idrawer" :border="false" @confirmBtn="drawerConfirmBtn()" @cancelBtn="drawerCancelBtn">
      <template slot="content">
        <div v-if="idrawerType==1">{{this.$hxmessage.CENTER.WISH_MOVE_ALL}}</div>
        <div v-else-if="idrawerType==2">{{this.$hxmessage.CENTER.CART_EMPTY}}</div>
        <div v-else-if="idrawerType==4">{{this.$hxmessage.CENTER.CART_DELETE}}</div>
        <div v-else>{{this.$hxmessage.CENTER.WISH_MOVE}}</div>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import message from "@/util/message";
import { generateSessionId } from "@/util/tools";
import toolsMix from "@/util/tools_mixins";
import iDrawer from "@/components/Drawer";
export default {
  components: {
    iDrawer,
  },
  data () {
    return {
      last_page:0,
      wish_ids:[],
      index:-1,
      item:{},
      idrawer:false,
      idrawerType:-1,
      name: this.$route.name,
      total:-1,
      data:[],
      single:true,
      checkAll:1,
    }
  },
  mixins: [toolsMix],
  watch: {},
  methods: {
    btn(type,item,index,val){
      if(type==1){
        //批量加入购物车
        if(this.wish_ids.length>0){
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
        if(this.wish_ids.length>0){
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
        if(this.wish_ids.length==this.data.length){
          this.wish_ids=[];
          this.checkAll=0;
          this.data.map(item_=>{
            this.$set(item_,"checkout",0);
            item_.checkout=0;
          })
        }else{
          this.wish_ids=[];
          this.data.map(item_=>{
            item_.checkout=1;
            this.$set(item_,"checkout",1);
            this.wish_ids.push(item_.id)
          })
          this.checkAll=1;
        }
      }else if(type==4){
        //单个删除
        this.idrawerType=4;
        this.item=item;
        this.index=index;
        this.idrawer=true;
      }else if(type==5){
        //单个加入
        this.idrawerType=5;
        this.item=item;
        this.index=index;
        this.idrawer=true;
      }else if(type==6){
        //单选
        this.$set(item,"checkout",val);
        this.wish_ids=[];
        this.data.map(item_=>{
          if(item_.checkout==1){
            this.wish_ids.push(item_.product_id)
          }
        })
        this.checkAll=this.wish_ids.length==this.data.length?1:0;
      }
    },
    drawerConfirmBtn(){
      let arr=this.data.filter(function (item) {
        return item.checkout == 1;
      });
      if(this.idrawerType==1){
        //批量加入购物车
        let param = {};
        arr.map((item) => {
          param["products[" + item.id + "][product_id]"] =
            item.product_id;
          param["products[" + item.id + "][product_option_value_id]"] =
            item.size_id;
          param["products[" + item.id + "][quantity]"] = 1;
          param["products[" + item.id + "][wish_id]"] = item.id;
        });
        this.$Http.wishlist.batchCartAdd({...param},true).then(res => {
          let { code,msg } = res;
          if (code == 200) {
            this.idrawer=false;
            this.setCount(1,arr.length);
            this.getWishlists()
            this.getAllWishlistProductIds()
          }
        });
      }else if(this.idrawerType==2){
        //批量删除心愿清单
        this.$Http.wishlist.wishDo({product_ids:this.wish_ids}).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
            this.idrawer=false;
            this.setCount(2,arr.length);
            this.getWishlists()
            this.getAllWishlistProductIds()
          }
        });
      }else if(this.idrawerType==4){
        //单个删除
        let arr1=[];
        arr1.push(this.item.product_id)
        this.$Http.wishlist.wishDo({product_ids: arr1}).then(res => {
          let { code, msg, data } = res;
          if (code == 200) {
              this.idrawer=false;
              this.data.splice(this.index, 1);
              this.getAllWishlistProductIds();
              this.setCount(2,1)
          }
        });
      }else if(this.idrawerType==5){
        //单个加入
        this.$Http.wishlist.cartAdd({
            product_id: this.item.product_id,
            product_option_value_id: this.item.size_id,
            wish_id: this.item.id,
            quantity: 1,
        })
        .then(res => {
        let { code, msg, data } = res;
            if (code == 200) {
                this.idrawer=false;
                this.data.splice(this.index, 1);
                let wishlist = this.$storage.getWishlistIds(),
                    index_ = wishlist.indexOf(this.item.product_id);
                    wishlist.splice(index_, 1);
                this.$storage.setWishlistIds(wishlist);
                this.setCount(1,1);
            }
        });

      }
    },
    drawerCancelBtn(){
      this.idrawer=false;
    },
    getWishlists (p) {
      this.$Http.wishlist.getWishlists({p: p}).then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.last_page=data.last_page;
          this.total=data.total;
          if(data.total>0){
            data.data.map(item => {
              let size_id = item.product_option_value.Size?item.product_option_value.Size[0].id:'';
              item.size_id = size_id;
              let color_id = item.product_option_value.Color?item.product_option_value.Color[0].id:'';
              item.color_id = color_id;
              item.checkout = 1;
              this.wish_ids.push(item.product_id)
            });
            this.data=data.data;
          }
        }
      })
    },
    loadPage(page) {
      this.checkAll=0;
      this.getWishlists(page);
    },
  },
  created () {
      this.getWishlists();
      this.getTotalCartWishCount();
  }
}
</script>
<style scoped lang="less">
.wish-container{
    .operation{
        width: 110px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #DADADA;
        border-radius: 4px;
        margin:0 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            margin-right: 5px;
        }
        /deep/ .ant-checkbox-inner{
          border-radius: 50%;
        }
    }
    
    .wish-banner{
    display: grid;
    grid-row-gap: 1.5rem;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(5, 19%);
    @media (max-width:1400px) {
        grid-template-columns: repeat(4, 24%);
    }
    .wish-item{
        width: 100%;
        position: relative;
        display: inline-table;
        .wish-delete{
            position: absolute;
            right: 10px;
            top:10px;
            font-size: 22px;
            
        }
        .wish-select{
            position: absolute;
            top: 10px;
            left: 10px;
            border-radius:50%;
            /deep/ .ant-checkbox-inner{
                width: 23px;
                height: 23px;
                border-radius: 50%;
                &::after{
                    left: 8px;
                    top: 3px;
                    width: 6px;
                    height: 12px;
                }
            }
        }
        .item-select{
            display: grid;
            grid-template-columns:1fr 1fr;
            gap:5px;
        }
        .item-info{
            span:first-child{
              color:#999;
            }
            span:nth-child(2){
              color: #333;
              font-size:16px;
              font-weight: 550;
            }
        }
        a{
        display: block;
        }
        .title-ellipsis{
        width: 200px;
        }
        .full-image{
        font-size:0;
        border: 1px solid #efefef;
        width: 100%;
        overflow: hidden;
        height: 270px;
        @media (min-width: 1200px) {
            height: 270px;
        }
        }
        .button{
        width: 100%;
        height: 40px;
        margin-top: 10px;
        }
      }
    }
}
</style>