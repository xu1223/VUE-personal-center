<template>
  <div class="hx-form-select">
    <div class="hx-select-title" @click="selectinput">
      <input type="text" name :value="valueName" :data-value="valueName" readonly class="hx-select" />
      <input type="hidden" name="manager_id" :value="valueId" class="manager_id" :data-id="valueId"/>
      <div class="icon-box">
        <van-icon name="arrow-down" />
      </div>
    </div>
    <ul
      :class="['hx-select-option hx-anim hx-anim-upbit', 'd-type-'+s]"
      :style="{display:isShow === true ? 'block' : 'none'}"
    >
      <li
        :data-value="item.id"
        @click="slectopions($event,item)"
        v-for="(item,index) in formdata || []"
        :key="index"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WisHSelect',
  props: ["formdata",'s'],
  data() {
    return {
      isShow: false,
      valueId: "",
      valueName: ""
    };
  },
  methods: {
    selectinput() {
      this.isShow = !this.isShow;
    },
    slectopions(ev, item) {
      this.valueName = item.name;
      this.valueId = item.id;
      this.isShow = !this.isShow;
      this.$emit("update:id", this.valueId);
      this.$emit("changes", this.valueId);
    }
  },
  created() {
    this.valueId = this.id;
    this.valueName = this.formdata? this.formdata[0].name: "";
  }
};
</script>

<style lang="scss" scoped>
</style>