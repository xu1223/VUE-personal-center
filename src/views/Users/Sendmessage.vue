<template>
  <div>
    <div class="hx-establish-meseeage" style="display: block;">
      <!-- <div class="message-main-header-div">
        <a class="p-lt pl-none" href="javascript:void(0);" rel="nofollow" @click="changes">Cancel</a>
        <span class="p-rt submit-btn" @click="sendContent">Send</span>
      </div> -->
      <form action="/reply_message" method="post" name="reply_message">
        <input type="hidden" name="_token" />
        <div class="establish-meseeage-tit">
          <span
            >Please fill in the message and we will contact you as soon as
            possible.</span
          >
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Message title</label>
          <div
            :class="[
              'hx-input-block',
              istitle ? 'result-success' : 'result-error'
            ]"
          >
            <input
              type="text"
              name="title"
              placeholder
              autocomplete="off"
              v-model="title"
              class="hx-input"
              @input="titlefn"
            />
            <i class="iconfont" v-show="!istitle"></i>
          </div>
          <em class="hx-form-tips" style="display: inline;" v-show="!istitle"
            >Required field</em
          >
        </div>
        <!--<div class="hx-form-group hx-must">
                        <label for="" class="hx-form-label">Email address</label>
                        <div class="hx-input-block">
                            <input type="text" name="title" placeholder="" autocomplete="off" class="hx-input"
                                value="">
                            <i class="iconfont"></i>
                        </div>
                        <em class="hx-form-tips">Required field</em>
        </div>-->
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Message content</label>
          <div
            :class="[
              'hx-input-block',
              content ? 'result-success' : 'result-error'
            ]"
            style="font-size:.32rem"
          >
            <div
              ref="editorElem"
              style="text-align:left;"
              @input="contentfn()"
            ></div>
          </div>
          <em class="hx-form-tips" v-show="!content" style="display: inline;"
            >Required field</em
          >
        </div>
      </form>
    </div>
    <div class="user-navbtn" style="padding: 0px 20px; width: 9rem;">
      <a href="javascript:void(0);" class="btn-link" @click="changes">CANCEL</a>
      <a href="javascript:void(0);" class="btn-active" @click="sendContent"
        >CONFIRM</a
      >
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import { Toast } from "vant";
export default {
  data() {

    return {
      content: '1',
      editor: null,
      editorContent: "",
      title: "",
      istitle: '1'
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      // "link", // 插入链接
      // "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      // "emoticon", // 表情
      // "image", // 插入图片
      // "table", // 表格
      // "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods: {
    contentfn(){
      if(this.editorContent != ''){
        this.content = '1'
      }
    },
    titlefn(){
      if(this.title != ''){
        this.istitle = '1'
      }
    },
    changes() {
      this.$emit("changes");
      this.$emit('update:isShow',false)
    },
    sendContent() {
      if(!this.title){
         this.istitle = ''
        return
      }
      if(!this.editorContent){
        this.content = ''
        return
      }
      this.$Http.message.sendMessage({ title: this.title,
          content: this.editorContent}).then(res=>{
             let {code} = res;
             if (code == 200) {
             this.editorContent =  ''
            setTimeout(() => {
                this.$emit('update:isShow',false)
                this.$emit("changeSelect");
                document.querySelector('.w-e-text').innerHTML = ''
               this.title = '';
            }, 300);
          }
          });
    }
  }
};
</script>

<style lang="scss" scoped>
.hx-establish-meseeage {
  position: relative;
  display: none;
  padding: 0 0.53333rem 0.53333rem 0.53333rem;
  background: #fff;
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
  .message-main-header-div span {
    cursor: pointer;
    // font-family: "SH-Medium";
    font-size: 0.42667rem;
    color: #13b9b0;
    text-transform: Capitalize;
  }

  .establish-meseeage-tit {
    text-align: center;
    padding: 0 0.26667rem;
    margin-bottom: 0.53333rem;
  }
  .establish-meseeage-tit span {
    font-size: 0.32rem;
    line-height: 0.45333rem;
    color: #bfbfbf;
  }
  .hx-form-group .hx-form-label {
    display: block;
    /* font-family: "SH-ExtraLight"; */
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #252525;
    padding-bottom: 5px;
  }
  .hx-must .hx-form-label::after {
    display: inline;
    content: "*";
    color: #34d0c8;
    vertical-align: top;
    font-size: 0.32rem;
  }
  .hx-form-tips {
    position: absolute;
    bottom: -2px;
    left: 0;
    display: none;
    font-size: 0.26667rem;
    line-height: 0.33333rem;
    color: #e14c52;
  }
}
</style>
