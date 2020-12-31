<template>
    <div>
        <div class="cart-header">
            <div class="le">
                <a @click="isAllFalse = true">Move To Wishlist</a>
                <a @click="isAllcarFalse = true">Delete</a>
            </div>
            <div class="ri" @click="visible">
                <i class="pers-youhuiquan iconfont "></i>
                COUPON
            </div>
        </div>
        <van-checkbox-group v-model="tt" ref="checkboxGroup" class="hx-van-radio1">
            <div class="cartlist-item" v-for="(item, index) in formdata || []" :key="index">
                <van-checkbox :name="item.id"></van-checkbox>
                <div class="le" @click="LINKURL(item)">
                    <img v-lazy="item.img_m" alt />
                </div>
                <div class="ri">
                    <p class="ri-title" @click="LINKURL(item)">
                        {{ item.name }}
                    </p>
                    <div class="ri-size-color">
                        <p>Color:<span>{{ item.color}}</span></p>
                        <p>Size:<span>{{ item.size}}</span></p>
                    </div>
                    <div class="ri-moeny">
                        <span style="color: #bbb;text-decoration: line-through;">
                            {{ list.currency_symbol}}{{ (item.pov_show_price * item.quantity) | numFilter }}
                        </span>
                        {{ (item.pov_price * item.quantity) | numFilter }}
                    </div>
                    <div class="ri-size-color">
                        <i class="iconfont iconLQYyuanwangqingdan char-aixin" @click="cart_add_all_to_wish(item)"></i>
                        <span class="ri-modify" @click="modifyedit(item, index)">MODIFY</span>
                        <p>Qty:<span>{{ item.quantity}}</span></p>
                    </div>

                </div>
            </div>

        </van-checkbox-group>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="display:none">
            <input type="hidden" :value="formdata" />
            <van-list v-model="loading" :finished="finished" finished-text @load="onLoad" loading-text="loading..."
                class="loadlist-user">
            </van-list>
        </van-pull-refresh>

        <van-overlay :show="isEdit" @click="isEditModeify" z-index="1000" />
        <div class="layui-layer layui-layer-page layer_emerge" id="layui-layer3" type="page" times="3" showtime="0"
            contype="string" style="z-index: 19891017; top: 152px; left: 18.75px;" v-show="isEdit">
            <div class="layui-layer-title" style="cursor: move;">MODIFY</div>
            <div id class="layui-layer-content">
                <div class="use-allorder-confirm-con-msg">
                    <Selectradio :formdata="editcat.sizeList ? editcat.sizeList : []" :value.sync="parms.size"
                        :title="'Size'" />
                    <Selectradio :formdata="editcat.clolorList ? editcat.clolorList : []" :value.sync="parms.color"
                        :title="'Color'" />
                    <div class="use-allorder-confi-msg-types">
                        <p class="confi-msg-types-name">Qty</p>
                        <div class="confi-msg-types-vals confi-msg-types-btn">
                            <span>
                                <i class="iconfont iconLQYjian btn-min" @click="miusSum()"></i>
                            </span>
                            <input type="text" v-model="parms.quantity" class="list-confirm-char-data-val"
                                maxlength="3" />
                            <span>
                                <i class="iconfont iconLQYjia btn-add" @click="addSum()"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <span class="layui-layer-setwin"></span>
            <div class="layui-layer-btn layui-layer-btn-">
                <a class="layui-layer-btn1" @click="isEditModeify">CANCEL</a>
                <a class="layui-layer-btn0" @click="cart_quantity()">CONFIRM</a>
            </div>
            <span class="layui-layer-resize"></span>
        </div>

        <!--心愿单-->
        <CartConfirm :formdata="wishlistData ? wishlistData : {}" :isShow.sync="isShowwish" :isAll="false" :isMsg="true"
            :title="tipMsg.CART_MOVE_TITLE" :msg="tipMsg.CART_MOVE" @change="wishlistChange" />
        <!--删除-->
        <CartConfirm :formdata="deleteData ? deleteData : {}" :isShow.sync="isShowdel" :isAll="false" :isMsg="true"
            :title="tipMsg.CART_DELETE_TITLE" :msg="tipMsg.CART_DELETE" @change="deleteChange" />
        <!--所有清空-->

        <CartConfirm :formdata="{}" :isShow.sync="isAllFalse" :isAll="false" :title="tipMsg.CART_MOVE_ALL_TITLE"
            :msg="tipMsg.CART_MOVE_ALL" @change="addAlls" />
        <CartConfirm :formdata="{}" :isShow.sync="isAllcarFalse" :isAll="false" :title="tipMsg.CART_EMPTY_TITLE"
            :msg="tipMsg.CART_DELETE" @change="clearAlls" />


    </div>
</template>

<script>
    import Selectradio from "@/components/Selectradio.vue";
    import {
        sendParamInUrl
    } from "@/util/tools";
    import CartConfirm from './Components/CartConfirm';
    import mesgTip from "@/lang/en.js";
    import {
        CollapseItem
    } from 'vant';
    export default {
        props: ["formdata", "ids", 'value'],
        model: {
            prop: 'value',
            event: 'throwValue'
        },
        data() {
            return {
                cartIdAll: [], //购物车选中id
                tipMsg: mesgTip.CENTER,
                isAllFalse: false,
                isAllcarFalse: false,
                isModeify: false,
                isShowwish: false,
                wishlistData: {},
                deleteData: {},
                isShowdel: false,
                parms: {
                    size: 1,
                    color: 1,
                    quantity: ""
                },
                editcat: {
                    clolorList: [],
                    sizeList: []
                },
                isAll: false,
                isaddWhislst: false,
                show: false,
                refreshing: false,
                loading: false,
                finished: false,
                db_selelctlist: [],
                pages: 1,
                return_order_count: 0,
                list: {},
                showList: {},
                isWishbtn: false,
                isEdit: false,
                isDelete: ""
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
        watch: {
            formdata: function (val) {
                this.db_selelctlist = this.formdata;
            },
            ids: function () {
                // this.db_selelctlist = this.formdata;
            }
        },
        methods: {
            visible() {
                this.$emit("visiblechange", true);
            },
            LINKURL(item) {
                sendParamInUrl({
                    url: item.product_url
                });
            },
            addAllclose() {
                this.isaddWhislst = false;
            },
            addAlls(type) {
                this.addAll();
            },
            clearAlls() {
                this.delAll_Clear();
            },
            // 添加全部
            All_Add() {
                this.isAllFalse = !this.isAllFalse
                this.tip = {
                    title: this.tipMsg.CART_MOVE_ALL_TITLE,
                    msg: this.tipMsg.CART_MOVE_ALL
                };
            },
            addAll() {
                this.$Http.cart.cartAddAllToWish().then(res => {
                    let {
                        code
                    } = res;
                    if (code == 200) {
                        this.wishlist_ids();
                        this.$emit("changeAll", this.isDelete);
                    }
                    this.isAllFalse = false;
                });
            },
            wishlist_ids() {
                this.$Http.common.getAllWishlistProductIds({
                    session_id: this.session_id
                }).then(res => {
                    let {
                        code,
                        data
                    } = res;
                    if (code == 200) {
                        this.$Storage.setWishlistIds(data);
                    }
                });

            },
            delAll_Clear() {
                this.$Http.cart.cartDel({
                    session_id: this.$Storage.getSessionId(),
                    cart_ids:this.tt
                }).then(res => {
                    let {
                        code
                    } = res;
                    if (code == 200) {
                        this.$emit("changeAll", this.isDelete);
                    }
                    this.isAllcarFalse = false;
                });

            },
            //  删除全部
            All_Clear() {
                this.isAll = true;
                this.tip = {
                    title: this.tipMsg.CART_EMPTY_TITLE,
                    msg: this.tipMsg.CART_EMPTY
                };
                this.isAllcarFalse = !this.isAllcarFalse;
            },
            isEditModeify(index) {
                this.isEdit = false;
                this.isaddWhislst = false;
            },
            modifyedit(item, index) {
                this.isDelete = index;
                this.isEdit = !this.isEdit;
                // this.isModeify = true;
                this.editcat = {
                    sizeList: [],
                    clolorList: []
                };
                this.parms.size = item.product_option_value_id;
                this.parms.id = item.id;
                this.editcat.sizeList = item.product_option_value.Size || [];
                this.editcat.clolorList = item.product_option_value.Color || [];
                this.parms["quantity"] = item.quantity;
                this.parms.color = item.product_option_value.Color[0]["id"];
            },
            miusSum() {
                if (this.parms.quantity <= 1) {
                    this.parms.quantity = 1;
                    return false;
                }
                this.parms.quantity = --this.parms.quantity;
            },
            addSum() {
                this.parms.quantity = ++this.parms.quantity;
            },
            modifyeditChange(item) {
                let {
                    parms
                } = item
                this.$emit("changeUpdate", parms);
                this.$emit("ids:update", this.isDelete);
            },
            cart_quantity() {
                let params = {};
                if(localStorage.getItem('cart.m.session_id')){
                    let session_id = localStorage.getItem('cart.m.session_id')
                    params['session_id'] = session_id;
                }
                this.$Http.cart
                    .cartEdit({
                        quantity: this.parms.quantity,
                        cart_id: this.parms.id,
                        product_option_value_id: this.parms.size,
                        ...params
                    }).then(res => {
                        let {
                            code
                        } = res;
                        if (code == 200) {
                            this.isEdit = false;
                            let items = {
                                parms: this.parms,
                                index: parseInt(this.isDelete)
                            };
                            setTimeout(() => {
                                // location.reload();
                                this.$emit("changeUpdate", items);
                                this.$emit("ids:update", this.isDelete);
                                // this.$emit("changes", true);
                                this.$emit("change", this.isDelete);
                            }, 200);
                        }
                    });


                // });
            },
            onRefresh() {
                this.pages = 1;
            },
            isShowhide() {
                this.show = false;
            },
            onLoad() {
                if (this.refreshing) {
                    this.db_selelctlist = [];

                    this.refreshing = false;
                }
                this.$Http.cart.getCarts({
                    page: this.pages++
                }).then(res => {
                    let {
                        code,
                        data
                    } = res;
                    if (code == 200) {
                        data.list.forEach(item => {
                            this.db_selelctlist.push(item);
                        });
                        // this.db_selelctlist = data;
                        this.return_order_count = data.list.length;
                        this.list = data;
                        this.loading = false;
                        if (this.db_selelctlist.length >= this.return_order_count) {
                            this.finished = true;
                        }
                    }
                });

            },
            cart_del(item, index) {
                // this.show = !this.show;
                // this.showList = item;
                // this.isWishbtn = false;
                this.isDelete = index;
                this.isShowdel = true;
                this.deleteData = item;
            },
            cart_add_all_to_wish(item) {
                // this.show = !this.show;
                this.showList = item;
                this.isWishbtn = true;
                this.wishlistData = item;
                this.isShowwish = true;
            },
            wishlistChange(item) {
                this.$Http.cart
                    .wishDo({
                        product_ids: [item.product_id],
                        cart_ids: [item.id]
                    })
                    .then(res => {
                        let {
                            code
                        } = res;
                        if (code == 200) {
                            this.show = false;
                            this.wishlist_ids();
                            this.$emit("change", this.isDelete);
                        }
                        this.isShowwish = false;
                    });
            },
            deleteChange(item) {
                this.$Http.cart.cartDel({
                    cart_ids: item.id
                }).then(res => {
                    let {
                        code
                    } = res;
                    if (code == 200) {
                        this.$emit("change", this.isDelete);
                    } else {
                        this.show = !this.show;
                    }
                    this.isShowdel = false;
                });
            },
            /**
             *@item shuju
             *@index 类型 1心愿单 0删除
             */
            deleFncar(item, index) {
                this.isDelete = index;
                if (index === 0) {
                    this.$Http.cart.cartDel({
                        cart_ids: item.id
                    }).then(res => {
                        let {
                            code
                        } = res;
                        if (code == 200) {
                            this.show = !this.show;
                            // Toast.success(msg);
                            // setTimeout(() => {
                            this.$emit("change", this.isDelete);
                            // }, 200);
                        } else {
                            this.show = !this.show;
                        }
                    });

                } else {
                    this.$Http.cart
                        .wishDo({
                            product_ids: item.product_id,
                            cart_ids: [item.id]
                        })
                        .then(res => {
                            let {
                                code
                            } = res;
                            if (code == 200) {
                                this.show = !this.show;
                                this.wishlist_ids();
                                this.$emit("change", this.isDelete);
                            }
                        });

                }
            },
            clerFncar() {
                this.show = !this.show;
            },
            toggleAll(e) {
                this.$refs.checkboxGroup.toggleAll(e);
            },
        },
        mounted() {
            setTimeout(() => {
                this.toggleAll(true)
            }, 1000)
        },
        computed: {
            tt: {
                get: function () {

                    return this.value;
                },
                set: function (val) {
                    this.$emit('throwValue', val)
                }
            }

        },
        components: {
            Selectradio,
            CartConfirm,
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/style/_var.scss";
    @import "@/assets/style/mixins.scss";


    .cart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: pxto2($px80);
        background: $withe;
        padding: 0 pxto2($px20);
        margin: pxto2($px20) 0;
        @include fontSize24();

        .le {
            display: flex;
            font-weight: 300;
            color: $font-soclor;
            line-height: pxto2($px40);
            height: pxto2($px40);
            border-bottom: solid 1px $info;
            a {
                margin-right: pxto2($px5);
            }
        }

        .ri {
            color: $pick;
        }

    }

    .cartlist-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background: $withe;
        padding: pxto2($px20);
        margin-bottom: pxto2($px20);
        @include bRadius4();

        .le {
            width: pxto2($px180);

            img {
                width: 100%;
                margin-left: pxto2($px10);
            }
        }

        .ri {
            margin-left: pxto2($px20);
            flex: 1;
            width: 0px;

            .ri-title {
                color: #252525;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                @include fontSize24();
            }

            .ri-size-color {
                display: flex;
                margin: pxto2($px25) 0;

                justify-content: space-between;

                p {
                    @include fontSize24();
                    color: #888888;

                    span {
                        color: #333333;
                    }
                }

                .ri-modify {
                    @include fontSize24();
                    text-decoration: underline;
                    cursor: pointer;
                    color: #8e8e8e;
                }

            }

            .ri-moeny {
                @include fontSize30();
                color: #F395CB;
                display: flex;

                span {
                    margin-right: pxto2($px10);
                }
            }

        }
    }


    .van-overlay {
        z-index: 100;
    }

    body .layer_emerge .item_confirm_enquire_ {
        padding: 20px;
    }





    .layui-layer {
        -webkit-overflow-scrolling: touch;
        top: 150px;
        left: 0;
        margin: 0;
        padding: 0;
        background-color: #fff;
        -webkit-background-clip: content;
        border-radius: 2px;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
    }

    .layer_emerge {
        width: 90%;
        margin: auto;
        left: 0 !important;
        right: 0;
    }

    .layui-layer,
    .layui-layer-shade {
        position: fixed;
        _position: absolute;
        pointer-events: auto;
    }

    .layer_emerge .layui-layer-title {
        color: #161616;
        font-size: 15px;
        background: #fff;
        border-bottom: 1px solid #161616;
        padding: 0 10px;
        font-weight: bold;
    }

    .layui-layer-title {
        padding: 0 80px 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        background-color: #f8f8f8;
        border-radius: 2px 2px 0 0;
    }

    .bag_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .bag_btn a {
        color: #bbbbbb;
        font-size: 0.33rem;
        text-align: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #f5f5f5;
        margin: 0 10px;
        cursor: pointer;
    }

    .layer_emerge .layui-layer-content {
        font-size: 13px;
    }

    .layui-layer-page .layui-layer-content {
        position: relative;
        overflow: auto;
    }

    .item_confirm {
        display: flex;
        padding: 10px;
        background: rgba(246, 246, 246, 1);
        align-items: flex-start;
    }

    .layer_emerge .item_confirm_enquire {
        padding: 10px;
    }

    .item_confirm img {
        width: 65px;
    }

    .item_confirm .item_confirm_ {
        padding-left: 5px;
    }

    .item_confirm .item_confirm_ p {
        padding-bottom: 3px;
    }

    .ellipsis-many {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .item_confirm .item_confirm_ p {
        padding-bottom: 3px;
    }

    .item_confirm .item_confirm_ span {
        display: block;
    }

    .layer_emerge .layui-layer-btn {
        text-align: center;
    }

    .layui-layer-iframe .layui-layer-btn,
    .layui-layer-page .layui-layer-btn {
        padding-top: 10px;
    }

    .layui-layer-btn {
        text-align: right;
        padding: 0 15px 12px;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
    }

    .layer_emerge .layui-layer-btn a {
        border: 1px solid #dbdbdb;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        font-size: 12px;
        width: 46%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        word-break: break-all;
    }

    .layui-layer-btn a {
        height: 28px;
        line-height: 28px;
        margin: 5px 5px 0;
        border: 1px solid #dedede;
        background-color: #fff;
        color: #333;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
        padding: 10px 30px;
    }

    .layer_emerge .layui-layer-btn .layui-layer-btn0 {
        background: #161616;
        border-radius: 5px;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
        color: #fff;
    }

    .user-info-cn .user-info-cns .user-allorder-info {
        box-shadow: none;
    }

    .user-allorder-con {
        display: flex;
        justify-content: space-between;
    }









    .use-allorder-confirm-con-msg {
        padding: 0 0.26667rem;
        margin-top: 0.8rem;
        overflow: hidden;
        overflow-y: auto;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types {
        margin-bottom: 0.38667rem;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-name {
        font-size: 0.32rem;
        text-align: center;
        color: #161616;
    }

    .confi-msg-types-name {
        margin-bottom: 0.2rem;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-vals {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -10px;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-vals .types-vals-active {
        border: solid 1px #161616;
        color: #161616;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-vals li {
        /* width: 150px; */
        padding: 0 0.53333rem;
        height: 0.8rem;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #f6f6f6;
        display: block;
        line-height: 0.82667rem;
        margin-right: 5px;
        text-align: center;
        cursor: pointer;
        margin-bottom: 0.26667rem;
        font-size: 0.37333rem;
        color: #6e6e6e;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-btn {
        -ms-flex-pack: center;
        justify-content: center;
        text-align: center;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-vals {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -10px;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-btn span i.btn-min {
        background-color: #dbdbdb;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-btn span i {
        width: 0.8rem;
        height: 0.8rem;
        display: block;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 0.82667rem;
        cursor: pointer;
        margin: 0 10px;
        font-style: inherit;
        font-size: 0.5rem;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-btn input {
        width: 2.4rem;
        height: 0.8rem;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #dbdbdb;
        text-align: center;
    }

    .use-allorder-confirm-con-msg .use-allorder-confi-msg-types .confi-msg-types-btn span i.btn-add {
        background-color: #161616;
    }
</style>