<template>
  <div>
    <van-nav-bar title="confirm_order_after_sale" @click-left="onClickLeft" fixed z-index="2000">
      <van-icon name="arrow-left" slot="left" style="color:#000" />
    </van-nav-bar>
    <div style="margin-top:1.6rem">111</div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      window.history.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>