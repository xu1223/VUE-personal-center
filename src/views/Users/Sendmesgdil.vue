<template>
  <div class="sendmesgdil">
    <!-- <div class="message-main-header-div">
      <a class="p-lt" href="javascript:void(0);" rel="nofollow" @click="Cancel">Cancel</a>
      <span class="p-rt submit-btn" @click="reply_form" style="display:none">Send</span>
    </div>-->

    <div class="detail-message-main">
      <div class="establish-meseeage-tit" v-if="type==1">
        <span>Please fill in the message and we will contact you as soon as possible.</span>
      </div>
      <div class="hx-form-group hx-must" v-if="type==1">
        <label class="hx-form-label">Message title</label>
        <div :class="['hx-input-block' , istitle ? 'result-success' : 'result-error']">
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
        <em class="hx-form-tips" style="display: inline;" v-show="!istitle">Required field</em>
      </div>
      <div class="message-title edtDom-message-title">
        <ul class="message-cont-send-fomr" v-if="type !=1">
          <li>
            <span>Recipent:</span>
            <p>&lt;{{formdata.from_email}}&gt;</p>
          </li>
          <li>
            <span>Time:</span>
            <p>{{formdata.created_at}}</p>
          </li>
          <li>
            <span>Theme:</span>
            <p>{{formdata.title}}</p>
          </li>
        </ul>
        <div id="content_editor" ref="editorElem" style="font-size:.32rem"></div>
      </div>
    </div>
    <div class="user-navbtn" style="padding: 0px 20px; width: 9rem;" v-if="type==1">
      <a href="javascript:void(0);" class="btn-link" @click="Cancel">CANCEL</a>
      <a href="javascript:void(0);" class="btn-active" @click="sendContent">CONFIRM</a>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: ["formdata", "isShow", "type"],
  data() {
    return {
      editor: null,
      editorContent: "",
      istitle: "1",
      title: ""
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
      //   "emoticon", // 表情
      // "image", // 插入图片
      // "table", // 表格
      // "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create(); // 创建富文本实例

    setTimeout(() => {
      if (this.formdata.content) {
       
        let str = `<br>${
          this.formdata.title
        }<br><p>------------Original------------</p>
                    <div style="font-size: 12px;background:#efefef;padding:8px;">
                    <div style="padding:10px"><strong>留言人：</strong>
                                                                    ${
                                                                      this
                                                                        .formdata
                                                                        .from_email
                                                                        ? `(${this.formdata.from_email})`
                                                                        : "" ||
                                                                          ""
                                                                    }
                                                            </div>
                    <div style="padding:10px"><strong>留言时间 ：</strong> ${this
                      .formdata.created_at || ""}</div>
                    <div style="padding:10px"><strong>留言标题 ：</strong> ${this
                      .formdata.title || ""}</div>
                </div>`;
        this.editor.txt.html(str + this.formdata.content);
      }
    }, 300);
    if (this.type == 1) {
      this.editor.$textElem.attr("contenteditable", true);
    } else {
      this.editor.$textElem.attr("contenteditable", false);
    }
  },
  methods: {
    titlefn() {
      if (this.title === "") {
        this.istitle = "";
      } else {
        this.istitle = "1";
      }
    },
    Cancel() {
      this.$emit("update:isShow", false);
    },
    reply_form() {},
    sendContent() {
      if (!this.title) {
        this.istitle = "";
        return;
      }
      if (!this.$refs.editorElem.querySelector('.w-e-text').innerHTML) {
        this.content = "";
        return;
      }
      this.$Http.message.sendMessage({
        title: this.title,
          content: this.$refs.editorElem.querySelector('.w-e-text').innerHTML
      }).then(res=>{
          let {code} = res;
          if (code == 200) {
            this.editorContent = "";
            this.$router.push("/user/my_message");
          }
      })
     
    }
  },
  created() {
    //    this.editor.txt.html(s'<p>3453453</p>')
  }
};
</script>

<style lang="scss" scoped>
.establish-meseeage-tit span {
  font-size: 0.32rem;
  line-height: 0.45333rem;
  color: #bfbfbf;
}
.sendmesgdil {
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
  .detail-message-main {
    background-color: #fff;
    padding: 0.33333rem 0.53333rem;
  }
  .detail-message-main .message-title {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.33333rem;
  }
  .message-cont-send-fomr li {
    height: 0.88rem;
    line-height: 0.88rem;
    border-bottom: solid 1px #ededed;
    display: -ms-flexbox;
    display: flex;
    font-size: 0.32rem;
  }
  .message-cont-send-fomr li span {
    color: #bfbfbf;
    width: 1.6rem;
    display: block;
    text-align: right;
  }
  .message-cont-send-fomr li span {
    color: #bfbfbf;
    width: 1.6rem;
    display: block;
    text-align: right;
  }
}
</style>