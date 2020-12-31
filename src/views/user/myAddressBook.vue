<template>
  <div class="address-container">
    <h2 class="title">{{name}}</h2>
    <button v-if="total>0" class="button" @click="btn(1)">＋Add New Address</button>
    <div v-if="total>0">
        <div v-for="(item,index) in data" :key="index" :class="['address-item','flex1',item.default==1?'active':'']">
            <i class="iconfont icondizhi"></i>
            <div class="flex2">
                <div>
                      <p>{{item.firstname }} {{item.lastname }}</p>
                      <p>{{item.mobile}}</p>
                </div>
                <div>
                    <p>{{ item.zone?item.zone.name:'' }},{{ item.country?item.country.name:''}},{{item.country?item.country.iso_code_3:''}}</p>
                    <p v-if="item.postcode">{{item.postcode}}</p>
                    <p v-if="item.address_1||item.city">{{item.address_1}},{{item.city}}</p>
                </div>
                <em @click="btn(2,item)">Set Default</em>
            </div>
            <div class="flex">
                <i class="iconfont iconbianji" @click="btn(3,item)"></i>
                <i class="iconfont iconshanchu" @click="btn(4,item,index)"></i>
            </div>
        </div>
    </div>
    <div v-if="total==0">
      <button class="flex addBtn" @click="btn(1)">＋Add New Address</button>
    </div>
    <iDrawer :visible="idrawer" :title="iTitle" :border="idrawerType==2||idrawerType==4?false:true"
      @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn('drawerData')">
      <template slot="content">
        <v-form  v-if="idrawerType==1||idrawerType==3" direction="horizontal" :model="drawerData" ref="drawerData" :rules="rulesAddress">
            <v-form-item :label="item.title" :label-col="labelCol" :wrapper-col="wrapperCol" :prop="item.key" has-feedback v-for="(item,index) in iJsonData.addressTitle" :key="index">
                <v-select :filter="filter" v-model="drawerData[item.key]"  search :data="item.options" label="name" clue="id" v-if="item.type=='select'" @change="drawerSelectChange(item.key,$event)"></v-select>
                <v-input v-model="drawerData[item.key]" placeholder v-else></v-input>
            </v-form-item>
            <v-checkbox style="margin-left:16.6%" v-model="drawerData.default" :true-value="1" :false-value="0">Set Default</v-checkbox>
        </v-form>
        <div v-else-if="idrawerType==2">{{this.$hxmessage.CENTER.ADDRESS_DEFAULT}}</div>
        <div v-else>{{this.$hxmessage.CENTER.ADDRESS_DELETE}}</div>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import iDrawer from "@/components/Drawer";
import iJson from "@/util/iJson";
import FormRules from "@/util/form_mixins";
import toolsMix from "@/util/tools_mixins";
export default {
  components: {
    iDrawer,
  },
  data () {
    const rulesAddress=this.getRulesAddress()
    return {
      last_page:0,
      item:{},
      index:-1,
      idrawerType:-1,
      total:-1,
      name: this.$route.name,
      data: [],
      drawerData:{},
      iTitle:'',
      idrawer:false,
      rulesAddress,
      param:{},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
    }
  },
  mixins: [FormRules,toolsMix],
  methods: {
    btn (type, item,index) {
      switch (Number(type)) {
        case 1:
          this.iTitle = 'Add Address';
          this.idrawerType=1;
          this.drawerData={};
          this.idrawer = true;
          break;
        case 2:
          this.iTitle = '';
          this.idrawerType=2;
          this.item=item;
          this.idrawer = true;
          break;
        case 3:
          this.iTitle = 'Edit Address';
          this.idrawerType=3;
          this.drawerData=JSON.parse(JSON.stringify(item));
          this.getCountryZone(this.drawerData.country_id);
          this.idrawer = true;
          break;
        case 4:
          this.iTitle = '';
          this.idrawerType=4;
          this.item=item;
          this.index=index;
          this.idrawer = true;
          break;
      }
    },
    drawerConfirmBtn(forms){
      console.log(this.idrawerType)
      if(this.idrawerType==1||this.idrawerType==3){
        this.$refs[forms].validate(valid => {
          if (valid) {
            if(this.iTitle=='ADD'){
              this.$Http.address.addressAdd(this.drawerData).then(res => {
                let { code } = res;
                if (code == 200) {
                  this.getAddresses();
                  this.idrawer=false;
                }
              });
            }else if(this.iTitle=='EDIT'){
              this.drawerData.address_id=this.drawerData.id;
              delete this.drawerData.id
              delete this.drawerData.zone
              delete this.drawerData.country
              this.$Http.address.addressEdit(this.drawerData).then(res => {
                let { code } = res;
                if (code == 200) {
                  this.getAddresses();
                  this.idrawer=false;
                }
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }else if(this.idrawerType==2){
        this.$Http.address.addressDefault({ address_id: this.item.id }).then(res => {
          let { code, msg } = res;
          if (code == 200) {
            this.idrawer=false;
            this.getAddresses();
          }
        });
      }else{
        this.$Http.address.addressDel({ address_id: this.item.id }).then(res => {
          let { code, data, msg } = res;
          if (code == 200) {
            this.idrawer=false;
            this.data.splice(this.index, 1);
          }
        });
      }
    },
    getAddresses () {
      this.$Http.address.getAddresses().then(res => {
        let { code, msg, data } = res;
        if (code == 200) {
          this.data = data;
          this.total=data.length;
        }
      })
    },
    drawerCancelBtn(forms){
        this.idrawer=false;
        this.$refs[forms].resetFields();
    },
    drawerSelectChange(key,val){
      if(key=='country_id'){
        this.getCountryZone(val)
      }
    }
  },
  created () {
    this.getAddresses();
    this.getCountries();
  }
}
</script>
<style scoped lang="less">
.address-container {
  >button {
    width: 120px;
    height: 30px;
    font-size: 10px;
    margin: 0 0 10px auto;
  }
  .addBtn{
    width: 850px;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #DADADA;
    border-radius: 4px;
    font-size:14px;
    margin:20px auto;
  }
  .address-item {
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
    height: 100px;
    .icondizhi{
        width: 55px;
        text-align: center;
        display: inline-table;
        font-size:23px;
        color:#BBB;
    }
    &.active{
        background: #F4F4F6;
        border:1px solid #0C0A26;
        .icondizhi{
            color:#0C0A26;
        }
    }
    >div:nth-child(2){
        height: 100%;
        width: 100%;
        border-right:1px solid #e6e6e6;
        border-left:1px solid #e6e6e6;
        padding:20px;
        color:#333;
        font-size:14px;
        >div:first-child{
            width:25%;
        }
        >div:nth-child(2){
            width:63%;
        }
        em{
            display: flex;
            align-items: flex-end;
            border-bottom: 1px solid;
            font-size:12px;
        }
    }
    >div:nth-child(3){
        width: 200px;
        >*{
            margin:0 20px;
            font-size:22px;
        }
    }
  }
}
</style>