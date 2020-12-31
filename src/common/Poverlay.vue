<template>
  <div v-if="show1" @click="hide" :class="className">
    <div class="p-model-confirm" >
         <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "poverlay",
  props: ["show",'className'],
  data(){
      return{
          show1: this.show || false
      }
  },
  watch: {
    show: function () {
      this.show1 = this.show;
    },
  },
  methods:{
      hide(){
          this.$emit('update:show', false);
          this.$emit('change',false)
      }
  }
};
</script>

<style lang="scss" scoped>
</style>