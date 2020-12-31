<template>
  <div class="image-view">
    <div class="item" v-for="(item, index) in forms" :key="index" >
      <i class="iconfont iconguanbi" @click="deleteImg(index)" ></i>
      <img :src="item" />
    </div>
    <div class="addbox" v-if="forms&&forms.length < length" @click="item_currIndex">
      <input type="file" @change="getImgBase()"/>
      <div class="addbtn">+</div>
    </div>
    <span class="number">({{forms?forms.length:0}}/{{length}})</span>
  </div>
</template>
<script>
export default {
  props: ["data", "length"],
  data () {
    return {
      forms: []
    };
  },
  methods: {
    //获取图片base64实现预览
    getImgBase () {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      // 转base64
      reader.onload = function (e) {
        _this.forms.push(e.target.result);
      };
      reader.readAsDataURL(file);
      this.$emit("imgGet", file);
    },
    //删除图片
    deleteImg (index) {
      this.forms.splice(index, 1);
      this.$emit("imgDelete",index);
    },
    item_currIndex (index) {
      this.$emit("item_currIndex", index);
    }
  },
  async created () {
    if(this.data!=''&&this.data!=undefined){
      this.forms = JSON.parse(JSON.stringify(this.data));
    }
  }
};
</script>
<style lang="less" scoped>
.image-view {
  .number{
    margin-left: 10px;
  }
  .addbox {
    float: left;
    position: relative;
    height: 80px;
    width: 80px;
    margin: 10px 0;
    text-align: center;
    input {
      position: absolute;
      left: 0;
      height: 80px;
      width: 80px;
      opacity: 0;
      cursor: pointer;
    }
    .addbtn {
      height: 80px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dad6d6;
      font-size: 40px;
      border: 1px dashed #dad6d6;
      cursor: pointer;
    }
  }
  .item {
    position: relative;
    float: left;
    height: 80px;
    width: 80px;
    margin: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    i {
      position: absolute;
      color: #000;
      border-radius: 50%;
      cursor: pointer;
      font-size: 17px;
      top: 0;
      right: 0;
    }
    img {
      max-width: 100%;
    }
  }
}
</style>