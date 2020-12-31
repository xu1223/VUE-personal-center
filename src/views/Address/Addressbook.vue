<template>
  <div>
    <HeaderTab />
    <div class="user-controller">
      <div class="user-addres user-security" v-if="total > 0">
        <Useraddressbook
          :formdata.sync="list"
          :listId.sync="addId"
          @chanes="delfn"
          @changedel="address_listdefluts1"
          @onCallbak="onCallbak"
        ></Useraddressbook>
      </div>
      <div v-if="total == 0" class="no-data">
        <!-- <img src="@/assets/img/web__wu.png" /> -->
        <i class="icon-info-bg icon-web-wu"></i>
        <p>No related record found...</p>
      </div>
      <div class="formlogins-btn">
        <van-button
          type="primary"
          block
          native-type="submit"
          color="#252525"
          class="user-logins-btn"
          @click="onAdd"
          >ADD NEW ADDRESS</van-button
        >
      </div>
    </div>
    <Insetadd :visible.sync="visible" @succes="onSubmit" />
    <FooterBtn />
  </div>
</template>

<script>
import Useraddressbook from "@/components/Useraddressbook.vue";
import HeaderTab from "@/components/HeaderTab";
import { Toast } from "vant";
import Userselect from "@/components/Userselect.vue";
import Insetadd from "./Insetadd";
export default {
  data() {
    return {
      addId: 2,
      chosenAddressId: "1",
      list: [],
      total: -1,
      visible: false,
      patter1: /^[A-Za-z0-9]+$/,
      patter2: /^[0-9()（）+-]+$/,
      insendbtn: false,
      checked: false,
      activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
      inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png",
      forms: {
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
        postcode: "",
        default: this.checked ? 1 : 0,
      },
      country_id: "",
      db_selectlist: {},
      country_list: [],
      isReq: {
        firstname: "1",
        lastname: "1",
        mobile: "1",
        address_1: "1",
        country_id: "1",
        zone_id: "1",
        postcode: "1",
        city: "1",
        default: "1",
        country: "1",
        zone: "1",
      },
    };
  },
  methods: {
    firstnameFn() {
      if (this.forms.firstname == "") {
        this.isReq.firstname = "";
      } else {
        this.isReq.firstname = "1";
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
    zoneidChanges() {
      if (this.forms.zone_id == "") {
        this.isReq.zone_id = "";
      } else {
        this.isReq.zone_id = "1";
      }
    },
    countryChanges(val) {
      this.$Http.common
        .getCountryZone({
          country_id: val,
        })
        .then((res) => {
          let { code, data } = res;
          if (code == 200) {
            this.forms.zone_id = "";
            this.db_selectlist = data;
            this.isReq.country_id = "1";
          }
        });
    },
    onSubmit(_parms) {
      this.visible = !this.visible;
      this.getAddresses();
      return false;
    },
    onAdd() {
      // this.$router.push("/cart/add_address");
      this.visible = !this.visible;
    },
    address_listdefluts1(index) {
      this.list.splice(index, 1);
      this.list = this.list;
    },
    delfn(code) {
      if (code) {
        this.getAddresses();
      }
    },
    getAddresses(index = 2) {
      this.$Http.address.getAddresses().then((res) => {
        console.log("res", res);
        let { code, data } = res;
        if (code == 200) {
          this.list = data;
          this.total = data.length;
          if (index == 1) {
            this.visible = false;
          }
        }
      });
    },
    onCallbak(val) {
      this.getAddresses(1);
    },
  },
  created() {
    this.getAddresses();
  },
  components: {
    Useraddressbook,
    HeaderTab,
    Userselect,
    Insetadd,
  },
};
</script>

<style scoped lang="scss" scoped>
@import "@/assets/style/_var.scss";
@import "@/assets/style/mixins.scss";
.user-controller {
  background: transparent;
  width: pxto2($width710);
  padding: 0;
  margin: 0 auto;
}
.formlogins-btn {
  margin-bottom: pxto2($px10);
}
</style>
