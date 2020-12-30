<template>
  <div class="bg_white msg_post">
    <div class="flex1">
      <p class="ar_title text_left">
        CREATE A NEW MESSAGE
        <span>Please fill in the message and we will contact you as soon as possible.</span>
      </p>
      <i class="iconfont iconLQYguanbi msg_close flex2" @click="ifShow()"></i>
    </div>
    <v-form direction="horizontal" :model="forms" ref="forms">
      <v-form-item
        label="Message Title"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        prop="title"
        :rules="[{ required: true, message: 'Required field' }]"
        has-feedback
      >
        <v-input type="text" size="large" v-model="forms.title" class="hx_input" placeholder></v-input>
      </v-form-item>
      <v-form-item
        label="Message Content"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        prop="content"
        :rules="[{ required: true, message: 'Required field' }]"
        has-feedback
      >
        <div ref="editorElem" style="text-align:left;"></div>
      </v-form-item>
      <hr />
      <div class="formmsg_detail" v-if="formdata.created_at">
        <div class="formmsg_detail_up">
          <div class="flex1">
            <b>SOME</b>
            {{ formdata.created_at }}
          </div>
          <div v-html="formdata.title"></div>
        </div>
        <div v-html="formdata.content" class="formmsg_detail_down"></div>
      </div>
      <hr />
      <v-form-item class="hx_flex_item-control">
        <v-button type="ghost" @click.prevent="resetForm('form')" style="margin-right:10px">CANCEL</v-button>
        <v-button type="primary" @click.prevent="submitForm('forms')">CONFIRM</v-button>
      </v-form-item>
    </v-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  props: ["formdata"],
  data() {
    return {
      editor: null,
      editorContent: "",
      forms: {},
      isShow: "",
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      }
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
    setTimeout(() => {
      if (this.formdata.content) {
        this.editor.txt.html(this.forms.content);
      }
    }, 300);
  },
  methods: {
    submitForm(forms) {
      this.forms.content = this.editor.txt.html();
      this.$refs[forms].validate(valid => {
        if (valid) {
          this.$Http.message
            .sendMessage({
              id: this.forms.id,
              title: this.forms.title,
              content: this.forms.content
            })
            .then(options => {
              let { code, data, msg } = options;
              if (code == 200) {
                this.ifShow();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.ifShow();
    },
    ifShow() {
      this.$emit("isShow");
    }
  },
  async created() {
    if (this.formdata) {
      this.forms.content = `
      <hr>
      <p>------------Original------------</p>
      <div style="padding:10px;background: #f1f1f1;">
      <p><strong>留言人: </strong>${this.formdata.from_email}</p>
      <p><strong>留言时间: </strong>${this.formdata.created_at}</p>
      <p><strong>留言时间: </strong>${this.formdata.title}</p></div>
      ${this.formdata.content}`;
    }
  }
};
</script>
<style lang="less" scoped>
.ql-editor p {
  width: 100%;
}
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>