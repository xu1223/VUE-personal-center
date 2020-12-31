<template>
  <div>
    <van-overlay :show="isShow" @click="isEditModeify" z-index="1000" />
    <div
      class="layui-layer layui-layer-page layer_emerge"
      id="layui-layer2"
      type="page"
      times="2"
      showtime="0"
      contype="string"
      style="z-index: 19891016; top: 205px; left: 18.75px;"
      v-show="isShow"
    >
      <div class="layui-layer-title" style="cursor: move;">
        {{ title }}
      </div>
      <!-- Move to wishlist -->
      <div id class="layui-layer-content">
        <div class="item_confirm" v-if="isMsg">
          <img v-lazy="formdata.img_m" />
          <div class="item_confirm_">
            <p class="ellipsis-many">{{ formdata.name }}</p>
            <p>
              <span>SKU: {{ formdata.sku }}</span>
              <span>Size: {{ formdata.size }}</span>
              <span>Color: {{ formdata.color }}</span>
              <span>Qty: {{ formdata.quantity }}</span>
            </p>
          </div>
        </div>
        <p class="item_confirm_enquire">
          {{ msg }}
        </p>
        <!-- Would you like to move the item to your wish list? -->
      </div>
      <span class="layui-layer-setwin"></span>
      <div class="layui-layer-btn layui-layer-btn-">
        <a class="layui-layer-btn1" @click="clerFncar(formdata)">CANCEL</a>
        <!-- 删除 -->
        <a class="layui-layer-btn0" @click="deleFncar(formdata)">CONFIRM</a>
        <!-- 心愿单 -->
        <a
          class="layui-layer-btn0"
          @click="deleFncar(formdata)"
          style="display:none"
          >CONFIRM</a
        >
      </div>
      <span class="layui-layer-resize"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShow", "formdata", "isAll", "title", "msg", "isMsg"],
  methods: {
    deleFncar(formdata) {
      this.$emit("change", formdata);
    },
    clerFncar() {
      this.$emit("update:isShow", false);
    },
    isEditModeify() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-overlay {
  z-index: 100;
}
body .layer_emerge .item_confirm_enquire_ {
  padding: 20px;
}
.user-allorder .use-allorder-mos {
  padding: 0 0.26667rem;
}
.layui-layer-move {
  display: none;
  position: fixed;
  *position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  opacity: 0;
  filter: alpha(opacity=0);
  background-color: #fff;
  z-index: 2147483647;
}
.layui-layer-shade {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  _height: expression(document.body.offsetHeight + "px");
}
.layui-layer {
  -webkit-overflow-scrolling: touch;
  top: 150px;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: #fff;
  -webkit-background-clip: content;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
}
.layer_emerge {
  width: 90%;
  margin: auto;
  left: 0 !important;
  right: 0;
}
.layui-layer,
.layui-layer-shade {
  position: fixed;
  _position: absolute;
  pointer-events: auto;
}
.layer_emerge .layui-layer-title {
  color: #161616;
  font-size: 15px;
  background: #fff;
  border-bottom: 1px solid #161616;
  padding: 0 10px;
  font-weight: bold;
}
.layui-layer-title {
  padding: 0 80px 0 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  background-color: #f8f8f8;
  border-radius: 2px 2px 0 0;
}
.bag_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.bag_btn a {
  color: #bbbbbb;
  font-size: 0.33rem;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #f5f5f5;
  margin: 0 10px;
  cursor: pointer;
}
.layer_emerge .layui-layer-content {
  font-size: 13px;
}
.layui-layer-page .layui-layer-content {
  position: relative;
  overflow: auto;
}
.item_confirm {
  display: flex;
  padding: 10px;
  background: rgba(246, 246, 246, 1);
  align-items: flex-start;
}
.layer_emerge .item_confirm_enquire {
  padding: 10px;
}
.item_confirm img {
  width: 65px;
}
.item_confirm .item_confirm_ {
  padding-left: 5px;
}
.item_confirm .item_confirm_ p {
  padding-bottom: 3px;
}
.ellipsis-many {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.item_confirm .item_confirm_ p {
  padding-bottom: 3px;
}
.item_confirm .item_confirm_ span {
  display: block;
}
.layer_emerge .layui-layer-btn {
  text-align: center;
}
.layui-layer-iframe .layui-layer-btn,
.layui-layer-page .layui-layer-btn {
  padding-top: 10px;
}
.layui-layer-btn {
  text-align: right;
  padding: 0 15px 12px;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
}

.layer_emerge .layui-layer-btn a {
  border: 1px solid #dbdbdb;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 12px;
  width: 46%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  word-break: break-all;
}
.layui-layer-btn a {
  height: 28px;
  line-height: 28px;
  margin: 5px 5px 0;
  border: 1px solid #dedede;
  background-color: #fff;
  color: #333;
  border-radius: 2px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 30px;
}
.layer_emerge .layui-layer-btn .layui-layer-btn0 {
  background: #161616;
  border-radius: 5px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
}
</style>
