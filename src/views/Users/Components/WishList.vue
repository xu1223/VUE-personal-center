<template>
  <div style="display: flex; flex-wrap: wrap">
    <div
      class="shop-item"
      v-for="(item, index) in formdata || []"
      :key="index"
      :index="index"
      :ref="'receive_shipment' + index"
    >
      <div class="img-box">
        <a
          class="product-img"
          href="javascript:void(0);"
          rel="nofollow"
          @click="LINKURL(item)"
        >
          <!-- <img :src="item.image" :alt="item.name" /> -->
          <img v-lazy="item.image" />
        </a>
        <i
          class="iconfont pers-shanchu remove-dele"
          @click.stop="adddelete(item, index)"
        ></i>
        <!-- selectAllId-->
        <template v-for="(v, i) in selectAllId">
          <i
            :class="[
              'iconfont remove-quan ',
              v == item.id ? 'pers-chenggong' : 'pers-quan',
            ]"
            @click.stop="selectChenbox(item, index)"
            v-if="selectAllId.length > 0"
            :key="i + ''"
          ></i>
        </template>

        <i
          v-if="selectAllId.length == 0"
          :class="['iconfont pers-quan remove-quan']"
          @click.stop="selectChenbox(item, index)"
        ></i>
      </div>
      <div class="shop-info">
        <a class="name" href="javascript:void(0);" rel="nofollow">{{
          item.name
        }}</a>
        <p class="ri-size-sku">SKU:{{ item.sku }}</p>
        <div class="ri-size-color" style="display: none">
          <p>Color:<span>Light Blue</span></p>
          <p>Size:<span>S</span></p>
        </div>
        <div class="pro-star star5" style="display: none">
          <van-icon
            name="star"
            :class="[
              'iconfont iconLQYxingxingtianchong icon-staro',
              i <= item.review_rating - 1 ? 'icon-staro-actives' : '',
            ]"
            v-for="(k, i) in 5"
            :key="i"
          />
        </div>
      </div>
      <div class="price">
        <span
          >{{ db_itemsdata.currency_symbol }}{{ item.price | numFilter }}</span
        >
        <s
          >{{ db_itemsdata.currency_symbol
          }}{{ item.show_price | numFilter }}</s
        >
      </div>
      <div class="select-box" style="display: none">
        <WisHSelect
          :formdata="
            item.product_option_value
              ? item.product_option_value.Size
              : item.product_option_value
          "
          @changes="sizeChange"
          :s="'size'"
        />
        <WisHSelect
          :formdata="
            item.product_option_value
              ? item.product_option_value.Color
              : item.product_option_value
          "
          @changes="colorChange"
          :s="'color'"
        />
      </div>
      <div class="add-bag" @click="adddcart(item, index)">
        <i class="iconfont iconLQYgouwudai"></i> ADD TO BAG
      </div>
    </div>
  </div>
</template>

<script>
import WisHSelect from "@/components/WisHSelect.vue";
import { sendParamInUrl } from "@/util/tools";
export default {
  props: ["formdata", "db_itemsdata"],
  data() {
    return {
      ids: "",
      colorId: "",
      sizeId: "",
      selectAllId: [],
    };
  },
  methods: {
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },
    adddelete(item, index) {
      let parm = {
        item,
        index,
      };

      this.$emit("deleChange", parm);
    },
    selectChenbox(item, _cuurIndex) {
      let index = this.selectAllId.findIndex((v) => v == item.id);
      if (index > -1) {
        this.selectAllId.splice(index, 1);
      } else {
        this.selectAllId.push(item.id);
      }
      this.$emit("selectAllId", this.selectAllId);
    },
    adddcart(item, index) {
      if (!this.sizeId) {
        this.sizeId = this.$refs["receive_shipment" + index][0]
          .querySelector(".d-type-size")
          .querySelectorAll("[data-value]")[0]
          .getAttribute("data-value");
      }
      if (!this.colorId) {
        this.colorId = this.$refs["receive_shipment" + index][0]
          .querySelector(".d-type-color")
          .querySelectorAll("[data-value]")[0]
          .getAttribute("data-value");
      }

      let parm = {
        item,
        index,
        sizeId: this.sizeId,
        colorId: this.colorId,
      };
      this.$emit("addChange", parm);
      this.sizeId = "";
      this.colorId = "";
    },
    sizeChange(id) {
      this.sizeId = id;
    },
    colorChange(id) {
      this.colorId = id;
    },
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
  },
  components: {
    WisHSelect,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.shop-item {
  position: relative;
  .remove-dele,
  .remove-quan {
    position: absolute;
    top: pxto2($px20);
    @include pointer();
    font-size: pxto2($px40);
  }
  .remove-dele {
    right: pxto2($px20);
  }
  .remove-quan {
    left: pxto2($px20);
  }
  .name {
    height: auto !important;
    -webkit-line-clamp: 1 !important;
    text-indent: pxto2($px5);
  }
  .img-box {
    margin-bottom: 0 !important;
    height: 5.4rem !important;
    overflow: hidden;
  }
  .product-img {
    margin-bottom: 0 !important;
    height: 5.4rem !important;
    text-align: center;
  }
}
.user-controller {
  padding: 0 !important;
  .shop-item {
    width: pxto2(342px) !important;
    // height: pxto2(438px) !important;
    margin-right: 0;
  }
  .shop-item:nth-child(even) {
    margin-left: pxto2($px20) !important;
  }
  .ri-size-color {
    @include fontSize24();
    display: flex;
    justify-content: space-between;
    color: $info-1;
    // margin:pxto2($px5) 0;
  }
  .ri-size-sku {
    @include fontSize24();
    color: $info-1;
    text-indent: pxto2($px10);
  }
  .price {
    text-align: left !important;
    justify-content: left !important;
  }
}
.add-bag {
  background-color: $block !important;
  color: $withe;
  margin-top: pxto2($px10);
}
</style>
