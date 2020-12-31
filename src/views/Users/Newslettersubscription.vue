<template>
  <div>
    <HeaderTab />
    <div class="my_message">
      <div class="user-security" style="height: 15rem;">
        <div class="flex2" style="justify-content: flex-start;margin: 30px 0;">
          <label class="hx-form-label" style="font-size: 14px;font-weight: 700;"
            >Subscription:</label
          >
          <div style="font-size: .32rem;margin-left: 10px;">
            <van-radio-group v-model="is_newsletter" direction="horizontal">
              <van-radio name="1" checked-color="#141414">YES</van-radio>
              <van-radio name="0" checked-color="#141414">NO</van-radio>
            </van-radio-group>
          </div>
        </div>
        <a
          class="hx-btn"
          href="javascript:void(0)"
          @click="customer_newsletter()"
          rel="nofollow"
          style="width: 100%;"
          >CONFIRM</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import HeaderTab from "@/components/HeaderTab";
export default {
  data() {
    return {
      is_newsletter: "1"
    };
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
    },
    customer_newsletter() {
      this.$Http.user
        .customerNewsletter({
          is_newsletter: parseInt(this.is_newsletter)
        })
        .then(res => {
           let {code,data} = res;
          if (code == 200) {
            // setTimeout(()=>{
            // location.reload()
            // },300)
          }
        });
    }
  },
  created() {
    this.$Http.user.getNewsletter().then(options => {
      let { code, data, msg } = options;
      if (code == 200) {
        this.is_newsletter = data.is_newsletter.toString();
      }
    });
  },
  components: {
    HeaderTab
  }
};
</script>

<style lang="scss" scoped>
.user-security {
  background: #fff;
  padding: 0.53333rem;
}
.flex2 {
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>
