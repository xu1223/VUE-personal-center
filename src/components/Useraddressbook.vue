<template>
  <div>
    <div
      class="user-address select"
      :data-hx-default="item.id"
      v-for="(item, index) in formdata1"
      :key="index"
      style="padding-bottom: 0"
      @click="tableItem($event, item, index)"
      :data-default="item.default"
    >
      <!-- :style="{background:parseInt(item.default) != 0 && 'none'}" -->
      <div class="addres-flex">
        <div @click="tableItem($event, item, index)" class="addres-icon">
          <i
            :class="[
              'iconfont pers-ico_site p-addres',
              parseInt(item.default) !== 0 ? 'activecheck' : '',
            ]"
          ></i>
          <!-- <i class="icon-info-bg address-1" /> -->
        </div>
        <div class="addres-content">
          <span>{{ item.lastname }} {{ item.firstname }}</span>
          <p>
            {{ item.address_1 }},{{ item.city }},{{
              item.country ? item.country.name : ""
            }},{{ item.postcode }}, {{ item.zone ? item.zone.name : "" }}
          </p>
        </div>
        <div class="addres-set">
          <div class="bainji">
            <!-- <router-link
              :to="{ path: '/edit_address', query: { id: item.id } }"
            >
              <i class="iconfont pers-icon-bainji"></i>
            </router-link> -->
            <a
              data-edit-id="item.id"
              href="javascript:void(0)"
              @click.stop="editFn(item, index)"
            >
              <i class="iconfont pers-bianji"></i>
            </a>
          </div>
          <div>
            <a
              href="javascript:void(0)"
              title
              :data-id="item.id"
              @click.stop="adddelete(item, index)"
            >
              <i class="iconfont pers-shanchu"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="user-address-up">
        <div class="address-left" @click="tableItem($event, item, index)">
          <a
            href="javascript:void(0)"
            title
            :class="[parseInt(item.default) === 0 ? 'activecheck' : '']"
          ></a>
          <i class="icon-info-bg address-1" />
        </div>
        <div class="address-right">
          <span>{{ item.lastname }} {{ item.firstname }}</span>
          <p>
            {{ item.address_1 }},{{ item.city }},{{
            item.country ? item.country.name : ""
            }},{{ item.postcode }}, {{ item.zone ? item.zone.name : "" }}
          </p>
        </div>
      </div>
      <div class="address-right-down">
        <router-link :to="{ path: '/edit_address', query: { id: item.id } }">
          <img src="@/assets/img/edit.png" />MODIFY
        </router-link>
        <a href="javascript:void(0)" title data-id="3860" @click.stop="adddelete(item, index)">
          <img src="@/assets/default_m/a3.png" />DELETE
        </a>
      </div> -->
    </div>
    <Pmodel
      :visible.sync="visible1"
      v-if="listId"
      :title="'Edit Address'"
      @colse="colseFn"
    >
      <template slot="content">
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Name</label>
          <div
            :class="[
              'hx-input-block',
              isReq.firstname ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="firstname"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.firstname"
              @input="firstnameFn"
            />
            <i class="iconfont" v-show="!isReq.firstname"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.firstname"
            >Required field</em
          >
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Last Name</label>
          <div
            :class="[
              'hx-input-block',
              isReq.lastname ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="lastname"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.lastname"
              @input="lastnameFn"
            />
            <i class="iconfont" v-show="!isReq.lastname"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.lastname"
            >Required field</em
          >
        </div>
        <div class="hx-form-group hx-must hx-focus">
          <label for class="hx-form-label">Phone</label>
          <div
            :class="[
              'hx-input-block',
              isReq.mobile ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="mobile"
              hx-rule-phone
              placeholder
              autocomplete="off"
              data-isfocus="true"
              hx_form_focus="phone"
              class="hx-input"
              v-model="forms.mobile"
              @input="mobileFn"
            />
            <i class="iconfont" v-show="!isReq.mobile"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.mobile"
            >Please enter the correct telephone number.</em
          >
          <!-- <span data-isFocus="true" class="hx-point-out">If there is a problem with your order, we will
        conta-ct you by phone!</span>-->
        </div>

        <Userselect
          :pr="'Country'"
          :msg="'Country'"
          :formdata="db_selectlist.country_list || []"
          :value.sync="forms.country_id"
          @changes="countryChanges"
        >
          <em
            class="hx-form-tips"
            style="display: inline"
            slot="tip"
            v-show="!isReq.country_id"
            >Required field</em
          >
        </Userselect>
        <Userselect
          :formdata="db_selectlist.zone_list || []"
          :value.sync="forms.zone_id"
          :pr="'State'"
          :msg="'State'"
          @changes="zoneidChanges"
        >
          <em
            class="hx-form-tips"
            style="display: inline"
            slot="tip"
            v-show="!isReq.zone_id"
            >Required field</em
          >
        </Userselect>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">City</label>
          <div
            :class="[
              'hx-input-block',
              isReq.city ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="city"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.city"
              @input="cityFn"
            />
            <i class="iconfont" v-show="!isReq.city"></i>
          </div>
          <em class="hx-form-tips" style="display: inline" v-show="!isReq.city"
            >Required field</em
          >
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Address</label>
          <div
            :class="[
              'hx-input-block',
              isReq.address_1 ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="address_1"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.address_1"
              @input="addressFn"
            />
            <i class="iconfont" v-show="!isReq.address_1"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.address_1"
            >Required field</em
          >
        </div>
        <div class="hx-form-group hx-must">
          <label class="hx-form-label">Zip Code</label>
          <div
            :class="[
              'hx-input-block',
              isReq.postcode ? 'result-success' : 'result-error',
            ]"
          >
            <input
              type="text"
              name="postcode"
              placeholder
              autocomplete="off"
              class="hx-input"
              v-model="forms.postcode"
              @input="postcodeFn"
            />
            <i class="iconfont" v-show="!isReq.postcode"></i>
          </div>
          <em
            class="hx-form-tips"
            style="display: inline"
            v-show="!isReq.postcode"
            >Please enter the correct postcode.</em
          >
        </div>
      </template>
      <template slot="footer">
        <div class="hx-form-group checkbox-group" style="padding: 0 10px">
          <div class="hx-input-block" id="default_checked">
            <div
              class="hx-form-checkbox"
              hx-data-checkname="default"
              @click="checkboxfn"
            >
              <span :class="['hx-checkbox', checked ? 'checked' : '']"></span>
              <em> Save new address to address book </em>
            </div>
            <input
              type="checkbox"
              name="default"
              title="Select as billing address."
              :checked="checked ? 'checked' : ''"
            />
          </div>
        </div>
        <van-button
          type="primary"
          :loading="insendbtn"
          class="p-btn-submint"
          @click="onSubmit"
          >Submit</van-button
        >
      </template>
    </Pmodel>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import message from "@/util/message";
import Userselect from "@/components/Userselect.vue";
export default {
  name: "Useraddressbook",
  props: ["formdata", "listId"],
  data() {
    return {
      visible1: false,
      insendbtn: false,
      formdata1: this.formdata || []
,      forms: {
        firstname: "",
        lastname: "",
        mobile: "",
        address_1: "",
        country_id: "",
        zone_id: "",
        city: "",
        postcode: "",
        default: "",
        country: "",
        zone: "",
      },
      db_selectlist: "",
      checked: false,
      patter1: /^[A-Za-z0-9]+$/,
      patter2: /^[0-9()（）+-]+$/,
      isReq: {
        firstname: "1",
        lastname: "1",
        mobile: "1",
        address_1: "1",
        country_id: "1",
        zone_id: "1",
        city: "1",
        postcode: "1",
        default: "1",
        country: "1",
        zone: "1",
      },
      // curIndex: this.listId || (this.formdata[0] ? this.formdata[0].id : 0)
    };
  },
  watch: {
    listId: function () {
      this.listId = this.listId;
    },
    visible: function () {
      // this.visible1 = this.visible;
    },
    formdata:function(){
      this.formdata1 = this.formdata;
    }
  },
  methods: {
    colseFn(v) {
      this.$emit("update:visible", v);
    },
    firstnameFn() {
      if (this.forms.firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
      }
    },
    postcodeFn() {
      if (
        this.forms.postcode == "" ||
        !this.patter1.test(this.forms.postcode)
      ) {
        this.isReq.postcode = "";
      } else {
        this.isReq.postcode = "1";
      }
    },
    lastnameFn() {
      if (this.forms.lastname == "") {
        this.isReq.lastname = "";
      } else {
        this.isReq.lastname = "1";
      }
    },
    addressFn() {
      if (this.forms.address_1 == "") {
        this.isReq.address_1 = "";
      } else {
        this.isReq.address_1 = "1";
      }
    },
    cityFn() {
      if (this.forms.city == "") {
        this.isReq.city = "";
      } else {
        this.isReq.city = "1";
      }
    },
    zoneidChanges() {
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    zone_idFn() {
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    mobileFn() {
      if (
        this.forms.mobile == "" ||
        !this.patter2.test(this.forms.mobile) ||
        this.forms.mobile.length < 11 ||
        this.forms.mobile.length > 16
      ) {
        this.isReq.mobile = "";
      } else {
        this.isReq.mobile = "1";
      }
    },
    checkboxfn() {
      this.checked = !this.checked;
    },
    countryChanges(val) {
      this.$Http.common.getCountryZone({ country_id: val }).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          this.forms.zone_id = "";
          // this.db_selectlist= data
          this.db_selectlist["zone_list"] = data;
        }
      });
    },
    tableItemfn(event, item, index) {
      event.stopPropagation();
      let parse = {
        item,
      };

      this.$emit("change", parse);
    },
    tableItem(event, item, index) {
      let parse = {
        item,
        index,
      };
      this.$emit("changes", parse);
      event.stopPropagation();
      this.curIndex = item.id;
      item.isFalse = true;
      if (this.formdata) {
        this.formdata.forEach((v) => {
          v.default = 0;
        });
      }
      this.$emit("update:listId", item.id);
      this.$Http.address.addressDefault({ address_id: item.id }).then((res) => {
        let { code, data } = res;
        if (code == 200) {
          item.default = 1;
          this.$emit("onCallbak");
        }
      });
    },
    adddelete(item, index) {
      message.confirms({
        className: "confirms-btnswhis zIndex10000",
        zIndex: 30000,
        msg: "Do you want to delete this address?",
        rightBtnFn: () => {
          this.$Http.address.addressDel({ address_id: item.id }).then((res) => {
            let { code, data } = res;
            let parms = {
              index,
            };
            if (code == 200) {
              this.$emit("changedel", parms);
            }
          });
        },
      });
    },
    editFn(item, index) {
      this.visible1 = !this.visible1;
      this.$Http.address
        .getAddressDetail({
          id: item.id,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            this.db_selectlist = data;
            // id: 3193
            // firstname: "魏联铸"
            // lastname: "魏联铸"
            // mobile: "2222222222222"
            // address_1: "魏联铸"
            // country_id: 44
            // zone_id: 684
            // city: "123"
            // postcode: "123"
            // default: 0
            // country: "China"
            // zone: "Anhui"
            let itmes = data.address;
            this.forms["id"] = itmes.id;
            this.forms["firstname"] = itmes.firstname;
            this.forms["lastname"] = itmes.lastname;
            this.forms["mobile"] = itmes.mobile;
            this.forms["address_1"] = itmes.address_1;
            this.forms["zone_id"] = itmes.zone_id;
            this.forms["city"] = itmes.city;
            this.forms["country_id"] = itmes.country_id;
            this.forms["postcode"] = itmes.postcode;
            this.forms["default"] = itmes.default;
            this.forms["country"] = itmes.country;
            this.forms["zone"] = itmes.zone;
            this.checked = itmes.default == 0 ? false : true;
            this.insendbtn = false;
          }
        });
    },
    onSubmit() {
      this.forms["default"] = this.checked === false ? 0 : 1;
      let {
        firstname,
        lastname,
        mobile,
        address_1,
        country_id,
        city,
        postcode,
        zone_id,
      } = this.forms;
      if (firstname === "") {
        this.isReq.firstname = "";
        return false;
      } else if (lastname === "") {
        this.isReq.lastname = "";
        return false;
      } else if (mobile === "") {
        this.isReq.mobile = "";
        return false;
      } else if (address_1 === "") {
        this.isReq.address_1 = "";
        return false;
      } else if (country_id === "") {
        this.isReq.country_id = "";
        return false;
      } else if (zone_id === "") {
        this.isReq.zone_id = "";
        return false;
      } else if (city === "") {
        this.isReq.city = "";
        return false;
      } else if (postcode === "") {
        this.isReq.postcode = "";
        return false;
      }
      this.insendbtn = true;
      delete this.forms["zone"];
      this.forms["address_id"] = this.forms.id;
      this.$Http.address.addressEdit({ ...this.forms }, true).then((res) => {
        let { code } = res;
        this.insendbtn = false;
        this.visible = false;
        if (this.visible1) {
          this.visible1 = !this.visible1;
        }
        this.$emit("onCallbak", false);
        this.$emit('update:formdata')
      });
    },
  },
  components: {
    Userselect,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
// .user-controller {
//   background: #fff;
//   padding: 0.23333rem 0.53333rem;
//   margin-top: 1.4rem;
.user-address {
  min-height: pxto2($px170);
  background-color: #fff;
  padding: 0;
  box-shadow: none;
  border-radius: 5px;
  border: solid 1px $border-color;
  margin: 10px 0;
  cursor: pointer;
  @include fontSize24();
  .p-addres {
    color: $info;
    &.activecheck {
      color: $block;
    }
  }
  .addres-flex {
    display: flex;
    min-height: pxto2($px170);
  }
  .addres-icon {
    width: pxto2($px60);
    border-right: solid 1px $border-color;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .addres-content {
    padding: pxto2($px20);
    width: 100%;
  }
  .addres-set {
    width: pxto2($px80);
    border-left: solid 1px $border-color;
    text-align: center;
    .bainji {
      margin: pxto2($px20) 0;
    }
  }
}
.user-address .user-address-up {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
}
.user-address .user-address-up .address-left {
  font-size: 0;
}
.user-address .user-address-up .address-left a {
  z-index: 1000;
  position: relative;
  display: block;
  width: 0.53333rem;
  height: 0.53333rem;
}
.user-address .user-address-up .address-right {
  padding-left: 0.26667rem;
}
.user-address .user-address-up .address-right p,
.user-address .user-address-up .address-right span {
  font-size: 0.32rem;
  font-weight: 400;
  font-stretch: normal;
  letter-spacing: 0;
  color: #6e6e6e;
  line-height: 0.53333rem;
}
.user-address .user-address-up .address-right p,
.user-address .user-address-up .address-right span {
  font-size: 0.32rem;
  font-weight: 400;
  font-stretch: normal;
  letter-spacing: 0;
  color: #6e6e6e;
  line-height: 0.53333rem;
}
.user-address .address-right-down {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -ms-flex-align: end;
  -webkit-box-align: end;
  align-items: flex-end;
  padding-top: 0.26667rem;
  padding-left: 0.8rem;
}
.user-address .address-right-down a {
  font-size: 0.32rem;
  letter-spacing: 0;
  color: #bbb;
  display: block;
  border-bottom: 1px solid #bbb;
  line-height: 0.33333rem;
}
.user-address .address-right-down a {
  font-size: 0.32rem;
  letter-spacing: 0;
  color: #bbb;
  display: block;
  border-bottom: 1px solid #bbb;
  line-height: 0.33333rem;
}
.user-address .address-right-down a img {
  width: 0.24rem;
  height: 0.24rem;
}
// }
</style>
