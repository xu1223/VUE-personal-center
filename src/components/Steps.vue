<template>
  <div class="steps-main">
    <ul>
      <li :class="[index<=current ?  'ative' : '',index<current?'ative_img':'']" v-for="(item,index) in data" :key="index">
        <img :src="item.img" />
        <p></p>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <!-- <div class="time-axis-line"></div> -->
  </div>
</template>
<script>
export default {
  props: ["data", "current"],
};
</script>
<style lang="less" scoped>

.steps-main {
  position: relative;
  width: 80%;
  margin: auto;
  ul {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .time-axis-line {
    position: absolute;
    z-index: 1;
    width: 92%;
    height: 1px;
    border-top: 1px dashed #bfbfbf;
    left: 3.5%;
    top: 54px;
    display: inline-block;
  }

  p {
    width: 9px;
    height: 9px;
    background-color: #ffffff;
    border: solid 1px #565656;
    border-radius: 100%;
    vertical-align: middle;
    position: relative;
    margin: 20px 0;
  }

  img {
    opacity: 0;
  }

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    // align-items: center;
    align-items: flex-end;
    justify-content: center;
    width: -webkit-fill-available;
  }
  li:before {
    position: absolute;
    content: "";
    border-top: 1px dashed #bfbfbf;
    top: 56%;
    left: 0;
    width: 100%;
  }
  li:first-child {
    width: unset;
  }
  li:first-child::before {
    width: 0;
  }
  span {
    font-size: 12px;
    color: #bfbfbf;
    white-space: nowrap;
  }
  .ative {
    p {
      background-color: #34d0c8;
      border: 0;
    }

    img {
      opacity: 1;
    }
    span {
      color: #252525;
    }
    &:before {
      position: absolute;
      content: "";
      border-top: 1px dashed #34d0c8;
      top: 56%;
      left: 0;
      width: 100%;
    }
  }
}
.ative.ative_img img{
    opacity: 0;
}
</style>