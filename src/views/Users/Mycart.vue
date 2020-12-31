<template>
    <div>
        <HeaderTab />

        <div class="my-cart-main"
            v-if="!(db_selectlist.data  ? db_selectlist.data ? !db_selectlist.data.length: '' : '')">

            <div class="user-allorder-lis chalist-shop-lis cart-shop-list ">
                <Mycartlist ref="mychild" :formdata="db_list ? db_list : []" @change="changedblist"
                    @visiblechange="visiblechange" @changeUpdate="changeUpdate" @changeAll="changeAll"
                    :ids.sync="indexs" v-model="cartIdAll" />
            </div>

            <div class="user-allorder user-allorder-info">
                <div class="use-allorder-mos">
                    <div class="user-type-moneu-info ">
                        <span class="info-msg">Product Price:</span>
                        <span class="info-price data-info-price" id="product_price"
                            data-info-price>{{ forms.currency_symbol}}{{ old_total_price | numFilter }}</span>
                    </div>
                    <div class="user-type-moneu-info ">
                        <span class="info-msg">Discount:</span>
                        <span class="info-price data-info-price"
                            id="discount">-{{ db_selectlist.currency_symbol}}{{ discount_ | numFilter }}</span>
                    </div>
                    <div class="user-type-moneu-info ">
                        <span class="info-msg">Coupon Discount:</span>
                        <span class="info-price data-info-price"
                            id="coupon_discount">-{{ db_selectlist.currency_symbol}}{{ coupon_discount | numFilter }}</span>
                    </div>
                    <div class="user-type-moneu-info ">
                        <span class="info-msg">Promotion Discount:</span>
                        <span class="info-price data-info-price"
                            id="promotion_discount">-{{ db_selectlist.currency_symbol}}{{ promotion_discount | numFilter }}</span>
                    </div>
                    <div class="user-type-moneu-info ">
                        <span class="info-msg">Weight:</span>
                        <span class="info-price" id="all_weight">{{ weight_total | numFilter }}
                            kg</span>
                    </div>

                    <div class="user-order-total-cn">
                        <div class="user-type-moneu-info ">
                            <span class="info-msg">Total number of products:</span>
                            <span class="info-price info-price-total" id="total_num"
                                data-info-price>{{ total_num }}</span>
                        </div>
                        <div class="user-type-moneu-info ">
                            <span class="info-msg">Total Price(Actual Payment):</span>
                            <span class="info-price" id="actual_price">{{ forms.currency_symbol
                        }}{{ total_price | numFilter }}</span>
                        </div>
                    </div>
                </div>
                <div class="use-cart-bottom hx-van-radio1">
                    <div class="use-checkbox-main">
                        <div :class="['use-checkbox',allcheck ? 'use-checkbox-ative' :'']" @click="All_checkbox">
                            <i class="van-icon van-icon-success"></i>
                        </div>
                        <span>ALL</span>
                    </div>
                    <div class="use-cart-bottom-ri mycar-btn-pay">
                        <span> $ {{total_price | numFilter}}</span>
                        <van-button href="javascript:void(0);" @click="goto_payment()" class="btn-char-user" 
                        :disabled="cartIdAll.length == 0" :loading="isLoading">
                            CHECKOUT
                        </van-button>
                    </div>
                </div>
            </div>

        </div>





        <Pmodel :visible.sync="visiblePmodel" :title="'Coupon'">
            <template slot="content">
                <div class="coupon-main" v-if="visiblePmodel">
                    <div v-for="(item,index) in full_mall_activity" :key="index" class="item">
                        <div :class="[item.enable == 1 ? 'hx-bg-coupon-img2' :'hx-bg-coupon-img1', item.selected == 1  ? 'pitchon' : '','hx-bg-coupon']"
                            @click="promotion_pitchon(item,index)">
                            <div>
                                {{item.pro_discount}}<em>(ORDER {{item.pro_discount_}})</em>
                            </div>
                            <i v-if="item.selected ==1 " class="iconfont  pers-chenggong"></i>
                        </div>
                        <p v-if="item.enable !=1"> Add more {{item.difference_prive}} to get
                            {{item.pro_discount}}!</p>
                    </div>
                    <div class="detail-message-main">
                        <div class="user-addchar-yhmbtn">
                            <p class="yhmbtn-title" style="color:#333">
                                Please enter your coupon code:
                            </p>
                            <div class="yhum-form">
                                <input id="coupon-code" type="text"
                                    :class="['yhum-value', isCodes ? '' : 'yhum-value-error']" name="coupon_code"
                                    v-model="coupon_code" @input="coupon_codeval" />
                                <i class="youhunma-error" v-show="!isCodes" style="display:none;">✘</i>
                                <i class="youhunma-succes" style="display:none;" v-show="issuccess">✔</i>
                                <van-button class="btn-sub" @click="code_apply(coupon_code)">
                                    APPLY
                                </van-button>
                            </div>
                            <p class="yhmbtn-titlecontent" style="display:none" v-show="!isCodes">
                                {{ iscodemsg }}
                            </p>
                            <p class="yhmbtn-titlecontent" style="display:none" v-show="issuccess">
                                {{ iscodemsg }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>

        </Pmodel>



        <div v-if="db_selectlist.data  ? db_selectlist.data ? !db_selectlist.data.length: '' : ''"
            @changes="changeslist">
            <Nullshops :btntxt="'Shop Now!'" :content="'Your shopping bag is currently empty.'" />
        </div>
        <!-- CANCEL -->
        <van-dialog v-model="visible" show-cancel-button class="confirms-btns" @cancel="CouponOk" @confirm="Cancel1"
            confirmButtonText="CANCEL" cancelButtonText=" CONFIRM">
            <p style="font-size: .32rem;    padding: 14px;">
                If the Coupon Discount is used, the Promotion Discount will be invalid.
                Are you still use the Coupon?
            </p>
        </van-dialog>
        <van-dialog v-model="visible2" show-cancel-button class="confirms-btns" @cancel="PromotionOk" @confirm="Cancel2"
            confirmButtonText="CANCEL" cancelButtonText=" CONFIRM">
            <p style="font-size: .32rem;    padding: 14px;">
                If the Promotion Discount is used, the Coupon will be invalid. Are you
                still use the Promotion Discount?
            </p>
        </van-dialog>
        <FooterBtn />
    </div>
</template>

<script>
    import Mycartlist from "./Mycartlist";
    import Nullshops from "@/components/Nullshops.vue";
    import HeaderTab from "@/components/HeaderTab";
    import Message from "@/util/message.js";
    import {
        mapState
    } from "vuex";
    import msgTip from "@/lang";

    export default {
        data() {
            return {
                isDisabled: false,
                isLoading: false,
                visiblePmodel: false,
                total_price: 0,
                cartIdAll: [],
                allcheck: true,
                tipMsg: msgTip.CENTER,
                session_id: this.$Storage.getSessionId(),
                indexs: 1,
                isHide: false,
                iscodemsg: "This coupon does not exist or is invalid",
                isCodes: "1",
                issuccess: false,
                db_list: [],
                db_selectlist: {},
                totle: "",
                full_mall_activity: [],
                discount_thimg: require("@/assets/img/discount_th.png"),
                is_publish: 1,
                single_visible: false,
                all_visible: false,
                visible: false,
                visible2: false,
                btn_type: "",
                single_index: 0,
                single_item: "",
                dialog: {}, //弹窗
                param: [],
                index_size: 0,
                index_color: 0,
                pro_discount: "",
                pro_discount_: "",
                enable: 0,
                selected: 0,
                index_: "",
                page_num: 0, //页数
                forms: [], //列表数据
                total_num: 0, //总数量
                product_price_total: 0, //商品总原价
                discount_: 0, //discount数据
                coupon_discount: 0, //coupon折扣数值
                coupon_code: "", //coupon验证码值
                coupon_codes: "",
                coupon_help: "", //coupon提示
                code_stage: 1, //coupon输入验证码是否正确 1 0
                coupon_type: "", //coupon类型
                promotion_discount: 0, //promotion折扣数值
                promotion_preferential: 0,
                promotion_amount: 0,
                coupon_preferential: 0,
                coupon_amount: 0,
                weight_total: 0, //总重量
                total_price: 0, //实际支付总价格
                activity_id: "", //全场活动id
                coupon_list: [], //coupon数据
                vieweddata: [], //浏览商品数据
                likedata: [], //猜你喜欢数据
                off_shelves_to_wish: 0, //下架商品转移到心愿单
                difference_name: 0, //优惠卷差值
                difference_prive: 0, //优惠卷差值价格
                old_total_price: 0
            };
        },
        mounted() {
            window.addEventListener("scroll", () => {
                if (window.scrollY >= 300) {
                    this.isHide = true;
                } else {
                    this.isHide = false;
                }
            });
        },
        computed: {

        },
        watch: {
            cartIdAll(val) {
                if (this.cartIdAll.length == this.db_list.length) {
                    this.allcheck = true;
                } else {
                    this.allcheck = false
                }
                this.cartIdchange()
            },
            total_price() {
                this.get_promotion_list();
            }
        },
        methods: {
            visiblechange(val) {
                if (val) {
                    this.get_promotion_list()
                }
                this.visiblePmodel = val
            },
            cartIdchange() {
                this.total_price = 0
                this.total_num = 0
                this.product_price_total = 0
                this.old_total_price = 0
                this.weight_total = 0
                let data = this.db_list.filter(item => {
                    return this.cartIdAll.indexOf(item.id) != -1;
                })
                data.map((item) => {
                    this.total_price += item.pov_price * item.quantity
                    this.old_total_price += item.pov_price * item.quantity
                    this.total_num += item.quantity; //总数量
                    // this.product_price_total += this.bag_show_prive; //商品总原价
                    this.weight_total += Number(item.weight); //总重量
                })
                this.get_total_price();
            },
            All_checkbox() {
                this.allcheck = !this.allcheck
                /* @desc: 按钮全选是否可点击 ; @author: zhangyunjiang;  @editDate: 2020-12-24 14:49:34 */
                this.isDisabled = this.allcheck ? false : true;
                this.$refs.mychild.toggleAll(this.allcheck)

            },
            changeAll() {
                this.created_data();
            },
            Cancel() {
                this.all_visible = false;
                this.single_visible = false;
                this.swiper_show = false;
                this.isCodes = "1";
                this.issuccess = false;
            },
            Cancel1() {
                this.visible = false;
                this.coupon_code = "";
                this.coupon_help = "";
                this.code_stage = 1;
                this.isCodes = "1";
                this.total_price = JSON.parse(JSON.stringify(this.old_total_price))
                this.get_total_price();
                this.issuccess = false;
            },
            Cancel2() {
                this.visible2 = false;
                this.full_mall_activity.map(item => {
                    item.selected = 0;
                });
                this.total_price = JSON.parse(JSON.stringify(this.old_total_price))
                this.get_total_price();

            },
            changeUpdate(obj) {
                let {
                    parms,
                    index
                } = obj;

                let {
                    quantity
                } = parms;
                this.indexs = quantity;
                // this.db_list[index] = this.db_list[index]
                this.db_list[index].product_option_value.Size.forEach(v => {
                    if (v.id == parms.size) {
                        this.db_list[index].size = v.name;
                        this.db_list[index].product_option_value_id = v.id;
                    }
                });
                // this.db_list[index].color = parms.color;
                this.isCodes = "1";
                this.issuccess = false;
                this.param["quantity"] = quantity;
                const data = {
                    mun: quantity,
                    data: this.db_list[index]
                };
                this.$store.dispatch("bag/bag_data", {
                    data
                });
                let idsindex = '';


                this.db_list[index].quantity = quantity;
                this.cartIdchange()
                // this.created_data();
            },
            changedblist(index) {
                this.db_list.splice(index, 1);
                this.db_list = this.db_list;
                this.created_data();
            },
            code_applyfn() {
                this.$Http.cart
                    .checkCouponAvailabilityByCart({
                        coupon_code: this.coupon_code
                    }, true)
                    .then(res => {
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code == 200) {
                            this.isCodes = "1";
                            this.issuccess = true;
                            this.iscodemsg = data.name;
                            this.coupon_codes = this.coupon_code;
                        } else {
                            this.isCodes = "1";
                            this.issuccess = false;
                            this.iscodemsg = msg;
                        }
                    });
            },
            created_data(item) {
                this.$Http.cart
                    .getCarts({
                        limit: "20",
                        p: item || 1,
                        session_id: this.session_id
                    }).then(res => {
                        let {
                            code,
                            data
                        } = res;
                        if (code == 200) {
                            this.db_list = data.list || data.data;
                            this.db_selectlist = data;
                            this.totle = this.db_list.length || 0;
                            this.full_mall_activity = data.full_mall_activity
                            this.forms = data;


                            this.page_num = this.db_list.length;
                            this.cartIdchange()
                        }
                    });
            },
            goto_payment() {
                this.isLoading = true;
                let session_id = ''
                let _parms = {};
                if(localStorage.getItem('cart.m.session_id')){
                    let session_id = localStorage.getItem('cart.m.session_id')
                    _parms['session_id'] = session_id;
                }
                this.$Http.cart
                    .generateOrderFromCart({
                            off_shelves_to_wish: 1,
                            cart_ids: this.cartIdAll.toString(),
                            coupon: this.coupon_code,
                            activity_id: this.activity_id,
                            ..._parms
                        },
                        true
                    )
                    .then(res => {
                        this.isLoading = false;
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code == 200) {
                            let invoice_no = data.invoice_no;
                            setTimeout(() => {
                                let parms = {
                                    invoice_no,
                                    coupon: this.coupon_code,
                                    activity_id: this.activity_id
                                };
                                this.coupon_code ? this.coupon_code : delete parms["coupon"];
                                this.activity_id ? this.activity_id : delete parms["activity_id"];
                                this.$router.push({
                                    path: "/payment_step_two",
                                    query: {
                                        ...parms
                                    }
                                });
                            }, 300);
                        } else {
                            Message({
                                msg: msg
                            });
                        }
                    });
            },
            coupon_codeval() {
                this.isCodes = true;
                this.iscodemsg = "";
                this.issuccess = false;
            },

            changeslist(time) {
                this.db_selelctlist = [];
                this.likedata = [];
                this.vieweddata = [];
                if (!time) {
                    this.db_selelctlist = [];
                    this.likedata = [];
                    this.vieweddata = [];
                }
                this.$Http.cart
                    .getCarts({
                        session_id: this.session_id
                    })
                    .then(res => {
                        let {
                            code,
                            data
                        } = res;
                        if (code == 200) {
                            this.db_list = data.list;
                            this.db_selectlist = data;
                            this.totle = data.list.length || 0;
                            this.full_mall_activity = data.full_mall_activity

                        }
                    });
                this.$Http.cart
                    .fullMallActivityList({
                        session_id: this.session_id
                    })
                    .then(options => {});
                this.created_data();
                this.$Http.cart
                    .getFeaturedProducts()
                    .then(res => {
                        let {
                            code,
                            data
                        } = res;
                        if (code == 200) {
                            this.likedata = data.is_featured.products;
                        }
                    });
                this.$Http.cart
                    .getRecentlyViewed({
                        session_id: this.session_id
                    })
                    .then(res => {
                        let {
                            code,
                            data
                        } = res;
                        if (code == 200) {
                            this.vieweddata = data;
                        }
                    });
            },
            //优惠券类型
            coupon_type_() {
                if (this.coupon_code == "") {
                    return true;
                }
                if (this.coupon_type != "R") {
                    return false;
                }
                return true;
            },
            //冲突选择全场活动
            CouponOk() {
                this.clear_promotion_discount();
                this.coupon_discount = this.coupon_amount != 0 ? (this.old_total_price - this
                        .discount_) *
                    (100 - this.coupon_amount) * 0.01 : this.coupon_preferential;
                this.total_price = JSON.parse(JSON.stringify(this.old_total_price))
                this.get_total_price();
                this.visible = false;
            },
            //冲突选择全场活动
            PromotionOk() {
                this.clear_coupon_discount();
                this.promotion_discount =
                    this.promotion_amount != 0 ?
                    Number(
                        this.old_total_price - this.discount_ - this.coupon_discount
                    ) *
                    (100 - Number(this.promotion_amount)) *
                    0.01 :
                    this.promotion_preferential;
                this.total_price = JSON.parse(JSON.stringify(this.old_total_price))

                this.get_total_price();
                this.visible2 = false;
                this.isCodes = "1";
                this.issuccess = false;
            },
            //选择全场活动
            promotion_pitchon(item, index) {
                this.promotion_amount = 0;
                this.promotion_preferential = 0;
                this.index_ = index;
                if (item.enable != 0) {
                    this.total_price = JSON.parse(JSON.stringify(this.old_total_price))
                    if (item.selected != 1) {
                        this.full_mall_activity.map(item => {
                            item.selected = 0;
                        });
                        item.selected = 1;
                        this.activity_id = item.id;
                        if (item.discount == 0) {
                            this.promotion_preferential = Number(item.preferential);
                        } else {
                            this.promotion_amount = Number(item.discount);
                        }
                        if (!this.coupon_type_() || this.coupon_discount != 0) {
                            this.visible2 = true;
                        } else {
                            this.get_promotion_discount();
                        }
                        this.get_total_price();
                    } else if (item.selected == 1) {
                        item.selected = 0;
                        this.activity_id = 0;
                        this.promotion_discount = 0;
                        this.get_total_price();
                    }
                    this.isCodes = "1";
                }
            },
            //获得优惠券码
            get_coupon_discount() {
                this.coupon_discount = this.coupon_amount != 0 ?
                    (this.total_price - this.discount_) *
                    (100 - this.coupon_amount) * 0.01 :
                    this.coupon_preferential;
            },
            //获得全场活动优惠
            get_promotion_discount() {
                this.promotion_discount =
                    this.promotion_amount != 0 ?
                    Number(
                        this.total_price - this.discount_ - this.coupon_discount
                    ) *
                    (100 - Number(this.promotion_amount)) *
                    0.01 :
                    this.promotion_preferential;
            },
            //清除全场活动
            clear_promotion_discount() {
                this.promotion_preferential = 0;
                this.promotion_amount = 0;
                this.activity_id = 0;
                this.promotion_discount = 0;
                this.full_mall_activity.map(item => {
                    item.selected = 0;
                });
            },
            //获得实际支付费用
            get_total_price(val) {

                this.total_price = this.total_price - this.discount_ -
                    this.coupon_discount - this.promotion_discount;
            },
            //清除优惠券
            clear_coupon_discount() {
                this.coupon_preferential = 0;
                this.coupon_amount = 0;
                this.coupon_code = "";
                this.coupon_discount = 0;
                this.coupon_type = "";
                this.coupon_help = "";
                this.code_stage = 1;
            },
            // 提交验证码
            code_apply(coupon_code) {
                if (this.coupon_code === "") {
                    this.isCodes = false;
                    this.iscodemsg = "Required field";
                }
                this.coupon_preferential = 0;
                this.coupon_amount = 0;
                if (coupon_code == "") {
                    this.coupon_help = "This coupon does not exist or is invalid.";
                    this.code_stage = 0;
                    this.coupon_discount = 0;
                    this.get_total_price();
                } else {
                    this.$Http.cart
                        .checkCouponAvailabilityByCart({
                            coupon_code: this.coupon_code,
                            cart_ids: this.cartIdAll,
                            session_id: this.session_id,

                        })
                        .then(res => {
                            let {
                                code,
                                data,
                                msg
                            } = res;
                            if (code == 200) {
                                this.coupon_type = data.type;
                                this.code_stage == 1;
                                this.coupon_help = data.name;
                                this.isCodes = "1";
                                this.issuccess = true;
                                this.iscodemsg = data.name;
                                this.coupon_codes = this.coupon_code;
                                if (data.discount == 0) {
                                    this.coupon_preferential = Number(data.preferential);
                                } else {
                                    this.coupon_amount = Number(data.discount);
                                }
                                this.total_price = JSON.parse(JSON.stringify(this.old_total_price))
                                this.get_coupon_discount();
                                if (this.promotion_discount != 0) {
                                    this.visible = true;
                                } else {
                                    this.promotion_discount = 0;
                                    this.get_promotion_discount();
                                }
                                this.get_total_price();
                            } else {
                                this.code_stage = 1;
                                this.coupon_help = msg;
                                this.coupon_discount = 0;
                                this.isCodes = false;
                                this.iscodemsg = msg ? msg : 'This coupon does not exist or is invalid.';
                            }
                        });

                }
            },
            get_promotion_list() {

                if (this.full_mall_activity) {
                    sortBykey(this.full_mall_activity, "purchase_amount_min");
                    this.full_mall_activity.sort(sortBykey("purchase_amount_min"));
                    
                    this.full_mall_activity.map(item => {
                        let type = item.purchase_number_max == 0 && item.purchase_number_min == 0
                        let amount_min_arr = ''
                        if (type) {
                            amount_min_arr = this.full_mall_activity.filter(
                                item => this.old_total_price < Number(item.purchase_amount_min)
                            );
                        } else {
                            amount_min_arr = this.full_mall_activity.filter(
                                item => this.total_num < Number(item.purchase_number_min)
                            );
                        }

                        amount_min_arr = amount_min_arr ? amount_min_arr[0] : [];
                        if (amount_min_arr) {
                            item['difference_name'] = amount_min_arr.name;
                            if (type) {
                                item['difference_prive'] = (Number(amount_min_arr
                                        .purchase_amount_min) -
                                    (this.old_total_price - this.discount_))
                                item['difference_prive'] = 'US$' + item['difference_prive'].toFixed(2)
                            } else {
                                item['difference_prive'] = (Number(amount_min_arr.purchase_number_min) - this
                                    .total_num)
                            }

                        } else {
                            item['difference_prive'] = 0;
                        }

                        item.pro_discount =
                            item.discount > 0 ?
                            100 - Number(item.discount).toFixed(2) + "% OFF" :
                            item.preferential > 0 ?
                            "-$" + Number(item.preferential).toFixed(2) :
                            0;
                        item.pro_discount_ =
                            item.purchase_amount_min > 0 ?
                            "OVER $" + Number(item.purchase_amount_min).toFixed(2) :
                            "QUANTITY " + Number(item.purchase_number_min).toFixed(2);
                        if (item.purchase_number_max == 0 && item.purchase_number_min == 0) {
                            if (
                                this.total_price - this.discount_ >= item.purchase_amount_min
                            ) {
                                item.enable = 1;
                            } else {
                                item.enable = 0;
                            }
                        } else {

                            if (
                                this.total_num >= item.purchase_number_min
                            ) {
                                item.enable = 1;
                            } else {
                                item.enable = 0;
                            }
                        }

                    });
                    // this.full_mall_activity.map(item=>{
                    //     console.log(item['pro_discount'])
                    //     item['pro_discount'].sort((a,b)=>{
                    //         console.log(a,b,'--a,b')
                    //      })
                    // })
                }
            }
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
        created() {
            const {
                session_id
            } = this.$route.query;
            localStorage.setItem('cart.m.session_id', session_id)
            this.created_data();

        },
        components: {
            Mycartlist,
            Nullshops,
            HeaderTab
        }
    };
  
    function sortBykey(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/_var.scss";
    @import "@/assets/style/mixins.scss";

    .use-checkbox {
        border: 0.02667rem solid #c8c9cc;
        border-radius: 100%;
        width: 1.25em;
        height: 1.25em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
    }
    

    .use-checkbox-ative {

        background-color: #161616;

        i {
            color: #fff;
        }
    }

    .use-checkbox-main {
        display: flex;
        align-items: center;

        span {
            margin-left: pxto2(10px);
        }
    }


    .btn-sub {
        @include btnsSubmit();
        color: $withe-1;
    }

    .yhum-form {
        display: flex;
        align-items: center;

        .btn-sub {
            margin-bottom: 0;
        }
    }

    .coupon-main {
        .item {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: pxto2(20px);

            p {
                width: 100%;
                text-align: center;
                @include fontSize24();
                color: #FF6600;
            }
        }

        .hx-bg-coupon {
            width: pxto2(550px);
            height: pxto2(100px);
            display: flex;
            align-items: center;
            justify-content: center;
            @include fontSize24();

            div {
                overflow: hidden;
                flex: 1;
                padding-left: pxto2(20px);
            }

            i {
                font-size: pxto2(40px);
                margin: 0 pxto2(20px);
            }
        }
    }

    .user-allorder-info {
        padding-bottom: pxto2($px107);
    }

    .my-cart-main {



        .cart-shop-list {
            padding: pxto2($px20);

        }

        .user-allorder {
            background: $withe;
            @include fontSize24();
            color: $font-soclor;

            .use-allorder-mos {
                padding: pxto2($px20);
            }

            .user-type-moneu-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: pxto2($px10);

            }

            .user-order-total-cn {
                margin-top: pxto2($px30);
            }


        }

        .use-cart-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: pxto2($px100);
            background: $withe;
            border-top: 1px solid #DADADA;
            padding-left: pxto2($px10);
            position: fixed;
            // bottom: pxto2($px100);
            bottom:0;
            left: 0;
            right: 0;
            z-index: 990;

            .use-cart-bottom-ri {
                display: flex;
                align-items: center;

                a {
                    background: $block;
                    color: $withe;
                    height: pxto2($px100);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 pxto2($px40);
                }

                span {
                    @include fontSize36();
                    color: $block;
                    margin-right: pxto2($px20);
                }
            }


        }
    }

    .my_cart {
        .btn-charlist-totle {
            /* width: 10rem; */
            height: 6.8rem;
            background: #fff;
            margin-top: 0.26667rem;
            position: relative;
            bottom: 0;
            /* left: 50%; */
            /* margin-left: -5rem; */
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

        .btn-charlist-totle .user-allorder {
            box-shadow: 0 0 0 0;
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

        .user-allorder .user-allorder-con {
            padding: 0 0.26667rem;
            margin-top: 0.25333rem;
            margin-bottom: 5px;
            /* height: 164px; */
            /* border: solid 1px red; */
            position: relative;
        }

        .user-allorder .use-allorder-mos {
            padding: 0 0.26667rem;
        }

        .user-allorder .use-allorder-mos .user-type-moneu-info {
            width: 100%;
            font-size: 0.26667rem;
            line-height: 0.5rem;
        }

        .user-allorder .use-allorder-mos .user-type-moneu-info .info-msg,
        .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
            font-size: 0.32rem;
        }

        .user-allorder .use-allorder-mos .user-type-moneu-info .info-price {
            float: right;
            font-size: 0.32rem;
            font-weight: 400;
        }

        .user-allorder .use-allorder-mos .user-order-total-cn {
            margin-top: 10px;
            /* height: 182px; */
            border-top: solid 2px #ededed;
            border-top: solid 1px #ededed;
            padding: 5px 0;
        }

        .user-allorder .use-allorder-mos .user-type-moneu-info {
            width: 100%;
            font-size: 0.26667rem;
            line-height: 0.5rem;
        }

        .user-allorder .use-allorder-mos .user-order-total-cn .info-price {
            font-weight: 700;
        }

        .bigger_discount_all {
            padding: 0.33333rem 0.53333rem;
            background: #fff;
        }

        .bigger_discount_all .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.32rem;
            color: #252525;
            padding: 0.26667rem;
            background: #eeeeee;
        }

        .bigger_discount_div {
            padding: 10px;
        }

        .bigger_discount_div {
            border: 1px solid #efefef;
        }

        .discount_th {
            // background: url(@/assets/img/discount_th.png);
            background-size: 100% 100%;
            background-repeat: round;
        }

        .discount_nd {
            background-image: require("../../assets/img/discount_nd.png");
            background-size: 100% 100%;
            background-repeat: round;
            cursor: pointer;
        }

        .bigger_discount {
            display: flex;
            align-items: center;
            margin: 5px 20px;
            height: 50px;
            position: relative;
            font-size: 0.35rem;
            color: #252525;
            margin: 5px auto;
        }

        .bigger_discount p {
            width: 32%;
            text-align: center;
        }

        .bigger_discount span {
            width: 60%;
            text-align: center;
        }

        .detail-message-main {
            background-color: #fff;
            padding: 0.33333rem 0.53333rem;
        }

        .user-addchar-yhmbtn {
            // height: 3.16rem;
            background-color: #eeeeee;
            padding: 0.50667rem 0.26667rem;
        }

        .user-addchar-yhmbtn .yhum-form {
            display: -ms-flexbox;
            display: flex;
            margin: 6px 0;
            position: relative;
        }

        .user-addchar-yhmbtn p {
            font-size: 0.32rem;
            color: #c9666a;
        }

        .user-addchar-yhmbtn p {
            font-size: 0.32rem;
            color: #c9666a;
        }

        .user-addchar-yhmbtn .yhum-form .yhum-value {
            width: 6.4rem;
            height: 1.08rem;
            background-color: #ffffff;
            border-radius: 5px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            font-size: 0.32rem;
            text-indent: 0.26667rem;
        }

        .user-addchar-yhmbtn .yhum-form .youhunma-error {
            color: #c9666a;
            // display: none;
        }

        .user-addchar-yhmbtn .yhum-form i {
            position: absolute;
            top: 5px;
            right: 2.10667rem;
            width: 0.48rem;
            height: 0.48rem;
            display: block;
            font-size: 0.53333rem;
            font-style: normal;
        }

        .user-addchar-yhmbtn .yhum-form .yhum-btn {
            width: 2rem;
            height: 1.08rem;
            border: 0;
            background-color: #161616;
            box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            font-size: 0.32rem;
            color: #fff;
        }

        .user-info-cn {
            background: #fff;
            margin-top: 10px;
            padding: 0.26667rem 0;
        }

        .user-info-cn .user-info-cns {
            width: 8.93333rem;
            margin: 0 auto;
        }

        .bag_title {
            text-align: center;
            font-size: 0.4rem;
            padding-bottom: 5px;
            border-bottom: 1px solid #f5f5f5;
            margin-bottom: 10px;
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

        .user-allorder .user-allorder-con {
            padding: 0 0.26667rem;
            margin-top: 0.25333rem;
            margin-bottom: 5px;
            /* height: 164px; */
            /* border: solid 1px red; */
            position: relative;
        }

        .user-allorder .user-allorder-con .user-char-remove {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 0.42667rem;
            color: #6e6e6e;
            cursor: pointer;
        }

        .user-allorder .user-allorder-con .user-order-cn-imgs {
            float: left;
            width: 1.68rem;
            height: 2.18667rem;
            overflow: hidden;
            position: relative;
            z-index: 10;
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

        .char-list-right-type {
            float: left;
            width: 82%;
        }

        .char-list-right-type .char-list-type-lis .char-list-type-lis-type {
            color: #bfbfbf;
        }

        .char-list-right-type .char-list-type-lis .char-list-type-lis-val {
            color: #161616;
            margin-left: 10px;
        }

        .char-list-right-type .char-list-type-lis span {
            font-size: 0.32rem;
            float: left;
        }

        .char-list-right-type .char-list-type-lis .char-list-type-lis-btn {
            cursor: pointer;
            color: #8e8e8e;
            margin-left: 0.78667rem;
            text-decoration: underline;
            float: right;
        }
    }
</style>