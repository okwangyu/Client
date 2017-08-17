<template>
  <div class="addstudent">
    <Modal v-model="modal.show" title="添加小组" @on-cancel="cancel">
    <div class="addbody">
         <div class="shu">
           <Input v-model="value" autofocus placeholder="请输入小组名称"></Input>
         </div>
         <div class="stunumber">您已经选择了 <span class="num">{{check_cont}}</span> 个学生 <div class="noice">点击学生头像进行添加</div></div>
         <div class="student_l">
           <ul>
             <li class="groupSelect" v-for="(item,index) in student_list" :key="index" @click="tianjia(item)">
                <div class="groupCheck" :class="item.check?zhuantai:''">
                  <Icon type="ios-checkmark-empty"></Icon>
                </div>
                <div class="groupRenIcon"><img :src="item.icon_class"></div>
                <div class="xuesheng">{{item.name_class}}</div>
             </li>
           </ul>
         </div>
    </div>
    <div slot="footer">
      <Button @click="out">取消</Button><Button type="primary" :class="value.length==0 || check_cont==0?disabled:''" @click="add()">添加</Button>
    </div>
    </Modal>
</div>
</template>

<script>
  function imgUrl(url){
        if (url) {
          let str=url;
          let istrue=str.indexOf('/uploads');
          if(!istrue){
            return api.api+url;
          }else{
            return api.url+url;
          }
        }else{
          console.log(url)
          return require('@/assets/nostudent.png')
        }
        
    }
  import $ from 'jquery'
  export default {
    name: 'hello',
    props:['modal','userinfo'],
    data () {
      return {
        apiurl:api,
        modal1: false,
        value:'',
        list:[],
        disabled:'disabled',
        zhuantai:'zhuantai',
        group:[],
        user_info:{
           id:0,
           name:'',
           user_icon:''
        }
      }
    },
    computed:{
      student_list:function(){
        return this.$store.getters.lists
      },
      check_cont:function(){
        return this.$store.getters.get_check_cont
      },
      subject:function(){
        return this.$store.getters.get_current_subject
      }
    },
    methods: {
      cancel(){
        this.modal.show=false;
        this.value=''
        this.$store.commit('addGroupcheck')
      },
      out(){
        this.modal.show=false;
        this.value=''
        this.$store.commit('addGroupcheck')
      },
      add(){
        this.getUser()
        let num=0
        let shuju=this.value.replace(/(^\s*)|(\s*$)/g, "");
        if(!shuju){
            this.$Message.error('必须填写小组名称');
            return false
        }
        if(shuju.length>10 || shuju.length<2){
            this.$Message.error('小组名称太短或者太长,建议您设置到2-10个字符');
            return false
        }
        let members=[];
        this.student_list.forEach(function(item){
            if(item.check){
                members.push({
                  student_id:item.student_id
                })
            }
        })
        var iconStr=['group01@2x.png', 'group02@2x.png', 'group03@2x.png', 'group04@2x.png', 'group05@2x.png', 'group06@2x.png', 'group07@2x.png', 'group08@2x.png', 'group09@2x.png', 'group10@2x.png', 'group11@2x.png'];
        var icon=iconStr[Math.floor(Math.random()*iconStr.length)];
        this.group={
            class_group_name:shuju,
            class_group_icon:'/uploads/group/'+icon,
            create_by:this.user_info.id,
            class_subject_id:this.subject.class_subject_id,
            members:members
        }
            
        this.value=''
        this.$emit('addxz',this.group)
      },
      tianjia(item){
          this.$store.commit('allpush',item)
      },
      getUser(){
        let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
        this.user_info.user_icon=imgUrl(userinfo.avatar)
        this.user_info.name=userinfo.username
        this.user_info.id=userinfo.id
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addbody{
     padding: 10px 20px 0;
  }
  .input-text,.btn,.input-text.size-M,.btn.size-M{ 
    font-size:14px; 
    height:31px;
    height:auto;
    line-height:1.42857;
    padding:4px
  }
  .stunumber{
    height: 50px;
    line-height: 50px;
  }
  .noice{
    float: right;
    color: #ccc;
  }
  .student_l{
    height: 250px;
    overflow: auto;
  }
  .showstuimg{
    width: 50px;
    height: 50px;
    display: block;
    float: left;
    padding-left: 4px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    background: #fff;
  }
  .showstuimg img{
    height: 100%;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    background: #fff;
  }
  .showstuname{
    width: 300px;
    height: 50px;
    line-height: 50px;
    display: block;
    float: left;
  }
  .showstuclose{
    width: 50px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
    float: right;
    font-size: 20px;
    color: #ddd;
    cursor: pointer;
  }
  .num{
    color: #2aadf1
  }
  .groupSelect{
    float: left;
    width: 82px;
    height: 85px;
    margin: 4px 6px;
    border-radius: 4px;
    border: 1px solid #f5f5f5;
    text-align: center;
    cursor: pointer;
    position: relative;
    background-color: #f5f5f5;
  }
  .groupRenIcon{
    margin-top: 6px;
    width: 100%;
    height: 55px;
    position: relative;
  }
  .groupRenIcon img{
    height: 100%
  }
  .xuesheng{
    font-size: 15px;
  }
  .groupCheck{
    position: absolute;
    top: 0px;
    right: 0px;
    background: #ccc;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    display: block;
    line-height: 24px;
    color: #fff;
    font-size: 24px;
    z-index: 1000;
  }
  .zhuantai{
      background: #2aadf1
   }
</style>
