<template>
    <div>
        <HeaderTab/>
        <div class="confirm_order_info" :action="action">
            <div class="order-tab-con">
                <div class="user-allorder-lis">
                    <div class="user-allorder redund-pa">
                        <a href="javascript:void(0);">
                            <div class="user-allorder-head">
                                <b class="flyoon">FLYOON</b>
                                <b class="payment">{{ headerTitle }}</b>
                            </div>
                        </a>
                        <div
                                class="user-allorder-con clearfix"
                                v-for="(v, index) in db_selectlist.order_return_products || []"
                                :key="index"
                        >
                            <a href="javascript:void(0);" @click="LINKURL(v)">
                                <div class="user-order-cn-imgs">
                                    <img v-lazy="v.img_m"/>
                                </div>
                            </a>
                            <div class="user-order-cn-right clearfix">
                                <a href="javascript:void(0);"></a>
                                <a
                                        class="order-cn-right-title"
                                        href="javascript:void(0);"
                                        @click="LINKURL(item)"
                                >{{ v.name }}s</a
                                >
                                <div class="order-cn-right-type">
                                    <div class="right-type-lis">
                                        <span class="right-type-lis-type">Size: {{ v.size }}</span>
                                        <p class="right-type-lis-price">
                                            ${{ v.price | numFilter }}
                                        </p>
                                    </div>
                                </div>
                                <div class="order-cn-right-type">
                                    <div class="right-type-lis">
                    <span class="right-type-lis-type"
                    >Color: {{ v.color }}</span
                    >
                                        <p class="right-type-lis-price price2">
                                            ${{ v.show_price | numFilter }}
                                        </p>
                                    </div>
                                </div>
                                <i class="user-order-nums">*{{ v.quantity }}</i>
                            </div>
                        </div>
                        <div class="use-allorder-mos">
                            <div class="user-type-moneu-info clearfix" style="display:none">
                                <span class="info-msg">Delivery:</span>
                                <span class="info-price"
                                >${{
                    db_selectlist.order
                      ? toFixeds(db_selectlist.order.shipping_fee)
                      : ""
                  }}</span
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
                    db_selectlist.order ? db_selectlist.order.total_number : ""
                  }}</span>
                                </div>
                                <div class="user-type-moneu-info clearfix">
                                    <span class="info-msg">Total Price (Actual Payment):</span>
                                    <span class="info-price"
                                          style="font-weight:700;"
                                    >US ${{
                      db_selectlist.order
                        ? toFixeds(db_selectlist.order.total_price)
                        : ""
                    }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--  {% if return_status in [0,1] and excute_status == 0 %} {# 售后状态:发起售后,待审核 执行状态:待退款 #}-->
            <div
                    v-if="
          db_selectlist.return_status in [0, 1] &&
            db_selectlist.excute_status === 0
        "
            >
                <div class="redund1">
                    <form
                            class="hx-form"
                            id="change_apply_order_form"
                            method="post"
                            action="/carts/change_apply_order_return"
                    >
                        <input
                                type="hidden"
                                name="return_no"
                                :value="db_selectlist.return_no"
                        />
                        <!-- {# 退款 #} -->
                        <Userselect
                                :pr="'Reason For Return'"
                                :formdata="listdatas || []"
                                :value.sync="return_reason"
                                :msg="'Reason For Rreturn'"
                                v-if="db_selectlist.return_action == 1"
                        />
                        <!-- {# 退货退款 #} {id: 1,name: ''Customer Country Customs Clearance'},{id: 2,name: Customer Cancellation'}{id:4, 'Unsatisfactory quality'} -->
                        <Userselect
                                :pr="'Reason For Rreturn'"
                                :formdata="listdatas || []"
                                :value.sync="return_reason"
                                :msg="'Reason For Rreturn'"
                                v-if="db_selectlist.return_action == 2"
                        />
                        <!-- {# 换货 #} {id: 1,name: 'Goods damaged or inconsistent with the agreement'},{id: 2,name: 'want to change to different colors, sizes or styles.'}-->
                        <Userselect
                                :pr="'Reason For Rreturn'"
                                :formdata="listdatas || []"
                                :value.sync="return_reason"
                                :msg="'Reason For Rreturn'"
                                v-if="db_selectlist.return_action == 3"
                        />

                        <!-- {% if return_action != 3 %} -->
                        <div
                                class="hx-form-group hx-must"
                                v-if="db_selectlist.return_action != 3"
                        >
                            <label class="hx-form-label">Refund Amount:</label>
                            <div class="hx-input-block">
                                <input
                                        type="text"
                                        v-model="db_selectlist.max_return_amount"
                                        name="old_password"
                                        placeholder="Please enter the old password "
                                        autocomplete="off"
                                        class="hx-input"
                                />
                                <i class="iconfont"></i>
                            </div>
                            <em class="hx-form-tips">Required Field</em>
                            <!-- <span data-isFocus="true" class="hx-point-out">Please enter a 6-digit alphanumeric
                            password.</span>-->
                        </div>
                        <!-- {% endif %} -->
                        <div
                                class="hx-form-group hx-must"
                                v-if="db_selectlist.return_action != 3"
                        >
                            <label class="hx-form-label">Message Content</label>
                            <div class="hx-input-block">
                <textarea
                        placeholder
                        class="hx-textarea hx-input"
                        name="description"
                        v-model="parms.remarks"
                ></textarea>
                                <div class="hx-text-right hx-text-right-comnum">
                                    <em>{{ parms.remarks.length }}</em
                                    >/
                                    <span>500</span>
                                </div>
                            </div>
                            <em class="hx-form-tips" style="display: none;"
                            >Required Field</em
                            >
                        </div>
                        <div class="picture-file">
                            <p>
                                Upload certificate
                                <span>(Up to 6 sheets)</span>
                            </p>
                            <van-uploader
                                    v-model="fileList"
                                    :max-count="6"
                                    :after-read="uploadeimgs"
                                    class="uploadeimgs"
                            />
                        </div>
                    </form>
                    <div class="user-navbtn">
                        <a
                                class="btn-active red1"
                                @click="canceled_order_after_sale(db_selectlist.return_no)"
                        >CANCEL</a
                        >
                        <!-- onclick="canceled_order_after_sale('{{ db_select.return_no }}')" -->
                        <a
                                href="javascript:void(0);"
                                class="btn-link"
                                @click="confirm_receiving_after_sale(db_selectlist.return_no)"
                        >MODIFY</a
                        >
                        <!-- onclick="document.getElementById('change_apply_order_form').submit(); -->
                    </div>
                </div>
            </div>

            <!-- {% endif %} -->
            <!-- {% if return_action == 1 %} {# 售后方式:退款 #}
            {% if excute_status == 5 %} {# 执行状态:待退款 #}-->
            <div v-if="db_selectlist.return_action == 1">
                <div
                        class="redund2"
                        style="display:block;"
                        v-if="db_selectlist.excute_status == 5"
                >
                    <div class="redund2-a">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a8.png"/>
                        </a>
                        <div class="redund2-b">
                            <p>After-sales progress: waiting for review</p>
                            <em>
                                You have successfully initiated a refund request, ple- ase be
                                patient and wait for the merchant to process.
                            </em>
                        </div>
                    </div>
                </div>

                <!-- {% elseif excute_status == 6 %} {# 执行状态:已退款 #} -->
                <div
                        class="redund3"
                        style="display:block;"
                        v-if="db_selectlist.excute_status == 6"
                >
                    <div class="redund2-a">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a9.png"/>
                        </a>
                        <div class="redund2-b">
                            <p>
                                After-sales progress: refund is successful, plea- se pay
                                attention to check
                            </p>
                            <span>Refund success time {{ db_selectlist.refunded_at }}</span>
                            <p>
                                Refund amount US
                                <span>${{ db_selectlist.actual_refund_amount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- {% endif %}
            {% elseif return_action == 2 %} {# 售后方式:退货退款 #}
            {% if return_status == 2 %} {# 售后状态:执行中 #}
            {% if excute_status == 7 %} {# 执行状态:用户待发货 #}-->
            <div v-else-if="db_selectlist.return_action == 2">
                <div v-if="db_selectlist.return_status == 2">
                    <div
                            class="redund4"
                            style="display:block;"
                            v-if="db_selectlist.excute_status == 7"
                    >
                        <div class="redund4-a">
                            <a href="javascript:void(0)" title>
                                <img src="@/assets/img/a10.png"/>
                            </a>
                            <p>
                                After-sales progress: the merchant has agreed to your aftersales
                                application, please return and fill in the logi- stics
                                information.
                            </p>
                        </div>
                        <div class="redund4-b">
                            <em>Return address:</em>
                            <div class="redund4-pspan">
                                <p>Return Address:</p>
                                <span>{{ db_selectlist.receive_shipment_address }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Consignee:</p>
                                <span>{{ db_selectlist.receive_shipment_name }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Contact number:</p>
                                <span>{{ db_selectlist.receive_shipment_mobile }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Zip code:</p>
                                <span>{{ db_selectlist.receive_shipment_postcode }}</span>
                            </div>
                        </div>
                        <div class="redund4-c">
                            <p>Please fill in the return logistics information</p>
                            <form
                                    method="post"
                                    action="/order/confirm_order_after_sale"
                                    id="confirm_order_after_sale_form"
                                    class="hx-form"
                            >
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Logistics company</label>
                                    <div class="hx-input-block">
                                        <input
                                                type="text"
                                                name="receive_shipment_method"
                                                placeholder
                                                autocomplete="off"
                                                class="hx-input"
                                                v-model="db_selectlist.receive_shipment_method"
                                        />
                                        <i class="iconfont"></i>
                                    </div>
                                    <em class="hx-form-tips" style="display: none;"
                                    >Required field</em
                                    >
                                </div>
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Shipment Number</label>
                                    <div class="hx-input-block">
                                        <input
                                                type="text"
                                                id
                                                name="receive_shipment_code"
                                                placeholder
                                                autocomplete="off"
                                                class="hx-input"
                                                v-model="db_selectlist.receive_shipment_code"
                                        />
                                        <i class="iconfont"></i>
                                    </div>
                                    <em class="hx-form-tips" style="display: none;"
                                    >Required field</em
                                    >
                                </div>
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Shipment Number</label>
                                    <div class="hx-input-block">
                    <textarea
                            placeholder
                            class="hx-textarea hx-input"
                            name="receive_shipment_remark"
                            v-model="db_selectlist.receive_shipment_remark"
                    ></textarea>
                                        <div class="hx-text-right">
                                            <em>{{ db_selectlist.receive_shipment_remark.length }}</em
                                            >/
                                            <span>500</span>
                                        </div>
                                    </div>
                                    <em class="hx-form-tips">Required field</em>
                                </div>
                                <div class="user-navbtn">
                                    <a
                                            class="btn-active red2"
                                            hx-submit
                                            href="javascript:void(0);"
                                    >SUBMIT</a
                                    >
                                    <!-- onclick="document.getElementById('confirm_order_after_sale_form').submit();" -->
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- {% elseif excute_status in [1,2,5] %} {# 执行状态:用户已发货、后台已收货、待退款 #} -->
                    <div
                            class="redund5"
                            style="display:block;"
                            v-if="db_selectlist.excute_status in [1, 2, 5]"
                    >
                        <div class="redund5-a">
                            <a href="javascript:void(0)" title>
                                <img src="@/assets/img/a8.png"/>
                            </a>
                            <div class="redund5-p">
                                <p>
                                    After-sales progress: waiting for the merchant to c- onfirm
                                    the receipt, refund
                                </p>
                                <p>
                                    You have successfully submitted your return informa- tion,
                                    please be patient and wait for the merchant to process
                                </p>
                            </div>
                        </div>
                        <div class="redund5-b">
                            <a href="javascript:void(0)" title>
                                <img src="@/assets/img/a11.png"/>
                            </a>
                            <div class="redund5-pspan">
                                <p>Logistics company *</p>
                                <span>{{ db_selectlist.receive_shipment_method }}</span>
                            </div>
                            <div class="redund5-pspan">
                                <p>Shipment number *</p>
                                <span>{{ db_selectlist.receive_shipment_code }}</span>
                            </div>
                            <div class="redund5-pspan">
                                <p>Return instructions</p>
                                <span>{{ db_selectlist.receive_shipment_remark }}</span>
                            </div>
                        </div>
                        <!--<div class="user-navbtn">
                                        <a class="btn-active red3" data-type-id="1" style="">CONFIRM</a>
                        </div>-->
                    </div>
                </div>
                <!-- {% if excute_status == 6 %} {# 执行状态:已退款 #} -->
                <div
                        class="redund3"
                        style="display:block;"
                        v-if="db_selectlist.excute_status == 6"
                >
                    <div class="redund2-a">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a9.png"/>
                        </a>
                        <div class="redund2-b">
                            <p>
                                After-sales progress: refund is successful, plea- se pay
                                attention to check
                            </p>
                            <span>Refund success time {{ db_selectlist.refunded_at }}</span>
                            <!-- <span>Refund success time {{ refunded_at|date_modify('+0')|date('H:i:s d/m/Y') }}</span> -->
                            <p>
                                Refund amount US
                                <!-- <span>${{ actual_refund_amount|number_format(2) }}</span> -->
                                <span>${{ db_selectlist.actual_refund_amount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- {% endif %}
            {% endif %}-->

            <!-- {% endif %} -->
            <!-- {% elseif return_action == 3 %} {# 售后方式:换货 #}
            {% if return_status == 2 %} {# 售后状态:执行中 #}
            {% if excute_status == 7 %} {# 执行状态:用户待发货 #}-->
            <div v-if="db_selectlist.return_action == 3">
                <div v-if="db_selectlist.return_status == 2">
                    <div
                            class="redund4"
                            style="display:block;"
                            v-if="db_selectlist.return_status == 7"
                    >
                        <div class="redund4-a">
                            <a href="javascript:void(0)" title>
                                <img src="@/assets/img/a10.png"/>
                            </a>
                            <p>
                                After-sales progress: the merchant has agreed to your aftersales
                                application, please return and fill in the logi- stics
                                information.
                            </p>
                        </div>
                        <div class="redund4-b">
                            <em>Return address:</em>
                            <div class="redund4-pspan">
                                <p>Return Address:</p>
                                <span>{{ db_selectlist.receive_shipment_address }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Consignee:</p>
                                <span>{{ db_selectlist.receive_shipment_name }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Contact number:</p>
                                <span>{{ db_selectlist.receive_shipment_mobile }}</span>
                            </div>
                            <div class="redund4-pspan">
                                <p>Zip code:</p>
                                <span>{{ db_selectlist.receive_shipment_postcode }}</span>
                            </div>
                        </div>
                        <div class="redund4-c">
                            <p>Please fill in the return logistics information</p>
                            <form
                                    method="post"
                                    action="/order/confirm_order_after_sale"
                                    id="confirm_order_after_sale_form"
                                    class="hx-form"
                            >
                                <input
                                        type="hidden"
                                        name="return_no"
                                        :value="db_selectlist.return_no"
                                />
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Logistics company</label>
                                    <div class="hx-input-block">
                                        <input
                                                type="text"
                                                name="receive_shipment_method"
                                                placeholder
                                                autocomplete="off"
                                                class="hx-input"
                                                :value="db_selectlist.receive_shipment_method"
                                        />
                                        <i class="iconfont"></i>
                                    </div>
                                    <em class="hx-form-tips" style="display: none;"
                                    >Required field</em
                                    >
                                </div>
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Shipment number</label>
                                    <div class="hx-input-block">
                                        <input
                                                type="text"
                                                id
                                                name="receive_shipment_code"
                                                placeholder
                                                autocomplete="off"
                                                class="hx-input"
                                                :value="db_selectlist.receive_shipment_code"
                                        />
                                        <i class="iconfont"></i>
                                    </div>
                                    <em class="hx-form-tips" style="display: none;"
                                    >Required field</em
                                    >
                                </div>
                                <div class="hx-form-group hx-must">
                                    <label class="hx-form-label">Shipment number</label>
                                    <div class="hx-input-block">
                    <textarea
                            placeholder
                            class="hx-textarea hx-input"
                            name="receive_shipment_remark"
                            v-model="db_selectlist.receive_shipment_remark"
                    ></textarea>
                                        <div class="hx-text-right">
                                            <em>{{ db_selectlist.receive_shipment_remark.length }}</em
                                            >/
                                            <span>500</span>
                                        </div>
                                    </div>
                                    <em class="hx-form-tips">Required field</em>
                                </div>
                                <div class="user-navbtn">
                                    <a class="btn-active red4" hx-submit>SUBMIT</a>
                                    <!-- onclick="document.getElementById('confirm_order_after_sale_form').submit();" -->
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- {% elseif excute_status == 4 %} {# 执行状态:后台已发货 #} -->
                    <div class="user-navbtn" v-if="db_selectlist.excute_status == 4">
                        <a class="btn-active red4" href="javascript:void(0);" hx-submit
                        >CONFIRMATION</a
                        >
                        <!-- onclick="confirm_receiving_after_sale('{{ db_selectlist.return_no }}')" -->
                    </div>
                </div>
                <!-- {% if excute_status == 8 %} {# 执行状态:用户已收货 #}-->
                <div
                        class="redund5"
                        style="display:block;"
                        v-if="db_selectlist.excute_status == 8"
                >
                    <div class="redund5-a">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a8.png"/>
                        </a>
                        <div class="redund5-p">
                            <p>
                                After-sales progress: waiting for the merchant to c- onfirm the
                                receipt, refund
                            </p>
                            <p>
                                You have successfully submitted your return informa- tion,
                                please be patient and wait for the merchant to process
                            </p>
                        </div>
                    </div>
                    <p class="red5-p">Return logistics</p>
                    <div class="redund5-b">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a11.png"/>
                        </a>
                        <div class="redund5-pspan">
                            <p>Logistics company *</p>
                            <span>{{ db_selectlist.receive_shipment_method }}</span>
                        </div>
                        <div class="redund5-pspan">
                            <p>Shipment number *</p>
                            <span>{{ db_selectlist.receive_shipment_code }}</span>
                        </div>
                        <div class="redund5-pspan">
                            <p>Return instructions</p>
                            <span>{{ db_selectlist.receive_shipment_remark }}</span>
                        </div>
                    </div>
                    <p class="red5-p">Business logistics</p>
                    <div class="redund5-b">
                        <a href="javascript:void(0)" title>
                            <img src="@/assets/img/a11.png"/>
                        </a>
                        <div class="redund5-pspan">
                            <p>Logistics company *</p>
                            <span>{{ db_selectlist.send_shipment_method }}</span>
                        </div>
                        <div class="redund5-pspan">
                            <p>Shipment number *</p>
                            <span>{{ db_selectlist.send_shipment_code }}</span>
                        </div>
                        <div class="redund5-pspan">
                            <p>Return instructions</p>
                            <span>{{ db_selectlist.send_shipment_remark }}</span>
                        </div>
                    </div>
                    <!--<div class="user-navbtn">
                                  <a class="btn-active" data-type-id="1" style="">CONFIRM RECEIPT</a>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Userselect from "@/components/Userselect.vue";
    import HeaderTab from "@/components/HeaderTab";
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
                    return_no: "",
                    return_action: "", //	int	是	售后方式:1:退款 2:退货退款 3:换货 4:补发
                    order_product_id: "", //	int	是	订单商品表id
                    return_reason: 1, //	string	是	售后原因
                    refund_amount: "", //	float	否	退款金额
                    remarks: "", //	string	否	备注
                    images: [] //	array	是	售后凭证图片集
                }
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
            toFixeds(value, num = 2) {
                let realVal = "";
                if (!isNaN(value) && value !== "") {
                    realVal = parseFloat(value).toFixed(num);
                } else {
                    realVal = "--";
                }
                return realVal;
            },
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
            canceled_order_after_sale(return_no) {
                this.$Http.order.canceledOrderReturn({return_no}, true).then(res => {
                    let {code} = res;
                    if (code == 200) {
                        this.$router.push({
                            path: "/order",
                            query: {
                                id: 5,
                                namr: "after_sale_order"
                            }
                        });
                    }
                });

            },
            confirm_receiving_after_sale(return_no) {
                // this.return_reason
                this.listdatas.forEach(item => {
                    if (item.id == this.return_reason) {
                        this.parms.return_reason = item.name;
                    }
                });
                let obj = {};
                if (this.parms.images) {
                    this.parms.images.forEach((v, index) => {
                        if (!obj["images[" + index + "]"]) {
                            obj["images[" + index + "]"] = v;
                        }
                    });
                }
                delete this.parms["images"];
                this.$Http.order
                    .changeApplyOrdeReturn({...this.parms, ...obj}, true)
                    .then(res => {
                        let {code,msg} = res;
                        if (code == 200) {
                            location.reload();
                        } else {
                            Message.info({msg: msg});
                        }
                    });

            },
            getData() {
                this.$Http.order
                    .getOrderReturnDetail({return_no: this.$route.query.return_no})
                    .then(res => {
                        let {code,data} = res;
                        if (code == 200) {
                            this.db_selectlist = data;
                            this.parms.refund_amount = data.max_return_amount;
                            // this.parms.order_product_id = data.product_id
                            this.parms.order_product_id = this.$route.query.id;
                            this.parms.remarks = data.remarks;
                            if (data.return_action === 1) {
                                this.headerTitle = "Refund";
                                this.actionsType.forEach(v => {
                                    if (data.return_action === v.type) {
                                        this.listdatas.push(v);
                                    }
                                });
                            } else if (data.return_action === 2) {
                                this.headerTitle = "Return And Refund";
                                this.actionsType.forEach(v => {
                                    if (data.return_action === v.type) {
                                        this.listdatas.push(v);
                                    }
                                });
                            } else if (data.return_action === 3) {
                                this.headerTitle = "Exchange";
                                this.actionsType.forEach(v => {
                                    if (data.return_action === v.type) {
                                        this.listdatas.push(v);
                                    }
                                });
                            }
                            this.parms.return_action = data.return_action;
                            this.parms.return_no = data.return_no;
                            this.fileList = [];
                            if (data.cert_imgs) {
                                data.cert_imgs.forEach(item => {
                                    this.fileList.push({url: item.image});
                                    this.parms["images"].push(item.path);
                                });
                            }
                        }
                    });

            }
        },
        created() {
            if (this.$route.query.return_no) {
                this.getData();
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
        .picture-file p {
            /* font-family: "SH-Light"; */
            font-size: 0.32rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.33333rem;
            letter-spacing: 0px;
            color: #252525;
            padding-bottom: 0.26667rem;
        }
    }
</style>
