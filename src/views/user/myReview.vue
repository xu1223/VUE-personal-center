<template>
  <div class="review-container">
    <h2 class="title">{{name}}</h2>
    <div class="data">
      <v-date-picker v-model="rangeDate" range clearable @confirm="getReviewsPager" @change="rangeChange"></v-date-picker>
      <div class="search">
          <v-input placeholder="Search SKU" style="width:200px" v-model="sku"></v-input>
          <i @click="getReviewsPager(1,sku)" class="iconfont iconsousuo"></i>
      </div>
    </div>
    <div v-if="total>0" class="review-banner">
        <div class="item" v-for="(item,index) in data" :key="index">
            <div class="item-info">
                <img :src="item.order_product.img_m">
                <div>
                    <a>{{item.order_product.name}}</a>
                    <span>SKU:{{item.order_product.sku}} <em>QTY:{{item.order_product.quantity}}</em></span>
                    <span>COLOR:{{item.order_product.color}}</span>
                    <span>SIZE:{{item.order_product.size}}</span>
                </div>
                <div>
                    <span>{{item.created_at}}</span>
                    <span>{{item.order.invoice_no}}</span>
                </div>
            </div>
            <div class="item-cotent">
                <p>Content:</p>
                <div>
                    <v-rate disabled :value="item.rating" />
                    <div>{{item.description}}</div>
                </div>
                <div v-if="item.images!=''">
                    <img v-for="(cont,v) in item.images" :key="v" :src="cont.img_m">
                </div>
            </div>
            <div class="item-reply" v-if="item.reply">
                <p>Reply:</p>
                <div>{{item.reply}}</div>
            </div>
        </div>
    </div>
    <v-pagination v-if="total>0&&last_page>1" class="page" :total="total" @change="loadPage" :pageSize="10"></v-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      last_page:0,
      name: this.$route.name,
      rangeDate:['',''],
      total:-1,
      data:[],
      sku:'',
      start_date:'',
      end_date:'',
    }
  },
  watch: {},
  methods: {
    rangeChange(start_date, end_date) {
      this.start_date = start_date;
      this.end_date = end_date;
    },
    getReviewsPager(p,sku) {
      this.$Http.commont.getReviewsPager({p: p || 1,limit:10,start_date:this.start_date||'',end_date:this.end_date||'',sku:sku||''}).then(options => {
          let { code, msg, data } = options;
          if (code == 200) {
            this.data = data.data;
            this.total=data.total;
            this.last_page=data.last_page;
          }
        });
    },
    loadPage(val){
        this.getReviewsPager(val)
    }
  },
  created () {
      this.getReviewsPager()
  }
}
</script>
<style scoped lang="less">
.review-container{
    .data{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 10px;
        /deep/ .ant-input{
            height: 30px;
        }
        .search{
            margin-left: 10px;
            position: relative;
            .iconfont{
                position: absolute;
                top: 0;
                bottom: 0;
                right: 10px;
                display: flex;
                align-items: center;
            }
        }
    }
    .review-banner{
        .item{
            background: #FFFFFF;
            border: 1px solid #E6E6E6;
            padding:10px;
            width: 100%;
            margin-bottom: 10px;
            .item-info{
                display: flex;
                justify-content: space-between;
                border-bottom:1px solid #E6E6E6 ;
                padding-bottom:10px;
                img{
                    width: 8%;
                }
                >div:nth-child(2){
                    width: 82%;
                    padding: 0 10px;
                    a{
                        color:#333;
                        font-size: 14px;
                        font-weight: 550;
                    }
                }
                >div:nth-child(3){
                    width: 20%;
                    text-align: right;
                }
                span{
                    display: block;
                    font-size:12px;
                    color:#999;
                    line-height:1.7;
                    letter-spacing: 0.04rem;
                    em{
                        margin-left: 50px;
                    }
                }
            }
            .item-cotent{
                display: flex;
                padding:10px 0;
                >p{
                    width: 8%;
                    text-align: right;
                }
                 >div:nth-child(2){
                    width: 60%;
                    padding: 0 10px;
                    div{
                        color:#999;
                    }
                 }
                >div:nth-child(3){
                    width: 32%;
                    img{
                        width: 60px;
                        margin-right: 10px;
                    }
                }
            }
            .item-reply{
                padding:10px 0;
                background: #F4F4F6;
                display: flex;
                >p{
                    width: 8%;
                    text-align: right;
                }
                 >div:nth-child(2){
                    width: 92%;
                    padding: 0 10px;
                 }
            }
        }
    }
}
</style>