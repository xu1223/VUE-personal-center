<template>
  <div>
    <HeaderTab />
    <div class="p-d-code">
      <div class="header">Available ({{db_selectlist.length}})</div>
      <div class="content">
        <div
          class="list hx-bg-icon-img hx-bg-icon-code"
          v-for="(item, index) in db_selectlist || []"
          :key="index"
        >
          <div class="l">
            <b class="preic">US$ {{ item.discount || item.preferential }} OFF</b>
            <p class="amount">Available For US${{ item.amount | numFilter }}</p>
            <p class="time">1. {{ item.date_start }}~ {{ item.date_end }}</p>
            <p class="code">2. APPLICABLE TO ALL PRODUCTS: {{ item.code }}</p>
          </div>
          <div class="r">
            <div class="name">
              <span>Code</span>
            </div>
            <div class="btn">
              <div>SHE3</div>
              <van-button>Copy</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my_message">
      <div class="message-tab-a">
        <a
          href="javascript:void(0);"
          :class="[currIndex === 1 ? 'active' : '']"
          @click="onClickTables('index', 1)"
        >
          Used
          <!-- <span>(5)</span> -->
        </a>
        <a
          href="javascript:void(0);"
          :class="[currIndex === 2 ? 'active' : '']"
          @click="onClickTables('received', 2)"
        >
          Expired
          <!-- <span>(5)</span> -->
        </a>
      </div>
      <div
        class="user-discount"
        v-for="(item, index) in db_selectlist || []"
        :key="index"
        style="margin-bottom: 10px"
      >
        <div class="user-discount-up">
          <a href="javascript:void(0)" title>
            <img src="@/assets/img/t2.png" />
          </a>
          <div class="user-discount-top">
            <div class="discount-left">
              <span>{{ item.discount || item.preferential }}</span>
            </div>
            <div class="discount-right discount-second">
              <span>New</span>
              <p>Available For US${{ item.amount | numFilter }}</p>
              <p>{{ item.date_start }}~ {{ item.date_end }}</p>
            </div>
          </div>
          <div class="user-discount-down">
            <div class="discount-down-left">
              <p>APPLICABLE TO ALL PRODUCTS , Code:</p>
              <p>{{ item.code }}</p>
            </div>
            <div class="discount-down-right">
              <button
                class="button hx_discount_btn"
                :data-clipboard-text="item.code"
                @click="hxcopy"
              >
                COPY CODE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="db_selectlist.length === 0"
        style="justify-content: center; text-align: center"
      >
        <!-- <img src="@/assets/img/web__wu.png" /> -->
        <i class="icon-info-bg icon-web-wu"></i>
      </div>
      <!-- <van-tabs
        v-model="activeName"
        type="card"
        animated
        swipeable
        @click="onClickTable"
        @change="onClickTable"
        sticky
        lazy-renders
        v-show="isShow==false"
      
      >
        <van-tab title="Used" name="index">
          <div>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text
                @load="msgonLoad"
                loading-text="loading..."
              >
                <van-cell
                  v-for="(item,index) in db_selectlist || []"
                  :key="index"
                  style="margin-bottom: .2rem;padding:0"
                  class="van-clearfix1"
                >
                  <div slot="default" class="hx-message-some">
                    <div class="user-security">
                      <div class="user-discount">
                        <div class="user-discount-up">
                          <a href="javascript:void(0)" title>
                            <img src="@/assets/img/t2.png" />
                          </a>
                          <div class="user-discount-top">
                            <div class="discount-left">
                              <span>{{ item.discount || item.preferential }}</span>
                            
                            </div>
                            <div class="discount-right discount-second">
                              <span>New</span>
                              <p>Available For US${{item.amount}}</p>
                              <p>{{item.date_start}}~ {{item.date_end}}</p>
                            </div>
                          </div>
                          <div class="user-discount-down">
                            <div class="discount-down-left">
                              <p>Applicable to all products , Code:</p>
                              <p>{{ item.code }}</p>
                            </div>
                            <div class="discount-down-right">
                              <button class="button" data-clipboard-text="94041">COPY CODE</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="Expired" name="received">
          <div>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" finished-text @load="msgonLoad">
                <van-cell
                  v-for="(item,index) in db_selectlist || []"
                  :key="index"
                  style="margin-bottom: .2rem;padding:0"
                  class="van-clearfix1"
                >
                  <div slot="default" class="hx-message-some">
                    <div class="user-security">
                      <div class="user-discount">
                        <div class="user-discount-up">
                          <a href="javascript:void(0)" title>
                            <img src="@/assets/img/t2.png" />
                          </a>
                          <div class="user-discount-top">
                            <div class="discount-left">
                              <span>{{item.discount}}</span>
                            </div>
                            <div class="discount-right discount-second">
                              <span>New</span>
                              <p>Available For US${{item.amount}}</p>
                              <p>{{item.date_start}}~ {{item.date_end}}</p>
                            </div>
                          </div>
                          <div class="user-discount-down">
                            <div class="discount-down-left">
                              <p>Applicable to all products , Code:</p>
                              <p>{{item.code}}</p>
                            </div>
                            <div class="discount-down-right">
                              <button class="button" data-clipboard-text="94041">COPY CODE</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs> -->
      <!-- <div class="user-discount">
        <div class="user-discount-up">
          <a href="javascript:void(0)" title>
            <img src="@/assets/img/t2.png" />
          </a>
          <div class="user-discount-top">
            <div class="discount-left">
              <span>10</span>
            </div>
            <div class="discount-right discount-second">
              <span>New</span>
              <p>5858</p>
              <p>2019-08-01 ~ 2019-08-31</p>
            </div>
          </div>
          <div class="user-discount-down">
            <div class="discount-down-left">
              <p>APPLICABLE TO ALL PRODUCTS , Code:</p>
              <p>666666</p>
            </div>
            <div class="discount-down-right">
              <button class="button" data-clipboard-text="94041">COPY CODE</button>
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import Clipboard from "clipboard";
import message from "@/util/message";
import mesgTip from "@/lang";
export default {
  data() {
    return {
      isShow: false,
      activeName: "index",
      loading: false,
      finished: false,
      refreshing: false,
      return_order_count: "",
      currIndex: 1,
      pages: 1,
      db_selectlist: [],
      msgTip: mesgTip.CENTER,
    };
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
    firstmobile(item) {
      let value = "";
      value = item.substring(0, 4);
      return value;
    },
    endmobile(item) {
      var Length = item.length;
      if (Length > 8) {
        var value = item.substring(Length - 4, Length);
      } else {
        value = "";
      }
      return value;
    },
  },
  methods: {
    hxcopy() {
      var clipboard = new Clipboard(".hx_discount_btn");
      clipboard.on("success", (e) => {
        message.confirms({
          className: "confirms-btnswhis",
          msg: this.msgTip.SUCCESS_OPERAT,
          rightBtnFn: () => {
            clipboard.destroy();
          },
        });
        // this.$notification.open({
        //   message: "Tips",
        //   description: "Successful operation",
        //   duration: 2
        // });
        // this.$confirm.info({
        //   content: this.$hxmessage.CENTER.SUCCESS_OPERAT,
        //   btnNum: "0",
        //   tips: "duration"
        // });
        // 释放内存
      });
      clipboard.on("error", (e) => {
        message.confirms({
          className: "confirms-btnswhis",
          msg: this.msgTip.UNSUCCESS_OPERAT,
          rightBtnFn: () => {
            clipboard.destroy();
          },
        });
        // this.$notification.open({
        //   message: "Tips",
        //   description: "The browser does not support automatic replication.",
        //   duration: 2
        // });
        // 释放内存
      });
    },
    onClickLeft() {
      this.$router.push("/");
    },
    onClickTables(type, index) {
      this.currIndex = index;
      this.db_selectlist = [];
      this.loadMesg();
    },
    loadMesg() {
      let flags;
      if (this.currIndex === 1) {
        flags = "";
      } else {
        flags = "expired" || "";
      }
      this.$Http.common.getUsedCoupons({ flag: flags }).then((res) => {
        let { code, data } = res;
        data.data.forEach((item) => {
          this.db_selectlist.push(item);
        });
        this.return_order_count = data.total;
        this.loading = false;
        if (this.db_selectlist.length >= this.return_order_count) {
          this.finished = true;
        }
      });
    },
    onClickTable(name, title) {
      this.pages = 1;

      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      this.db_selectlist = [];
      this.refreshing = false;
      this.loading = true;

      if (name === "received") {
        this.activeName = "received";

        this.msgonLoad({ flag: "expired" });
      } else {
        this.activeName = "index";
        // 将 loading 设置为 true，表示处于加载状态
        this.msgonLoad({ flag: "" });
      }
    },

    msgonLoad(option) {
      if (this.refreshing) {
        this.db_selectlist = [];
        this.refreshing = false;
      }
      let flags = "";
      if (this.activeName === "index") {
        flags = "";
      } else {
        flags = "expired" || "";
      }
      this.$Http.common.getUsedCoupons({ flag: flags }).then((res) => {
        let { code, data } = res;
        data.data.forEach((item) => {
          this.db_selectlist.push(item);
        });
        this.return_order_count = data.total;
        this.loading = false;
        if (this.db_selectlist.length >= this.return_order_count) {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      // 重新加载数据
      this.db_selectlist = [];
      this.refreshing = false;
      // 将 loading 设置为 true，表示处于加载状态

      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.msgonLoad();
    },
  },
  created() {
    if (this.$route.query.received) {
      this.currIndex = 2;
      this.loadMesg();
    } else {
      this.currIndex = 1;
      this.loadMesg();
    }
  },
  components: {
    HeaderTab,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-d-code {
  width: pxto2($width680);
  margin: 0 auto;
  display:none;
  @include fontSize24();
  .header {
    height: pxto2($px60);
    line-height: pxto2($px60);
    background: $withe;
    text-indent: pxto2($px20);
  }
  .content {
    margin-top: pxto2($px10);
    .list {
      height: pxto2(224px);
      width: 100%;
      margin-bottom: pxto2($px10);
      display: flex;
      .l {
        width: pxto2(380px);
        padding:pxto2($px20);
        .preic{
          font-size:pxto2(36px)
        }
        p{
          color:$info;
          @include fontSize24();
        }
        .amount{
          color:$block;
        }
      }
      .r {
        width: pxto2(220px);
        display: flex;
        padding:pxto2($px20);
        div{
          width:50%;
        }
        .name{
          color:$info;
        }
      }
    }
  }
}
.message-tab-a {
  margin-bottom: 0.4rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-top: solid 1px #dbdbdb;
  border-bottom: solid 1px #dbdbdb;
}
.message-tab-a .active {
  background-color: #161616;
  color: #fff;
}
.message-tab-a a {
  display: block;
  width: 50%;
  height: 1.06667rem;
  line-height: 1.06667rem;
  text-align: center;
  font-size: 0.32rem;
  color: #161616;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.user-security {
  background: #fff;
  padding: 0.53333rem;
}
.user-discount {
  width: 8.93333rem;
  height: 3.06667rem;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.26667rem;
  margin: auto;
}
.user-discount .user-discount-up {
  width: 8.93333rem;
  height: 2.34667rem;
  font-size: 0;
  position: relative;
}
.user-discount .user-discount-up a img {
  height: 100%;
}
.user-discount .user-discount-up .user-discount-top {
  position: absolute;
  top: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
}
.user-discount .user-discount-up .user-discount-top .discount-left {
  width: 2.97333rem;
  height: 2.34667rem;
  border-right: 1px dashed #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
.user-discount
  .user-discount-up
  .user-discount-top
  .discount-left
  span:first-child {
  // font-family: "SH-Regula";
  font-size: 1.06667rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  text-shadow: 2px 3px 5px #888;
}
.user-discount
  .user-discount-up
  .user-discount-top
  .discount-left
  span:nth-child(2) {
  /* font-family: "SH-ExtraLight"; */
  font-size: 0.93333rem;
  font-weight: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.user-discount .user-discount-up .user-discount-top .discount-right {
  width: 5.97333rem;
  padding-top: 0.2rem;
  padding-left: 0.26667rem;
  overflow: hidden;
}
.user-discount
  .user-discount-up
  .user-discount-top
  .discount-right
  p:nth-child(2) {
  /* font-family: "SH-Light"; */
  font-size: 0.42667rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  line-height: 0.66667rem;
}
.user-discount
  .user-discount-up
  .user-discount-top
  .discount-right
  p:nth-child(3) {
  /* font-family: "SH-ExtraLight"; */
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.user-discount .user-discount-up .user-discount-down {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 0.26667rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
.user-discount .user-discount-up .user-discount-down .discount-down-left {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.user-discount
  .user-discount-up
  .user-discount-down
  .discount-down-left
  p:first-child {
  /* font-family: "SH-ExtraLight"; */
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.24rem;
  letter-spacing: 0px;
  color: #c0c4cc;
}
.user-discount
  .user-discount-up
  .user-discount-down
  .discount-down-left
  p:nth-child(2) {
  font-family: "SH-Regula";
  font-size: 0.32rem;
  font-weight: normal;
  letter-spacing: 1px;
  color: #c0c4cc;
}
.user-discount .user-discount-up .user-discount-down .discount-down-right {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}
.user-discount
  .user-discount-up
  .user-discount-down
  .discount-down-right
  button {
  /* font-family: "SH-ExtraLight"; */
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.33333rem;
  letter-spacing: 0px;
  color: #bfbfbf;
  background: #fff;
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline: none;
  border: 1px solid transparent;
  border-bottom: 1px solid #bfbfbf;
}
</style>
