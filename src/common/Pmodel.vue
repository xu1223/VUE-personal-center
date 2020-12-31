<template>
  <van-dialog v-model="centerDialogVisible" show-cancel-button :class="['p-model',className]">
    <template slot="title" v-if="title">
      <div class="p-dialog-header">
        <div class="title">{{ title  }}</div>
        <i class="iconfont pers-yiliaohangyedeICON-" @click="colseVisibleFn"></i>
      </div>
    </template>
    <template slot="default">
      <div class="p-dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="p-dialog-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </van-dialog>
</template>

<script>
  export default {
    name: "Pmodel",
    props: ["title", "visible",'className'],
    data() {
      return {
        centerDialogVisible: this.visible || false,
      };
    },
    watch: {
      visible: function () {
        this.centerDialogVisible = this.visible;
      },
  },
  methods: {
    colseVisibleFn() {
      this.centerDialogVisible = false;
      this.$emit("update:visible", false);
      this.$emit("colse", false);
      
    },
  }
};
</script>

<style lang="scss" scoped>
.iconcolse{
  position: absolute;
}
</style>