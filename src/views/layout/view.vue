<template>
  <div>
    <div class="loader" v-if="transitionName" >
      <div class="loading"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: false
    };
  },
  watch: {
    $route () {
      this.transitionName = true;
      setTimeout(() => {
        this.transitionName = false;
      }, 500);
    }
  }
};
</script>