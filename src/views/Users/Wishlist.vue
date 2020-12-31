<template>
  <div>
    <HeaderTab />
    <div
      class="pers-wis-del"
      @click="deleteAll"
      v-if="wishAll_id.length > 0"
    >
      <i class="iconfont pers-shanchu"></i>
      <span> Delete 
      <!--
      <b style="color:#0C0A26">{{wishAll_id.length > 0 &&`(${wishAll_id.length}`}})</b>
      -->
      </span>
    </div>
    <div class="user-controller" style="margin: 0">
      <div v-if="db_selelctlist.length > 0">
        <article class="wishlist-main bg-white">
          <div class="shop-list">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text
                @load="onLoad"
                loading-text="loading..."
                class="loadlist-user"
              >
                <WishList
                  :formdata="db_selelctlist ? db_selelctlist : []"
                  :db_itemsdata="db_itemsdata"
                  @deleChange="adddelete"
                  @addChange="adddcart"
                  @selectAllId="selectAllIdfn"
                />
              </van-list>
            </van-pull-refresh>
          </div>
          <div class="wishilist_btn" style="display: none">
            <a href="javascript:void(0)" @click="delAllwish(1)"
              >ADD ALL TO BAG</a
            >
            <a
              href="javascript:void(0)"
              class="empty_all"
              style="margin-left: 0"
              @click="delAllwish(0)"
              >CLEAR ALL ITEMS</a
            >
          </div>
        </article>
      </div>
      <div v-if="db_selelctlist.length == 0">
        <Nullshops />
      </div>
    </div>
    <FooterBtn />
  </div>
</template>

<script>
import Nullshops from "@/components/Nullshops.vue";
import HeaderTab from "@/components/HeaderTab";
import message from "@/util/message";
import mesgTip from "@/lang";
import WishList from "./Components/WishList.vue";
import { Toast } from "vant";

export default {
  data() {
    return {
      msgTip: mesgTip.CENTER,
      list: [],
      db_selelctlist: [],
      db_itemsdata: [],
      loading: false,
      finished: false,
      refreshing: false,
      pages: 1,
      return_order_count: "",
      deleteIndex: "",
      wishAll_id: [],
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
    onClickLeft() {
      this.$router.push("/");
    },
    onLoad() {
      if (this.refreshing) {
        this.db_selelctlist = [];
        this.refreshing = false;
      }
      this.$Http.wishlist
        .getWishlists({
          page: this.pages++,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            data.data.forEach((item) => {
              this.db_selelctlist.push(item);
            });
            this.db_itemsdata = data;
            this.return_order_count = data.total;
            this.loading = false;
            if (this.db_selelctlist.length >= this.return_order_count) {
              this.finished = true;
            }
          }
        });
      this.wishlist_ids();
    },
    wishlist_ids() {
      this.$Http.common.getAllWishlistProductIds().then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.$Storage.setWishlistIds(data);
        }
      });
    },
    onRefresh() {
      this.pages = 1;
      // 清空列表数据
      this.finished = false;
      this.db_selelctlist = [];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    adddelete(opt) {
      let { item, index } = opt;
      this.deleteIndex = index;
      let { customer_id, product_id } = item;
      // message.confirm('confirms-btnswhis','Do you want to delete the item?')
      let _this = this;
      message.confirms({
        className: "confirms-btnswhis",
        msg: this.msgTip.WISH_DELETE,
        rightBtnFn: () => {
          _this.$Http.wishlist
            .wishDo({
              customer_id,
              product_ids:[product_id],
              session_id: _this.$Storage.getSessionId(),
            })
            .then((res) => {
              let { code, data } = res;
              _this.db_selelctlist.splice(this.deleteIndex, 1);
              _this.wishlist_ids();
              if (_this.db_selelctlist.length == 0) {
                _this.$Http.wishlist.getWishlists().then((res) => {
                  let { code, data } = res;
                  if (code == 200) {
                    _this.db_selelctlist = data;
                  }
                });
              }
            });
        },
      });
    },
    adddcart(opts) {
      let { item, index, sizeId, colorId } = opts;
      let _this = this;
      message.confirms({
        className: "confirms-btnswhis",
        msg: "Are items added to the shopping bag?",
        rightBtnFn: () => {
          let qs = {
            product_id: item.product_id,
            product_option_value_id: sizeId,
            wish_id: item.id,
            quantity: 1,
            session_id: _this.$Storage.getSessionId(),
          };
          _this.$Http.wishlist.cartAdd(qs).then((res) => {
            let { code, msg } = res;
            if (code == 200) {
              _this.db_selelctlist.splice(index, 1);
              if (_this.db_selelctlist.length < 3) {
                _this.onLoad();
              }
              setTimeout(() => {
                _this.wishlist_ids();
              }, 300);
            } else {
              Toast.fail(msg);
            }
          });
        },
      });
    },
    delAllwish(index) {
      // api/cart/empty_wish
      let title = "",
        content = "";
      if (index == 0) {
        title = "";
        content = this.msgTip.WISH_EMPTY;
      } else {
        title = "";
        content = "Are all the items added to the shopping bag?";
      }
      let _this = this;
      message.confirms({
        title,
        className: "confirms-btnswhis",
        msg: content,
        rightBtnFn: () => {
          if (index === 0) {
            _this.$Http.wishlist.emptyWish().then((res) => {
              let { code } = res;
              if (code == 200) {
                _this.db_selelctlist = [];
                _this.pages = 1;
                setTimeout(() => {
                  _this.onLoad();
                  _this.wishlist_ids();
                }, 300);
              }
            });
          } else {
            let obj = {};
            _this.db_selelctlist.forEach((item) => {
              if (!obj["products[" + item.id + "][product_id]"]) {
                obj["products[" + item.id + "][product_id]"] = item.product_id;
              }
              if (!obj["products[" + item.id + "][product_option_value_id]"]) {
                if (item.product_option_value.Size) {
                  obj["products[" + item.id + "][product_option_value_id]"] =
                    item.product_option_value.Size[0]["id"];
                }
              }
              if (!obj["products[" + item.id + "][quantity]"]) {
                obj["products[" + item.id + "][quantity]"] = item.review_rating;
              }
              if (!obj["products[" + item.id + "][wish_id]"]) {
                obj["products[" + item.id + "][wish_id]"] = item.id;
              }
            });
            obj["session_id"] = _this.$Storage.getSessionId();
            _this.$Http.wishlist.batchCartAdd({ ...obj }, true).then((res) => {
              let { code, data } = res;
              if (code == 200) {
                _this.db_selelctlist = data;
                _this.db_selelctlist = [];
                _this.pages = 1;
                setTimeout(() => {
                  _this.onLoad();
                  _this.wishlist_ids();
                }, 300);
              }
            });
          }
        },
      });
    },
    selectAllIdfn(arrId) {
      this.wishAll_id = arrId;
    },
    wishDo(){
        this.$Http.wishlist.wishDo({product_ids:this.wishAll_id}).then(res=>{
            let { code } = res;
            if (code == 200) {
                this.db_selelctlist = [];
                this.pages = 1;
                setTimeout(() => {
                this.onLoad();
                this.wishlist_ids();
               }, 300);
            }
        })
    },
    deleteAll() {
      message.confirms({
        title: "",
        className: "confirms-btnswhis",
        msg: 'Would you like to empty your shopping bag?',
        rightBtnFn: () => this.wishDo()
      });
    },
  },
  created() {
    this.onLoad();
  },
  components: {
    Nullshops,
    HeaderTab,
    WishList,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.user-controller{
  padding: pxto2($px20);
}
.pers-wis-del {
  display: flex;
  align-items: center;
  width: pxto2($width680);
  height: pxto2($px60);
  @include mAuto();
  background: $withe;
  margin-bottom: pxto2($px10);
  @include bRadius4();
  @include fontSize24();
  padding: pxto2($px20);
  @include pointer();
  span {
    margin-left: pxto2($px40);
    color: $border-color;
  }
}
</style>
