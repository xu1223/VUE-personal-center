<template>
  <div>
    <HeaderTab />
    <div class="p-m-send">
      <div class="header">
        <b> {{ infoData.title }}</b>
      </div>
      <div class="content" id="id">
        <div v-for="(item, index) in dataList" :key="index" :data-index="item._index">
          <div :class="[item._index == 1 ? 'ask' : 'reply']">
            <div class="msg">
              <!--<img src="./images/touxiang.png" alt="" />-->
              <span class="msg-icon">
                {{ item._index == 1 ? "Staff" : "Client" }}
              </span>
              <div class="msg-content">
                <div class="info">
                  {{ item.content }}
                </div>
                <p class="time">{{ item.sent_at }}</p>
              </div>
            </div>
          </div>
          <!--
          <div class="ask">
            <div class="msg">
              <span class="msg-icon"> Client </span>
              <div class="msg-content">你好在不在呀，妹子！</div>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
    <div class="p-m-btn hx-img-upload">
      <div class="hx-form-group hx-must">
        <label class="hx-form-label">Content</label>
        <!-- result-success -->
        <div :class="['hx-input-block']">
          <textarea
            placeholder
            class="hx-textarea hx-input"
            v-model="content"
          ></textarea>
          <div class="hx-text-right">
            <em>{{ content ? content.length : 0 }}</em
            >/
            <span>500</span>
          </div>
        </div>
      </div>
      <div class="upload">
        <div class="hx-form-group hx-must"  style="display:none">
          <div class="picture-file">
            <van-uploader
              v-model="imageds"
              :max-count="6"
              :after-read="uploadeimgs"
              @delete="deletefile"
            />
          </div>
        </div>
        <van-button
          :loading="loading"
          @click="submit"
          :disabled="!content || loading"
        >
          CONFIRM
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ts-ignore
import HeaderTab from "@/components/HeaderTab";
export default {
  components: {
    HeaderTab,
  },
  data() {
    return {
      infoData: {},
      content: "",
      imageds: [],
      loading: false,
      id: "",
      parms: {},
      dataList: [],
      firstname: "",
    };
  },
  methods: {
    submit() {
      if (!this.content) {
        return this.$toast("提示文案");
      }
      this.loading = true;
      this.parms["content"] = this.content;
      this.parms["title"] = this.infoData.title;
      this.parms["images"] = [];
      this.imageds.forEach((item, index) => {
        // if (!this.parms["images[" + index + "]"]) {
        //   this.parms["images[" + index + "]"] = "";
        // }
        this.parms["images"].push(item.url);
      });

      this.$Http.message
        .sendMessage({ ...this.parms, id: this.id })
        .then((res) => {
          this.loading = false;
          let { code = "", data = "" } = res;
          if (code == 200) {
            this.content = "";
            this.imageds = [];
            this.init();
          }
        });
    },
    deletefile(file, currindex) {
      let { index } = currindex;
      this.imageds.splice(index - 1, 1);
    },
    uploadeimgs(files, item) {
      files.status = "uploading";
      files.message = "loading...";
      let file = files.file;
      this.$Http.message.messageImageUpload({ file }, true).then((res) => {
        let { code = "", data = "" } = res;
        // this.order_datas[0]['imageds'].shift()
        //  this.order_datas[this.currIndex]['imageds1'].shift()
        if (code == 200) {
          files.status = "";
          files.message = "";
          this.imageds.pop();
          this.imageds.push({ url: data, fileUrl: data });

        }
      });
    },
    init() {
      this.$Http.message.getMessageDetail({ id: this.id }).then((res) => {
        const { code = "", data } = res;
        if (code == 200) {
          this.infoData = data;
          const { children = [] } = data;
          let _arr = [];
          children.forEach((item, index) => {
            if (item.from == this.firstname || item.from == '') {
              item["_index"] = 2;
            } else {
              item["_index"] = 1;
            }
            _arr.push(item);
          });
          this.dataList = children;
          let vivewTop = document.querySelector(".content");
          vivewTop.scrollTop = (vivewTop.scrollHeight) + (10);
        }
      });
    },
  },
  created() {
    const { id = "" } = this.$route.query;
    if (localStorage.getItem("cart.m.userInfo")) {
      let _var = localStorage.getItem("cart.m.userInfo");
      const parms = JSON.parse(_var);
      const { firstname = "" } = parms;
      this.firstname = firstname;
      // console.log(parms,'--localStorage.getItem()',this.firstname)
    }
    if (id) {
      this.id = id;
      this.init();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-m-send {
  @include fontSize24();
  .header {
    // height: pxto2($px60);
    line-height: pxto2($px60);
    padding: 0 pxto2($px20);
    margin-top:pxto2($px20);
  }
  .content {
    background: $withe;
    height: pxto2(890px);
    padding: pxto2($px10) pxto2($px20);
    overflow: hidden;
    overflow-y: auto;
    .reply,
    .ask {
      padding-bottom: pxto2($px20);
      width: pxto2(710px);
      .msg-content {
        width: pxto2(530px);
        border: 1px solid #0c0a26;
        margin-left: pxto2($px5);
      }
      .time {
        color: $info;
        text-align: right;
        margin-top: pxto2($px10);
      }
      .info {
        word-wrap: break-word;
        white-space: normal;
        word-break: break-all;
      }
    }
    .msg {
      position: relative;
      width: 100%;
    }
    .reply {
      .msg {
        display: flex;
        .msg-icon {
          width: pxto2($px80);
          height: pxto2($px80);
          line-height: pxto2($px80);
          background: $block;
          color: $withe;
          display: block;
          border-radius: 50%;
          text-align: center;
        }
        .msg-content {
          width: pxto2(480px);
          border: 1px solid $block;
          padding: pxto2($px20);
          margin-top: pxto2($px10);
          @include bRadius4();
        }
      }
    }
    .ask {
      float: right;
      .msg-icon {
        width: pxto2($px80);
        height: pxto2($px80);
        line-height: pxto2($px80);
        background: $info-2;
        color: $block;
        display: block;
        border-radius: 50%;
        text-align: center;
        float: right;
      }
      .msg-content {
        float: right;
        margin-left: auto;
        margin-right: pxto2($px20);
        padding: pxto2($px20);
        width: pxto2(480px);
        margin-top: pxto2($px10);
        @include bRadius4();
        border: 1px solid #e6e6e6;
      }
      .time {
        text-align: left;
      }
    }
  }
}
.p-m-btn {
  background: $withe;
  height: pxto2(260px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 0px 8px 0px #d3d3e0;
  overflow: hidden;
  padding: pxto2($px20);
  .hx-textarea {
    height: pxto2($px120);
    padding: pxto2($px10) 0;
  }
  .hx-form-group {
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .upload {
    margin-top: pxto2($px30);
    display: flex;
    align-items: center;
    justify-content: center;
    .hx-form-group {
      overflow: hidden;
      height: pxto2($px90);
    }
    button {
      @include btnsSubmit();
      color: $withe-1;
      margin-top: pxto2($px10);
      width: auto;
      margin: 0;
    }
  }
}
</style>