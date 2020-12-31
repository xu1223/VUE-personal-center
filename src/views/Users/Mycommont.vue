<template>
  <div>
    <HeaderTab />
    <div class="my-commont">
      <div class="search">
        <div class="t">
          <div class="date date1 fl" id="from" style="height: 100%">
            <input
              type="text"
              class="date-check"
              readonly="true"
              style="width: 100%; height: 100%; text-align: center"
              :value="start_date"
              placeholder="start time"
              @click="showTimes()"
            />
          </div>
          ~
          <div class="date fr" id="to" style="height: 100%">
            <input
              type="text"
              class="date-check"
              placeholder="end time"
              readonly="true"
              style="width: 100%; height: 100%; text-align: center"
              @click="endTimes()"
              v-model="end_date"
            />
          </div>
        </div>
        <div class="s">
          <van-search
            v-model="sku"
            placeholder="Search SKU"
            shape="round"
            @search="getReviewsPager(1, sku)"
            @clear="clearFn"
          />
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
        class="loadlist-user"
      >
        <div
          class="p-my-com"
          v-for="(item, index) in db_selelctlist"
          :key="index + ' '"
        >
          <template>
            <div class="hider">
              <div class="t">
                <span>Nov </span>
                {{
                  (item &&
                    item.order &&
                    item.order.created_at &&
                    item.order.created_at) ||
                  ""
                }}
              </div>
              <div class="o">
                <span>Order NO </span>
                {{
                  (item &&
                    item.order &&
                    item.order.invoice_no &&
                    item.order.invoice_no) ||
                  ""
                }}
              </div>
            </div>
            <div class="content">
              <div class="info">
                <div class="author">
                  <img
                    v-lazy="
                      item && item.order_product && item.order_product.img_m
                    "
                  />
                </div>
                <div class="info-name">
                  <b>{{
                    (item && item.order_product && item.order_product.name) ||
                    ""
                  }}</b>
                  <div class="span-color">
                    <div>
                      SKU:
                      {{
                        (item &&
                          item.order_product &&
                          item.order_product.sku) ||
                        ""
                      }}
                    </div>
                    <div>
                      SIZE:
                      {{
                        (item &&
                          item.order_product &&
                          item.order_product.size) ||
                        ""
                      }}
                    </div>
                  </div>
                  <div class="span-color">
                    <div>
                      COLOR:
                      {{
                        (item &&
                          item.order_product &&
                          item.order_product.color) ||
                        ""
                      }}
                    </div>
                    <div>
                      QTY:
                      {{
                        (item &&
                          item.order_product &&
                          item.order_product.quantity) ||
                        ""
                      }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="cotent-con">
                <span>Cotent </span>
                <div class="con-line">
                  <div class="hx-input-starts clearfix">
                    <input
                      type="hidden"
                      name="rating"
                      class="comment-stars-val"
                      value="5"
                    />
                    <span
                      class="stars comment-stars"
                      v-if="item ? item.rating : false"
                    >
                      <van-icon
                        name="star"
                        :class="[
                          'iconfont iconLQYxingxingtianchong icon-staro',
                          i <= item.rating - 1 ? 'icon-staro-actives' : '',
                        ]"
                        v-for="(k, i) in 5"
                        :key="i + ' '"
                      />
                      <!-- <van-icon name="star" class="iconfont iconLQYxingxingtianchong icon-staro" />
                    <van-icon name="star" class="iconfont iconLQYxingxingtianchong icon-staro" />
                    <van-icon name="star" class="iconfont iconLQYxingxingtianchong icon-staro" />
                    <van-icon name="star" class="iconfont iconLQYxingxingtianchong icon-staro" />-->
                      <!-- <i
                      class="iconfont iconLQYxingxingtianchong icon-staro icon-staro-active"
                      data-hx-star
                    ></i>
                    <i class="iconfont iconLQYxingxingtianchong icon-staro" data-hx-star></i>
                    <i class="iconfont iconLQYxingxingtianchong icon-staro" data-hx-star></i>
                    <i class="iconfont iconLQYxingxingtianchong icon-staro" data-hx-star></i>
                    <i class="iconfont iconLQYxingxingtianchong icon-staro" data-hx-star></i>-->
                    </span>
                  </div>
                  <p
                    class="t-msg"
                    onclick="window.open('/order/order_review_edit?id=50','_self')"
                  >
                    {{ item && item.description }}
                  </p>
                  <ul class="user-select-imgs clearfix reviews-tu">
                    <li
                      v-for="(v, n) in (item && item.images) || []"
                      :key="n + ''"
                      @click="imgShow(v, n, item && item.images)"
                    >
                      <img v-lazy="v.img_m" />
                    </li>
                    <van-image-preview
                      v-model="show"
                      :images="imagesData"
                      @change="onChange"
                    >
                      <!-- <template v-slot:index>第{{ index }}页</template> -->
                    </van-image-preview>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </div>
      </van-list>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        show-toolbar
        @confirm="confirmfn"
        @cancel="cancelfn"
      />
    </van-popup>
    <van-popup v-model="endTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate1"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        show-toolbar
        @confirm="confirmfn1"
        @cancel="cancelfn1"
      />
    </van-popup>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import { sendParamInUrl } from "@/util/tools";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      pages: 1,
      db_selelctlist: [],
      return_order_count: "",
      show: false,
      index: 0,
      imagesData: [],
      sku: "",
      endTime: false,
      showTime: false,
      minDate: new Date(2001, 0, 1),
      maxDate: new Date(2060, 10, 1),
      currentDate: new Date(),
      currentDate1: new Date(),
      start_date: "",
      end_date: "",
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
  },
  methods: {
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    confirmfn1(val) {
      this.pages = 1;
      this.db_selectlist = [];
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.end_date = resDate;
      this.endTime = false;
      this.showTime = false;
    },
    cancelfn() {
      this.endTime = false;
      this.showTime = false;
      this.start_date = "";
    },
    confirmfn(val) {
      this.pages = 1;
      this.db_selectlist = [];
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      this.start_date = resDate;
      this.endTime = false;
      this.showTime = false;
    },
    endTimes() {
      this.endTime = !this.endTime;
    },
    cancelfn1() {
      this.endTime = false;
      this.showTime = false;
      this.end_date = "";
    },
    endTimes() {
      this.endTime = !this.endTime;
    },
    showTimes() {
      this.showTime = !this.showTime;
    },
    getReviewsPager(p, sku) {
      this.db_selelctlist = [];
      this.$Http.commont
        .getReviewsPager({
          p: p || 1,
          limit: 10,
          start_date: this.start_date || "",
          end_date: this.end_date || "",
          sku: sku || "",
        })
        .then((res) => {
          let { code, msg, data } = res;
          if (code == 200) {
            this.db_selelctlist = data.data;
            // this.data = data.data;
            // this.total=data.total;
          }
        });
    },
    clearFn() {
      this.db_selelctlist = [];
      this.start_date = "";
      this.end_date = "";
      this.$Http.commont
        .getReviewsPager({
          p: 1,
          limit: 10,
          start_date: "",
          end_date: "",
          sku: "",
        })
        .then((res) => {
          let { code, msg, data } = res;
          if (code == 200) {
            this.db_selelctlist = data.data;
          }
        });
    },
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },

    onClickLeft() {
      window.history.back(-1);
    },
    onChange(index) {
      this.index = index;
    },
    imgShow(item, index, imgs) {
      this.show = !this.show;
      this.imagesData = [];
      this.index = index;
      imgs.forEach((v) => {
        this.imagesData.push(v.img_m);
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.db_selelctlist = [];

        this.refreshing = false;
      }
      this.$Http.commont
        .getReviewsPager({
          page: this.pages++,
          flag: "reviewed",
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            data.data.forEach((item) => {
              this.db_selelctlist.push(item);
            });
            // this.db_selelctlist = data;
            this.return_order_count = data.total;
            this.loading = false;
            if (this.db_selelctlist.length >= this.return_order_count) {
              this.finished = true;
            }
          }
        });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.list = [];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  components: {
    HeaderTab,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.my-commont {
  margin-top:pxto2($px20);
  .search {
    width: pxto2($width710);
    @include fontSize24();
    margin: 0 auto;
    margin-bottom: pxto2($px10);
    height: pxto2($px60);
    display: flex;
    justify-content: center;
    .t,
    .s {
      width: pxto2(366px);
      height: pxto2($px60);
      background: $withe;
    }
    .t {
      display: flex;
        height: pxto2(68px);
      line-height: pxto2(68px);
    }
    .s {
      margin-left: 10px;
      .van-search {
        padding: 0;
        .van-search__content {
          background: transparent;
        }
      }
    }
  }
}
.p-my-com {
  margin: 0 auto;
  margin-bottom: pxto2($px10);
  background: $withe;
  @include fontSize24();
  width: pxto2($width710);
  border: solid 1px $info-2;
  @include bRadius4();
  .hider {
    height: pxto2($px60);
    border-bottom: solid 1px $info-2;
    padding: pxto2($px16) pxto2($px20);
    color: $font-soclor;
  }
  .content {
    padding: pxto2($px20);
    .info {
      min-height: pxto2($px130);
      display: flex;
      justify-content: space-around;
      .author {
        width: pxto2($px99);
        height: pxto2($px130);
        border: solid 1px $info-2;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .info-name {
        @include fontSize24();
        width: pxto2(537px);
        b {
          font-weight: 500;
        }
        .span-color {
          display: flex;
          margin-top: pxto2($px5);
          color: $info;
          @include fontSize20();
          div {
            width: 50%;
          }
        }
      }
    }
    .cotent-con {
      margin-top: pxto2($px10);
      display: flex;
      justify-content: space-between;
      span {
        margin-right: pxto2($px20);
      }
      .con-line {
        width: pxto2($px540);
        padding: pxto2($px18) pxto2($px20);
        border: $input-border;
        @include bRadius4();
        .hx-input-starts {
          .van-icon {
            @include fontSize20();
            margin-right: pxto2($px5);
          }
        }
        .t-msg {
          color: $info;
          margin: {
            top: pxto2($px10);
            bottom: pxto2($px10);
          }
        }
        .user-select-imgs {
          display: flex;
          flex-wrap: wrap;
          li {
            width: pxto2($px90);
            height: pxto2($px90);
            margin-right: pxto2($px15);
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

// .my-commont {
//   // margin-top: 1.4rem;
//   .user-select-comments {
//     padding: 0.26667rem 0;
//     // margin-bottom: 0.26667rem;
//     padding-bottom: 1.2rem;
//   }
//   .message-main {
//     background: #fff;
//     margin-bottom: 0.2rem;
//   }
//   .message-main .hx-message {
//     margin: 0 0.53333rem;
//   }
//   .message-main .hx-message-some {
//     cursor: pointer;
//     display: -ms-flexbox;
//     display: flex;
//     background-color: #fff;
//     margin-bottom: 0.66667rem;
//   }
//   .message-main .hx-message-some .head-portrait {
//     width: 0.88rem;
//     height: 0.88rem;
//     overflow: hidden;
//     margin-right: 0.26667rem;
//     border-radius: 0.88rem;
//     -webkit-border-radius: 0.88rem;
//     -moz-border-radius: 0.88rem;
//     -ms-border-radius: 0.88rem;
//     -o-border-radius: 0.88rem;
//   }
//   .message-main .hx-message-some .head-portrait img {
//     width: 100%;
//     height: 100%;
//   }
//   .message-main .hx-message-some .text-cont {
//     width: 80%;
//     -ms-flex-positive: 1;
//     flex-grow: 1;
//   }
//   .user-select-comments .hx-message-some .text-cont .top {
//     font-size: 0.32rem;
//   }
//   .message-main .hx-message-some .text-cont .top {
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-align: center;
//     align-items: center;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     margin-bottom: 5px;
//   }
//   .user-select-comments .hx-message-some .text-cont .top p {
//     font-weight: 700;
//     color: #161616;
//   }
//   .message-main .hx-message-some .text-cont p {
//     // font-family: "SH-Medium";
//     font-size: 0.34667rem;
//     color: #6e6e6e;
//   }
//   .user-select-comments .hx-message-some .text-cont .top em {
//     font-size: 0.26667rem;
//     color: #bfbfbf;
//   }
//   .user-select-comments .hx-message-some .text-cont .tit {
//     font-size: 0.29333rem;
//   }
//   .user-select-comments .hx-message-some .text-cont .t-msg {
//     color: #161616;
//     margin-top: 3px;
//     line-height: 0.32rem;
//   }
//   .user-select-comments .hx-message-some .text-cont .user-select-imgs {
//     margin-top: 0.26667rem;
//     margin-right: -0.26667rem;
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-wrap: wrap;
//     flex-wrap: wrap;
//   }
//   .user-select-comments .hx-message-some .text-cont .user-select-imgs li {
//     height: 3.25333rem;
//     margin-right: 0.26667rem;
//     margin-bottom: 10px;
//     float: left;
//     overflow: hidden;
//     cursor: pointer;
//     width: 30.7%;
//   }
//   .user-select-comments .hx-message-some .text-cont .user-select-imgs li img {
//     max-height: 100%;
//     max-width: 100%;
//   }
//   .user-select-comments .hx-message-some .hx-input-starts {
//     margin-top: 0.24rem;
//   }
//   .message-main .hx-message-some .text-cont span {
//     font-size: 0.32rem;
//     color: #6e6e6e;
//     display: block;
//   }

//   .user-select-comments .hx-message-some .hx-input-starts .icon-staro {
//     color: #bfbfbf;
//     font-size: 0.26667rem;
//     cursor: pointer;
//     float: left;
//   }

//   .user-select-comments .user-selelct-c-aded-day {
//     border-top: solid 1px #dddddd;
//     margin-top: 0.26667rem;
//   }
//   .user-select-comments .user-selelct-c-aded-day .selelct-c-aded-day-title {
//     color: #13b9b0;
//     font-size: 0.32rem;
//     margin-top: 0.26667rem;
//   }
//   .user-select-comments .user-select-c-imgs {
//     margin-top: 0.26667rem;
//     height: 1.70667rem;
//     background: #f2f2f2;
//   }
//   .user-select-comments .user-select-c-imgs a {
//     display: block;
//   }
//   .user-select-comments .user-select-c-imgs .select-c-imgs-img {
//     width: 1.33333rem;
//     height: 1.70667rem;
//     float: left;
//   }
//   .user-select-comments .user-select-c-imgs .select-c-imgs-img img {
//     max-height: 100%;
//   }
//   .user-select-comments .user-select-c-imgs .select-c-imgs-con {
//     float: left;
//     width: 7.02667rem;
//     font-size: 0.32rem;
//     padding: 0.26667rem 0.26667rem;
//   }
//   .user-select-comments
//     .user-select-c-imgs
//     .select-c-imgs-con
//     .select-c-imgs-title {
//     height: 0.53333rem;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
//   .user-select-comments .user-select-c-imgs .select-c-imgs-con b {
//     float: right;
//     margin-top: 0.26667rem;
//     font-size: 0.32rem;
//     font-weight: 400;
//   }
//   .user-select-comments .add-comments {
//     background-color: #ffffff;
//     border-radius: 5px;
//     border: solid 1px #dbdbdb;
//     font-size: 0.32rem;
//     color: #6e6e6e;
//     height: 0.64rem;
//     line-height: 0.64rem;
//     padding: 0 0.4rem;
//     display: block;
//     float: right;
//     margin-top: 0.26667rem;
//   }
// }
</style>
