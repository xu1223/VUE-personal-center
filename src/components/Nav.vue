<template>
<div class="nav-main">
  <nav class="nav">
    <div v-for="(item, index) in nav" :key="index">
      <a href="/cart" v-if="item.name=='Shopping Bag'">Shopping Bag</a>
      <router-link v-else
        v-show="item.meta.nav"
        :to="{ path: item.path }"
        :class="item.meta.num == indexT ? 'active' : ''"
        >{{ item.name }}</router-link
    >
    </div>
    <hr />
    <a @click="logOut" class="logOut">SIGN OUT</a>
  </nav>
</div>
</template>

<script>
import staticRoute from "@/router/staticRouter";
export default {
  data() {
    return {
      indexT: this.$route.meta.num,
      nav: staticRoute
    };
  },
  watch: {
    $route(val) {
      this.indexT=val.meta.num;
    },
  },
  methods: {
    logOut() {
      setTimeout(() => {
        this.$storage.remove('wishlist_ids');
        this.$storage.remove('userInfo');
        this.$storage.remove('access_expired');
        this.$storage.remove('access_token');
        this.$storage.remove('count');
        sessionStorage.clear();
        this.$router.push("/login");
      }, 300);
      if(FB){
        FB.logout(function(response) {
              console.log("用户已退出");
        })
      }
      if(gapi.auth2){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }
    }
  }
};
</script>