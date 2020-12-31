<template>
  <div :class="['userheader', !['/payment_step_two','/user/my_message_send'].includes($route.path)  ? 'p-home-yes':'p-home-no']">
    <van-nav-bar title @click-left="onClickLeft" fixed z-index="2000" >
      <!-- <van-icon name="arrow-left" slot="left" style="color:#000" /> -->
      <i
        class="iconfont iconLQYfanhui p-lt"
        slot="left"
        style="font-size: 0.53333rem; color: #161616"
        :style="{display:isLeft && 'none'}"
      ></i>
      <a
        href="javascript:void(0)"
        style="
          width: 5.5rem;
          display: flex;
          margin-top: 0.12rem;
          justify-content: center;
          align-items: center;
        "
        slot="title"
        @click="LINKURL"
      >
        <img
          v-lazy="config.logo_m ? config.logo_m : ''"
          :alt="config.site ? config.site.name : ''"
          style="max-width: 100%; max-height: 35px"
        />
      </a>
      <template #right>
        <i class="iconfont pers-fenlei1" @click="modelFn"></i>
      </template>
    </van-nav-bar>

    <van-popup
      v-model="show"
      position="right"
      style="height: 100%"
      class="pers-van-popup "
      overlay-class="overlay-class-per"
    >
      <div class="content">
        <p class="personal-emali">HI {{ email || "" }}</p>
        <div class="pers-van-menu">
          <ul>
            <li
              :class="[currIndex == index && 'pers-v-m-active']"
              v-for="(item, index) in setMenu"
              :key="index + ''"
              @click="setMenuFn(item, index)"
            >
              <router-link
                :to="{
                  path: $store.state.common.urlPath + item.path,
                  query: item.query && {
                    id: item.query.id,
                    name: item.query.name,
                  },
                }"
              >
                <span>{{ item.name }}</span>
                <i></i>
              </router-link>
            </li>
          </ul>
        </div>
        <button class="btn-out" @click="getout">SIGN OUT</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { sendParamInUrl } from "@/util/tools";
import { mapState } from "vuex";

export default {
  name: "HeaderTab",
  props: ["title", "isFalse",'isLeft'],
  data() {
    return {
      show: false,
      email: this.$Storage.getUserInfo() ? this.$Storage.getUserInfo().email: '' || "",
      configObj: {},
      currIndex: localStorage.getItem('nav_currIndex') ? localStorage.getItem('nav_currIndex'): 0,
      setMenu: [
        {
          id: "1",
          name: "My Account",
          path: `${this.$store.state.common.urlPath}/`,
          icon: "",
        },
        {
          id: "2",
          name: "My Order",
          path: `${this.$store.state.common.urlPath}/order`,
          icon: "",
          query: { id: 0, name: "unpaid" },
        },
        {
          id: "3",
          name: "Shopping Bag",
          path: `${this.$store.state.common.urlPath}/my_cart`,
          icon: "",
        },
        {
          id: "4",
          name: "My Wishlist",
          path: `${this.$store.state.common.urlPath}/user/my_wish`,
          icon: "",
        },
        {
          id: "5",
          name: "Recently Viewed",
          path: `${this.$store.state.common.urlPath}/user/my_recently_viewed`,
          icon: "",
        },
        {
          id: "6",
          name: "My Review",
          path: `${this.$store.state.common.urlPath}/user/my_review`,
          icon: "",
        },
        {
          id: "7",
          name: "My Message",
          path: `${this.$store.state.common.urlPath}/user/my_message`,
          icon: "",
        },
        {
          id: "8",
          name: "My Coupon Code",
          path: `${this.$store.state.common.urlPath}/user/my_coupon`,
          icon: "",
        },
        {
          id: "9",
          name: "Address Book",
          path: `${this.$store.state.common.urlPath}/user/my_address`,
          icon: "",
        },
        {
          id: "10",
          name: "Setting",
          path: `${this.$store.state.common.urlPath}/user/my_setting`,
          icon: "",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      config(state) {
        return state.common.config ? state.common.config : {};
      },
    }),
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
      this.$emit("change", 1);
    },
    LINKURL() {
      sendParamInUrl({ page: "index" });
    },
    modelFn() {
      this.show = !this.show;
    },
    setMenuFn(item, index) {
      this.currIndex = index;
      localStorage.setItem('nav_currIndex',index)
    },
    getout() {
      setTimeout(() => {
        this.$router.push("/login");
        sessionStorage.clear();
        localStorage.clear();
        this.$Storage.remove("personal");
        this.$Storage.remove("userInfo");
        this.$Storage.remove("wishlist_ids");
      }, 300);
      if(FB){
        FB.logout(function(response) {
              console.log("用户已退出");
        })
      }
      if(gapi && gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.userheader {
  height: pxto2($height88);
  .van-nav-bar .van-icon {
    font-size: 0.53333rem !important;
    font-weight: 400 !important;
    color: #161616 !important;
  }
  .van-nav-bar__left {
    left:pxto2($px20)  !important;
  }
  .van-nav-bar__right {
    right:pxto2($px20)  !important;
  }
}
.pers-fenlei1{
  font-size: pxto2($px40);
}
.pers-van-popup {
  width: pxto2($width450);
  font-size: pxto2($px24);
  font-weight: 550;
  .content {
    padding: 0 pxto2($px20) !important;
    height: 100%;
    height: 100%;
    .personal-emali {
      font-size: pxto2($px20);
      font-weight: 500;
      padding-top: pxto2($px20);
    }
    .pers-van-menu {
      margin-top: pxto2($px37);
      padding-bottom: pxto2($px80);
      border-bottom: $h-border;
      ul {
        li {
          width: 100%;
          height: pxto2($px70);
          line-height: pxto2($px70);
          color: $info;
          position: relative;
          font-size: pxto2($px24);
          @include pointer();

          a {
            display: block;
            width: 100%;
            height: 100%;
            color: $info;
          }
          i {
            position: absolute;
            top: pxto2($px25);
            right: 10px;
            width: pxto2($px10);
            height: pxto2($px10);
            display: block;
            background: $block;
            border-radius: 50%;
            display: none;
          }
          &.pers-v-m-active {
            background: $info-4;
            color: $block-2;
            a {
              color: $block-2;
            }
            i {
              display: block;
            }
            span {
              font-weight: 550;
            }
          }
          span {
            margin-left: pxto2($px20);
            font-weight: 400;
          }
        }
      }
    }
    .btn-out {
      width: pxto2($width200);
      margin: pxto2($px40) auto;
      height: pxto2($height60);
      line-height: pxto2($height60);
      background: transparent;
      border: $input-border;
      border-radius: pxto2($radius4);
      justify-content: center;
      display: flex;
    }
  }
}
</style>