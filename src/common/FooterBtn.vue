<template>
  <div class="pers-footer-btn" >
  <!--v-if="!['/my_cart'].includes($route.path)"-->
    <van-tabbar v-model="active" @change="footerBtn">
      <van-tabbar-item :name="`home`" icon=" iconfont pers-shouye"
        >Home</van-tabbar-item
      >
      <van-tabbar-item
        :name="`${$store.state.common.urlPath}/my_cart`"
        icon=" iconfont pers-gouwudai"
        >Bag</van-tabbar-item
      >
      <van-tabbar-item name="cate" icon=" iconfont pers-sousuo"
        >Category</van-tabbar-item
      >
      <van-tabbar-item :name="`/`" icon=" iconfont pers-wode"
        >My</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";
export default {
  name: "FooterBtn",
  data() {
    return {
      active: "/",
    };
  },
  methods: {
    LINKURL(p = "index") {
      sendParamInUrl({ page: p, url: p });
    },
    footerBtn(ev) {
      // /search
      if (ev == "home") {
        this.LINKURL("/");
      } else if (ev == "cate") {
        this.LINKURL("/search/");
      } else {
        this.$router.push(ev);
      }
      // this.$router.push(ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.pers-footer-btn {
  position: relative;
  // z-index: 1000;
  height: pxto2($px98);
  .van-hairline--top-bottom.van-tabbar {
    height: pxto2($px98);
    border-top: $h-border;
    .van-tabbar-item {
      color: $info-3 !important;
      font-size: pxto2($px24) !important;
      font-weight: 500;
    }
    .van-tabbar-item--active {
      color: $font-soclor !important;
    }
  }
}
</style>