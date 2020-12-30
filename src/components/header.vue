<template>
  <div class="header">
    <div class="header-full">
      <div class="flex1 container">
        <img :src="configObj.logo" :alt="configObj.site?configObj.site.name:''" @click="linkUrl({})"/>
        <div class="flex">
           <router-link :to="{ path: '/' }"><i class="iconfont iconwode"></i></router-link>
          <router-link :to="{ path: '/user/my_wish' }"><i class="iconfont iconxihuan"></i>{{wishTotal>-1?'('+wishTotal+')':''}}</router-link>
          <a href="/cart"><i class="iconfont iconshoutidai"></i>{{cartTotal>-1?'('+cartTotal+')':''}}</a>
          <a><i class="iconfont iconguojia"></i></a>
        </div>
      </div>
    </div>
    <div class="flex1 container" v-if="tips">
      <a class="header-email">{{ paramObj?'Hi, '+paramObj.email:'' }}</a>
      <a class="header-shop" @click="linkUrl({})">Continue Shopping ></a>
    </div>
  </div>
</template>

<script>
import toolsMix from "@/util/tools_mixins";
import {mapState} from "vuex";
export default {
  data () {
    return {
      signType:JSON.stringify(this.$storage.getUserInfo())!='{}'&&this.$storage.getUserInfo()?true:false,
      configObj: {},
      headerBackground:'',
      paramObj:{},
      tips:false,
      cartTotal:-1,
      wishTotal:-1,
    };
  },
  mixins: [toolsMix],
  computed: {
      ...mapState({
          monitor(state) {
              return state.bag.monitor;
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
    bag_total_num(val){
      this.cartTotal=this.bag_total_num;
    },
    wish_total_num(){
      this.wishTotal=this.wish_total_num;
    },
    $route: {
      handler(val) {
        this.paramObj=this.$storage.getUserInfo();
        if (val.path == "/login"||val.path == "/reset"||val.path == "/forget") {
          this.tips=false;
        } else {
          this.tips=true;
        }
        this.signType=JSON.stringify(this.$storage.getUserInfo())!='{}'&&this.$storage.getUserInfo()?true:false;
      },
      deep: true,
    },
  },
  methods: {
    logOut() {
      setTimeout(() => {
        this.$storage.remove('wishlist_ids');
        this.$storage.remove('userInfo');
        this.$storage.remove('access_expired');
        this.$storage.remove('access_token');
        this.$storage.remove('count');
        sessionStorage.clear();
        this.$router.push("/login");
      }, 300);
      if(FB){
        FB.logout(function(response) {
              console.log("用户已退出");
        })
      }
      if(gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
    }
  },
  created () {
    setTimeout(() => {
      if (this.$storage.getConfig()) {
        this.configObj = this.$storage.getConfig();
      }
    },1000);
    if(this.$storage.getCount()!=''&&this.$storage.getCount()!=undefined){
        this.cartTotal=this.$storage.getCount().count_cart;
        this.wishTotal=this.$storage.getCount().count_wishlist;
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  .sign-out{
    position: relative;
    >div{
      position: absolute;
      left: 0;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,.16);
      background: #fff;
      border-radius: 5px;
      z-index: 1;
      padding: 10px;
      cursor: pointer;
      opacity: 0;
      span{
        padding: 8px 12px;
        border: 1px solid #bfbfbf;
        border-radius: 5px;
        width: max-content;
        display: block;
      }
    }
    &:hover{
      >div{
        opacity:1;
      }
    }
  }
  .container{
    padding:5px 0;
    background: unset;
    .iconfont{
      font-size: 26px;
      margin-left: 15px;
    }
    .to-shop {
      display: block;
      text-align: right;
      text-decoration: underline;
    }
    .header-email{
      font-size:14px;
      color:#333333;
      font-weight: 550;
      margin: 5px 0;
    }
    .header-shop{
      color:#0C0A26;
      font-size:12px;
      border-bottom:1px solid;
      font-weight: 550;
      margin: 5px 0;
    }
  }
  .header-full{
      background:#fff;
      >div{
        background:#fff;
        height: 60px;
      }
      a{
        color:#0C0A26;
        display: flex;
        align-items: center;
        i{
          margin-right:2px ;
        }
      }
  }
}
</style>