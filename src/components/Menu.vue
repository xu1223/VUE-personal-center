<template>
    <div class="user-center">
        <div class="user-center">
            <div class="user-list-item" @click="tableNav('order')">
                <p :class="['item-tit', isNav.order ? 'active' : '']">
                    My Order
                    <i
                            :class="['iconfont', isNav.order ? 'iconLQYjian' : 'iconLQYjia']"
                    ></i>
                </p>

                <div
                        class="item-hide"
                        :style="{ display: isNav.order ? 'block' : 'none' }"
                        @click.stop
                >
                    <router-link
                            :to="{ path: '/order', query: { id: 0} }"
                            class="modify modify-order"
                    >View All Orders
                    </router-link
                    >
                    <div class="personal-info-show">
                        <ul class="personal-info-oreder clearfix">
                            <li>
                                <!-- <a :href="'/'+order+'/a#0'">

                                </a>-->
                                <router-link
                                        :to="{ path: '/order', query: { id: 0, name: 'unpaid' } }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/payment.png" alt/> -->
                                        <i class="icon-info-bg icon-payment"></i>
                                    </div>
                                    <p>
                                        Pending
                                        <br/>
                                        Payment
                                    </p>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                        :to="{ path: '/order', query: { id: 1, name: 'shipped' } }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/delivery.png" alt/> -->
                                        <i class="icon-info-bg icon-delivery"></i> 
                                    </div>
                                    <p>
                                        To Be
                                        <br/>
                                        Deliveried
                                    </p>
                                </router-link>
                            </li>
                            <!-- //  name: "", title: "All orders"



                             name: "canceled", title: "Cancelled"
                            name: "after_sale_order", title: "After-Sale Order"-->
                            <li>
                                <router-link
                                        :to="{ path: '/order', query: { id: 2, name: 'paid' } }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/receipt.png" alt/> -->
                                        <i class="icon-info-bg icon-receipt"></i> 
                                    </div>
                                    <p>
                                        Pending
                                        <br/>
                                        Receipt
                                    </p>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                        :to="{ path: '/order', query: { id: 3, name: 'completed' } }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/Completed.png" alt/> -->
                                        <i class="icon-info-bg icon-payment"></i>
                                    </div>
                                    <p>Completed</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                        :to="{ path: '/order', query: { id: 4, name: 'canceled' } }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/Cancelled.png" alt/> -->
                                        <i class="icon-info-bg icon-cancelled"></i>
                                    </div>
                                    <p>Cancelled</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                        :to="{
                    path: '/order',
                    query: { id: 5, name: 'after_sale_order' }
                  }"
                                >
                                    <div class="order-img">
                                        <!-- <img src="@/assets/img/sale.png" alt/> -->
                                        <i class="icon-info-bg icon-sale"></i>
                                    </div>
                                    <p>
                                        After-Sale
                                        <br/>Order
                                    </p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="user-list-item">
                <router-link to="/user/my_address" class="item-tit">
                    Address Book
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>
                <!-- <a href="" class="item-tit">
                  Address Book
                  <van-icon name="plus" />
                </a>-->
                <div class="item-hide"></div>
            </div>

            <div class="user-list-item">
                <router-link to="/my_cart" class="item-tit">
                    My Shopping Bag
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>
                <div class="item-hide"></div>
            </div>

            <div class="user-list-item">
                <router-link to="/user/my_recently_viewed" class="item-tit">
                    Recently Viewed
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>
                <!-- <a href class="item-tit">
                  Recently Viewed
                  <van-icon name="plus" />
                </a>-->
                <div class="item-hide"></div>
            </div>

            <div class="user-list-item">
                <router-link to="/user/my_wish" class="item-tit">
                    My Wishlist
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>

                <!-- <div class="item-hide">

                </div>-->
            </div>
            <!--  -->
            <div class="user-list-item" @click="tableNav('conmment')">
                <!-- item-tit active  -->
                <p :class="['item-tit', isNav.conmment ? 'active' : '']">
                    My Reviews
                    <i
                            :class="['iconfont', isNav.conmment ? 'iconLQYjian' : 'iconLQYjia']"
                    ></i>
                </p>
                <!-- active item-tit active  conmment-->
                <div
                        class="item-hide btn-box"
                        :style="{ display: isNav.conmment ? 'block' : 'none' }"
                        @click.stop
                >
                    <!-- <a href rel="nofollow">COMMENT</a> -->
                    <router-link to="/user/my_review"
                    >COMMENT({{
                        db_selectlist.comment ? db_selectlist.comment.reviewed_count : ""
                        }})
                    </router-link
                    >
                </div>
            </div>

            <div class="user-list-item" @click="tableNav('msg')">
                <p :class="['item-tit', isNav.msg ? 'active' : '']">
                    My Message
                    <i
                            :class="['iconfont', isNav.msg ? 'iconLQYjian' : 'iconLQYjia']"
                    ></i>
                </p>
                <div
                        class="item-hide btn-box"
                        :style="{ display: isNav.msg ? 'block' : 'none' }"
                        @click.stop
                >
                    <!-- <a href rel="nofollow">Message(0)</a>
                    <a href rel="nofollow">New message(0)</a>-->
                    <router-link :to="{ path: '/user/my_message' }"
                    >Message({{
                        db_selectlist.message ? db_selectlist.message.total_count : ""
                        }})
                    </router-link
                    >
                    <router-link
                            :to="{ path: '/user/my_message', query: { flag: 'received' } }"
                    >New message({{
                        db_selectlist.message ? db_selectlist.message.new_count : ""
                        }})
                    </router-link
                    >
                </div>
            </div>

            <div :class="['user-list-item']" @click="tableNav('prsinfo')">
                <p :class="['item-tit', isNav.prsinfo ? 'active' : '']">
                    Personal Information
                    <i
                            :class="['iconfont', isNav.prsinfo ? 'iconLQYjian' : 'iconLQYjia']"
                    ></i>
                </p>
                <div
                        class="item-hide"
                        :style="{ display: isNav.prsinfo ? 'block' : 'none' }"
                        @click.stop
                >
                    <!-- 个人资料查看 -->
                    <div class="personal-info-show">
                        <p class="head-portrait">
                            <img
                                    v-lazy="
                  db_selectlist.customer ? db_selectlist.customer.avatar : ''
                "
                                    alt
                            />
                            Hellenberg
                        </p>
                        <ul class="info-box">
                            <li>
                                <p>Name</p>
                                <span>{{
                  db_selectlist.customer ? db_selectlist.customer.firstname : ""
                }}</span>
                            </li>
                            <li>
                                <p>Last name</p>
                                <span>{{
                  db_selectlist.customer ? db_selectlist.customer.lastname : ""
                }}</span>
                            </li>
                            <li>
                                <p>Email</p>
                                <span>{{
                  db_selectlist.customer ? db_selectlist.customer.email : ""
                }}</span>
                            </li>
                            <li>
                                <p>Phone</p>
                                <span>{{
                  db_selectlist.customer ? db_selectlist.customer.mobile : ""
                }}</span>
                            </li>
                            <li>
                                <p>Birthday</p>
                                <span
                                >-{{
                    db_selectlist.customer
                      ? db_selectlist.customer.birthday
                      : ""
                  }}</span
                                >
                            </li>
                            <li>
                                <p>Gender</p>
                                <span>{{
                  db_selectlist.customer ? db_selectlist.customer.gender : ""
                }}</span>
                            </li>
                        </ul>
                        <a class="modify" @click="modifyfn()">MODIFY</a>
                    </div>
                    <!-- 修改个人资料 -->
                    <div class="personal-info-modify" v-if="isModey">
                        <div class="title">
                            <h3>Personal information</h3>
                            <span>Required field *</span>
                        </div>
                        <p class="head-portrait">
                            <img v-lazy="parms.avatar"/>
                            Hellenberg
                        </p>
                        <div>
                            <div class="hx-form-group hx-must">
                                <label class="hx-form-label">Name</label>
                                <div
                                        :class="[
                                            'hx-input-block',
                                            isPre.firstname ? 'result-success' : 'result-error'
                                        ]"
                                >
                                    <input
                                            type="text"
                                            name="firstname"
                                            placeholder
                                            autocomplete="off"
                                            class="hx-input"
                                            v-model="parms.firstname"
                                            @input="firstnamefn"
                                    />
                                    <i class="iconfont" v-show="!isPre.firstname"></i>
                                </div>
                                <em
                                        class="hx-form-tips"
                                        style="display:inline"
                                        v-show="!isPre.firstname"
                                >Required field</em
                                >
                            </div>
                            <div class="hx-form-group hx-must">
                                <label class="hx-form-label">Last name</label>
                                <div
                                        :class="[
                    'hx-input-block',
                    isPre.lastname ? 'result-success' : 'result-error'
                  ]"
                                >
                                    <input
                                            type="text"
                                            name="lastname"
                                            placeholder
                                            autocomplete="off"
                                            class="hx-input"
                                            v-model="parms.lastname"
                                            @input="lastnamefn"
                                    />
                                    <i class="iconfont" v-show="!isPre.lastname"></i>
                                </div>
                                <em
                                        class="hx-form-tips"
                                        style="display:inline"
                                        v-show="!isPre.lastname"
                                >Required field</em
                                >
                            </div>
                            <div class="hx-form-group hx-must">
                                <label class="hx-form-label">Email</label>
                                <div
                                        :class="[
                                            'hx-input-block',
                                            isPre.email ? 'result-success' : 'result-error'
                                        ]"
                                >
                                    <input
                                            type="text"
                                            name="email"
                                            hx-rule-email
                                            data-result="false"
                                            placeholder
                                            class="hx-input"
                                            v-model="parms.email"
                                            @input="emailfn"
                                    />
                                    <i class="iconfont" v-show="!isPre.email"></i>
                                </div>
                                <em
                                        class="hx-form-tips"
                                        v-show="!isPre.email"
                                        style="display:inline"
                                >Please enter the correct email address</em
                                >
                            </div>
                            <div class="hx-form-group hx-must">
                                <label for class="hx-form-label">Phone</label>
                                <div
                                        :class="[
                                            'hx-input-block',
                                            isPre.mobile ? 'result-success' : 'result-error'
                                        ]"
                                >
                                    <input
                                            type="text"
                                            name="mobile"
                                            hx-rule-phone
                                            data-result="false"
                                            placeholder
                                            class="hx-input"
                                            v-model="parms.mobile"
                                            @input="mobilefn"
                                    />
                                    <i class="iconfont" v-show="!isPre.mobile"></i>
                                </div>
                                <!-- <span>We will only ask you for a phone number if you need to
                                be notified about your order.</span>-->
                                <em
                                        class="hx-form-tips"
                                        style="display:inline"
                                        v-show="!isPre.mobile"
                                >Please enter the correct telephone number.</em
                                >
                            </div>
                            <div class="hx-form-group hx-must">
                                <label for class="hx-form-label">Birthday</label>
                                <div
                                        :class="[
                                            'hx-input-block',
                                            isPre.datys1 ? 'result-success' : 'result-error'
                                        ]"
                                >
                                    <input
                                            type="text"
                                            name="mobile"
                                            hx-rule-phone
                                            data-result="false"
                                            placeholder
                                            class="hx-input"
                                            v-model="parms.datys1"
                                            readonly
                                            id="dateShowBtn"
                                            @click="datys()"
                                    />
                                    <i class="iconfont" v-show="!isPre.datys1"></i>
                                </div>
                                <!-- <span>We will only ask you for a phone number if you need to
                                be notified about your order.</span>-->
                                <em
                                        class="hx-form-tips"
                                        style="display:inline"
                                        v-show="!isPre.datys1"
                                >Please enter the correct telephone number.</em
                                >
                            </div>
                            <div class="hx-form-group hx-must">
                                <label for class="hx-form-label">Gender</label>
                                <div class="hx-input-block">
                                    <FormSelect
                                            :id.sync="parms.gender"
                                            :pr="'Gender'"
                                            :formdata="
                                                    [
                                                        { id: 1, name: 'Man' },
                                                        { id: 2, name: 'Woman' },
                                                        { id: 0, name: 'Confidentiality' }
                                                    ] || []
                                                    "
                                    />
                                </div>
                            </div>
                            <div class="hx-form-group btn-box">
                                <div class="hx-input-block flex-center">
                                    <button
                                            class="hx-btn"
                                            type="button"
                                            hx-submit
                                            @click="onSubmit"
                                    >
                                        CONFIRM
                                    </button>
                                    <button
                                            class="hx-btn hx-btn-primary cancel-btn"
                                            type="button"
                                            @click="isModey = false"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="user-list-item" @click="tableNav('code')">
                <p :class="['item-tit', isNav.code ? 'active' : '']">
                    My Coupon code
                    <i
                            :class="['iconfont', isNav.code ? 'iconLQYjian' : 'iconLQYjia']"
                    ></i>
                </p>
                <div
                        class="item-hide btn-box"
                        :style="{ display: isNav.code ? 'block' : 'none' }"
                        @click.stop
                >
                    <!--<a href="user-discount.html#1" rel="nofollow"data-type-id="1">Unused<span>(9)</span></a>-->
                    <router-link to="/user/my_coupon">
                        Used
                        <span
                        >({{
                db_selectlist.coupon
                  ? db_selectlist.coupon.total_used_count
                  : ""
              }})</span
                        >
                    </router-link>
                    <router-link
                            :to="{ path: '/user/my_coupon', query: { flag: 'received' } }"
                    >
                        Expired
                        <span
                        >({{
                db_selectlist.coupon
                  ? db_selectlist.coupon.total_expired_count
                  : ""
              }})</span
                        >
                    </router-link>
                    <!-- <a href rel="nofollow" data-type-id="2">
                      Used
                      <span>(0)</span>
                    </a>-->
                    <!-- <a href rel="nofollow" data-type-id="3">
                      Expired
                      <span>(0)</span>
                    </a>-->
                </div>
            </div>

            <div class="user-list-item">
                <router-link to="/user/newsletter_subscription" class="item-tit">
                    Newsletter Subscription
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>

                <div class="item-hide"></div>
            </div>

            <div class="user-list-item">
                <router-link to="/user/security_settings" class="item-tit">
                    Security Settings
                    <i :class="['iconfont iconLQYjia']"></i>
                </router-link>

                <div class="item-hide"></div>
            </div>

            <!-- <div class="user-list-item">
                      <a href="https://www.lover-beauty.com/user/logout.html" class="item-tit">lOGOUT<i class="iconfont iconLQYjia"></i></a>
                      <div class="item-hide">

                      </div>
            </div>-->
        </div>
        <van-popup v-model="showTime" position="bottom">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    confirm-button-text="Confirm"
                    cancel-button-text="Cancel"
                    show-toolbar
                    @confirm="confirmfn"
                    @cancel="cancelfn"
            />
        </van-popup>
    </div>
</template>

<script>
    import FormSelect from "@/components/Formselect";
    import {Toast} from "vant";

    export default {
        name: 'Menu',
        data() {
            return {
                isModey: false,
                showTime: false,
                minDate: new Date(1971, 0, 1),
                maxDate: new Date(2060, 10, 1),
                currentDate: new Date(),
                isShow: false,
                activeNames: ["1"],
                db_selectlist: {},
                _id: "",
                parms: {
                    email: "", //	string	是	邮箱
                    firstname: "", //	string	是	名
                    lastname: "", //	string	是	姓
                    mobile: "", //	string	是	手机
                    year: "", //	string	是	生日-年
                    month: "", //	string	是	生日-月
                    day: "", //	string	是	生日-日
                    gender: 0, //	string	是	性别 0:保密,1:男,2:女
                    avatar: "", //	string	是	头像
                    datys1: ""
                },
                isNav: {
                    prsinfo: false,
                    msg: false,
                    conmment: false,
                    code: false,
                    order: true
                },
                menuLis: [
                    {
                        id: "1",
                        showContent: false,
                        title: "SALE",
                        to: "user",
                        children: [
                            {id: "23", title: "Blog"},
                            {id: "24", title: "Blog1"},
                            {id: "25", title: "Blog2"},
                            {id: "26", title: "Blog3"}
                        ]
                    },
                    {
                        id: "1",
                        title: "SALE1",
                        to: "user"
                    },
                    {
                        id: "12",
                        showContent: false,
                        title: "NEW",
                        to: "user",
                        children: [
                            {id: "2322", title: "Blog"},
                            {id: "2421", title: "Blog1"},
                            {id: "25232", title: "Blog2"},
                            {id: "2624", title: "Blog3"}
                        ]
                    },
                    {
                        id: "13",
                        showContent: false,
                        title: "SKIRT",
                        to: "user",
                        children: [
                            {id: "2356", title: "Blog"},
                            {id: "2456", title: "Blog1"},
                            {id: "2557", title: "Blog2"},
                            {id: "2653", title: "Blog3"}
                        ]
                    },
                    {
                        id: "15",
                        showContent: false,
                        title: "UNDERWAR",
                        to: "user",
                        children: [
                            {id: "2131", title: "Blog"},
                            {id: "2241", title: "Blog1"},
                            {id: "2351", title: "Blog2"},
                            {id: "2461", title: "Blog3"}
                        ]
                    },
                    {
                        id: "12",
                        showContent: false,
                        title: "ACCESSORIES",
                        to: "user",
                        children: [
                            {id: "213", title: "Blog"},
                            {id: "224", title: "Blog1"},
                            {id: "235", title: "Blog2"},
                            {id: "246", title: "Blog3"}
                        ]
                    }
                ],
                isPre: {
                    firstname: "1",
                    lastname: "1",
                    email: "1",
                    mobile: "1",
                    datys1: "1"
                }
            };
        },

        methods: {
            tableNav(type) {
                if (type) {
                    this.isNav[type] = !this.isNav[type];
                }

                // if (type === "prsinfo") {
                //   this.isNav.prsinfo = !this.isNav.prsinfo;
                // } else if (type === "msg") {
                //   this.isNav.msg = !this.isNav.msg;
                // } else if (type === "conmment") {
                //   this.isNav.conmment = !this.isNav.conmment;
                // } else if(type === 'code') {
                //    this.isNav.code = !this.isNav.code;
                // }
            },
            isMenuSHow() {
                this.isShow = !this.isShow;
            },
            modifyfn() {
                this.isModey = true;
            },
            isFadeIn(index) {
                this.menuLis[index].showContent = !this.menuLis[index].showContent;
            },
            firstnamefn() {
                if (this.parms.firstname === "") {
                    this.isPre.firstname = "";
                } else {
                    this.isPre.firstname = "1";
                }
            },
            lastnamefn() {
                if (this.parms.lastname === "") {
                    this.isPre.lastname = "";
                } else {
                    this.isPre.lastname = "1";
                }
            },
            emailfn() {
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!myreg.test(this.parms.email)) {
                    this.isPre.email = "";
                } else {
                    this.isPre.email = "1";
                }
            },
            mobilefn() {
                if (this.parms.mobile === "") {
                    this.isPre.mobile = "";
                } else {
                    this.isPre.mobile = "1";
                }
            },
            onSubmit() {
                //  email: "", //	string	是	邮箱
                //   firstname: "", //	string	是	名
                //   lastname: "", //	string	是	姓
                //   mobile: "", //	string	是	手机
                //   year: "", //	string	是	生日-年
                //   month: "", //	string	是	生日-月
                //   day: "", //	string	是	生日-日
                //   gender: "", //	string	是	性别 0:保密,1:男,2:女
                //   avatar: "", //	string	是	头像
                //   datys1: ""
                let {email, firstname, lastname, mobile, datys1, gender} = this.parms;
                if (firstname === "") {
                    this.isPre.firstname = "";
                    return false;
                } else if (lastname === "") {
                    this.isPre.lastname = "";
                    return false;
                } else if (email === "") {
                    this.isPre.email = "";
                    return false;
                } else if (mobile === "") {
                    this.isPre.mobile = "";
                    return false;
                } else if (datys1 === "") {
                    this.isPre.datys1 = "";
                    return false;
                }
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!myreg.test(email)) {
                    this.isPre.email = "";
                    return false;
                } else {
                    this.isPre.email = "1";
                }
                if (document.querySelector("#dateShowBtn")) {
                    let dateShowBtn = document.querySelector("#dateShowBtn");
                    // let data_year = dateShowBtn.getAttribute("data-year");
                    // let data_month = dateShowBtn.getAttribute("data-month");
                    // let data_day = dateShowBtn.getAttribute("data-day");
                    if (dateShowBtn.value) {
                        let dt = dateShowBtn.value.split("-");
                        this.parms["year"] = dt[0];
                        this.parms["month"] = dt[1];
                        this.parms["day"] = dt[2];
                        delete this.parms["datys1"];
                    }
                }
                this.$Http.user.customerEdit({...this.parms}).then(res => {
                     let {code} = res;
                    if (code == 200) {
                        // Toast.success(msg);
                        this.isModey = false;
                        setTimeout(() => {
                            // location.reload();
                            this.isrender();
                        }, 300);
                    }
                });
            },
            p(s) {
                return s < 10 ? "0" + s : s;
            },
            confirmfn(val) {
                this.showTime = false;
                const d = new Date(val);
                const resDate =
                    d.getFullYear() +
                    "-" +
                    this.p(d.getMonth() + 1) +
                    "-" +
                    this.p(d.getDate());
                this.parms.datys1 = resDate;
            },
            cancelfn() {
                this.showTime = false;
            },
            datys() {
                this.showTime = true;
            },
            isrender() {
                this.db_selectlist = [];
                this.$Http.user.personal().then(res => {
                    let {code,data} = res;
                    if (code == 200) {
                        this.db_selectlist = data;
                        let _id = "";
                        if (data.customer.gender == "Man") {
                            // {id:1,name:'Man'},{id:2,name:'Woman'},{id:0,name:'Confidentiality'}
                            _id = 1;
                        } else if (data.customer.gender == "Woman") {
                            _id = 2;
                        } else if (data.customer.gender == "Confidentiality") {
                            _id = 0;
                        }
                        this._id = _id;
                        this.parms.gender = _id;
                        if (data.customer.default_address) {
                            let itme = data.customer.default_address;
                            this.parms["firstname"] = data.customer.firstname;
                            this.parms["avatar"] = data.customer.avatar;
                            this.parms["lastname"] = data.customer.lastname;
                            this.parms["mobile"] = data.customer.mobile;
                            this.parms["email"] = data.customer.email;
                            this.parms["datys1"] = data.customer.birthday;
                        }
                    }
                });
            }
        },
        created() {
            this.isrender();

        },
        components: {
            FormSelect
        }
    };
</script>
<style lang="scss" scoped>
    .user-center {
        margin-top: 0.2rem;
    }

    .user-center .user-list-item {
        background-color: #fff;
        box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .user-center .user-list-item .item-tit {
        font-family: "SH-Light";
        font-size: 0.32rem;
        color: #161616;
        padding: 0.8rem 0.53333rem;
        cursor: pointer;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
    }

    .user-center .user-list-item .item-tit .iconfont {
        font-size: 0.29333rem;
        font-weight: bold;
        color: #161616;
    }

    .user-center .user-list-item .item-hide {
        display: none;
    }

    .modify-order {
        margin-left: 0.53333rem;
        display: inline-block;
        cursor: pointer;
        font-size: 0.32rem;
        color: #666;
        border-bottom: 1px solid #bfbfbf;
        margin-bottom: 10px;
        color: #bfbfbf;
    }

    .user-center .user-list-item .personal-info-show {
        padding: 0 0.53333rem 0.8rem;
    }

    .user-center .user-list-item .personal-info-show .personal-info-oreder {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .user-center .user-list-item .personal-info-show .personal-info-oreder {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: " ";
    }

    .user-center .user-list-item .personal-info-show .personal-info-oreder li {
        /* width: 1.94667rem; */
        width: 23%;
        height: 2.18667rem;
        margin: 0.4rem 0.33333rem;
        float: left;
        font-size: 0.32rem;
    }

    .user-center .user-list-item .personal-info-show .personal-info-oreder li a {
        display: block;
    }

    .user-center
    .user-list-item
    .personal-info-show
    .personal-info-oreder
    li
    .order-img {
        width: 1.46667rem;
        height: 1.46667rem;
        margin: 0 auto 10px;
        overflow: hidden;
    }

    .user-center
    .user-list-item
    .personal-info-show
    .personal-info-oreder
    li
    .order-img
    img {
        height: 100%;
    }

    .user-center .user-list-item .personal-info-show .personal-info-oreder li p {
        font-size: 0.32rem;
        text-align: center;
        display: block;
    }

    .user-center .user-list-item .item-tit.active {
        color: #c0ad8d;
    }

    .user-center .user-list-item .item-tit {
        // font-family: "SH-Light";
        font-size: 0.32rem;
        color: #161616;
        padding: 0.8rem 0.53333rem;
        cursor: pointer;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
    }

    .user-center .user-list-item .btn-box > a {
        display: inline-block;
        width: 3.65rem;
        height: 1.06667rem;
        line-height: 1.06667rem;
        margin-right: 0.26667rem;
        margin-bottom: 0.26667rem;
        font-size: 0.32rem;
        color: #252525;
        text-align: center;
        background-color: #ffffff;
        border-radius: 5px;
        border: solid 1px #dbdbdb;
    }

    .user-center .user-list-item .btn-box {
        padding: 0.53333rem;
        margin-right: -0.26667rem;
        border-top: 1px solid #f5f5f5;
    }

    .user-center .user-list-item .item-hide {
        display: none;
    }

    .user-center .user-list-item .personal-info-show {
        padding: 0 0.53333rem 0.8rem;
    }

    .user-center .user-list-item .head-portrait {
        font-size: 0.32rem;
        color: #161616;
        margin-bottom: 0.53333rem;
    }

    .user-center .user-list-item .head-portrait img {
        width: 0.88rem;
        height: 0.88rem;
        background-color: #bfbfbf;
        vertical-align: middle;
        border-radius: 0.88rem;
        -webkit-border-radius: 0.88rem;
        -moz-border-radius: 0.88rem;
        -ms-border-radius: 0.88rem;
        -o-border-radius: 0.88rem;
    }

    .user-center .user-list-item .personal-info-show .info-box li {
        margin-bottom: 0.2rem;
    }

    .user-center .user-list-item .personal-info-show .info-box li p {
        font-size: 0.32rem;
        color: #252525;
    }

    .user-center .user-list-item .personal-info-show .info-box li span {
        font-size: 0.32rem;
        line-height: 0.33333rem;
        color: #666;
        display: block;
        margin-top: 1px;
    }

    .user-center .user-list-item .personal-info-show .modify {
        display: inline-block;
        margin-top: 0.8rem;
        cursor: pointer;
        font-size: 0.32rem;
        color: #666;
        border-bottom: 1px solid #666;
    }

    .user-center .user-list-item .personal-info-modify {
        padding: 0 0.53333rem;
    }

    .user-center .user-list-item .personal-info-modify .title h3 {
        font-size: 0.42667rem;
        text-transform: Capitalize;
        color: #161616;
    }

    .user-center .user-list-item .personal-info-modify .title span {
        font-size: 0.32rem;
        text-transform: Capitalize;
        color: #bfbfbf;
    }

    .user-center .user-list-item .personal-info-show .info-box li p:after {
        content: "*";
        color: #34d0c8;
    }
</style>
