<template>
    <div class="footer-page">
        <div class="footer-content">
            <div class="full-refund-cn">
                <div class="full-refund">
                    <div class="full-refund-list clearfix">
                        <i class="iconfont inos-imgs">
                            <!-- <img src="@/assets//img/policy2.png" alt/> -->
                            <i class="icon-info-bg icon-policy2"></i>
                        </i>
                        <div class="full-refund-list-msgs">
                            <b>RETURN AND REFUND</b>
                            <p>Items not as described</p>
                        </div>
                    </div>
                    <div class="full-refund-list clearfix">
                        <i class="iconfont inos-imgs">
                            <!-- <img src="@/assets//img/policy2.png" alt/> -->
                             <i class="icon-info-bg icon-policy2"></i>
                        </i>
                        <div class="full-refund-list-msgs">
                            <b>SECURE PAYMENTS WITH ESCROW PROTECTION</b>
                            <p>
                                Easier, faster dispute resolution
                                <br/>100% Guaranteed refunds
                            </p>
                        </div>
                    </div>
                    <div class="full-refund-list clearfix">
                        <i class="iconfont inos-imgs">
                            <!-- <img src="@/assets//img/policy2.png" alt/> -->
                             <i class="icon-info-bg icon-policy2"></i>
                        </i>
                        <div class="full-refund-list-msgs">
                            <b>FULL REFUND</b>
                            <p>If you don't receive your order</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-page">
            <div class="return-policy">
                <div class="return-policy-list">
                    <a href="javascript:void(0);" rel="nofollow" @click="LINKURL('/return-policy')">
                        <i class="iconfont list-icons">
                            <!-- <img src="@/assets/img/policy.png" alt/> -->
                            <i class="icon-info-bg icon-policy"></i>
                        </i>
                        <p>Return Policy</p>
                        <i class="iconfont list-icon-jiatou iconLQYdibu"></i>
                    </a>
                </div>

                <div class="return-policy-list">
                    <a href="javascript:void(0);" rel="nofollow" @click="LINKURL('/terms-conditions')">
                        <i class="iconfont list-icons">
                            <!-- <img src="@/assets/img/policy2.png" alt/> -->
                            <i class="icon-info-bg icon-policy2"></i>
                        </i>
                        <p>Terms and Conditions</p>
                        <i class="iconfont list-icon-jiatou iconLQYdibu"></i>
                    </a>
                </div>

                <div class="return-policy-list">
                    <a href="javascript:void(0);" rel="nofollow" @click="LINKURL('/privacy-policy')">
                        <i class="iconfont list-icons">
                            <!-- <img src="@/assets/img/policy3.png" alt/> -->
                            <i class="icon-info-bg icon-policy3"></i>
                        </i>
                        <p>Privacy Policy</p>
                        <i class="iconfont list-icon-jiatou iconLQYdibu"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-copy-right">
      <span>
        Copyright © {{ year }} {{ config.site ? config.site.name : "" }} All rights reserved.
      </span>
        </div>
        <div class="footer-payments grid grid-center">
            <i class="icon-info-bg icon-fot1"></i>
            <i class="icon-info-bg icon-fot2"></i>
            <i class="icon-info-bg icon-fot3"></i>
            <i class="icon-info-bg icon-fot4"></i>
            
            <!-- <img alt title src="@/assets/img/fot1.png"/> -->
            <!-- <img alt title src="@/assets/img/fot2.png"/> -->
            <!-- <img alt title src="@/assets/img/fot3.png"/>
            <img alt title src="@/assets/img/fot4.png"/> -->
        </div>
    </div>
</template>

<script>
    import {getYearMonthDay, sendParamInUrl} from "@/util/tools";
    import {mapState} from "vuex";

    export default {
        name: 'footerName',
        data() {
            return {
                configObj: {},
                year: ""
            };
        },
        computed: {
            ...mapState({
                config(state) {
                    return state.common.config ? state.common.config : {};
                }
            })
        },
        methods: {
            LINKURL(href) {
                sendParamInUrl({url:href});
            }
        },
        created() {
            let {year} = getYearMonthDay();
            this.year = year;
        }
    };
</script>

<style lang="scss" scoped>
    .footer-page {
        margin-top: 20px;
        .list-icons{
            overflow: hidden;
            border-radius: 4px;
        }
        .footer-content {
            padding: 10px 0.33rem;
            background: #fff;
            .full-refund {
                width: 100%;
                background: #fff;
                //   padding: 0.3rem 0.3rem;
                .full-refund-list {
                    display: flex;
                    margin-bottom: 0.3rem;
                    .inos-imgs {
                        margin-right: 0.4rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        display: block;
                        float: left;
                        border-radius: 4px;
                        overflow: hidden;
                        img {
                            max-width: 100%;
                        }
                    }
                    .full-refund-list-msgs b {
                        font-size: 0.3rem;
                        display: block;
                        color: #252525;
                    }
                    .full-refund-list-msgs p {
                        font-size: 0.32rem;
                    }
                }
            }
        }
        .return-policy .return-policy-list {
            background: #fff;
            margin: 0.14rem 0;
            padding: 0.3rem 0.3rem;
            a {
                display: flex;
                position: relative;
                i.list-icons {
                    margin-right: 0.4rem;
                    width: 0.8rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    img {
                        max-width: 100%;
                    }
                }
                p {
                    font-size: 0.32rem;
                    line-height: 0.8rem;
                }
                .list-icon-jiatou {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0.8rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    transform: rotate(-90deg);
                    -ms-transform: rotate(-90deg);
                    -moz-transform: rotate(-90deg);
                    -webkit-transform: rotate(-90deg);
                    -o-transform: rotate(-90deg);
                }
                i.iconfont {
                    font-size: 0.53333rem;
                }
            }
        }
        .footer-copy-right {
            padding: 0px 0.48rem 0.26667rem;
            font-size: 0.32rem;
            line-height: 0.53333rem;
            color: #999;
            text-align: center;
            margin-top: 0.3rem;
            background: #fff;
            span {
                font-size: 0.32rem;
                // font-family: BentonSansBook, sans-serif;
                text-transform: capitalize;
                color: #666;
                line-height: 0.66667rem;
            }
        }
        .footer-payments {
            margin-bottom: 0.4rem;
            img {
                height: 0.53333rem;
            }
        }
        .grid.grid-center {
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            background: #fff;
            padding-bottom: 0.3rem;
            text-align: center;
        }
    }
</style>
