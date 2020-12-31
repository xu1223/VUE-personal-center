<template>
  <div class="carousel">
    <VueSlickCarousel :arrows="true" :slidesToShow="limit" :data="data" :adaptiveHeight="true">
      <div class="shop-item" v-for="(item,index) in data" :key="index">
        <div class="shop-item-up">
          <a class="full-image" @click="linkUrl({ 'url': item.product_url })">
            <img :src="item.img_m_l">
          </a>
        </div>
        <div class="shop-item-down">
          <a class="title-ellipsis" @click="linkUrl({ 'url': item.product_url })">{{item.name}}</a>
          <v-rate v-model="item.review_rating" disabled ></v-rate>
          <div class="price">
            <span>{{Number(item.price).toFixed(2)}}</span>
            <span v-if="Number(item.show_price) > Number(item.price)">{{Number(item.show_price).toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
 
<script>
import toolsMix from "@/util/tools_mixins";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  props: ["data", "limit"],
  components: { VueSlickCarousel },
  mixins: [toolsMix]
}
</script>
<style scoped lang="less">
.carousel{
  .slick-next{
    right: 0;
  }
  .shop-item{
    padding:10px;
    text-align: center;
    .shop-item-up{
      position: relative;
      .shop-item-icon{
        position: absolute;
        bottom: 15%;
        left: 0;
        right: 0;
        margin: auto;
        opacity: 0;
        transition: all 0.2s;

        i{
          font-size: 23px;
          background: #000;
          color:#fff;
          width: 45px;
          height: 45px;
          border-radius:50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
        }
      }
      &:hover .shop-item-icon{
        opacity: 1;
      }
    }
    .shop-item-down{
      padding:5px;
      .title-ellipsis{
        font-weight:550;
      }
    }
  }
}
</style>