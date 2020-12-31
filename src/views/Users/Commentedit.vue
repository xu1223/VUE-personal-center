<template>
  <div>
    <!-- <van-nav-bar
      title="COMMONT Edit"
      @click-left="onClickLeft"
      fixed
      z-index="2000"
      right-text="send"
      @click-right="onClickRight"
    >
      <van-icon name="arrow-left" slot="left" style="color:#000" />
      <a
        href="/"
        style="width: 5.5rem;display: flex;margin-top: 0.12rem;justify-content: center;align-items: center;"
        slot="title"
      >
        <img
          src="//cdn.affectcloud.com/demo/upload/website/2020-01-20/1579511930318421.png"
          title="Demo.Hxcart.Net"
          alt="Demo.Hxcart.Net"
          style="max-width: 100%;max-height: 35px;"
        />
      </a>
    </van-nav-bar> -->
    <HeaderTab />
    <div class="user-controller-msg">
      <div class="user-common-listmsg">
        <div class="user-info-cn" style="margin-bottom:10px">
          <div class="user-info-cns">
            <div class="user-allorder-lis">
              <div class="user-allorder user-allorder-info">
                <div class="user-allorder-head">
                  <b class="flyoon">Overview</b>
                  <b class="payment payment1" data-price="100"
                    >Order completed</b
                  >
                </div>
                <input type="hidden" value="db_selectlist.id" />
                <input type="hidden" value="db_selectlist.order_id" />
                <input type="hidden" value="db_selectlist.product_id" />
                <input type="hidden" value="db_selectlist.zsku" />
                <div class="user-allorder-con clearfix">
                  <div class="user-order-cn-imgs" @click="LINKURL(item)">
                    <img
                      v-lazy="
                        db_selectlist.order_product
                          ? db_selectlist.order_product.img_m
                          : ''
                      "
                    />
                  </div>
                  <div class="user-order-cn-right clearfix">
                    <p class="order-cn-right-title" @click="LINKURL(item)">
                      {{
                        db_selectlist.order_product
                          ? db_selectlist.order_product.name
                          : ""
                      }}
                    </p>
                    <div class="order-cn-right-type">
                      <div class="right-type-lis">
                        <span class="right-type-lis-type"
                          >Size:
                          {{
                            db_selectlist.order_product
                              ? db_selectlist.order_product.size
                              : ""
                          }}</span
                        >
                        <p class="right-type-lis-price">
                          ${{
                            db_selectlist.order_product
                              ? db_selectlist.order_product.price
                              : "" | numFilter
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="order-cn-right-type">
                      <div class="right-type-lis">
                        <span class="right-type-lis-type"
                          >Color:
                          {{
                            db_selectlist.order_product
                              ? db_selectlist.order_product.color
                              : ""
                          }}</span
                        >
                        <p class="right-type-lis-price price2">
                          ${{
                            db_selectlist.order_product
                              ? db_selectlist.order_product.price
                              : "" | numFilter
                          }}
                        </p>
                      </div>
                    </div>
                    <i class="user-order-nums"
                      >*{{
                        db_selectlist.order_product
                          ? db_selectlist.order_product.quantity
                          : ""
                      }}</i
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="user-info-cn">
            <div class="user-info-cns user-coment-cns">
              <div class="hx-form-group hx-must hx-input-block-start">
                <div class="clearfix comment-list-remove">
                  <label class="hx-form-label" style="float: left"
                    >Product Rating</label
                  >
                  <!-- <a
                    href="javascript:void(0);"
                    style="float: right;font-size: 0.34rem;display: none;color: #EE7373; display: block; border-bottom: solid 1px rgb(238, 115, 115);"
                  >remove</a> -->
                </div>
                <div class="hx-input-block">
                  <input
                    type="hidden"
                    name="reviews[202530][rating]"
                    class="comment-stars-val"
                    value
                  />
                  <span class="stars comment-stars">
                    <van-rate
                      :size="18"
                      v-model="db_selectlist.rating"
                      color="#161616"
                      @change="ratingIndex"
                      void-icon="star"
                      void-color="#bfbfbf"
                    />
                  </span>
                </div>
                <em class="hx-form-tips" style="display: none;"
                  >Required field</em
                >
              </div>
              <div class="hx-form-group hx-must">
                <label class="hx-form-label">Comment Content</label>
                <div
                  :class="[
                    'hx-input-block',
                    descriptionmsg ? 'result-success' : 'result-error'
                  ]"
                >
                  <textarea
                    placeholder
                    class="hx-textarea hx-input"
                    name="receive_shipment_remark"
                    v-model="db_selectlist.description"
                    @input="descriptionfn"
                  ></textarea>
                  <div class="hx-text-right">
                    <em>{{
                      db_selectlist.description
                        ? db_selectlist.description.length
                        : 0
                    }}</em
                    >/
                    <span>500</span>
                  </div>
                </div>
                <em
                  class="hx-form-tips"
                  style="display:inline;bottom:-0.5rem"
                  v-show="!descriptionmsg"
                  >Required field</em
                >
              </div>

              <div class="hx-form-group hx-must" style="margin-top:.5rem">
                <div class="picture-file">
                  <div class="hx-form-labels">
                    Share Pictures
                    <span>(Up to 6 sheets)</span>
                  </div>
                  <van-uploader
                    v-model="order_datas"
                    multiple
                    :max-count="6"
                    :after-read="uploadeimgs"
                    @delete="deletefile"
                  />
                </div>
                <em
                  class="hx-form-tips"
                  style="display:inline;bottom:-0.5rem"
                  v-show="!filemsg"
                  >Required field</em
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="user-navbtn"
      style="padding: 0px 20px; width: 9rem; justify-content: center;"
    >
      <a href="javascript:void(0);" class="btn-active" @click="onClickRight"
        >Release</a
      >
    </div>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab";
import { sendParamInUrl } from "@/util/tools";
export default {
  data() {
    return {
      descriptionmsg: "1",
      filemsg: "1",
      fileList: [],
      db_selectlist: [],
      order_datas: [],
      currIndex: 0,
      currItem: {},
      arrImgs: []
    };
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
    }
  },
  methods: {
    LINKURL(item) {
       sendParamInUrl({url:item.product_url});
    },
   
    descriptionfn() {
      if (this.db_selectlist.description === "") {
        this.descriptionmsg = "";
      } else {
        this.descriptionmsg = "1";
      }
    },
    deletefile(file, currIndex) {
      let { index } = currIndex;
      this.order_datas.splice(index, 1);
      this.arrImgs.splice(index, 1);
    },
    currIndexfn(index) {
      this.currIndex = index;
    },
    ratingIndex(val) {
      if (this.order_datas) {
        let arrdata = [];
        this.order_datas.forEach((v, index) => {
          if (this.currIndex == index) {
            v["rating"] = val;
          }
          arrdata.push(v);
          //  this.db_selectlist['order_productst'].push(v)
        });
        this.order_datas = arrdata;
      }
    },
    onClickLeft() {
      window.history.back(-1);
    },
    onClickRight() {
      //  id:123
      //     description:abcdefg
      //     rating:5
      //     images[]:/goods/2018-12-25/OD185172-PK1/OD185172-PK1.jpg
      //     images[]:/goods/2018-12-25/OD185172-WH1/OD185172-WH1.jpg
      //     images[]:/goods/2018-12-25/OD185172-BK1/OD185172-BK1.jpg
      let obj = {
        id: this.db_selectlist.id,
        description: this.db_selectlist.description,
        rating: this.db_selectlist.rating
      };
      let arrs = [];
      // let reviews = ''
      let str = "";
      if (this.db_selectlist.description === "") {
        this.descriptionmsg = "";
        return;
      }
      // if(this.arrImgs.length ===0){
      //   this.filemsg = ''
      //   return;
      // }
      this.arrImgs.forEach((v, index) => {
        if (!obj["images[" + index + "]"]) {
          if (this.arrImgs) {
            this.arrImgs.forEach(n => {
              obj["images[" + index + "]"] = n.url;
            });
          }
        } else {
          obj["images[]"] = "";
        }
      });
      this.$Http.commont.reviewEdit({...obj},true).then(res=>{
          let {code} = res;
          if (code == 200) {
            // Toast.success(msg);
            // setTimeout(() => {
            window.history.back(-1);
            // },300);
          }
      })
     
    },
    uploadeimgs(files) {
      files.status = "uploading";
      files.message = "loading...";
      let file = files.file;
      this.$Http.commont.reviewImageUpload({ file },true).then(res => {
         let {code,data} = res;
        // this.order_datas[0]['imageds'].shift()
        //  this.order_datas[this.currIndex]['imageds1'].shift()
        if (code == 200) {
          files.status = "";
          files.message = "";
          if (this.order_datas) {
            let arrdata = [];
            this.order_datas.forEach((v, index) => {
              // arrdata.pop();
              arrdata.push(v);
              //  this.db_selectlist['order_productst'].push(v)
            });

            this.arrImgs.push({ url: data });
            // this.order_datas[this.currIndex]['imageds'].shift()
            this.order_datas = arrdata;
            this.filemsg = "1";
          }
        }
      });
     
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$Http.commont
        .getReview({ id: this.$route.query.id })
        .then(res => {
          let {code,data} = res;
          let arrdata = [];
          this.order_datas = [];
          if (code == 200) {
            this.db_selectlist = data;
            if (data.images) {
              data.images.forEach(item => {
                arrdata.push({ url: item.img_m });
                this.arrImgs.push({ url: item.img_m });
              });
              this.db_selectlist["imageds"] = arrdata;
              this.order_datas = arrdata;
            }
            
          }
        });
      
    }
  },
  components: {
    HeaderTab
  }
};
</script>

<style lang="scss" scoped>
.user-common-listmsg {
  .user-info-cn {
    background: #fff;
    padding: 0.26667rem 0;
  }
  .user-info-cn .user-info-cns {
    width: 8.93333rem;
    margin: 0 auto;
  }
  .user-info-cn .user-info-cns .user-allorder-info {
    box-shadow: none;
  }
  .user-allorder {
    width: 100%;
    /* height: 520px; */
    background-color: #ffffff;
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
    border: solid 1px #f5f5f5;
    margin: 0 auto 0.26667rem;
    padding-bottom: 0.26667rem;
  }
  .user-allorder .user-allorder-head {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.26667rem;
    border-bottom: solid 1px #f5f5f5;
  }
  .user-allorder .user-allorder-head .flyoon {
    font-size: 0.32rem;
  }
  .user-allorder .user-allorder-head .payment {
    font-size: 0.29333rem;
    font-weight: 400;
    float: right;
  }
  .user-allorder .user-allorder-con .user-order-cn-imgs {
    float: left;
    width: 1.68rem;
    height: 2.18667rem;
    overflow: hidden;
  }
  .user-allorder .user-allorder-con .user-order-cn-imgs img {
    /* max-height: 100%; */
    width: 100%;
  }
  .user-allorder .user-allorder-con .user-order-cn-right {
    /* float: left; */
    margin-left: 0.26667rem;
    /* width: 6.26667rem; */
    width: 97%;
    position: relative;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-title {
    display: block;
    font-size: 0.32rem;
    color: #252525;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .order-cn-right-type {
    margin-top: 0.26667rem;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis {
    height: 0.4rem;
  }

  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .right-type-lis-price {
    float: right;
    font-size: 0.32rem;
    float: right;
    display: block;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .right-type-lis-type {
    font-size: 0.32rem;
    display: block;
    max-width: 2.66667rem;
    float: left;
  }
  .user-allorder
    .user-allorder-con
    .user-order-cn-right
    .order-cn-right-type
    .right-type-lis
    .price2 {
    text-decoration: line-through;
    color: #dbdbdb;
  }
  .user-allorder .user-allorder-con .user-order-cn-right .user-order-nums {
    color: #dbdbdb;
    font-size: 0.32rem;
    text-align: right;
    border: solid transparent;
    display: block;
    font-style: normal;
    position: absolute;
    right: 0;
  }
  .user-info-cn .user-info-cns {
    width: 8.93333rem;
    margin: 0 auto;
  }
  .user-info-cn .user-info-cns {
    width: 8.93333rem;
    margin: 0 auto;
  }
  .hx-input-block {
    min-height: 0.48rem;
    /* padding-bottom: 20px; */
    position: relative;
  }
  .hx-form-tips {
    position: absolute;
    bottom: -2px;
    left: 0;
    display: none;
    font-size: 0.26667rem;
    line-height: 0.33333rem;
    color: #e14c52;
  }
  .user-coment-cns .hx-form-group {
    padding-bottom: 0;
  }
  .user-coment-cns .hx-textarea {
    height: 4.26667rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #dddddd;
    margin-bottom: 0.26667rem;
  }
  .hx-form-group .hx-form-label {
    display: block;
    /* font-family: "SH-ExtraLight"; */
    font-size: 0.32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #252525;
    padding-bottom: 5px;
  }
  .user-coment-cns .hx-must .hx-form-label::after {
    display: inline;
    content: "*";
    color: #34d0c8;
    vertical-align: top;
    font-size: 0.32rem;
    position: relative;
    top: 2px;
  }
  .user-coment-cns .hx-form-labels {
    font-size: 0.32rem;
    margin-bottom: 0.26667rem;
  }
  .user-coment-cns .picture-file span {
    font-size: 0.32rem;
    font-weight: normal;
    letter-spacing: 0px;
    color: #bfbfbf;
  }
  .hx-input-block {
    min-height: 0.48rem;
    /* padding-bottom: 20px; */
    position: relative;
  }
  .user-coment-cns .icon-staro-active {
    color: #161616;
  }
  .user-coment-cns .icon-staro {
    color: #bfbfbf;
    font-size: 0.32rem;
    cursor: pointer;
    float: left;
  }
}
</style>
