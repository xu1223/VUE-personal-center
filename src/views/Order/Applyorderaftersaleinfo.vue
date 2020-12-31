<template>
    <div>
        <HeaderTab/>
        <div class="confirm_order_info msg-conten-top" :action="action">
            <div class="order-tab-con">
                <div class="user-allorder-lis">
                    <div class="user-allorder redund-pa">
                        <a href="javascript:void(0);">
                            <div class="user-allorder-head">
                                <b class="flyoon">FLYOON</b>
                                <b class="payment">{{ headerTitle }}</b>
                            </div>
                        </a>
                        <div class="user-allorder-con clearfix">
                            <a href="javascript:void(0);" @click="LINKURL(db_selectlist)">
                                <div class="user-order-cn-imgs">
                                    <img v-lazy="db_selectlist.img_m"/>
                                </div>
                            </a>
                            <div class="user-order-cn-right clearfix">
                                <a href="javascript:void(0);"></a>
                                <a
                                        class="order-cn-right-title"
                                        href="javascript:void(0);"
                                        @click="LINKURL(db_selectlist)"
                                >{{ db_selectlist.name }}s</a
                                >
                                <div class="order-cn-right-type">
                                    <div class="right-type-lis">
                    <span class="right-type-lis-type"
                    >Size: {{ db_selectlist.size }}</span
                    >
                                        <p class="right-type-lis-price">
                                            ${{ db_selectlist.price }}
                                        </p>
                                    </div>
                                </div>
                                <div class="order-cn-right-type">
                                    <div class="right-type-lis">
                    <span class="right-type-lis-type"
                    >Color: {{ db_selectlist.color }}</span
                    >
                                        <p class="right-type-lis-price price2">
                                            ${{ db_selectlist.show_price }}
                                        </p>
                                    </div>
                                </div>
                                <i class="user-order-nums">*{{ db_selectlist.quantity }}</i>
                            </div>
                        </div>
                        <div class="use-allorder-mos">
                            <div class="user-type-moneu-info clearfix">
                                <span class="info-msg">Delivery:</span>
                                <span class="info-price"
                                >${{ db_selectlist.subtotal_price }}</span
                                >
                            </div>
                            <!--<div class="user-type-moneu-info clearfix">
                                              <span class="info-msg">Preferential:</span>
                                              <span class="info-price">$10.00</span>
                            </div>-->

                            <div class="user-order-total-cn">
                                <div class="user-type-moneu-info clearfix">
                                    <span class="info-msg">Total number of products:</span>
                                    <span class="info-price" style="font-weight:700;">{{
                    db_selectlist.total_number
                  }}</span>
                                </div>
                                <div class="user-type-moneu-info clearfix">
                                    <span class="info-msg">Total Price (Actual Payment):</span>
                                    <span class="info-price" style="font-weight:700;"
                                    >US ${{ db_selectlist.total_price }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="redund1">
                <div>
                    <Userselect
                            :pr="'Reason for return'"
                            :formdata="listdatas || []"
                            :value.sync="return_reason"
                            :msg="'Reason for return'"
                    />
                </div>
                <div
                        class="hx-form-group hx-must"
                        v-if="db_selectlist.return_action != 3"
                >
                    <label class="hx-form-label">Refund amount:</label>
                    <div class="hx-input-block">
                        <input
                                type="text"
                                v-model="parms.refund_amount"
                                name="old_password"
                                placeholder="Please enter the old password "
                                autocomplete="off"
                                class="hx-input"
                        />
                        <i class="iconfont"></i>
                    </div>
                    <em class="hx-form-tips">Required field</em>
                    <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
                    password.</span>-->
                </div>

                <span class="hx-input-span"
                >The maximum refund amount is the total amount of the goods.</span
                >
                <div class="hx-form-group hx-must" style="margin-top:10px;">
                    <label class="hx-form-label">Remarks:</label>
                    <div class="hx-input-block">
            <textarea
                    placeholder
                    class="hx-textarea hx-input"
                    name="description"
                    v-model="parms.remarks"
            ></textarea>
                        <div class="hx-text-right hx-text-right-comnum">
                            <em>{{ parms.remarks ? parms.remarks.length : 0 }}</em
                            >/
                            <span>500</span>
                        </div>
                    </div>
                    <em class="hx-form-tips" style="display: none;">Required field</em>
                </div>

                <div class="hx-form-group hx-must">
                    <div class="picture-file">
                        <div class="hx-form-labels">
                            Share pictures
                            <span>(Up to 6 sheets)</span>
                        </div>
                        <van-uploader
                                v-model="fileList"
                                :max-count="6"
                                :after-read="uploadeimgs"
                                class="uploadeimgs"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="user-navbtn" style="justify-content: center;">
            <a href="javascript:void(0);" class="btn-link" @click="orderSend()"
            >SUBMIT</a
            >
        </div>
    </div>
</template>

<script>
    import HeaderTab from "@/components/HeaderTab";
    import Userselect from "@/components/Userselect.vue";
    import Message from "@/util/message.js";
    import {sendParamInUrl} from "@/util/tools";

    export default {
        data() {
            return {
                refund_amount: "",
                remarks: "",
                return_reason: 1,
                listdatas: [],
                actionsType: [
                    {id: 1, name: "cargo damage", type: 1},
                    {id: 2, name: "Poor quality of goods", type: 1},
                    {id: 3, name: "Cancellation of order", type: 1},
                    {id: 1, name: "Customer Country Customs Clearance", type: 2},
                    {id: 2, name: "Customer Cancellation", type: 2},
                    {id: 3, name: "Unsatisfactory quality", type: 2},
                    {
                        id: 1,
                        name: "Goods damaged or inconsistent with the agreement",
                        type: 3
                    },
                    {
                        id: 2,
                        name: "want to change to different colors, sizes or styles.",
                        type: 3
                    }
                ],
                action: "",
                headerTitle: "",
                db_selectlist: {},
                fileList: [],
                parms: {
                    return_action: "", //	int	是	售后方式:1:退款 2:退货退款 3:换货 4:补发
                    order_product_id: "", //	int	是	订单商品表id
                    return_reason: 1, //	string	是	售后原因
                    refund_amount: "", //	float	否	退款金额
                    remarks: "", //	string	否	备注
                    images: [] //	array	是	售后凭证图片集
                }
            };
        },
        methods: {
            LINKURL(item) {
                sendParamInUrl({url: item.product_url});
            },
            onClickLeft() {
                window.history.back(-1);
            },
            uploadeimgs(files) {
                files.status = "uploading";
                files.message = "loading...";
                let file = files.file;
                this.$Http.order.orderReturnImageUpload({file}, true).then(res => {
                    let {code,data} = res;
                    if (code == 200) {
                        files.status = "";
                        files.message = "";
                        this.parms["images"].push(data);
                    }
                });

            },
            orderSend() {
                // this.return_reason
                this.listdatas.forEach(item => {
                    if (item.id == this.return_reason) {
                        this.parms.return_reason = item.name;
                    }
                });

                let newArr = {};
                if (this.parms.images) {
                    this.parms.images.forEach((v, index) => {
                        if (!newArr["images[" + index + "]"]) {
                            newArr["images[" + index + "]"] = v;
                        }
                    });
                }
                delete this.parms["images"];
                this.$Http.order
                    .generateOrderAfterSale({...this.parms, ...newArr}, true)
                    .then(res => {
                        let  {code,data,msg} = res;
                        if (code == 200) {
                            // this.$router.push({
                            //     path: "/order/after_sale_details",
                            //     query: {
                            //         return_no: data
                            //     }
                            // });
                        } else {
                            Message({msg: msg});
                        }
                    });
            }
        },
        created() {
            if (this.$route.query.id) {
                this.action = this.$route.query.action;
                this.actionsType.forEach(v => {
                    if (parseInt(this.action) === v.type) {
                        this.listdatas.push(v);
                    }
                });
                if (this.action === "1" || this.action === 1) {
                    this.headerTitle = "Refund";
                } else if (this.action === "2" || this.action === 2) {
                    this.headerTitle = "Return and refund";
                } else if (this.action === "3" || this.action === 3) {
                    this.headerTitle = "Exchange";
                }
                this.parms.return_action = parseInt(this.action);
                this.$Http.order
                    .getOrderProductDetail({order_product_id: this.$route.query.id})
                    .then(res => {
                        let {code,data} = res;
                        if (code == 200) {
                            this.db_selectlist = data;
                            this.parms.refund_amount = data.max_return_amount;
                            // this.parms.order_product_id = data.product_id
                            this.parms.order_product_id = this.$route.query.id;
                        }
                    });
            }
        },
        components: {
            Userselect,
            HeaderTab
        }
    };
</script>

<style lang="scss" scoped>
    .confirm_order_info {
        .user-allorder {
            // width: 100%;s
            /* height: 520px; */
            background-color: #ffffff;
            box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
            border: solid 1px #f5f5f5;
            margin: 0 auto 0.26667rem;
            padding-bottom: 0.26667rem;
        }

        .redund-pa {
            padding: 0.26667rem 0.53333rem;
        }
        .redund1 {
            background: #fff;
            padding: 0.53333rem 0.8rem;
        }
        .hx-input-span {
            /* font-family: "SH-ExtraLight"; */
            font-size: 0.26667rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.33333rem;
            letter-spacing: 0px;
            color: #bfbfbf;
            padding-top: 10px;
            display: block;
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
        .user-allorder .user-allorder-con {
            padding: 0 0.26667rem;
            margin-top: 0.25333rem;
            margin-bottom: 5px;
            position: relative;
        }
        .user-allorder .user-allorder-con .user-order-cn-imgs {
            float: left;
            width: 1.68rem;
            height: 2.18667rem;
            overflow: hidden;
            position: relative;
            z-index: 10;
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
        .right-type-lis-price {
            float: right;
            font-size: 0.32rem;
            float: right;
            display: block;
        }
        .user-allorder .user-allorder-con .user-order-cn-right .user-order-nums {
            color: #888;
            font-size: 0.32rem;
            text-align: right;
            border: solid transparent;
            display: block;
            font-style: normal;
            position: absolute;
            right: 0;
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
    }
</style>
