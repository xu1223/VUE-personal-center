<template>
  <div class="p-my-view">
    <HeaderTab />
    <div class="my-recently-viewed">
      <div class="recently_viewed_date">
        <p>Browse date :</p>
        <div class="recently_viewed_date_main clearfix">
          <div class="date date1 fl" id="from" style="height: 100%">
            <input
              type="text"
              class="date-check"
              readonly="true"
              style="width: 100%; height: 100%; text-align: center"
              :value="parms.start_date"
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
              v-model="parms.end_date"
            />
          </div>
          <img src="@/assets/img/date.png" />
        </div>
      </div>
      <!-- (({{db_selectlist.total}})) -->
      <!-- <p class="recently_viewed_num">Recently Viewed</p> -->
      <div>
        <article class="wishlist-main bg-white">
          <div class="shop-list">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text
                @load="onLoad"
                loading-text="loading..."
              >
                <van-cell
                  v-for="(item, index) in db_selectlist"
                  :key="index"
                  style="padding: 0"
                >
                  <div class="recently_viewed" @click="LINKURL(item)">
                    <a href="javascript:void(0)" class="recently_viewed_left">
                      <img v-lazy="item.img_m" :alt="item.nae" />
                    </a>
                  </div>
                  <div class="pre">
                    <p class="title-name e-cli">{{ item.name }}</p>
                    <p class="title-sku e-cli">SKU：{{ item.sku }}</p>
                    <p class="price e-cli" :data-price="item.currency_price">
                      <span>${{ item.currency_price }}</span>
                      <s>${{ item.currency_show_price }}</s>
                    </p>
                    <!-- pers-xihuan2 -->
                    <i
                      class="iconfont pers-xihuan"
                      @click="cart_add_all_to_wish(item)"
                    ></i>
                  </div>
                  <div class="title-name" style="display: none">
                    <a href="javascript:void(0)">{{ item.name }}</a>
                    <div class="recently_viewed_star" hx-data-score="5">
                      <van-rate
                        v-model="item.review_rating"
                        readonly
                        color="#161616"
                        :size="18"
                      />
                    </div>
                    <div class="price" :data-price="item.currency_price">
                      <span>${{ item.currency_price }}</span>
                      <s>${{ item.currency_show_price }}</s>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </article>
      </div>
      <div
        v-if="db_selectlist.length === 0"
        style="justify-content: center; text-align: center"
      >
        <!-- <img src="@/assets/img/web__wu.png" /> -->
        <i class="icon-info-bg icon-web-wu"></i>
      </div>
    </div>
    <!-- <van-calendar v-model="show" @confirm="onConfirm" /> -->
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

    <!--心愿单-->
    <CartConfirm
      :formdata="wishlistData ? wishlistData : {}"
      :isShow.sync="isShowwish"
      :isAll="false"
      :isMsg="true"
      :title="tipMsg.CART_MOVE_TITLE"
      :msg="tipMsg.CART_MOVE"
      @change="wishlistChange"
    />
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import { sendParamInUrl } from "@/util/tools";
import CartConfirm from "./Components/CartConfirm";
import mesgTip from "@/lang/en.js";
export default {
  data() {
    return {
      tipMsg: mesgTip.CENTER,
      wishlistData: {},
      isShowwish: false,
      date: "",
      show: false,
      refreshing: false,
      loading: false,
      finished: false,
      pages: 1,
      db_selectlist: [],
      return_order_count: "",
      showTime: false,
      endTime: false,
      minDate: new Date(1971, 0, 1),
      maxDate: new Date(2060, 10, 1),
      currentDate: new Date(),
      currentDate1: new Date(),
      parms: {
        start_date: "",
        end_date: "",
      },
    };
  },
  methods: {
    cart_add_all_to_wish(item) {
      // this.show = !this.show;
      // console.log(item,'--item')
      item['size'] = item['size']||''
      item['color'] = item['color']||''
      item['quantity'] = item['quantity']||''
      item['sku'] = item['sku']||''
      this.showList = item;
      this.isWishbtn = true;
      this.wishlistData = item;
      this.isShowwish = true;
    },
    wishlistChange(item) {
      let _parms = {
        product_ids: [item.product_id],
      }
      // console.log(_parms,'--_parms')
      this.$Http.cart
        .wishDo(_parms)
        .then((res) => {
          let { code } = res;
          if (code == 200) {
            this.show = false;
            this.$emit("change", this.isDelete);
             this.$toast({
               type:'success',
               message:'OK'
             });
          }
          this.isShowwish = false;
        });
    },
    onClickLeft() {
      this.$router.push("/");
    },
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
      this.parms.end_date = resDate;
      this.onLoad({ ...this.parms });
      this.endTime = false;
      this.showTime = false;
    },
    cancelfn() {
      this.endTime = false;
      this.showTime = false;
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
      this.parms.start_date = resDate;
      this.endTime = false;
      this.showTime = false;
      this.onLoad({ ...this.parms });
    },
    endTimes() {
      this.endTime = !this.endTime;
    },
    cancelfn1() {
      this.endTime = false;
      this.showTime = false;
    },
    showTimes() {
      this.showTime = !this.showTime;
    },
    onLoad(options = {}) {
      if (this.refreshing) {
        this.db_selectlist = [];

        this.refreshing = false;
      }
      this.$Http.cart
        .getRecentlyViewed({
          page: this.pages++,
          ...options,
        })
        .then((res) => {
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
      this.pages = 1;
      this.db_selectlist = [];
      // 重新加载数据
      this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },
  },
  created() {},
  components: {
    HeaderTab,
    CartConfirm
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-my-view {
  .my-recently-viewed {
    background: transparent;
  }
  .recently_viewed_date {
    background: $withe;
    height: pxto2($px120);
    margin: pxto2($px20) 0;
    .recently_viewed_date_main {
      height: pxto2($px60);
    }
    .van-cell {
      background: transparent;
      .recently_viewed {
        box-shadow: 0;
      }
    }
  }
}
.shop-list {
  .van-list {
    display: flex;
    flex-wrap: wrap;
    .van-cell {
      width: pxto2(375px);
      height: pxto2(580px);
      background: transparent;
      .recently_viewed_left {
        width: pxto2(338px);
        height: pxto2(438px);
        overflow: hidden;
       
        img {
          max-height: 100%;
        }
      }
      .e-cli {
        height: pxto2($px40);
        line-height: pxto2($px40);
        &.title-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0 pxto2($px15);
          font-weight: 550;
        }
        &.title-sku {
          color: $info;
          padding: 0 pxto2($px15);
          @include fontSize24();
        }
        &.price {
          color: $info;
          padding: 0 pxto2($px15);
          span {
            color: $block;
            font-weight: 550;
          }
        }
      }
      .pre {
        position: relative;
        i {
          position: absolute;
          right: pxto2($px20);
          bottom: pxto2($px10);
          font-size: pxto2($px50);
          @include pointer();
        }
      }
    }
  }
}
.my-recently-viewed {
  background: #fff;
  .recently_viewed_date {
    font-size: 14px;
    padding: 10px;
  }
  .recently_viewed_date .recently_viewed_date_main {
    border-radius: 10px;
    border: solid 1px #cdcdcd;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 5px;
    overflow: hidden;
  }
  .recently_viewed_num {
    font-size: 15px;
    text-align: center;
    border-bottom: solid 1px #efefef;
    margin: 0 10px;
    padding-bottom: 5px;
  }
  .recently_viewed {
    display: flex;
    margin: 0 10px;
    border: solid 1px #efefef;
    a{
      display: flex;
    justify-items: center;
    align-items: center;
    background: #fff;
    }
  }
  .recently_viewed .recently_viewed_left {
    width: 90px;
    font-size: 0;
    overflow: hidden;
  }
  .recently_viewed .recently_viewed_left img {
    width: 100%;
  }
  .recently_viewed .recently_viewed_right {
    font-size: 0.333rem;
    width: 100%;
    padding-left: 5px;
  }
  .recently_viewed .recently_viewed_right a {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .recently_viewed_star {
    padding: 5px 0;
  }
  .recently_viewed .recently_viewed_right .price s {
    color: #bbbbbb;
  }
  .recently_viewed_date .recently_viewed_date_main img {
    position: absolute;
    right: 10px;
    width: 20px;
  }
}
</style>
