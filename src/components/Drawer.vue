<template>
  <div :class="['drawer',`drawer-${visible}`]">
    <div class="drawer-mask"></div>
    <div class="drawer-main" :style="drawerStyle">
      <i class="iconfont iconguanbi close" @click.prevent="cancelBtn"></i>
      <div v-if="title" class="drawer-head">{{ title }}</div>
      <div class="drawer-body scroll">
        <slot name="content"></slot>
      </div>
      <div class="drawer-btn" v-if="btn==false?false:true" :style="border==false?'':'border-top: 1px solid #e6e6e6'">
        <button class="button" @click="confirmBtn()">{{confirmText ? confirmText :border==false?"CONFIRM" : "SUBMIT"}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "width",
    "direction",
    "visible",
    "cancelText",
    "confirmText",
    "border",
    "btn"
  ],
  data () {
    return {
    };
  },
  computed: {
    drawerStyle: function () {
      return {
        'width': this.width ? `${this.width}px` : this.border==false?  `500px` :`600px`,
        'z-index':this.visible ? `0`:'-10',
        'opacity':this.visible ? `1`:'0',
      }
    }
  },
  methods: {
    confirmBtn () {
      this.$emit("confirmBtn");
    },
    cancelBtn () {
      this.$emit("cancelBtn");
    },
  },
  created () { },
};
</script>
<style scoped lang="less">
.drawer-main {
  z-index: 100;
  background: #fff;
  transition: all 0.3s;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  height: min-content;
  width:0;
  font-size: 14px;
  border-radius: 4px;
  .close{
    color:#fff;
    font-size:35px;
    position: absolute;
    top: -45px;
    right:-40px;
  }
  .drawer-head {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #fff;
    background: #0C0A26;
    font-size: 12px;
    letter-spacing: 0.1rem;
  }
  .drawer-body {
    padding:20px;
    overflow: hidden;
    margin: auto;
    max-height: 550px;
    overflow-y: auto;
    form{
      font-size: 12px;
      /deep/ .ivu-form-item{
        margin-bottom:10px;
        &:last-child{
          margin: 0;
        }
        .ivu-form-item-label{
          padding:0 5px 0 0;
          line-height: 40px;
          color: #333333;
        }
        .ivu-input{
          font-size: 12px;
        }
      }
    }
  }
  .drawer-btn {
    margin:0 20px;
    height: 70px;
    bottom: 0;
    left: 0;
    width: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
    button{
      width: 90px;
      height: 30px;
      font-size:11px;
      letter-spacing: 0.05rem;
    }
  }
}
.drawer-true{
  .drawer-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    transition: all 0.3s;
  }
} 
</style>