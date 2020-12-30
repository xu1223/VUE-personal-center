<template>
  <div style="position: relative;">
    <h2 class="title">{{name}}</h2>
    <div>
      <div class="order-banner">
        <p class="order-title">My Order</p>
        <div>
          <div v-for="(item,index) in orderTabs||[]" :key="index">
            <router-link :to="{ path: '/order?order_status='+item.key }">
              <div :class="['order',`order${index+1}`]"></div>
              <p>{{item.title}}</p>
              <em>{{item.num}}</em>
            </router-link>
          </div>
        </div>
      </div>
      <div class="itemBanner">
        <div v-for="(item,index) in itemBanner" :key="index" class="item-banner">
          <a v-if="item.path=='/my_cart'" class="flex4" href="/cart">
            <div :class="['item',`item${index+1}`]"></div>
            <p class="order-title">{{item.title}}<em v-if="item.num>-1">({{item.num}})</em></p>
          </a>
          <router-link :to="{ path: item.path }" class="flex4" v-else>
            <div :class="['item',`item${index+1}`]"></div>
            <p class="order-title">{{item.title}}<em v-if="item.num>-1">({{item.num}})</em></p>
          </router-link>
        </div>
        <div class="address-banner">
            <p class="order-title flex1">Address Book<router-link class="itemPath" :to="{ path: '/user/my_address' }">View all  ></router-link></p>
            <div class="flex4" v-if="paramObj.default_address!=''">
              <i class="iconfont icondizhi"></i>
              <div>
                <p><em>Address: </em>{{ paramObj.default_address?paramObj.default_address.address_1:'' }} {{ paramObj.default_address?paramObj.default_address.address_2:''}}</p>
                <p><em>City: </em>{{ paramObj.default_address?paramObj.default_address.city:'' }}</p>
                <p><em>Zip Code: </em>{{ paramObj.default_address?paramObj.default_address.postcode:'' }}</p>
                <p><em>State: </em>{{ paramObj.default_address?paramObj.default_address.zone_name:'' }} </p>
              </div>
            </div>
              <router-link v-else :to="{ path: '/user/my_address' }" class="add-address flex">+ Add Address</router-link>
        </div>
        <div class="address-banner">
            <p class="order-title">Subscription</p>
            <span style="margin:5px 0 10px;display:block;font-size:14px;color:#333">Sign up for newsletter.</span>
            <v-radio-group v-model="is_newsletter" @change="changeNewsletter">
                <v-radio :label="1" >Subscribe</v-radio>
                <v-radio :label="0" >UnSubscribe</v-radio>
            </v-radio-group>
        </div>
      </div>
    </div>
    <iDrawer :visible="idrawer" :border="false" @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn">
      <template slot="content">
        {{is_newsletter==1? this.$hxmessage.CENTER.SUBSCRIBE:this.$hxmessage.CENTER.UNSUBSCRIBE}}
      </template>
    </iDrawer>
  </div>
</template>

<script>
import iDrawer from "@/components/Drawer";
import message from "@/util/message";
import iJson from "@/util/iJson";
export default {
  components:{
    iDrawer
  },
  data () {
    return {
      idrawer:false,
      is_newsletter: '',
      name: this.$route.name,
      number_: 10,
      itemBanner: iJson().itemBanner,
      orderTabs: iJson().orderTabs,
      paramObj: {
        default_address:''
      }
    };
  },
  methods: {
    getInfo () {
      this.$Http.user.personal().then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.paramObj = data.customer;
          this.is_newsletter = data.customer.is_newsletter;
          this.orderTabs[0].num = data.countOrders.unpaid;
          this.orderTabs[1].num = data.countOrders.paid;
          this.orderTabs[2].num = data.countOrders.shipped;
          this.orderTabs[3].num = data.countOrders.completed;
          this.orderTabs[4].num = data.countOrders.canceled;
          this.orderTabs[5].num = data.countOrders.return_order_count;
        }
      })
    },
    changeNewsletter(){
      this.idrawer=true;
    },
    drawerConfirmBtn(){
      this.$Http.user.customerNewsletter().then(res => {
          let { code, data, msg } = res;
          if (code == 200) {
            this.idrawer=false;
          }
        });
    },
    drawerCancelBtn(){
      this.is_newsletter=this.is_newsletter==1?0:1;
      this.idrawer=false;
    }
  },
  created () {
    this.getInfo()
  },
};
</script>
<style scoped lang="less">
.order-banner {
  padding: 20px;
  background: #f4f4f6;
  margin-bottom: 10px;
  position: relative;
  border-radius: 4px;
  > div {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(6, 1fr);
    width: 80%;
    margin: auto;
    > div {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 0.2s;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        box-shadow: 0px 0px 8px 0px #a5a5b2;
      }
    }
    .order {
      width: 28px;
      height: 26px;
      background: url('../assets/img/order.png');
      margin: auto;
      &.order1 {
        background-position: 0px 0px;
      }
      &.order2 {
        background-position: -30px 0px;
      }
      &.order3 {
        background-position: -60px 0px;
      }
      &.order4 {
        background-position: -90px 0px;
      }
      &.order5 {
        background-position: -120px 0px;
      }
      &.order6 {
        background-position: -150px 0px;
      }
    }
    a {
      position: relative;
    }
    em {
      position: absolute;
      top: 0;
      left: 58%;
      border: 1px solid #0c0a26;
      padding: 0 5px;
      font-size: 10px;
      color: #0c0a26;
      background: #fff;
      border-radius: 10px;
    }
    p {
      color: #0c0a26;
      font-size: 12px;
    }
  }
}
.itemBanner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  >.item-banner{
    >a{
      position: relative;
      background: #f4f4f6;
      transition: all 0.2s;
      border-radius: 4px;
      &:hover {
        box-shadow: 0px 0px 8px 0px #a5a5b2;
      }
      > .item {
        width: 120px;
        height: 120px;
        background: url('../assets/img/item.png');
        margin: 0 15px 0 0;
        &.item1 {
          background-position: 0px 0px;
        }
        &.item2 {
          background-position: -120px 0px;
        }
        &.item3 {
          background-position: -240px 0px;
        }
        &.item4 {
          background-position: -370px 0px;
        }
        &.item5 {
          background-position: -495px 0px;
        }
        &.item6 {
          background-position: -620px 0px;
        }
      }
    }
  }
  > .address-banner {
    padding: 20px;
    position: relative;
    background: #f4f4f6;
    transition: all 0.2s;
    border-radius: 4px;
    &:hover {
      box-shadow: 0px 0px 8px 0px #a5a5b2;
    }
    .add-address{
      width: 50%;
      height: 50px;
      border: 1px dashed #a5a5b2;
      margin:10px auto 0;
      color:#a5a5b2;
    }
  }
  .address-banner {
    .flex4 {
      margin-top: 5px;
      .iconfont {
        font-size: 23px;
      }
      div {
        border: 1px solid #dadada;
        border-radius: 4px;
        padding: 5px 15px;
        width: 100%;
        margin-left: 5px;
        font-size: 12px;
        p {
          display: flex;
          align-items: center;
          letter-spacing: 0.03rem;
          em {
            width: 57px;
            text-align: right;
            margin-right: 3px;
          }
        }
      }
    }
  }
}
.order-title {
  color: #0c0a26;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: 0.02rem;
  em {
    margin-left: 5px;
  }
  a {
    font-weight: 400;
    color: #999999;
    font-size:12px;
  }
}
</style>