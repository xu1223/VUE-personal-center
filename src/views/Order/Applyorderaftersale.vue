<template>
  <div>
    <HeaderTab />
    <div  class="apply_order_after_sale">
      <!-- {% if order_product.order_status in ['paid', 'partial', 'shipped', 'completed'] %}{# 支付、部分支付、运输中、已完成 #}
    <a href="/order/apply_order_after_sale?id={{ order_product.id }}&action=1">
        <img src="{{ T.res_ }}img/refund1.png">
    </a>
{% endif %}
{% if order_product.order_status in ['shipped', 'completed'] %}{# 运输中、已完成 #}
    <a href="/order/apply_order_after_sale?id={{ order_product.id }}&action=2">
        <img src="{{ T.res_ }}img/refund2.png">
    </a>
    <a href="/order/apply_order_after_sale?id={{ order_product.id }}&action=3">
        <img src="{{ T.res_ }}img/refund3.png">
    </a>
      {% endif %}-->
      <div class="Apply-for">
        <div class="apply" v-for="(item, index) in db_selectlist" :key="index">
          <!-- {# 支付、部分支付、运输中、已完成 #} -->
          <router-link
            v-if="
              order_status === 'paid' ||
                order_status === 'partial' ||
                order_status === 'shipped' ||
                order_status === 'completed'
            "
            :to="{
              path: '/order/apply_order_after_saleinfo',
              query: { id: id, action: item.key }
            }"
            :title="item.value"
          >
            <img src="@/assets/img/a4.png" v-if="item.key == 1" />

            <div class="apply-for1" v-if="item.key == 1">
              <p>REFUND</p>
              <p>(NO RETURN REQUIRED)</p>
            </div>
          </router-link>
          <!-- {# 运输中、已完成 #} -->
          <div
            v-if="order_status === 'shipped' || order_status === 'completed'"
          >
            <router-link
              :to="{
                path: '/order/apply_order_after_saleinfo',
                query: { id: id, action: item.key }
              }"
              :title="item.value"
            >
              <img src="@/assets/img/a5.png" v-if="item.key == 2" />
              <div class="apply-for2" v-if="item.key == 2">
                <p>RETURN</p>
                <span>and</span>
                <p>REFUND</p>
              </div>
            </router-link>
            <router-link
              :to="{
                path: '/order/apply_order_after_saleinfo',
                query: { id: id, action: item.key }
              }"
              :title="item.value"
            >
              <img src="@/assets/img/a6.png" v-if="item.key == 3" />

              <div class="apply-for1" v-if="item.key == 3">
                <p>EXCHANGE</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
export default {
  data() {
    return {
      db_selectlist: [],
      id: "",
      order_status: ""
    };
  },
  methods: {
    onClickLeft() {
      // this.$router.push('/order')
      window.history.back(-1);
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.$Http.order
        .getOrderProductDetail({ order_product_id: this.id })
        .then(res => {
          let {code,data} = res;
          if (code == 200) {
            this.order_status = data.order_status;
          }
        });
      
    }
    this.$Http.order.getReturnAction().then(res => {
      let {code,data} = res;
      if (code == 200) {
        let newArr = [];
        for (var item in data) {
          newArr.push(data[item]);
        }
        this.db_selectlist = newArr;
      }
    });
  },
  components: {
    HeaderTab
  }
};
</script>

<style lang="scss" scoped>
.apply_order_after_sale {
  .Apply-for {
    padding: 0.53333rem;
  }
  .Apply-for .apply {
    width: 8.93333rem;
    height: 3.25333rem;
    border-radius: 5px;
    position: relative;
    margin-bottom: 0.53333rem;
  }
  .Apply-for .apply img {
    width: 100%;
    /* height: 100%; */
  }
  .Apply-for .apply .apply-for1 {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1);
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1);
    -moz-transform: translate3d(-50%, -50%, 0) scale(1);
    -ms-transform: translate3d(-50%, -50%, 0) scale(1);
    -o-transform: translate3d(-50%, -50%, 0) scale(1);
  }
  .Apply-for .apply .apply-for2 {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: end;
    align-items: flex-end;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1);
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1);
    -moz-transform: translate3d(-50%, -50%, 0) scale(1);
    -ms-transform: translate3d(-50%, -50%, 0) scale(1);
    -o-transform: translate3d(-50%, -50%, 0) scale(1);
  }
  .Apply-for .apply .apply-for2 p {
    /* font-family: "SH-Medium"; */
    font-size: 0.45333rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #bfbfbf;
  }
  .Apply-for .apply .apply-for2 span {
    /* font-family: "SH-Light"; */
    font-size: 0.32rem;
    font-weight: normal;
    letter-spacing: 0px;
    color: #bfbfbf;
    line-height: 0.53333rem;
    display: block;
    padding: 0 3px;
  }
  .Apply-for .apply .apply-for1 p:first-child {
    /* font-family: "SH-Medium"; */
    font-size: 0.45333rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #bfbfbf;
  }
  .Apply-for .apply .apply-for1 p:nth-child(2) {
    /* font-family: "SH-ExtraLight"; */
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #bfbfbf;
  }
}
</style>
