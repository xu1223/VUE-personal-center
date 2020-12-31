<template>
  <Pmodel :visible.sync="visible1" :title="'Add Address'" @colse="colseFn">
    <template slot="content">
      <Addressform v-model="forms" ref="addessforom" :checked.sync="checked"></Addressform>
    </template>
    <template slot="footer">
      <div
        class="hx-form-group checkbox-group"
        v-if="!check"
        style="padding: 0 10px"
      >
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
</template>

<script>
import Userselect from "@/components/Userselect.vue";
import Addressform from "./Addressform.vue";
export default {
  props: ["visible"],
  data() {
    return {
      insendbtn: false,
      checked:'',
      check:false,
      visible1: this.visible || false,
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
    };
  },
  watch:{
    'visible': function(){
      this.visible1 = this.visible;
    }
  },
  methods: {
    checkboxfn() {
      this.checked = !this.checked;
    },
    onSubmit() {
      if (this.$refs.addessforom.submit()) {
        this.forms["default"] = this.checked === false ? 0 : 1;
        this.insendbtn = true;
        this.$Http.address
          .addressAdd(
            {
              ...this.forms,
            },
            true
          )
          .then((res) => {
            let { code } = res;
            this.insendbtn = false;
            const _parms = {
              form: this.forms,
              res,
            };
            this.$emit("succes", _parms);
          });
      }
    },
    colseFn(v){
      this.$emit("update:visible", v);
    }
  },
  created() {},
  components: {
    Userselect,
    Addressform,
  },
};
</script>

<style lang="scss" scoped>
</style>