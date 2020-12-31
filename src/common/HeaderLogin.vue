<template>
  <van-nav-bar left-arrow  @click-left="onClickLeft" :class="[$route.path == '/' ? 'pers-header-login-h':'pers-header-login']">
    <van-icon slot="left" >
      <img
        :src="config.logo_m"
        :alt="config.site ? config.site.name : ''"
      />
    </van-icon>
    <van-icon slot="right">
      <a class="phone" href="tel:+8618559680819" rel="nofollow">
        <i class="icon-info-bg icon-phone-icon"></i>
      </a>
    </van-icon>
  </van-nav-bar>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";
import { mapState } from "vuex";
export default {
  props:['isOut'],
  methods: {
    onClickLeft() {
      // alert("首页");
      this.getTopath();
    },
    getTopath() {
      if(this.isOut){
       sendParamInUrl({page :'index',out:true});
      } else {

        sendParamInUrl({page :'index'});
      }
      
     
    }
  },
  computed: {
    ...mapState({
      config(state) {
        return state.common.config ? state.common.config : {};
      }
    })
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/_var.scss';
@import '@/assets/style/mixins.scss';
.pers-header-login{
  width: pxto2($width750);
  height: pxto2($height88);
  padding:pxto2($height20) pxto2($px17);
  .van-nav-bar__content{
     height: pxto2($px53) !important;
  }
  img{
    width: pxto2($width200);
    height: pxto2($px53);
  }
}
.pers-header-login-h{

  img{
    width: pxto2($width200);
    height: pxto2($px53);
  }
}
</style>
