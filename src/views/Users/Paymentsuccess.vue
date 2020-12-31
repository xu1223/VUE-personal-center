<template>
    <div>
        <HeaderTab />
        <div class="payment_success">
            <article class="bag-success1">
                <div class="cont">
                    <div class="cont-success-flex">
                        <i class="hx-bg-icon-img hx-lr-icon-title "></i>
                    </div>
                    <div class="cont-ri">
                        <p class="title">Your order has been placed ! </p>
                        <p><span class="title">Order Number:</span> {{db_list.invoice_no}}</p>
                        <p>Delivery of goods to {{db_list.shipment_city}} , {{db_list.shipment_zone}} ,Delvine,
                            {{db_list.shipment_postcode}} - {{db_list.shipment_country}}</p>
                    </div>



                    <!-- <div class="cont-success-flex">
                        <div class="cont-lr" style=" width: 2.5rem; ">
                            <i class="icon-info-bg icon-iconmoneygram"></i>
                        </div>
                    </div> -->
                    <div class="cont-ri cont-ri-bottom">
                        <div v-html="db_list.something[1]">

                        </div>
                    </div>
                    <div v-if="!loginshow" class="login-hidden">
                        <p>
                            We will send an email to your mailbox to inform you of the
                            order status, or you can choose
                        </p>
                        <p>
                            to contact our customer service
                            <span v-if="db_list.manager">
                                {{db_list.manager.name}} {{db_list.manager.mobile}}
                            </span>
                            for more information.
                        </p>
                        <div style="display:flex;justify-content: space-around;">
                            <!-- <a href="javascript:void(0)" @click="Shopping" class="comment-sends-cn-btns ">Continue
                                Shopping</a> -->
                            <router-link
                                :to="{path:'/order/order_detail',query:{invoice_no:db_list.invoice_no,payment:true}}"
                                style="color:#0090FF;margin-top: 0.53333rem;">
                               Continue Shopping
                            </router-link>
                            <a  style="color:#0090FF;margin-top: 0.53333rem;" href="javascript:void(0)" 
                            @click="Shopping">
                                Checking Order </a>

                        </div>
                    </div>
                    <div v-if="loginshow">
                        <p class="bottom-order">You can go to <router-link
                                
                                
                                style="color:#0090FF">
                                My Order
                            </router-link> to see the order details.
                        </p>
                        <a href="javascript:void(0)" @click="buy_again(db_list.invoice_no)"
                            class="comment-sends-cn-btns ">BUY AGAIN</a>
                    </div>



                </div>
            </article>

        </div>
    </div>
</template>

<script>
    import HeaderTab from "@/components/HeaderTab";
    import GTM from '@/util/gtm.js'
    import {
        sendParamInUrl
    } from "@/util/tools";

    //  ;
    export default {
        data() {
            return {
                db_list: {},
                loginshow: !localStorage.getItem('cart.m.userInfo'),
            };
        },
        methods: {
            Shopping() {
                sendParamInUrl({
                    page: "index"
                })
            },
            onClickLeft() {
                window.history.back(-1);
            },
            buy_again(invoice_no) {
                this.$Http.order.buyAgain({
                    invoice_no
                }).then(res => {
                    let {
                        code
                    } = res;
                    if (code == 200) {
                        // this.db_selelctlist = data;
                        this.db_selelctlist = [];
                        this.refreshing = true
                        // Toast.success(msg);
                        this.pages = 1
                        // setTimeout(() => {
                        // this.onLoad({ order_status: this.active });
                        // location.reload()
                        // _self.onLoad({ order_status: _self.active,page:1 });
                        this.$router.push('/my_cart')
                        // }, 300);
                    }
                });
            }
        },
        created() {
            // api/cart/payment_success;
            if (this.$route.query.invoice_no) {
            this.$Http.payment.paymentSuccess({
                invoice_no: this.$route.query.invoice_no
                // invoice_no: 'LBBB-201218-170335327'
            }, true).then(res => {
                let {
                    code,
                    data
                } = res;
                if (code == 200) {
                    this.db_list = data;
                    //gtm 交易统计
                    GTM.purchase(data);
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

    .login-hidden {
        @include fontSize24();

        span {
            color: #0090FF;
            cursor: pointer;
        }
    }

    .bottom-order {
        @include fontSize24();
    }

    .hx-lr-icon-title {
        width: pxto2(160px);
        height: pxto2(150px);
        display: block;
        background-position: pxto2(-1416px) pxto2(-40px);
        background-size: 39rem;
    }

    .cont-lr {
        display: flex;
        align-items: center;
    }

    .hx-btn {
        margin: 5px 0;
        display: block;
        width: 100%;
        height: 1.06667rem;
        cursor: pointer;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        font-size: 0.26667rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.16);
        background-color: #252525;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hx-btn-primary {
        background-color: #ffffff;
        border: solid 1px #252525;
        color: #252525;
    }

    .payment_success {
        background: #fff;

        article {
            -ms-flex-positive: 1;
            flex-grow: 1;
            padding: 20px;
        }

        .cont-success-flex {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            margin-bottom: 0.28rem;
        }



        .cont-ri {
            text-align: left;

            .title {
                font-weight: 700;
            }
        }

        .cont-ri p {
            font-size: 0.34rem;
            color: #252525;
            /* height: 1rem; */
            margin-bottom: 0.2rem;
        }

        .cont-ri-bottom {
            background: url('../../assets/img/panay.png');
            background-size: 100% 100%;
            padding: pxto2(40px);
            @include fontSize24();
        }

        .cont-ri-bottom p:first-child {
            font-weight: 700;
        }

        .cont-time {
            background-color: #34d0c8;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.34rem;
            color: #ffffff;
            border-radius: 4px;
        }

        .user-comment-sends-cn {
            height: 4rem;
            width: 8.93333rem;
            background: #fff;
            // position: absolute;
            // top: 50%;
            margin-top: 2.46667rem;
        }

        .user-comment-sends-cn .comment-sends-cn-tip {
            -ms-flex-pack: center;
            justify-content: center;
            text-align: center;
            display: -ms-flexbox;
            display: flex;
            height: auto;
        }

        .user-comment-sends-cn .comment-sends-cn-title {
            display: block;
            text-align: center;
            font-size: 0.42667rem;
            color: #252525;
            font-weight: 700;
        }

        .user-comment-sends-cn .comment-sends-cn-tip .comment-sends-cn-img {
            max-height: 1.33333rem;
            max-width: 1.33333rem;
            margin-bottom: 0.26667rem;
        }

        .user-comment-sends-cn .comment-sends-cn-tip .comment-sends-cn-img {
            max-height: 1.33333rem;
            max-width: 1.33333rem;
            margin-bottom: 0.26667rem;
        }

        .user-comment-sends-cn .comment-sends-cn-tip .comment-sends-cn-img {
            max-height: 1.33333rem;
            max-width: 1.33333rem;
            margin-bottom: 0.26667rem;
        }

        .user-comment-sends-cn .comment-sends-cn-con {
            font-size: 0.32rem;
            color: #161616;
            text-align: center;
            margin-top: 0.26667rem;
        }



        .comment-sends-cn-btns {
            color: #0090FF;
            @include fontSize24();
            text-decoration: underline;
            text-align: center;
            display: block;
            margin-top: pxto2(40px);
        }


    }
</style>