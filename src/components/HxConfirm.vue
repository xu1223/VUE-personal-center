<template>
  <div>
    <div class="hx-ovel-confirm" @click="close"></div>
    <div class="hx-confirm-con" :style="tips=='duration'?'width:max-content':''">
      <i class="iconfont iconLQYguanbi frame-close flex2" @click="close"></i>
      <b class="hx-confirm-con-title" v-if="title">{{title}}</b>
      <p class="hx-confirm-con-content" v-html="content"></p>
      <div class="hx-confirm-con-btns" v-if="btnNum!=0">
        <button class="hx-confirm-btn-cancel" @click="isLeft">{{leftbtn}}</button>
        <button class="hx-confirm-btn-comment" @click="isRight">{{rightbtn}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data() {
    return {
      left: "",
      title: "",
      content: "",
      btnNum: "",
      leftbtn: "",
      rightbtn: "",
      leftfunc: function() {},
      rightfunc: function() {},
      tips: ""
    };
  },
  methods: {
    add(opts) {
      document.body.appendChild(this.$el);
      this.title = opts.title;
      this.content = opts.content;
      this.btnNum = opts.btnNum;
      this.leftbtn = opts.leftbtn || "CONFIRM";
      this.rightbtn = opts.rightbtn || "CANCEL";
      this.leftfunc = opts.leftfunc;
      this.rightfunc = opts.rightfunc;
      this.tips = opts.tips;
      if (opts.btnNum == 1) {
        document.querySelector(".hx-confirm-btn-cancel").style.display = "none";
      }
      if (opts.tips == "duration") {
        // setTimeout(() => {
        //   document.body.removeChild(this.$el);
        // }, 2000);
      }
    },
    close() {
      document.body.removeChild(this.$el);
    },
    isLeft() {
      this.leftfunc && this.leftfunc.call(this.$el);
     
    },
    isRight() {
      (this.rightfunc && this.rightfunc.call(this.$el)) ||
        document.body.removeChild(this.$el);
    }
  }
};
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
 {
  opacity: 0;
} */

.hx-confirm-con {
  -webkit-animation: spopIn 0.4s ease-in-out;
  animation: spopIn 0.4s ease-in-out;
}

.hx-ovel-confirm {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(46, 46, 46, 0.8);
  z-index: 99;
}

.hx-confirm-con {
  position: fixed;
  top: 50%;
  width: 520px;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 5px;
  z-index: 100;
}

.hx-confirm-con .hx-confirm-con-title {
  font-size: 14px;
  color: #252525;
  padding: 13px 16px;
  border-bottom: 1px solid #e9e9e9;
  display: block;
}

.hx-confirm-con .hx-confirm-con-content {
  font-size: 15px;
  padding: 20px;
  color: #252525;
}

.hx-confirm-con .hx-confirm-con-btns {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.hx-confirm-con .hx-confirm-con-btns button {
  border: 0;
  width: 140px;
  height: 40px;
  border-radius: 5px;
  border: solid 1px #252525;
  line-height: 40px;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  font-size: 12px;
  box-shadow: 3px 3px 1px 0px rgba(0, 0, 0, 0.16);
}

.hx-confirm-con .hx-confirm-con-btns .hx-confirm-btn-cancel {
  background-color: #252525;
  color: #fff;
}

.hx-confirm-con .hx-confirm-con-btns .hx-confirm-btn-comment {
  background-color: #ffffff;
}
.frame-close {
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 12px;
  right: -10px;
  top: -10px;
  font-weight: bold;
}
@-webkit-keyframes spopIn {
  0% {
    -webkit-transform: scale(0.2, 0.2);
    transform: scale(0.2, 0.2);
  }

  95% {
    -webkit-transform: scale(0.95, 0.95);
    transform: scale(0.95, 0.95);
  }

  100% {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

@keyframes spopIn {
  0% {
    -webkit-transform: scale(0.2, 0.2);
    transform: scale(0.2, 0.2);
  }

  95% {
    -webkit-transform: scale(0.95, 0.95);
    transform: scale(0.95, 0.95);
  }

  100% {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

@-webkit-keyframes spopOut {
  0% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }

  90% {
    -webkit-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 0;
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
  }
}

@keyframes spopOut {
  0% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }

  90% {
    -webkit-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 0;
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
  }
}
</style>