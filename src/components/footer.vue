<template>
  <div class="footer white-background">
    <div class="flex3 footer-menu">
      <div
        v-for="(item,index) in footerMenu"
        :key="index"
      >
        <img src="@/assets/img/true.png">
        <p>{{item.title}}</p>
        <span>{{item.content}}</span>
      </div>
    </div>
    <p class="copy-right">
      Copyright © {{year}} {{configObj.site?configObj.site.name:''}}. All rights reserved.
    </p>
  </div>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";

export default {
  data () {
    return {
      year: "",
      configObj: {},
      footerMenu: [
        {
          title: 'FULL REFUND',
          content: "* If you don't receive your order"
        },
        {
          title: 'RETURN AND REFUND',
          content: "* Items not as described"
        },
        {
          title: `SECURE PAYMENTS WITH ESCROW PROTECTION`,
          content: "* Easier, faster dispute resolution. * 100% Guaranteed refunds."
        },
      ]
    };
  },
  methods: {
    getTopath (href) {
      sendParamInUrl({ url: href });
    }
  },
  created () {
    this.year = new Date().getFullYear();
    setTimeout(() => {
      if (this.$storage.getConfig()) {
        this.configObj = this.$storage.getConfig();
      }
    }, 500);
  }
};
</script>

<style lang="less">
.footer {
  margin-top: 10px;
  .footer-menu {
    padding:20px 0;
    min-width: 1200px;
    background: #fff;
    > div {
      text-align: center;
      width: 215px;
      margin:0 100px;
      p{
        color:#333333;
        font-size:16px;
        font-weight: 550;
      }
      span{
        color:#888888;
        font-size: 14px;
      }
    }
  }
  .copy-right{
    min-width: 1200px;
    background: #fff;
    text-align: center;
    color:#888;
    line-height: 2;
  }
}
</style>