<template>
  <div class="student">
    <v-loading v-if="spinShow"></v-loading>
    <v-header><span>班级设置</span></v-header>
    <div class="setting_con">
      <div class="setting_top">
            <Breadcrumb>
              <Breadcrumb-item href="/classes"> <Icon type="ios-home-outline"></Icon> 班级列表</Breadcrumb-item>
              <Breadcrumb-item> <Icon type="monitor"></Icon> 班级设置</Breadcrumb-item>
            </Breadcrumb>
      </div>
      <div class="setting_left">
        <div class="nav_lists">
          <ul>
            <router-link tag="li" :to="{ name: 'setclass', params: { class_id: class_id }}"><Icon type="monitor"></Icon><span >班级设置</span></router-link>
            <router-link tag="li" :to="{ name: 'setsubject', params: { class_id: class_id }}"><Icon type="ios-bookmarks"></Icon><span>科目管理</span></router-link>
            <router-link tag="li" :to="{ name: 'setbehair', params: { class_id: class_id }}"><Icon type="compose"></Icon><span>行为管理</span></router-link>
            <router-link tag="li" :to="{ name: 'setstudent', params: { class_id: class_id }}"><Icon type="person"></Icon><span>学生管理</span></router-link>
          </ul>
        </div>
      </div>
      <div class="setting_right"  ref="abc">
         <router-view></router-view>
      </div>
    </div>
    <div class="footer">
        <v-menu></v-menu>
        <div class="copy">
          <p>校朋客户端 版权所有:北京中软科信信息技术有限公司</p>
          <p>更多复杂的操作请登录校朋pc进行操作</p>
        </div>
    </div>
  </div>
</template>

<script>

   import vHeader from '@/pages/v-header'
   import vLoading from '@/components/loading'
   import vMenu from '@/components/menu'
   import $ from 'jquery'
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
   export default {
    name: 'classes',
    data () {
        return {
           spinShow: false,
           class_id:this.$route.params.class_id,
           id:0
        }
    },
    computed:{

    },
    methods: {
        getUser(){
            let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
            this.id=userinfo.id
        },
        behavior () {
              let _this=this;
              $.ajax({
                    type:'get',
                    url:api.api+'v3/behavior/listClass/format/json',
                    dataType:'JSON',
                    data:{
                      class_id:_this.$route.params.class_id,
                      create_by:_this.id
                    },
                    success:function(res){
                        _this.$store.commit('add_behavior',res.data)
                    }
              })
        },
        get_student(){
              let _this=this;
              $.ajax({
                    type:'get',
                    url:api.api+'v3/student/listStudentManagement/format/json',
                    dataType:'JSON',
                    data:{
                      class_id:_this.$route.params.class_id
                    },
                    success:function(res){
                       _this.$store.commit('add_student',res.data)
                    }
              })
        }
      
    },
    created () {
      this.getUser()
      this.behavior()
      this.get_student()
    },
    components:{
          vHeader,vLoading,vMenu
    }
  }
</script>
<style scoped>
.student{
  background: #EBF9FF;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
    .setting_con{
      position: absolute;
      height: 100%;
      width: 100%;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      overflow: auto;
    }
    .setting_top{
      position: absolute;
      top: 52px;
      left: 1px;
      right: 2px;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      background: #fff;
      border-bottom: 1px solid #ddd;
    }
    .setting_left{
      width: 220px;
      background: #f5f9fc;
      position: absolute;
      left: 1px;
      right: 220px;
      bottom: 70px;
      top: 102px;
    }
    .setting_left  .nav_lists{
      padding-top: 30px;
    }
    .setting_left  .nav_lists ul li{
      display: block;
      height: 48px;
      font-size: 16px;
      line-height: 48px;
      text-indent: 20px;
      color: #222;
      cursor: pointer;
    }
    .setting_left  .nav_lists ul li span{
      padding-left: 10px;
    }
    .router-link-active{
      background-color: #d6ebff;
      color: #0099e8;
    }
    .setting_right{
      background: #fff;
      position: absolute;
      left: 220px;
      right: 2px;
      bottom: 70px;
      top: 102px;
    }
    .footer{
      position: fixed;
      bottom: 2px;
      left: 2px;
      right: 2px;
      height: 70px;
      background: #fff;
      border-radius: 0 0 6px 6px;
      border-top: 1px solid #eee;
      vertical-align: middle
    }
    .copy{
      height: 70px;
      line-height: 20px;
      float: right;
      width: 360px;
      margin-top: 15px;
    }
    .copy p{
      font-size: 14px;
      color: #999;
    }

</style>