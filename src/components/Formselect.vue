<template>
  <div class="select-form">
    <div class="hx-input-block" :datatid="id">
      <div class="hx-form-select">
        <div class="hx-select-title" @click="selectinput">
          <input
            type="text"
            placeholder="CHOOSE SERVICE"
            :value="valueName"
            readonly
            class="hx-select"
          />
          <input type="hidden" name="manager_id" :value="valueId" class="manager_id" />
          <div class="icon-box">
            <!-- <i class="iconfont iconLQYxiangxia"></i> -->
            <van-icon name="arrow-down" />
          </div>
        </div>
        <ul
          class="hx-select-option hx-anim hx-anim-upbit"
          :style="{display:isShow === true ? 'block' : 'none'}"
        >
          <li
            :data-id="item.id"
            :data-value="item.name"
            v-for="(item,i) in formdata"
            :key="i"
            @click="slectopions($event)"
          >{{item.name}}</li>
          <!-- <li data-manager_id="257">Prima</li>
          <li data-manager_id="256">Alice</li>
          <li data-manager_id="231">Zuza</li>
          <li data-manager_id="269">Bella</li>
          <li data-manager_id="1090">Yuki</li>
          <li data-manager_id="235">Anna</li>
          <li data-manager_id="254">Grace</li>
          <li data-manager_id="261">Witty</li>
          <li data-manager_id="285">Emily</li>
          <li data-manager_id="1091">Rachael</li>
          <li data-manager_id="273">Julie</li>
          <li data-manager_id="260">Krystal</li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: 'Formselect',
  props: ["id", "formdata"],
  data() {
    return {
      isShow: false,
      valueId: "",
      valueName: ""
    };
  },
  watch: {
    id: function() {
      this.id = this.id;
      this.valueId = parseInt(this.id);
      let values = this.formdata.filter(item => {
        if (this.id === item.id) {
          this.valueName = item.name;
        }
      });
    }
  },
  methods: {
    selectinput() {
      this.isShow = !this.isShow;
    },
    slectopions(ev) {
      let valueId = ev.target.getAttribute("data-id");
      let valueName = ev.target.getAttribute("data-value");
      this.valueId = valueId;
      this.valueName = valueName;
      this.isShow = !this.isShow;
      this.$emit("update:id", this.valueId);
    }
  },
  created() {
    this.valueId = parseInt(this.id);
    let values = this.formdata.filter(item => {
      if (this.id === item.id) {
        this.valueName = item.name;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.select-form {
  .hx-input-block {
    min-height: 0.48rem;
    /* padding-bottom: 20px; */
    position: relative;
    .hx-form-select {
      position: relative;
      .hx-select-title {
        display: block;
        width: 100%;
        height: 1.06667rem;
        line-height: 1.06667rem;
        font-size: 0.32rem;
        cursor: pointer;
        .hx-select {
          cursor: pointer;
        }
        .icon-box {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          border-left: 1px solid #ddd;
          padding: 0 0.26667rem 0 0.25333rem;
          right: 0;
          box-sizing: border-box;
          vertical-align: middle;
        }
        .icon-box .iconfont {
          display: inline-block;
          color: #161616;
          font-weight: bold;
          margin-top: -1px;
          font-size: 0.26667rem;
          transition: all 0.3s;
          -webkit-transition: all 0.3s;
        }
      }
      .hx-select-option {
        display: none;
        position: absolute;
        top: 1.13333rem;
        left: 0px;
        width: 100%;
        background-color: #fff;
        border-top: none;
        z-index: 9;
        max-height: 4rem;
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        overflow-y: auto;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        li {
          cursor: pointer;
          font-size: 0.32rem;
          line-height: 1.04rem;
          padding: 0 10px;
          border-bottom: 1px solid #f8f8f8;
          transition: all 0.3s;
        }
        li:first-child {
          border-top: 1px solid #ddd;
        }
      }
    }
  }
}
</style>