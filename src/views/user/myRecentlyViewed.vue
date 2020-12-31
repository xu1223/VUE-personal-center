<template>
  <div class="recently-container">
    <h2 class="title">{{name}}</h2>
    <div class="data">
      <b>Sort By</b>
      <v-date-picker v-model="rangeDate" range clearable @confirm="getRecentlyViewed" @change="rangeChange"></v-date-picker>
    </div>
      <div v-if="total>0" class="recently-banner">
        <div v-for="(item,index) in data" :key="index">
            <a class="full-image">
                <img :src="item.img_l" @click="linkUrl({ 'url': item.product_url })">
            </a>
            <a class="title-ellipsis" @click="linkUrl({ 'url': item.product_url })">{{item.name}}</a>
            <span class="sku">SKU:{{item.sku}}</span>
            <div class="flex1">
                <div class="price">
                    <span>{{ data.currency_symbol }}{{ item.currency_price }}</span>
                    <span v-if="item.show_price > item.price">{{ data.currency_symbol }}{{ item.currency_show_price }}</span>
                </div>
                <i :class="['iconfont',wishList.indexOf(item.product_id)!=-1?'iconxihuan2':'iconxihuan']"></i>
            </div>
        </div>
      </div>
      <v-pagination v-if="total>0&&last_page>1" class="page" :total="total" @change="loadPage" :pageSize="20"></v-pagination>
      <div v-if="total==0">
        <div class="noneData">
            <img src="@/assets/img/recentlyNone.png">
            <p>It is empty here.</p>
        </div>
      </div>
  </div>
</template>
<script>
import toolsMix from "@/util/tools_mixins";
export default {
  data () {
    return {
      last_page:0,
      wish_ids:this.$storage.getWishlistIds(),
      total:-1,
      name: this.$route.name,
      data:[],
      start_date:'',
      end_date:'',
      rangeDate:['',''],
      wishList:this.$storage.getWishlistIds()
    }
  },
  mixins: [toolsMix],
  methods: {
    loadPage(page){
      this.getRecentlyViewed(page)
    },
    rangeChange(start_date, end_date) {
      this.start_date = start_date;
      this.end_date = end_date;
    },
    getRecentlyViewed (p) {
      this.$Http.cart.getRecentlyViewed({
          p: p || 1,
          start_date:this.start_date,
          end_date:this.end_date
        }).then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.last_page=data.last_page;
          this.total = data.total;
          this.data = data.data;
        }
      })
    },
  },
  created () {
    this.getRecentlyViewed()
  }
}
</script>
<style scoped lang="less">
.recently-container{
    .data{
        margin-bottom: 10px;
        b{
            margin-right: 10px;
        }
        /deep/ .ant-input{
            height: 30px;
        }
    }
    .recently-banner {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap:20px;
        @media (max-width: 1400px) {
            grid-template-columns: repeat(4, 1fr);
        }
        >div{
            .full-image{
                height:265px;
            }
            .title-ellipsis{
                width: 200px;
                font-weight:550;
                line-height:1.5;
            }
            .sku{
                font-size: 12px;
                color: #999999;
            }
            .price{
                span:first-child{
                    font-weight: 550;
                }
            }
        }
    }
}
</style>