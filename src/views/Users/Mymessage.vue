<template>
  <div>
    <HeaderTab />

    <div class="my_message">
      <!-- @change="onClickTable" -->
      <div class="p-m-mesg">
        <div class="p-m-btn">
          <van-button @click="newMesgFn"> ＋ New Message </van-button>
        </div>
        <div class="p-m-ul">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text=""
              @load="msgonLoad"
              loading-text="loading..."
            >
              <van-cell
                v-for="(item, index) in db_selectlist || []"
                :key="index"
                :class="[
                  'van-clearfix1 ',
                  item.is_view == 0 ? 'van-cell-active' : '',
                ]"
                @click="toLinkFn(item)"
              >
                <div class="header">
                  <div class="time">
                    {{ item.created_at }}
                  </div>
                  <div class="is-vivew">
                    {{ item.is_view == 0 ? "Client" : "Staff" }}
                    <i></i>
                  </div>
                </div>
                <div class="content">
                  <div>
                    {{ item.content }}
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
      <Sendmessage
        @changes="createSend"
        :isShow.sync="isShow"
        @changeSelect="changeSelect"
        v-show="isShow"
      />
    </div>
    <Pmodel :visible.sync="visible" :title="'New Message'">
      <template slot="content">
        <div class="p-m-msg">
          <p>
            Please fill in the message and we will contact you as soon as
            possible.
          </p>
          <div class="p-form">
            <div class="hx-form-group hx-must">
              <label class="hx-form-label">Title</label>
              <!-- result-success -->
              <div :class="['hx-input-block']">
                <input
                  type="text"
                  v-model="parms.title"
                  id="login-password"
                  name="Email"
                  autocomplete="off"
                  class="hx-input login-email"
                />
              </div>
            </div>
            <div class="hx-form-group hx-must">
              <label class="hx-form-label">Content</label>
              <!-- result-success -->
              <div :class="['hx-input-block']">
                <textarea
                  placeholder
                  class="hx-textarea hx-input"
                  v-model="parms.content"
                ></textarea>
                <div class="hx-text-right">
                  <em>{{ parms.content ? parms.content.length : 0 }}</em
                  >/
                  <span>500</span>
                </div>
              </div>
            </div>
            <div class="hx-form-group hx-must" style="display:none">
              <div class="picture-file">
                <div class="hx-form-labels"></div>
                <!--v-model="item.imageds"-->
                <van-uploader
                  v-model="imageds_base64"
                  :max-count="6"
                  :after-read="uploadeimgs"
                  @delete="deletefile"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <van-button class="btn-sub" :loading="loading" @click="submitComment"
        :disabled="(!parms.content || !parms.title)"
          >SUBMIT</van-button
        >
      </template>
    </Pmodel>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import Sendmessage from "./Sendmessage.vue";
export default {
  data() {
    return {
      visible: false,
      isShow: false,
      isShows: false,
      activeName: "index",
      loading: false,
      finished: false,
      refreshing: false,
      return_order_count: 0,
      pages: 1,
      db_selectlist: [],
      imageds: [],
      imageds_base64:[],
      emailsu: "",
      listdata: [
        { id: 1, name: "index", type: "index", title: "Message Sent Out" },
        {
          id: 2,
          name: "received",
          type: "received",
          title: "Message Received",
        },
      ],
      parms: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
    },
    toLinkFn(item){
      this.$router.push({
        path:'/user/my_message_send',
        query:{
          id: item.message_id
        },
        params:{
          id: item.message_id
        }
      })
    },
    newMesgFn() {
      this.visible = !this.visible;
      this.imageds = [];
      this.parms.title = "";
      this.parms.content = "";
    },
    createSend() {
      this.isShow = !this.isShow;
    },
    changeSelect() {
      this.pages = 1;
      this.db_selectlist = [];
      this.msgonLoad();
    },
    my_essage_detail(item, index) {
      this.$router.push({
        path: "/user/my_essage_detail",
        query: {
          id: item.message_id,
          type: index,
        },
      });
    },
    onClickTable(name, title) {
      this.pages = 1;
      this.db_selectlist = [];
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      this.refreshing = false;
      this.loading = true;

      if (name === "received") {
        this.activeName = "received";
        this.onLoad();
      } else {
        this.activeName = "index";
        // 将 loading 设置为 true，表示处于加载状态
        this.msgonLoad();
      }
    },
    onLoad() {
      if (this.refreshing) {
        this.db_selectlist = [];
        this.refreshing = false;
      }
      // if (opts) {
      this.$Http.message
        .getBackgroundMessages({ page: this.pages++ })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            data.data.forEach((item) => {
              this.db_selectlist.push(item);
            });
            this.return_order_count = data.total;
            this.loading = false;
            if (this.db_selectlist.length >= this.return_order_count) {
              this.finished = true;
            }
          }
        });
    },
    msgonLoad() {
      if (this.refreshing) {
        this.db_selectlist = [];
        this.refreshing = false;
      }
      // if (opts) {
      this.$Http.message.getMessages({ page: this.pages++ }).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          data.data.forEach((item) => {
            this.db_selectlist.push(item);
          });
          this.return_order_count = data.total;
          this.loading = false;
          if (this.db_selectlist.length >= this.return_order_count) {
            this.finished = true;
          }
        }
      });
    },
    onRefresh() {
      this.pages = 1;
      this.db_selectlist = [];

      this.refreshing = false;
      //   // 将 loading 设置为 true，表示处于加载状态

      //    // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      if (this.activeName == "index") {
        this.onLoad();
      } else if (this.activeName === "received") {
        this.msgonLoad();
      }
    },
    submitComment() {
      if (!this.parms.title) {
        return;
      }
      if (!this.parms.content) {
        return;
      }
      this.parms["images"] = []
      this.imageds.forEach((item, index) => {
        
        // if (!this.parms["images["+index+"]"]) {
        //   this.parms["images["+index+"]"] = "";
        // }
        // this.parms["images["+index+"]"] = item.url;
         this.parms["images"].push(item.url)
      });
      this.$Http.message.sendMessage({ ...this.parms }).then((res) => {
        let { code } = res;
        if (code == 200) {
          this.visible = !this.visible;
          this.pages = 1
          this.db_selectlist = [];
          this.msgonLoad();
        }
      });
    },
    deletefile(file, currindex) {
      let { index } = currindex;
      this.imageds.splice(index - 1, 1);
      this.imageds_base64.splice(index - 1, 1);
    },
    uploadeimgs(files, item) {
      let _self = this;
      files.status = "uploading";
      files.message = "loading...";
      let file = files.file;
      this.$Http.message.messageImageUpload({ file }, true).then((res) => {
        let { code='', data='' } = res;
        // this.order_datas[0]['imageds'].shift()
        //  this.order_datas[this.currIndex]['imageds1'].shift()
        if (code == 200) {
          var reader=new FileReader();
          reader.onload=(function(file){
            return function(ev){
              _self.imageds_base64({
                  url: ev.target.result, fileUrl: ev.target.result
              })
            }
          })(file);
          reader.readAsDataURL(file);
          files.status = "";
          files.message = "";
          this.imageds.pop();
          this.imageds.push({ url: data, fileUrl: data });
        }
      });
    },
  },
  created() {
    if (this.$route.query.flag) {
      this.activeName = "received";
    } else {
      this.activeName = "index";
    }
  },
  components: {
    Sendmessage,
    HeaderTab,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-m-msg {
  p {
    @include fontSize20();
    color: $info;
  }
  .p-form {
    margin-top: pxto2($px10);
    .hx-form-group {
      margin-bottom: pxto2($px10);
      padding-bottom: 0;
      .hx-textarea {
        padding: pxto2($px10) 0;
        height: pxto2(180px);
      }
      .picture-file {
        .van-uploader__file,
        .van-uploader__upload,
        .van-uploader__preview-image {
          height: pxto2($px80) !important;
          width: pxto2($px80) !important;
        }
        
      }
    }
  }
}

.btn-sub {
  @include btnsSubmit();
  color: $withe-1;
}
.p-m-mesg {
  .p-m-btn {
    width: pxto2($width710);
    height: pxto2($px80);
    line-height: pxto2($px80);
    text-align: right;
    button {
      @include btnsSubmit();
      color: $withe-1;
      width: auto;
    }
  }
  .p-m-ul {
    width: pxto2($width680);
    height: 100%;
    margin: pxto2($px20) auto;
    @include fontSize24();
    .van-cell {
      @include bRadius4();
      padding: pxto2($px20);
      height: pxto2($px120);
    }
    .van-clearfix1 {
      margin-bottom: pxto2($px10);
      border: 1px solid #e6e6e6;
      .van-cell__value {
        overflow: initial;
      }
      .header {
        display: flex;
        color: $info;
        .time {
          width: 70%;
        }
        .is-vivew {
          width: 30%;
          text-align: right;
          position: relative;
        }
      }
      .content {
        color: $info;
        div {
          display: inline-block;
          white-space: nowrap;
          width: pxto2(600px);
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .van-cell-active {
      background: $error-2;
      border: 1px solid #e4535c;
      .header {
        color: $info;
        .is-vivew {
          position: relative;
          i {
            border-radius: 50%;
            width: pxto2($px20);
            height: pxto2($px20);
            position: absolute;
            top: -(pxto2($px20));
            right: -(pxto2($px20));
            display: block;
            background: #e4535c;
          }
        }
      }
      .content {
        color: $block;
      }
      .hx-message-some {
        background: transparent;
      }
    }
  }
}
.my_message {
  .van-tabs__wrap {
    border-top: solid 1px #dbdbdb;
    border-bottom: solid 1px #dbdbdb;
  }
  .van-tabs__track {
    background: #fff;
  }
  .hx-message {
    margin: 0 0.53333rem;
    width: 100%;
  }
  .hx-message-some {
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    margin-bottom: 0.66667rem;
  }
  .hx-message-some .text-cont {
    width: 80%;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }
  .hx-message-some .text-cont .top {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .hx-message-some .text-cont .top em {
    font-size: 0.32rem;
    color: #bfbfbf;
  }
  .hx-message-some .text-cont p {
    // font-family: "SH-Medium";
    font-size: 0.34667rem;
    color: #6e6e6e;
  }
  .hx-message-some .text-cont span {
    font-size: 0.32rem;
    color: #6e6e6e;
    display: block;
  }
  .hx-message-emali {
    height: 0.88rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #dbdbdb;
    line-height: 0.88rem;
    font-size: 0.32rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    color: #252525;
    margin: 0 0.53333rem 0.26667rem;
    margin-top: 0.2rem;
  }
}
</style>
