<template>
  <div class="hx-form-group hx-must select-input">
    <label class="hx-form-label">{{msg}}</label>
    <div :class="['hx-input-block' ]" @click="inputSelect" :value="value">
      <div class="hx-form-select search-select">
        <div class="hx-select-title search-select-input">
          <input
            class="hx-select hx-select-show none"
            type="text"
            placeholder="Select country"
            readonly
            value="United States"
          />
          <input
            class="hx-select hx-select-sousuo"
            type="text"
            vname="none"
            @input="inputValue"
            v-model="valueInput"
            :placeholder="pr|| ''"
          />
          <input type="hidden" name="country_id" :value="value"  />
          <div class="icon-box">
            <van-icon name="arrow-down" />
          </div>
        </div>

        <input type="hidden" :value="JSON.stringify(listData )" />
        <ul
          class="hx-select-option hx-anim hx-anim-upbit search-select-list"
          id="country_select"
          style="max-height: 6.5rem;"
          :style="{display:isShow === true ? 'block' : 'none'}"
        >
          <li
            :data-country_id="item.id"
            :code="item.code"
            v-for="(item,index) in listData"
            :key="index"
            @click="selectItem(item)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <!-- <em class="hx-form-tips" style="display:inline">Required field</em> -->
    <slot name="tip"/>
  </div>
</template>

<script>
export default {
  name: 'Userselect',
  props: ["formdata", "value", "pr", "msg"],
  data() {
    return {
      isShow: false,
      valueInput: "",
      arrId: [],
      arrName: [],
      chekData: [],
      listData: []
    };
  },
  watch: {
    chekData: function() {
      setTimeout(() => {
        this.listData = this.chekData;
      }, 500);
    },
    formdata: function() {
      setTimeout(() => {
        this.listData = this.formdata;
      }, 500);
    },
    value: function() {
      if (this.value == "") {
        this.valueInput = "";
      }
      setTimeout(() => {
        if (this.formdata) {
          this.formdata.forEach(item => {
            if (item.id === this.value) {
              this.valueInput = item.name;
            }
          });
        }
      }, 500);
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.formdata) {
        this.listData = this.formdata;
        // this.formdata.forEach(item => {
        //   this.arrId.push(item.id);
        // });
        // this.formdata.forEach(item => {
        //   this.arrName.push(item.name);
        // });
      }
    }, 500);
  },
  methods: {
    inputSelect() {
      this.isShow = !this.isShow;
    },
    inputValue() {
      let arr = this.formdata;
      this.chekData = [];
      for (var n = 0; n < arr.length; n++) {
        if (arr[n].name.toLowerCase().indexOf(this.valueInput.toLowerCase()) != -1) {
          this.chekData.push(arr[n]);
        }
      }
    },
    selectItem(item) {
      this.valueInput = item.name;
      this.$emit("update:value", item.id);
      this.$emit("changes", item.id);
    }
  },
  created() {
    setTimeout(() => {
      if (this.formdata) {
        if(Array.from(this.formdata)){
          Array.from( this.formdata).forEach(item => {
          if (item.id === this.value) {
            this.valueInput = item.name;
          }
        });
        }
       
      }
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
.hx-form-group .hx-form-label {
  display: block;
  /* font-family: "SH-ExtraLight"; */
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #252525;
  padding-bottom: 5px;
}
.hx-must .hx-form-label::after {
  display: inline;
  content: "*";
  color: #34d0c8;
  vertical-align: top;
  font-size: 0.32rem;
}
.hx-input-block {
  min-height: 0.48rem;
  /* padding-bottom: 20px; */
  position: relative;
}
.hx-form-select {
  position: relative;
}
.hx-form-select .hx-select-title {
  display: block;
  width: 100%;
  height: 1.06667rem;
  line-height: 1.06667rem;
  font-size: 0.32rem;
  cursor: pointer;
}
.hx-form-select .hx-select-title .hx-select {
  cursor: pointer;
}
.none {
  display: none;
}
.personal-info-modify .hx-form-select .icon-box {
  border: none;
}
.hx-form-select .icon-box {
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
  border: solid 1px #ddd;
  background: #fff;
}
.hx-form-select .icon-box .iconfont {
  display: inline-block;
  color: #161616;
  font-weight: bold;
  margin-top: -1px;
  font-size: 0.26667rem;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.hx-form-select .hx-select-option li:first-child {
  border-top: 1px solid #ddd;
}
.hx-form-select .hx-select-option li {
  cursor: pointer;
  font-size: 0.32rem;
  line-height: 1.04rem;
  padding: 0 10px;
  border-bottom: 1px solid #f8f8f8;
  transition: all 0.3s;
}
</style>