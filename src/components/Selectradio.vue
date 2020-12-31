<template>
  <div class="user-radio">
    <div class="use-allorder-confi-msg-types">
      <p class="confi-msg-types-name">{{title||'title'}}</p>
      <ul class="confi-msg-types-vals confi-msg-types-vals-size">
        <li  :class="[parseInt(currIndex) === item.id ? 'types-vals-active':'']" v-for="(item,index) in formdata" :key="index" @click="selectChange(item,index)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
   name: 'Selectradio',
    props:['formdata','value','title'],
    data() {
        return {
            currIndex: this.value
        }
    },
    watch:{
        'value':function(){
            this.currIndex = parseInt(this.value)
        }
    },
    methods:{
        selectChange(item,index){
            this.currIndex = item.id
            this.$emit('update:value',item.id)
        }
    }
};
</script>

<style lang="scss" scoped>
.user-radio {
  .use-allorder-confi-msg-types {
    margin-bottom: 0.38667rem;
  }

  .use-allorder-confi-msg-types .confi-msg-types-name {
    font-size: 0.32rem;
    text-align: center;
    color: #161616;
  }
  .confi-msg-types-name {
    margin-bottom: 0.2rem;
  }

  .use-allorder-confi-msg-types .confi-msg-types-vals {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -10px;
  }

  .use-allorder-confi-msg-types .confi-msg-types-vals .types-vals-active {
    border: solid 1px #161616;
    color: #161616;
  }

  .use-allorder-confi-msg-types .confi-msg-types-vals li {
    /* width: 150px; */
    padding: 0 0.53333rem;
    height: 0.8rem;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #f6f6f6;
    display: block;
    line-height: 0.82667rem;
    margin-right: 5px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 0.26667rem;
    font-size: 0.37333rem;
    color: #6e6e6e;
  }

  .use-allorder-confi-msg-types .confi-msg-types-btn {
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
  }

  .use-allorder-confi-msg-types .confi-msg-types-vals {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -10px;
  }

  .use-allorder-confi-msg-types .confi-msg-types-btn span i.btn-min {
    background-color: #dbdbdb;
  }

  .use-allorder-confi-msg-types .confi-msg-types-btn span i {
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 0.82667rem;
    cursor: pointer;
    margin: 0 10px;
    font-style: inherit;
    font-size: 0.5rem;
  }

  .use-allorder-confi-msg-types .confi-msg-types-btn input {
    width: 2.4rem;
    height: 0.8rem;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dbdbdb;
    text-align: center;
  }

  .use-allorder-confi-msg-types .confi-msg-types-btn span i.btn-add {
    background-color: #161616;
  }
}
</style>