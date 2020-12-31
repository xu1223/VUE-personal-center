<template>
  <div class="null-shops-user">
    <article class="no-wishlist" style="display: block;">
      <div class="txt">
        <i class="hx-bg-icon-img new-hx-bg-none"></i>
        <span>{{content|| ' Have you seen a favorite item and plan to start later? Click on the heart icon to save your favorite items to the wish list!'}}</span>

        <div style="width:90%;margin:0 auto" v-if="btntxt">
          <a href="javascript:void(0);" rel="nofollow" class="hx-btn-new" @click="LINKURL">{{btntxt}} &gt;&gt;</a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import {
    sendParamInUrl
  } from "@/util/tools";
  export default {
    name: 'Nullshops',
    props: ["btntxt", "title", "content", "to", "index"],
    methods: {
      LINKURL() {
        sendParamInUrl({
          page: this.index ? this.index : 'index'
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/style/_var.scss";
  @import "@/assets/style/mixins.scss";

  .null-shops-user {
    .no-wishlist {
      display: none;
      text-align: center;
      padding: 2.66667rem 0 1rem;
      background: #fff;
    }

    .no-wishlist .txt>img {
      width: 2rem;
      height: 2rem;
    }

    .txt>span {

      @include fontSize24();
      font-weight: 300;
      color: #333333;
      margin: pxto2(20px) 0;
      display: block;
    }

    .hx-btn-new {
      padding: 0 0.44rem;
      width: pxto2(200px);
      height: pxto2(60px);
      line-height: pxto2(60px);
      display: block;
      background: #FFFFFF;
      border: 1px solid #DADADA;
      border-radius: pxto2(4px);
      @include fontSize24();
      margin: 0 auto;
      cursor: pointer;
      color: #0C0A26;
    }


    .new-hx-bg-none {
      background-position: pxto2(-302px) pxto2(-1420px);
      width: pxto2(600px);
      height: pxto2(480px);
      display: block;
      background-size: 39rem;
    }

    .no-wishlist .hx-btn {
      margin: 0 auto;
    }
  }
</style>