<template>
  <div class='spop--in' role='alert'>
    <!-- iconLQYgouxuan spop-icon-succes || iconLQYguanbi spop-icon-error -->
    <i :class="['spop-icon iconfont',icon]" v-if="icon!='load'"></i>
    <div class="loader loader--style1" title="0" v-if="icon=='load'">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
      <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(82.211 20 20)">
      <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
      </path>
      </svg>
      </div>
    <div class='spop-body'>
      <!-- <h4 class='spop-title'>Success</h4>Iˈm a success SmallPop -->
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HxLoadin',
  data() {
    return {
      title: 'Is Add To Car',
      icon: ' iconLQYguanbi spop-icon-error',
      callback: function() {}
    }
  },
  methods: {
    add(options) {
      document.body.appendChild(this.$el)
      this.icon = options.icon
      this.title = options.title
      this.callback = options.callback && options.callback(this.$el)
    }
  }
}
</script>

<style >
.spop--in,
.spop--error,
.spop--info,
.spop--success,
.spop--warning {
  color: #fff;
  background-color: #454a56;
}
.spop-container,
.spop-container *,
.spop-container :after,
.spop-container :before {
  box-sizing: border-box;
}
.spop--in {
  -webkit-animation: spopIn 0.4s ease-in-out;
  animation: spopIn 0.4s ease-in-out;
  color: #fff;
  border-radius: 2px;
  width: 6rem;
  margin: 0.7em;
  position: fixed;
  padding-top: 0.2rem;
  top: 50%;
  left: 50%;
  z-index: 11111;
  margin-left: -3rem;
  margin-top: -3rem;
}
.spop-close {
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  width: 32px;
  padding-top: 7px;
  padding-right: 7px;
  font-size: 22px;
  font-weight: 700;
  text-align: right;
  line-height: 0.6;
  color: #fff;
  opacity: 0.5;
}
.spop--in .loader{
  text-align: center;
}
.spop--in svg path, .spop--in svg rect {
    fill: #fff;
}
.spop-icon {
  text-align: center;
  font-size: 0.34rem;
  height: 1rem;
  width: 1rem;
  display: block;
  line-height: 1rem;
  border-radius: 50%;
  font-weight: 700;
  margin: 0 auto;
}
.spop-icon-succes {
  border: solid 2px #2ecc54;
  color: #2ecc54;
}
.spop-icon-error {
  border: solid 2px #ff5656;
  color: #ff5656;
}
.spop-body {
  padding: 1.4em;
  padding-top: 0.2rem;
  text-align: center;
  font-size: 0.32rem;
}
.spop-title {
  margin-top: 0;
  color: #fff;
}
@-webkit-keyframes spopIn {
  0% {
    -webkit-transform: scale(0.2, 0.2);
    transform: scale(0.2, 0.2);
  }
  95% {
    -webkit-transform: scale(1.1, 1.1);
    transform: scale(1.1, 1.1);
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
    -webkit-transform: scale(1.1, 1.1);
    transform: scale(1.1, 1.1);
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
  20% {
    -webkit-transform: scale(1.1, 1.1);
    transform: scale(1.1, 1.1);
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
  20% {
    -webkit-transform: scale(1.1, 1.1);
    transform: scale(1.1, 1.1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
  }
}
</style>
