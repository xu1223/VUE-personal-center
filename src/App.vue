<template>
  <div>
    <Header />
    <Layout />
    <Footer v-if="hash" />
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import Layout from "@/views/layout";
export default {
  components: {
    Header,
    Footer,
    Layout
  },
  data(){
    return{
      hash:false,
    }
  },
  watch: {
    $route (val) {
      if(val.path=='/login'||val.path=='/forget'){
        this.hash=false
      }else{
        this.hash=true
      }
    },
  },
  created () {
  }
};
</script>