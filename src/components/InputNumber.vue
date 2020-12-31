<template>
  <div class="Muninput">
    <i class="iconfont iconjian1" @click="reduce"></i>
    <v-input placeholder="" size="large" v-model="munvalue" @keyup="keyup"></v-input>
    <i class="iconfont iconjia" @click="add"></i>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  export default {
    props: ["max", "value", "data", 'currIndex', 'list'],
    data() {
      return {
        munvalue: 1,
        number: true,
        max_num: Number(this.max) || 999
      };
    },
    mounted() {
      this.munvalue = this.value;
    },
    methods: {
      keyup(val){
        this.munvalue=val.replace(/[^\d]/g,'');
        this.munvalue=this.munvalue>this.max?this.max:this.munvalue==0?1:this.munvalue;
        this.numberVux();
      },
      add() {
        this.munvalue = this.munvalue == this.max ? this.max : this.munvalue == 0 ? 1 : this.munvalue + 1;
        this.numberVux();
      },
      reduce() {
        this.munvalue = this.munvalue > 1 ? this.munvalue - 1 : 1;
        this.numberVux();
      },
      numberVux(){
        const bag_vux = {
          mun: this.munvalue,
          data: this.data,
          list:this.list,
          checkout:this.data.checkout,
          checkout_:3,
        };
        let _parms = {
          currIndex:this.currIndex,
          value:this.munvalue,
        }
        this.$store.dispatch("bag/bag_data", {bag_vux});
        this.$emit("change", _parms);
      }
    },
    watch: {
      value(val) {
        this.munvalue = this.value;
        this.$Http.cart.cartEdit({
          cart_id: this.data.id,
          product_option_value_id: this.data.product_option_value_id,
          quantity: val,
        }).then(res => {
          let {
            code,
            data,
            msg
          } = res;
        });
      },
    },
    computed: {
      ...mapState({
        bag_prive(state) {
          return state.bag.bag_prive;
        },
        bag_show_prive(state) {
          return state.bag.bag_show_prive;
        },
        bag_weight(state) {
          return state.bag.bag_weight;
        },
        bag_mun(state) {
          return state.bag.bag_mun;
        },
        bag_total_num(state) {
          return state.bag.bag_total_num;
        },
        wish_total_num(state) {
          return state.bag.wish_total_num;
        }
      })
    }
  };
</script>
<style lang="less">
  .Muninput {
    display: flex;
    background: #E6E6E6;

    /deep/ .ant-input-number-handler-wrap {
      display: none;
    }

    input {
      text-align: center;
      height: 32px;
    }

    i {
      min-width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 23px;
    }
  }
</style>