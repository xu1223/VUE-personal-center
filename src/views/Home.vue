<template>
  <div class="pres-home">
    <HeaderTab :isFalse="true"  :isLeft="isLeft"/>
    <!--<HeaderLogin/> 
        <div class="home-content">
            <div class="title">
                <p>MY ACCOUNT</p>
                <p class="personal-emali">{{ email }}</p>
                <div class="personal-link">
                    <a
                            class="back"
                            href="javascript:void(0)"
                            rel="nofollow"
                            @click="getTopath"
                    >CONTINUE SHOPPING</a
                    >
                    <a
                            class="back"
                            href="javascript:void(0)"
                            rel="nofollow"
                            @click="getout"
                    >LOG OUT</a
                    >
                </div>
            </div>
           
        </div>
    <Menu />
-->
    <div class="pers-home-menu" style="display: -none">
      <div class="pers-home-menu-table">
        <!-- <ul style="dispaly:none !important;">
          <li
            v-for="(item, index) in tabMenu"
            :key="index + ''"
            :class="[currIndex == index && 'pers-menu-active']"
            @click="tabMenuFn(item, index)"
          >
            <router-link
              :to="{
                path: item.path,
                query: { id: item.query.id, name: item.query.name },
              }"
            >
              <i :class="['iconfont', item.icon]"></i>
              <span class="text">{{ item.name }}</span>
            </router-link>
          </li>
        </ul> -->
        <van-tabs>
          <van-tab v-for="(item,index) in tabMenu"  :key="index"  :class="[currIndex == index && 'pers-menu-active']">
            <template #title> 
              <router-link
              :to="{
                path: item.path,
                query: { id: item.query.id, name: item.query.name },
              }"
              style="display:block"
            >
              <i :class="['iconfont', item.icon]"></i>
              <p class="text">{{ item.name }}</p>
            </router-link>
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <div class="pers-home-menu-categ">
        <ul>
          <li>
            <router-link :to="`/my_cart`">
              <i class="hx-bg-icon-img hx-bg-icon-bag"></i>
              <span>Shopping Bag</span>
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/my_wish`" class="item-tit">
              <i class="hx-bg-icon-img hx-bg-icon-wishlist"></i>
              <span>My Wishlist</span>
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/my_review`">
              <i class="hx-bg-icon-img hx-bg-icon-review"></i>
              <span
                >My Review{{
                  db_selectlist.comment
                    ? `(${db_selectlist.comment.reviewed_count})`
                    : ""
                }}</span
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ path: `/user/my_message` }">
              <i class="hx-bg-icon-img hx-bg-icon-message"></i>
              <span
                >My Message{{
                  db_selectlist.message
                    ? `(${db_selectlist.message.total_count})`
                    : ""
                }}</span
              >
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/my_coupon`">
              <i class="hx-bg-icon-img hx-bg-icon-coupon"></i>
              <span
                >My Coupon Code{{
                  db_selectlist.coupon
                    ? `(${db_selectlist.coupon.total_used_count})`
                    : ""
                }}</span
              >
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/my_setting`">
              <i class="hx-bg-icon-img hx-bg-icon-settings"></i>
              <span>Setting</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="pers-home-address">
        <div class="pers-home-address-title">
          <b class="title"> Address Book </b>
          <router-link :to="`/user/my_address`">View all ></router-link>
        </div>
        <div class="pers-home-address-info">
          <i class="iconfont pers-ico_site"></i>
          <div class="content">
            <div class="line">
              <span>Address: {{ default_address.address_1 }}</span>
            </div>
            <div class="line">
              <span>City: {{ default_address.city }}</span>
            </div>
            <div class="line">
              <span>Zip Code: {{ default_address.zone_id }}</span>
            </div>
            <div class="line">
              <span>State: {{ default_address.state }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pers-home-subscr">
        <div class="pers-home-address-title">
          <b class="title">Subscr</b>
        </div>
        <p>Sign up for newsletter.</p>
        <div class="pers-home-subscr-radio">
          <van-radio-group
            v-model="is_newsletter"
            direction="horizontal"
            @change="customer_newsletter"
          >
            <van-radio name="0" checked-color="#333333"> Subscribe </van-radio>
            <van-radio name="1" checked-color="#333333">
              Unsubscribe
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { sendParamInUrl } from "@/util/tools";
import HeaderTab from "@/components/HeaderTab";
import { mapState } from "vuex";
import HeaderLogin from "@/common/HeaderLogin";
import FooterBtn from "@/common/FooterBtn.vue";

export default {
  data() {
    return {
      isLeft: true,
      configObj: {},
      currIndex: 0,
      is_newsletter: "0",
      db_selectlist: {},
      default_address: {
        address_1: "",
        city: "",
        zone_id: "",
        state: "",
      },
      parms: {},
      tabMenu: [
        {
          id: 0,
          name: "Unpaid",
          icon: "pers-6",
          path: "/order",
          query: { id: 0, name: "unpaid" },
        },
        {
          id: 2,
          name: "Processing",
          icon: "pers-2",
          path: "/order",
          query: { id: 2, name: "paid" },
        },
        {
          id: 1,
          name: "Shipped",
          icon: "pers-3",
          path: "/order",
          query: { id: 1, name: "shipped" },
        },
        {
          id: 3,
          name: "Completed",
          icon: "pers-4",
          path: "/order",
          query: { id: 3, name: "completed" },
        },
        {
          id: 4,
          name: "Canceled",
          icon: "pers-5",
          path: "/order",
          query: { id: 4, name: "canceled" },
        },
        {
          id: 5,
          name: "AfterSale",
          icon: "pers-1",
          path: "/order",
          query: { id: 5, name: "after_sale_order" },
        },
      ],
    };
  },
  methods: {
    getTopath() {
      sendParamInUrl({ page: "index" });
    },
    tabMenuFn(item, index) {
      this.currIndex = index;
    },
    isrender() {
      this.db_selectlist = [];
      this.$Http.user.personal().then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.db_selectlist = data;
          let _id = "";
          if (data.customer.gender == "Man") {
            // {id:1,name:'Man'},{id:2,name:'Woman'},{id:0,name:'Confidentiality'}
            _id = 1;
          } else if (data.customer.gender == "Woman") {
            _id = 2;
          } else if (data.customer.gender == "Confidentiality") {
            _id = 0;
          }
          this._id = _id;
          this.parms.gender = _id;
          if (data.customer.default_address) {
            let itme = data.customer.default_address;
            this.parms["firstname"] = data.customer.firstname;
            this.parms["avatar"] = data.customer.avatar;
            this.parms["lastname"] = data.customer.lastname;
            this.parms["mobile"] = data.customer.mobile;
            this.parms["email"] = data.customer.email;
            this.parms["datys1"] = data.customer.birthday;
            this.default_address = data.customer.default_address;
          }
        }
      });
    },
    customer_newsletter(ev) {
      this.$Http.user
        .customerNewsletter({
          is_newsletter: parseInt(this.is_newsletter),
        })
        .then((res) => {
          let { code, data, resultMsg } = res;
          if (code == 200) {
            this.$toast({
              type: "success",
              message: "ok",
            });
            // resultMsg
            // setTimeout(()=>{
            // location.reload()
            // },300)
          }
        });
    },
  },
  computed: {
    ...mapState({
      config(state) {
        return state.common.config ? state.common.config : {};
      },
    }),
  },
  created() {
    this.isrender();
    this.$Http.user.getNewsletter().then((options) => {
      let { code, data, msg } = options;
      if (code == 200) {
        this.is_newsletter = data.is_newsletter.toString();
      }
    });
  },
  components: {
    Menu,
    HeaderTab,
    HeaderLogin,
    FooterBtn,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.pres-home {
  .pers-footer-btn {
    background: transparent;
    .van-tabbar--fixed{
    z-index:2006 !important;
    }
  }
}

.pers-home-menu {
  background: $withe;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 1.1rem;
  .pers-home-menu-table {
    width: pxto2($width750);
    position: relative;
    z-index: 100;
    ul {
      display: flex;
      li {
        position: relative;
        width: pxto2($px125);
        height: pxto2($px120);
        background: $info-4;
        text-align: center;
        line-height: 0;
        @include pointer();
        a {
          display: block;
          height: 100%;
          width: 100%;
        }
        i {
          display: block;
          margin: 0 pxto2($px40);
          padding-top: pxto2($px40);
          line-height: pxto2($px24);
          font-size: pxto2($px50);
          color: #d3d3d5;
          margin-bottom: pxto2(10px);
        }
        .text {
          font-size: pxto2($px20);
        }
        &:active{
          background: $bg-table;
           i {
            color: $withe !important;
          }
          a {
            color: $withe;
          }
        }
        &.pers-menu-active {
          
        }
      }
    }
    
  }
  .pers-home-menu-categ {
    padding: pxto2($px20);
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        background: $info-4;
        width: pxto2($width335);
        height: pxto2($px150);
        margin: pxto2($px10) 0;
        position: relative;
        align-items: center;
        text-align: right;
        line-height: pxto2($px150);
        padding-right: pxto2($px10);
        font-size: pxto2($px24);
        font-weight: 500;
        i {
          width: pxto2($width200);
          height: pxto2($px130);
          display: block;
          position: absolute;
          top: pxto2($px10);
          left: pxto2($px10);
          z-index: 1;
        }
        span {
          position: relative;
          z-index: 3;
          margin-right:pxto2($px20);
          font-weight: 550;
          font-size: pxto2(24px);
        }
      }
      li:nth-child(odd) {
        margin-right: pxto2($px10);
      }
      li:nth-child(even) {
        margin-left: pxto2($px10);
      }
    }
  }
  .pers-home-address,
  .pers-home-subscr {
    width: pxto2($width680);
    height: pxto2($px230);
    background: $info-4;
    margin: 0 auto;
    padding: pxto2($px20);
    font-size: pxto2($px16);
    &-title {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: pxto2($px24);
      }
      .href {
        font-size: pxto2($px20);
        color: $info;
        text-decoration: underline;
      }
    }
    &-info {
      display: flex;
      margin-top: pxto2($px10);
      i {
        display: block;
        height: pxto2($px45);
        line-height: pxto2($px45);
        width: pxto2($px45);
        font-size: pxto2($px30);
      }
      .content {
        border: $input-border;
        width: 100%;
        height: pxto2($px150);
        margin-left: pxto2($px10);
        padding: pxto2($px10);
        .line {
          min-height: pxto2($px35);
        }
      }
    }
  }
  .pers-home-subscr {
    height: pxto2($px150);
    margin-top: pxto2($px10);
    p {
      margin: pxto2($px10) 0;
    }
    &-radio {
      margin-top: 10px;
      font-size: pxto2($px20);
    }
  }
}
.home-content {
  padding: 0.46667rem 0.53333rem;
  .title p {
    font-size: 0.74667rem;
    color: #252525;
    text-transform: Uppercase;
  }
  .title p.personal-emali {
    color: #8e8e8e;
    font-size: 0.32rem;
    margin: 0.25rem 0;
  }
  .personal-link {
    display: flex;
    justify-content: space-between;
  }
  .title .back {
    border: 0;
    color: #8e8e8e;
  }
  .title .back {
    text-transform: Capitalize;
    font-size: 0.32rem;
    color: #252525;
    // border-bottom: 1px solid #252525;
  }
  .personal-link a {
    background: #fff;
    display: block;
    width: 49%;
    text-align: center;
    text-decoration: none;
    padding: 0.32rem 0;
    border: 0;
  }
}
</style>
