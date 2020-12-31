<template>
  <div class="order-container">
    <h2 class="title">{{name}}</h2>
    <v-tabs :active-tab-key="active_tab_key" @change="onChangeTabs">
        <v-tab-pane :tab-key="item.key" :tab="item.title+'('+item.num+')'" v-for="(item,index) in orderTitle" :key="index">
        </v-tab-pane>
    </v-tabs>
    <div class="order-banner"  v-if="total>0">
        <div>
            <a>Products</a>
            <a>Total</a>
            <a>Status</a>
            <a>Action</a>
        </div>
        <div v-if="active_tab_key!='after_sale'" >
            <div v-for="(item,index) in orderData" :key="index" class="order-table">
                <p>Order NO:{{item.invoice_no}}<em>{{item.created_at}}</em></p>
                <div>
                    <div>
                        <em>{{item.total_number}} items</em>
                        <img @click="linkUrl({ 'url': item.product_url })" v-for="(cont,cond) in item.order_products.slice(0, 3)" :key="cond" :src="cont.img_m" />
                        <router-link v-if="item.order_products.length>3" class="flex" :to="{path:'/order/order_detail',query:{invoice_no: item.invoice_no}}">. . .</router-link>
                    </div>
                    <div>US${{item.total_price}}</div>
                    <div class="flex">
                        <div>
                            <a>{{item.order_status}}</a>
                            <router-link :to="{path:'/order/order_detail',query:{invoice_no: item.invoice_no}}">Order Details</router-link>
                        </div>
                    </div>
                    <div>
                        <div class v-if="item.order_status == 'unpaid'">
                            <router-link :to="{path:'/payment_step_two',query:{invoice_no:item.invoice_no}}">Pay Now</router-link>
                            <a @click="btn(1,item)">Edit Address</a>
                            <a @click="btn(2,item)">Cancel</a>
                        </div>
                        <div class v-if="item.order_status == 'paid'">
                            <a @click="btn(3,item)">Buy Again</a>
                        </div>
                        <div class v-if="item.order_status == 'shipped'">
                            <a :href="`https://t.17track.net/zh-cn#nums=${item.shipment_code}`" target="_blank" >View Logistics</a>
                            <a @click="btn(4,item)">CONFIRM RECEIPT</a>
                            <a @click="btn(3,item)">Buy Again</a>
                        </div>
                        <div class v-if="item.order_status == 'completed'">
                            <router-link v-if="item.no_comment_num!=0" :to="{path:'/order/order_review',query:{invoice_no: item.invoice_no}}">Evaluation</router-link>
                        </div>
                        <div class v-if="item.order_status == 'canceled'">
                            <a @click="btn(5,item)">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="(item,index) in orderData" :key="index" class="order-table">
                <p>Order NO:{{item.return_no}}<em>{{item.apply_at}}</em></p>
                <div>
                    <div>
                        <em>{{item.order_quantity}} items</em>
                        <img  v-if="item.order_return_products.length>0" @click="linkUrl({ 'url': item.product_url })" v-for="(cont,cond) in item.order_return_products.slice(0, 3)" :key="cond" :src="cont.image" />
                        <router-link v-if="item.order_return_products.length>3" class="flex" :to="{path:'/order/order_detail',query:{invoice_no: item.invoice_no}}">. . .</router-link>
                    </div>
                    <div>US${{item.refund_amount}}</div>
                    <div class="flex">
                        <div>
                            <a>After-sales order</a>
                        </div>
                    </div>
                    <div>
                        <router-link :to="{path:'/order/after_sale_details',query:{return_no: item.return_no}}">Order Details</router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div v-if="total==0">
        <div class="noneData">
            <img src="@/assets/img/orderNone.png">
            <p>It is empty here.</p>
        </div>
    </div>
    <v-pagination v-if="total>0&&last_page>1" class="page" :total="total" @change="loadPage" :pageSize="10"></v-pagination>
    <iDrawer :visible="idrawer" :title="iTitle" :border="idrawerType!=1?false:true"
      @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn('drawerData')" >
      <template slot="content">
        <v-form direction="horizontal" :model="drawerData" ref="drawerData" :rules="rulesAddress" v-if="idrawerType==1">
            <v-form-item :label="item.title" :label-col="labelCol" :wrapper-col="wrapperCol" :prop="item.key" has-feedback v-for="(item,index) in iJsonData.orderAddress" :key="index">
                <v-select :filter="filter" v-model="drawerData[item.key]"  search :data="item.options" label="name" clue="id" v-if="item.type=='select'" @change="drawerSelectChange(item.key,$event)"></v-select>
                <v-input v-model="drawerData[item.key]" placeholder v-else></v-input>
            </v-form-item>
            <v-checkbox style="margin-left:16.6%" v-model="drawerData.create_new_address" :true-value="1" :false-value="0">Save new address to address book</v-checkbox>
        </v-form>
        <div v-else-if="idrawerType==2">{{this.$hxmessage.CENTER.ORDER_CANCEL}}</div>
        <div v-else-if="idrawerType==3">{{this.$hxmessage.CENTER.ORDER_AGAIN}}</div>
        <div v-else-if="idrawerType==4">{{this.$hxmessage.CENTER.ORDER_RECEIPT}}</div>
        <div v-else-if="idrawerType==5">{{this.$hxmessage.CENTER.ORDER_DELETE}}</div>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import iDrawer from "@/components/Drawer";
import iJson from "@/util/iJson";
import FormRules from "@/util/form_mixins";
import toolsMix from "@/util/tools_mixins";
import {dealNumberFormat} from "@/util/tools";
export default {
  components: {
    iDrawer,
  },
  data () {
    const rulesAddress=this.getRulesOrderAddress()
    return {
      last_page:0,
      active_tab_key:'all',
      item:{},
      idrawerType:-1,
      idrawer:false,
      iTitle:'',
      total:-1,
      name: this.$route.name,
      param:{},
      orderTitle:iJson().orderTitle,
      orderData:[],
      drawerData:{},
      rulesAddress,
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
  },
  mixins: [FormRules,toolsMix],
  watch: {},
  methods: {
      btn(type,item){
        switch (type) {
            case 1:
                //编辑地址
                this.iTitle='Edit Address';
                this.drawerData = JSON.parse(JSON.stringify(item));
                this.getCountryZone(this.drawerData.shipment_country_id);
                this.idrawerType=1
                this.idrawer=true;
            break;
            case 2:
                //cancel
                this.idrawerType=2;
                this.item=item;
                this.iTitle='';
                this.idrawer=true;
            break;
            case 3:
                //再次购买
                this.idrawerType=3;
                this.item=item;
                this.iTitle='';
                this.idrawer=true;
            break;
            case 4:
                //完成订单
                this.idrawerType=4;
                this.item=item;
                this.iTitle='';
                this.idrawer=true;
            break;
            case 5:
                //删除
                this.idrawerType=5;
                this.item=item;
                this.iTitle='';
                this.idrawer=true;
            break;
        }
      },
      onChangeTabs(tabKey){
          this.active_tab_key=tabKey;
          if(tabKey=='after_sale'){
            this.getOrderReturns();
          }else{
            this.getOrder(this.active_tab_key);
          }
      },
      drawerConfirmBtn(forms){
        switch (this.idrawerType) {
            case 1:
                this.$refs[forms].validate(valid => {
                    if (valid) {
                        let form={
                            invoice_no:this.drawerData.invoice_no,
                            shipment_firstname:this.drawerData.shipment_firstname,
                            shipment_lastname:this.drawerData.shipment_lastname,
                            shipment_mobile:this.drawerData.shipment_mobile,
                            shipment_address_1:this.drawerData.shipment_address_1,
                            shipment_city:this.drawerData.shipment_city,
                            shipment_postcode:this.drawerData.shipment_postcode,
                            shipment_country_id:this.drawerData.shipment_country_id,
                            shipment_zone_id:this.drawerData.shipment_zone_id,
                            create_new_address:this.drawerData.create_new_address
                        }
                        this.$Http.order.modifyShippingAddress(form).then(res => {
                            let { code } = res;
                            if (code == 200) {
                                this.$notification.open({
                                message: "Tips",
                                description:this.$hxmessage.CENTER.SUCCESS_OPERAT,
                                duration: 2
                                });
                                // this.idrawer=false;
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            break;
            case 2:
                this.$Http.order.orderCanceled({ invoice_no:this.item.invoice_no }).then(res => {
                    let { code, msg, data } = res;
                    if (code == 200) {
                        this.idrawer=false;
                        if (this.active_tab_key == 'all') {
                            this.getOrder();
                        } else {
                            this.getOrder("unpaid");
                        }
                    }
                });
            break;
            case 3:
                this.$Http.order.buyAgain({ invoice_no:this.item.invoice_no }).then(res => {
                    let { code, msg, data } = res;
                    if (code == 200) {
                        this.idrawer=false;
                        this.$router.push("/my_cart");
                    }
                });
            break;
            case 4:
                this.$Http.order.orderCompleted({ invoice_no:this.item.invoice_no }).then(res => {
                    let { code, msg, data } = res;
                    if (code == 200) {
                        this.idrawer=false;
                        if (this.active_tab_key =='all') {
                            this.getOrder();
                        } else {
                            this.getOrder("shipped");
                        }
                    }
                });
            break;
            case 5:
                this.$Http.order.ordeDelByNo({ invoice_no:this.item.invoice_no }).then(res => {
                    let { code, msg, data } = res;
                    if (code == 200) {
                        this.idrawer=false;
                        if (this.active_tab_key == 'all') {
                            this.getOrder();
                        } else {
                            this.getOrder("canceled");
                        }
                    }
                });
            break;
        }
      },
      drawerCancelBtn(forms){
          this.idrawer=false;
          this.$refs[forms].resetFields();
      },
      loadPage(page){
        if(this.active_tab_key=='after_sale'){
         this.getOrderReturns(page)
        }else{
         this.getOrder(this.active_tab_key,page);
        }
      },
      drawerSelectChange(key,val){
        if(key=='shipment_country_id'){
            this.getCountryZone(val)
        }
      },
      getOrder(type,p){
        this.$Http.order.getOrders({p:p || 1,order_status: type ||"",limit:10}).then(res => {
          let { data, code } = res;
          if (code == 200) {
            this.orderTitle[0].num =data.order_status_count.total;
            this.orderTitle[1].num =data.order_status_count.unpaid;
            this.orderTitle[2].num =data.order_status_count.paid;
            this.orderTitle[3].num = data.order_status_count.shipped;
            this.orderTitle[4].num =data.order_status_count.completed;
            this.orderTitle[5].num =data.order_status_count.canceled;
            // this.orderTitle[6].num =data.return_order_count;
            this.total=data.total;
            this.last_page=data.last_page;
            if(data.total>0){
                this.orderData = data.data;
            }
          }
        });
      },
      getOrderReturns(p) {
        this.$Http.order.getOrderReturns({p: p||1}).then(res => {
            let { data, code } = res;
            if (code == 200) {
                this.total=data.total;
                if(data.total>0){
                    this.orderData = data.data;
                }
            }
        });
      }
  },
  created () {
      if(this.$route.query.order_status){
          this.active_tab_key=this.$route.query.order_status;
      }
      if(this.active_tab_key=='after_sale'){
        this.getOrderReturns()
      }else{
        this.getOrder(this.active_tab_key);
      }
      this.getCountries();
  }
}
</script>
<style scoped lang="less">
.order-container{
    display: grid;
    /deep/ .ant-tabs{
        .ant-tabs-nav{
            width: 100%;
            .ant-tabs-ink-bar {
                display: none;
            }
            .ant-tabs-tab {
                color:#999;
                background: #F4F4F6;
                margin: 0;
                min-width: 16.6%;
                text-align: center;
            }
            .ant-tabs-tab-active{
                color:#fff;
                background: #0C0A26;
                border-radius: 4px;
            }
        }
        .ant-tabs-content{
            display: unset;
        }
    }
}
.order-banner{
    >div:first-child{
        display: flex;
        align-items: center;
        border: 1px solid #DADADA;
        a{
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#333;
            font-size:14px;
            border-left:1px solid #DADADA;
            font-weight: 400;
        }
        a:first-child{
            width: 43%;
        }
        a:nth-child(2){
            width: 14%;
        }
        a:nth-child(3){
            width: 18%;
        }
        a:nth-child(4){
            width: 25%;
        }
    }
    .order-table{
        p{
            height: 30px;
            background: #F4F4F6;
            border: 1px solid #E6E6E6;
            line-height: 30px;
            padding:0 10px;
            color:#333;
            em{
                margin-left: 30px;
            }
        }
        >div{
            display: flex;
            align-items: center;
            height: 150px;
            border: 1px solid #E6E6E6;
            >div{
                border-right: 1px solid #E6E6E6;
                height:100%;
                padding:5px;
                text-align: center;
                color: #333;
            }
            >div:first-child{
                display: flex;
                align-items: center;
                width: 43%;
                img{
                    width: 90px;
                    margin-right: 9px;
                }
                em{
                    margin-right: 20px;    
                    display: flex;
                    height: 100%;
                }
            }
            >div:nth-child(2){
                width: 14%;
                line-height: 150px;
                font-size: 14px;
            }
            >div:nth-child(3){
                width: 18%;
                a{
                    border-bottom:1px solid;
                    display: block;
                    width: fit-content;
                    margin:10px auto;
                }
                a:first-child{
                   text-transform: capitalize;
                   border-bottom:none;
                   font-weight: 550;
                   font-size:14px;
                }
            }
            >div:nth-child(4){
                width: 25%;
                border-right:none;
                display: flex;
                align-items: center;
                justify-content: center;
                a{
                    width: 110px;
                    height: 30px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #DADADA;
                    margin:10px 0;
                }
                a:first-child{
                    background: #0C0A26;
                    color:#fff;
                    border: 1px solid #0C0A26;
                }
            }
        }
    }
}
</style>