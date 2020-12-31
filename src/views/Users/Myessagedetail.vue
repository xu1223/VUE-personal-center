<template>
  <div>
    <HeaderTab/>
    <div class="my-essageed-detil">
      <div v-show="isShow == false">
        <div class="message-main-header-div">
          <a></a>
          <a></a>
          <a class="p-rt reply-btn" href="javascript:void(0)" rel="nofollow" @click="Reply">Reply</a>
        </div>
        <div class="detail-message-main">
          <div class="message-title">
            <p>Re:banner</p>
          </div>
          <div class="message-cont" v-html="db_selectlist.content"></div>
        </div>
      </div>
    
      <div  v-show="isShow" >
        <Sendmesgdil :formdata="db_selectlist||{}" :isShow.sync="isShow" :type="type"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sendmesgdil from './Sendmesgdil'
import HeaderTab from "@/components/HeaderTab";

export default {
  data() {
    return {
      db_selectlist: {},
      isShow: false,
      type:'',
    
    };
  },
  methods: {
   
    onClickLeft() {
      window.history.back(-1);
    },
    Reply(){
      this.isShow = !this.isShow
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$Http.message.getMessageDetail({id: this.$route.query.id}).then(res=>{
          let {code,data} = res;
          if (code == 200) {
            this.db_selectlist = data;
          }
      });
      this.type = this.$route.query.type
    }
  },
  components: {
    Sendmesgdil,
    HeaderTab
  },
};
</script>

<style lang="scss" scoped>
.my-essageed-detil {
  margin-top: 1.2rem;
  .message-main-header-div {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
  }
  .message-main-header-div a {
    cursor: pointer;
    // font-family: "SH-Medium";
    font-size: 0.42667rem;
    color: #13b9b0;
    text-transform: Capitalize;
  }
  .detail-message-main {
    background-color: #fff;
    padding: 0.33333rem 0.53333rem;
  }
  .detail-message-main .message-title {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.33333rem;
  }

  .detail-message-main .message-title > p {
    font-family: "SH-Medium";
    font-size: 0.32rem;
    color: #161616;
    margin-bottom: 0.26667rem;
  }
  .message-cont p {
    font-size: 0.32rem;
    line-height: 0.48rem;
    color: #161616;
  }
}
</style>