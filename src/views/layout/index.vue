<template>
  <div v-if="hash" class="grid-container">
    <Nav v-if="nav" />
    <Vivew class="nav-right" :style="pagePadding" />
  </div>
  <div v-else :class="['nav-right',wide?'container':'']">
    <Vivew />
  </div>
</template>
<script>
import Vivew from "./view";
import Nav from "@/components/Nav";
export default {
  name: "layout",
  components: {
    Vivew,
    Nav,
  },
  data () {
    return {
      nav:true,
      hash: false,
      wide:false,
      pagePadding:'width: -webkit-fill-available',
    };
  },
  watch: {
    $route (val) {
      if (val.meta.fate || !val.meta.num) {
        this.hash = false;
        if(val.path=='/login'||val.path=='/forget'||val.path=='/reset'){
          this.wide=false
        }else{
          this.wide=true
        }
      } else {
        this.hash = true;
        if(val.path=='/order/order_detail'&&val.query.session_id){
          this.nav=false
        }else{
          this.nav=true
        }
      }
      deep:true
    },
  }
};
</script>