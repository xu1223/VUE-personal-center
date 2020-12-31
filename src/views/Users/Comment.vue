<template>
  <div>
    <!-- <van-nav-bar
      title="COMMONT"
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
      <div class="header" v-if="order_datas.length > 0">
        <i
          :class="[
            'iconfont pers-quan',
            cartIdAll.length == order_datas.length ? 'pers-chenggong' : '',
          ]"
        ></i>
        <span>
          {{ db_selectlist.invoice_no && db_selectlist.invoice_no }}
        </span>
      </div>
      <div class="p-c-list">
        <div
          class="p-list-cn"
          v-for="(item, index) in order_datas"
          :key="index"
        >
          <input type="hidden" :value="item.id" />
          <input type="hidden" :value="item.order_id" />
          <input type="hidden" :value="item.product_id" />
          <input type="hidden" :value="item.zsku" />
          <div class="icon hx-van-radio1">
            <van-checkbox-group v-model="cartIdAll">
              <van-checkbox :name="item.id"></van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="img">
            <img v-lazy="item.img_m" />
          </div>
          <div class="info">
            <p>{{ item.name }}</p>
            <div class="info-name">
              <div class="span-color">
                <div class="span-color-1">
                  SKU:
                  {{ (item && item.zsku) || "" }}
                </div>
                <div>
                  SIZE:
                  {{ (item && item.size) || "" }}
                </div>
              </div>
              <div class="span-color">
                <div class="span-color-1">
                  COLOR:
                  {{ (item && item.color) || "" }}
                </div>
                <div>
                  QTY:
                  {{ (item && item.quantity) || "" }}
                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <van-button @click="reivewItem(item, index)">Review</van-button>
          </div>
        </div>
      </div>
    </div>
    <!--底部评论区域 -->
    <div class="p-com-f-btn">
      <div class="hider">
        Thank you for your precious reviews,other buyers need your feedback.
      </div>
      <div class="cont">
        <div class="hx-form-group hx-must hx-input-block-start">
          <div class="clearfix comment-list-remove">
            <label class="hx-form-label" style="float: left"
              >Product Rating</label
            >
            <span class="stars comment-stars" style="margin-left: 10px">
              <van-rate
                :size="18"
                v-model="rating"
                color="#161616"
                @change="ratingIndex"
                void-icon="star"
                void-color="#bfbfbf"
                :disabled="cartIdAll.length == 0 ? true : false"
              />
            </span>
            <em class="hx-form-tips" style="display: none">Required field</em>
          </div>
        </div>
        <div
          class="hx-form-group hx-must"
          :ref="'receive_shipment'"
          :d-index="'receive_shipment'"
        >
          <label class="hx-form-label">Comment Content</label>
          <div :class="['hx-input-block']">
            <textarea
              placeholder
              class="hx-textarea hx-input"
              name="receive_shipment_remark"
              v-model="description"
              @input="shipment_remarkfn(item, 0)"
              :disabled="cartIdAll.length == 0 ? true : false"
            ></textarea>
            <div class="hx-text-right">
              <em>{{ description ? description.length : 0 }}</em
              >/
              <span>500</span>
            </div>
          </div>
          <em class="hx-form-tips" style="display: none; bottom: -0.4rem"
            >Required field</em
          >
        </div>
      </div>
      <div class="btn">
        <van-button
          @click="submitAll"
          :disabled="cartIdAll.length == 0 ? true : false"
          :loading="loading1"
          >SUBMIT</van-button
        >
      </div>
    </div>
    <!--弹窗评论-->
    <Pmodel :visible.sync="visible" :title="'Comment'">
      <template slot="content">
        <div class="p-c-model">
          <div class="info">
            <div class="img">
              <img v-lazy="comItem.img_m" />
            </div>
            <div class="info-cn">
              <p>SKU: {{ comItem.zsku }}</p>
              <p>COLOR: {{ comItem.color }}</p>
              <p>SIZE: {{ comItem.size }}</p>
              <p>QTY: {{ comItem.quantity }}</p>
            </div>
          </div>
          <div class="hx-form-group hx-must hx-input-block-start">
            <div class="clearfix comment-list-remove">
              <label class="hx-form-label" style="float: left"
                >Product Rating</label
              >
              <span class="stars comment-stars" style="margin-left: 10px">
                <van-rate
                  :size="18"
                  v-model="com_rating"
                  color="#161616"
                  @change="ratingIndexCom"
                  void-icon="star"
                  void-color="#bfbfbf"
                />
              </span>
              <em class="hx-form-tips" style="display: none">Required field</em>
            </div>
          </div>
          <div
            class="hx-form-group hx-must"
            :ref="'receive_shipment'"
            :d-index="'receive_shipment'"
          >
            <label class="hx-form-label">Comment Content</label>
            <div :class="['hx-input-block']">
              <textarea
                placeholder
                class="hx-textarea hx-input"
                name="receive_shipment_remark"
                v-model="description_com"
                @input="shipment_remarkfn_com"
              ></textarea>
              <div class="hx-text-right">
                <em>{{ description_com ? description_com.length : 0 }}</em
                >/
                <span>500</span>
              </div>
            </div>
            <em class="hx-form-tips" style="display: none; bottom: -0.4rem"
              >Required field</em
            >
          </div>
          <div class="hx-form-group hx-must">
            <div class="picture-file">
              <div class="hx-form-labels"></div>
              <!--v-model="item.imageds"-->
              <van-uploader
                v-model="imageds_base64"
                multiple
                :max-count="6"
                :after-read="uploadeimgs"
                @delete="deletefile"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <van-button class="btn-sub" :loading="loading" @click="submitComment"
          >SUBMIT</van-button
        >
      </template>
    </Pmodel>
  </div>
</template>

<script>
import { Toast } from "vant";
import HeaderTab from "@/components/HeaderTab";
import { sendParamInUrl } from "@/util/tools";
import message from "@/util/message";
import mesgTip from "@/lang";
export default {
  data() {
    return {
      imageds_base64:[],
      visible: false,
      description: "",
      description_com: "", //评论内容
      descriptionmsg: "1",
      fileList: [],
      db_selectlist: [],
      order_datas: [],
      currIndex: 0,
      currItem: {},
      msgTip: mesgTip.CENTER,
      rating: 1,
      com_rating: 1, //单条评论星星
      comItem: {},
      imageds: [], //图片
      loading: false,
      loading1: false,
      cartIdAll: [],
    };
  },
  methods: {
    LINKURL(item) {
      sendParamInUrl({ url: item.product_url });
    },
    reivewItem(item, index) {
      this.description_com = "";
      this.com_rating = "1";
      this.visible = !this.visible;
      this.comItem = item;
    },
    submitComment() {
      if (!this.description_com) {
        return message.error("Common Required field");
      }
      const { id = "" } = this.comItem;
      let obj = {};
      if (!obj["reviews[" + id + "]"]) {
        obj["reviews[" + id + "][order_product_id]"] = id;
        obj["reviews[" + id + "][description]"] = this.description_com;
        obj["reviews[" + id + "][rating]"] = this.com_rating;
        if (Array.isArray(this.imageds) && this.imageds.length > 0) {
          this.imageds.forEach((n, i) => {
            obj["reviews[" + id + "][images][" + i + "]"] = n.url;
          });
        } else {
          obj["reviews[" + id + "][images][0]"] = "";
        }
      }
      this.loading = true;
      this.$Http.commont
        .multiReviewAdd(
          {
            ...obj,
          },
          true
        )
        .then((res) => {
          this.loading = false;
          let { code } = res;
          if (code == 200) {
            this.$router.push({
              path: "/order",
              query: {
                id: 3,
                name: "completed",
              },
            });
            // });
          }
        });
    },
    /**
     * @method
     * @desc: 批量评论
     * @author:  zhangyunjiang
     * @creatDate 2020-12-16 10:55:11
     * @param {*}  val
     */
    submitAll() {
      if (!this.description) {
        return message.error("Common Required field");
      }
      let _arrAll = [];
      this.order_datas.forEach((item) => {
        this.cartIdAll.forEach((v) => {
          if (item.id == v) {
            _arrAll.push(item);
          }
        });
      });
      let obj = {};
      // let reviews = ''
      let newArr = [];
      _arrAll.forEach((item, index) => {
        let order_id = item.id;
        newArr.push(item);
        if (!obj["reviews[" + order_id + "]"]) {
          obj["reviews[" + order_id + "][order_product_id]"] = order_id;
          obj["reviews[" + order_id + "][description]"] = this.description;
          obj["reviews[" + order_id + "][rating]"] = this.rating;
          obj["reviews[" + order_id + "][images][" + index + "]"] = "";
        }
      });
      this.loading1 = true;
      this.$Http.commont
        .multiReviewAdd(
          {
            ...obj,
          },
          true
        )
        .then((res) => {
          this.loading = false;
          let { code } = res;
          if (code == 200) {
            this.$router.push({
              path: "/order",
              query: {
                id: 3,
                name: "completed",
              },
            });
            // });
          }
        });
    },

    currIndexfn(item, index) {
      this.currIndex = index;
      this.currItem = item;
    },
    removeIndex(index) {
      message.confirms({
        className: "confirms-btnswhis",
        msg: this.msgTip.REVIEW_REMOVE,
        rightBtnFn: () => {
          this.order_datas.splice(index, 1);
        },
      });
    },
    ratingIndexCom(val) {
      this.com_rating = val;
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
    shipment_remarkfn(item, index) {
      let newArr = [];
      if (this.order_datas[index].description != "") {
        this.order_datas[index]["isEdit"] = false;
        // newArr = this.order_datas[index]
        this.order_datas.forEach((v) => {
          newArr.push(v);
        });
      } else {
        this.order_datas[index]["isEdit"] = true;
        // newArr = this.order_datas[index]
        this.order_datas.forEach((v) => {
          newArr.push(v);
        });
      }
      this.order_datas = newArr;
    },
    shipment_remarkfn_com(ev) {
      const _value = ev.target ? ev.target.value : ev;
      this.description_com = _value;
    },
    onClickRight() {
      // reviews[101678 ][order_product_id]:101678
      // reviews[101678 ][description]:description-1
      // reviews[101678 ][rating]:1
      // reviews[101678 ][images][]:/goods/2018-12-25/OD185172-PK1/OD185172-PK1.jpg
      // reviews[101678 ][images][]:/goods/2018-12-25/OD185172-WH1/OD185172-WH1.jpg
      // reviews[101678 ][images][]:/goods/2018-12-25/OD185172-BK1/OD185172-BK1.jpg
      let obj = {};
      // let reviews = ''
      let newArr = [];
      let isFalse = false;
      this.order_datas.forEach((v, index) => {
        let order_id = v.id;
        newArr.push(v);
        if (v.description === "") {
          v["isEdit"] = true;
          let mTop = this.$refs["receive_shipment" + index][0].offsetTop;
          var sTop = document.body.scrollTop;
          var result = mTop - sTop - 100;

          window.scrollTo(0, result);
          isFalse = false;
          return false;
        }

        if (!obj["reviews[" + order_id + "]"]) {
          obj["reviews[" + order_id + "][order_product_id]"] = order_id;
          obj["reviews[" + order_id + "][description]"] = v.description;
          obj["reviews[" + order_id + "][rating]"] = v.rating;
          if (v.imageds) {
            v.imageds.forEach((n, i) => {
              obj["reviews[" + order_id + "][images][" + index + "]"] = n.url;
            });
          } else {
            obj["reviews[" + order_id + "][images][" + index + "]"] = "";
          }
          return false;
        }
      });
      this.order_datas = newArr;
      this.order_datas.forEach((v) => {
        if (v.description != "") {
          isFalse = true;
        }
      });
      if (!isFalse) {
        return false;
      }
      this.$Http.commont
        .multiReviewAdd(
          {
            ...obj,
          },
          true
        )
        .then((res) => {
          let { code } = res;
          if (code == 200) {
            // Toast.success(msg);
            // setTimeout(() => {
            // order?id=3&name=completed
            this.$router.push({
              path: "/order",
              query: {
                id: 3,
                name: "completed",
              },
            });
            // });
          }
        });
    },
    deletefile(file, currindex) {
      let { index } = currindex;
      this.order_datas[this.currIndex].imageds.splice(index - 1, 1);
      this.order_datas = this.order_datas;
    },
    uploadeimgs(files, item) {
      files.status = "uploading";
      files.message = "loading...";
      let file = files.file;
      this.$Http.commont.reviewImageUpload({ file }, true).then((res) => {
        let { code, data } = res;
        // this.order_datas[0]['imageds'].shift()
        //  this.order_datas[this.currIndex]['imageds1'].shift()
        if (code == 200) {
          files.status = "";
          files.message = "";
          if (this.order_datas) {
            let arrdata = [];
            this.order_datas.forEach((v, index) => {
              if (this.currIndex === index) {
                let _self = this;
                var reader=new FileReader();
                reader.onload=(function(file){
                  return function(ev){
                    _self.imageds_base64({
                        url: ev.target.result, fileUrl: ev.target.result
                    })
                  }
                })(file);
                reader.readAsDataURL(file);
                this.imageds.pop();
                this.imageds.push({ url: data, fileUrl: data });
                v["imageds"].pop();
                v["imageds"].push({ url: data, fileUrl: data });
                //  v["imagedsl"].push(data);
              }
              arrdata.push(v);
              //  this.db_selectlist['order_productst'].push(v)
            });
            // this.order_datas[this.currIndex]['imageds'].shift()
            this.order_datas = arrdata;
          }
        }
      });
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
  created() {
    if (this.$route.query.invoice_no) {
      this.$Http.commont
        .getWillCommentOrder({ invoice_no: this.$route.query.invoice_no })
        .then((res) => {
          let { code, data } = res;
          let arrdata = [];
          if (code == 200) {
            this.db_selectlist = data;
            if (data.order_products) {
              data.order_products.forEach((v) => {
                v["rating"] = 5;
                v["description"] = "";
                v["images"] = "";
                v["imageds"] = [];
                arrdata.push(v);
                //  this.db_selectlist['order_productst'].push(v)
              });
              this.order_datas = arrdata;
            }
          }
        });
    }
  },
  components: {
    HeaderTab,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.p-c-model {
  .info {
    height: pxto2($px120);
    display: flex;
    .img {
      width: pxto2($px90);
      height: pxto2($px120);
      border: $input-border;
      @include bRadius4();
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .info-cn {
      @include fontSize18();
      margin-left: pxto2($px20);
      color: $info;
    }
  }
  .hx-form-group {
    margin: {
      bottom: 0;
    }
    padding: {
      bottom: 0;
    }
  }
  .hx-input-block-start {
    margin: {
      top: pxto2($px10);
    }
  }
  .hx-textarea {
    padding: pxto2($px5) 0;
  }
  .picture-file {
    .van-uploader__upload,
    .van-uploader__preview-image {
      height: pxto2($px80) !important;
      width: pxto2($px80) !important;
    }
  }
}
.btn-sub {
  @include btnsSubmit();
  color: $withe-1;
}
.user-controller-msg {
  @include fontSize24();
  .header {
    width: pxto2($width680);
    margin: pxto2($px10) auto;
    @include bRadius4();
    background: $withe;
    padding: pxto2($px20);
  }
  .p-c-list {
    margin-bottom: pxto2($px10);
    .p-list-cn {
      height: pxto2($px125);
      background: $withe;
      border-bottom: solid 1px $info-2;
      padding: pxto2($px20);
      display: flex;
      .icon {
        @include pointer();
        display: flex;
        align-items: center;
      }
      .img {
        width: pxto2($px70);
        height: pxto2($px100);
        margin: 0 pxto2($px10);
        overflow: hidden;
        img {
          height: 100%;
          max-width: 100%;
        }
      }
      .info {
        width: pxto2(420px);
        p {
          display: inline-block;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .info-name {
          @include fontSize24();
          margin-top: pxto2($px10);
          .span-color {
            display: flex;
            margin-top: pxto2($px5);
            color: $info;
            @include fontSize20();
            div {
              width: 50%;
            }
            .span-color-1 {
              width: 80%;
            }
          }
        }
      }
      .btn {
        background: transparent;
        width: pxto2($px120);
        margin-left: pxto2(25px);
        display: flex;
        align-items: center;
        button {
          @include btnsSubmit();
          color: $withe-1;
        }
      }
    }
  }
}
.p-com-f-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: pxto2(400px);
  border: solid 1px $block;
  background: #f5f5f5;
  z-index: 100;
  @include fontSize16();
  overflow: hidden;
  .hider {
    width: 100%;
    height: pxto2($px60);
    background: $block;
    color: $withe;
    line-height: pxto2($px60);
    text-indent: pxto2($px10);
  }
  .cont {
    padding: 0 pxto2($px20);
    width: 100%;
    margin: pxto2($px20) 0;
    .hx-input-block-start,
    .hx-form-group {
      margin-bottom: 0;
      padding-bottom: 0;
      textarea {
        width: pxto2($width710);
        border-radius: 0;
      }
      .hx-text-right {
        right: pxto2($px50);
      }
    }
  }
  .btn {
    display: flex;
    button {
      @include btnsSubmit();
      color: $withe-1;
    }
  }
}
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
