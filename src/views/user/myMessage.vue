<template>
  <div class="message-container">
    <h2 class="title">{{name}}</h2>
    <div v-if="total>0">
      <button v-if="total>0" class="button new-message" @click="btn(1)">New Message</button>
      <table class="message-banner">
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>Last Replier</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
        <tr v-for="(item,index) in data" :key="index" :class="item.is_view==0?'active':''">
          <td>{{item.time}}</td>
          <td>{{item.is_view==2?'Read':'Unread'}}</td>
          <td>{{item.last_replier}}</td>
          <td class="title-ellipsis">{{item.title}}</td>
          <td>
            <button class="button view"  @click="btn(2,item)">View</button>
          </td>
        </tr>
      </table>
      <v-pagination v-if="total>0&&last_page!=1" class="page" :total="total" @change="loadPage" :pageSize="20"></v-pagination>
    </div>
    <div v-if="total==0">
      <div class="noneData">
        <img src="@/assets/img/messageNone.png">
        <p>No notific ations.</p>
        <a class="button" @click="btn(1)">＋  New Message</a>
      </div>
    </div>
    <iDrawer width="900" :visible="idrawer" :title="iTitle" :btn="idrawerType==2?false:true"
      @confirmBtn="drawerConfirmBtn('drawerData')" @cancelBtn="drawerCancelBtn('drawerData')">
      <template slot="content">
          <p v-if="idrawerType==1" style="margin-bottom:10px;font-size: 14px;">Please fill in the message and we will contact you as soon as possible.</p>
          <v-form direction="horizontal" :model="drawerData" ref="drawerData" :rules="messageRuleForm">
              <v-form-item v-if="idrawerType==1" label="Title" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title" has-feedback>
                  <v-input v-model="drawerData.title" placeholder></v-input>
              </v-form-item>
              <v-form-item label="Content" :label-col="labelCol" :wrapper-col="wrapperCol" prop="content" has-feedback>
                  <v-input type="textarea" v-model="drawerData.content" placeholder></v-input>
              </v-form-item>
              <!-- <v-form-item label="Image" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                <IMG @imgGet="imgGet" @imgDelete="imgDelete" :data="drawerData.images" :length="5"/>
              </v-form-item> -->
              <button class="button submit" v-if="idrawerType==2" @click.prevent="drawerConfirmBtn('drawerData')">SUBMIT</button>
          </v-form>
          <div class="message-detail-banner scroll" v-if="idrawerType==2">
            <div v-for="(item,index) in item.children" :key="index" :class="['item',item.from==drawerName?'right':'']">
              <p>{{item.from}}</p>
              <div>{{item.content}}
                <!-- <div class="flex" v-if="item.images!=''">
                  <img style="width:30px;margin:0 3px;" :src="cont.img_m" v-for="(cont,v) in item.images" :key="v">
                </div> -->
              </div>
              <span>{{item.sent_at}}</span>
            </div>
          </div>
      </template>
    </iDrawer>
  </div>
</template>
<script>
import IMG from "@/components/Image";
import iDrawer from "@/components/Drawer";
import {timestampToTime} from "@/util/tools";
import FormRules from "@/util/form_mixins";
export default {
  components: {
    iDrawer,
    IMG
  },
  data () {
    const messageRuleForm = this.getRulesByConfig(['title', 'content']);
    return {
      last_page:0,
      item:{},
      name: this.$route.name,
      total:-1,
      data:[],
      idrawer:false,
      iTitle:'',
      drawerName:this.$storage.getUserInfo().firstname+this.$storage.getUserInfo().lastname?this.$storage.getUserInfo().firstname+this.$storage.getUserInfo().lastname:this.$storage.getUserInfo().email,
      drawerData:{},
      idrawerType:-1,
      images:[],
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 21
      },
      messageRuleForm
    }
  },
  mixins: [FormRules],
  watch: {},
  methods: {
    imgDelete() {
      this.images.splice(index, 1);
    },
    imgGet(data) {
      this.$Http.message.messageImageUpload({ file: data }, true).then(options => {
        let { code, data } = options;
        if (code == 200) {
          this.images.push(data);
        }
      });
    },
    btn(type,item){
      switch(type) {
          case 1:
            this.iTitle='New Message';
            this.drawerData={
              title:'',
              content:'',
            };
            this.idrawerType=1;
            this.idrawer=true;
           break;
          case 2:
            this.item=item;
            this.iTitle='VIEW MESSAGE';
            this.drawerData={
              content:'',
            };
            this.idrawerType=2;
            this.getMessageDetail(item.message_id,'true');
            this.idrawer=true;
            break;
      }
    },
    loadPage(page){
      this.getMessages(page)
    },
    getMessages(p) {
      this.$Http.message.getMessages({ p: p || 1 }).then(options => {
        let { data, code } = options;
        if (code == 200) {
          this.last_page=data.last_page;
          this.total=data.total;
          if(data.total>0){
            data.data.map(item=>{
              item.time=timestampToTime(item.created_at)
            })
            this.data = data.data;
          }
        }
      });
    },
    drawerConfirmBtn(forms){
      this.$refs[forms].validate(valid => {
        if (valid) {
          let prama={
            content:this.drawerData.content,
          }
          if(this.idrawerType==1){
            prama.title=this.drawerData.title
          }else{
            prama.id=this.item.message_id
          }
          // if (this.images) {
          //     this.images.forEach((v, i) => {
          //         if (!prama["images[" + i + "]"]) {
          //             prama["images[" + i + "]"] = v;
          //         }
          //     });
          // }
          this.$Http.message.sendMessage(prama).then(res => {
            let { code, data, msg } = res;
            if (code == 200) {
              if(this.idrawerType==1){
                this.idrawer=false;
                this.getMessages()
              }else{
                this.getMessageDetail(prama.id)
                // this.images=[];
                // this.drawerData={
                //   content:'',
                //   images:[]
                // };
              }
              this.drawerData={};
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    drawerCancelBtn(forms){
      this.idrawer=false;
      this.$refs[forms].resetFields();
    },
    getMessageDetail(id,type){
      this.$Http.message.getMessageDetail({ id:id }).then(res => {
        let { code, data , msg } = res;
        if (code == 200) {
          this.item = data;
          if(type){
            this.idrawer=true;
          }
        }
      });
    }
  },
  created () {
    this.getMessages()
  }
}
</script>
<style scoped lang="less">
.message-container{
  .button.new-message{
    width: 120px;
    height: 30px;
    margin-bottom: 10px;
  }
  .message-banner{
    width: 100%;
    tr{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    td,th{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #DADADA;
      border-bottom: 1px solid #DADADA;
      font-weight: 400;
    }
    th{
      border-top: 1px solid #DADADA;
      font-size:16px;
      background: #F4F4F6;
    }
    td{
      height: 50px;
      padding:0 10px;
    }
    th:first-child,td:first-child{
      border-left: 1px solid #DADADA;
      width: 15%;
    }
    th:nth-child(2),td:nth-child(2){
      width: 15%;
    }
    th:nth-child(3),td:nth-child(3){
      width: 15%;
    }
    th:nth-child(4),td:nth-child(4){
      width: 40%;
    }
    td:nth-child(4){
      display: block;
      line-height: 50px;
    }
    th:nth-child(5),td:nth-child(5){
      width: 15%;
      button{
        width: 90px;
        height: 30px;
      }
    }
    .active{
      background: #FFF2F3;
      td:first-child{
        position:relative;
        color:#E4535C;
        &::before{
          position: absolute;
          content: '';
          width: 12px;
          height: 12px;
          border-radius:50%;
          background: #E4535C;
          top: 0;
          bottom:0;
          left: 10px;
          margin: auto;
        }
      }
      td:nth-child(2){
        color:#E4535C;
      }
    }
  }
}
.message-detail-banner{
  background: #F4F4F6;
  border-top:1px solid #0C0A26;
  margin: 0 -20px;
  padding:10px 20px;
  height: 280px;
  overflow: hidden;
  overflow-y: auto;
  .item{
    display: flex;
    margin-bottom: 10px;

    p{
      min-width:50px;
      background: #0C0A26;
      color:#fff;
      font-size:14px;
      padding:5px;
      word-wrap: break-word;
      border-radius: 4px 0px 0px 4px;
    }
    >div{
      padding:5px;
      border-radius: 4px;
      background: #fff;
      display: flex;
      border: 1px solid #0C0A26;
      border-radius: 0px 4px 4px 0px;
      max-width: 70%;
    }
    span{
      display: flex;
      align-items: flex-end;
      margin-left: 10px;
    }
  }
  .item.right{
    flex-direction: row-reverse;
    p{
      border-radius: 0px 4px 4px 0px;
    }
    div{
      border-radius: 4px 0px 0px 4px;
    }
    span{
      margin-left: 0;
      margin-right: 10px;
    }
  }
}
.submit{
  width: 90px;
  height: 30px;
  margin: 0 0 20px auto;
}
</style>