<template>
        <div class="meun">
          <Poptip placement="top-start" width="180" style="margin-left:15px;">
            <p class="nav" v-waves.block>
              <Icon type="navicon"></Icon>
              <span >菜单</span>
            </p>
            <div class="api" slot="content">
                <div class="footuser">
                  <div class="user_img"><img :src="user_info.user_icon" alt=""></div>
                  <div class="user_name">{{user_info.name}}</div>
                </div>
                <ul>
                  <li> <a href="javascript:;" @click="modal1 = true"><Icon type="ios-information-outline"></Icon>关于我们</a></li>
                  <li> <a href="javascript:;" @click="open('http://www.keji110.com')"><Icon type="ios-bell-outline"></Icon>帮助中心</a></li>
                  <li> <a href="javascript:;" @click="open('http://www.keji110.com/index.php/Home/NewLists/index/cid/10.html')"><Icon type="ios-chatboxes-outline"></Icon>使用攻略</a></li>
                  <li> <a href="javascript:;" @click="out()"><Icon type="ios-trash-outline"></Icon> 退出</a></li>
                </ul>
            </div>
          </Poptip> 
        </div>
</template>
<script>
    function imgUrl(url){
        let str=url;
        if(str){
            if(!str.indexOf('https')){
            return str
            }else{
         
            let istrue=str.indexOf('/uploads');
            if(!istrue){
              return api.api+url;
            }else{
              return api.url+url;
            }
          }
        }else{
          return require('@/assets/nostudent.png')
        }
    }
    export default {
        data () {
            return {
                apiurl:api,
                user_info:{
                    id:0,
                    name:'',
                    user_icon:''
                }
            }
        },
        methods:{
            getUser(){
                let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
                this.user_info.user_icon=imgUrl(userinfo.avatar)
                this.user_info.name=userinfo.username
                this.user_info.id=userinfo.id
            },
            out () {
                 this.$localStorage.remove('jsq')
                 this.$localStorage.remove('userinfo')
                 this.$Message.success('退出成功!');
                 this.$router.push({path: '/login'})
            },
            open (link) {
                  this.$electron.shell.openExternal(link)
            }
        },
        created(){
            this.getUser()
        }
    }
</script>
<style>
    .meun{
      width: 15%;
      float: left;
      height: 70px;
    }
    .meun p{
      position: relative;
      width: 50px;
      font-size: 40px;
      cursor: pointer;
      color: #333;
      text-align: center;
    }
    .meun p span{
      position: absolute;
      top: 42px;
      left: -2px;
      display: block;
      clear:both;
      font-size: 14px;
      width: 50px;
    }
    .api{
      height: 280px;

    }
    .api ul{
      margin-top: 8px;
    }
    .api ul li a{
      display: block;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      color: #333;
      text-indent: 15px;
    }
    .api ul li a i{
      margin-right: 5px;
    }
    .user_name{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .user_img{
      height: 80px;
      width: 80px;
      margin:0 auto;
      border-radius: 50%;
      padding:2px;
      background: #ccc;
      overflow: hidden;
    }
    .user_img img{
      width: 100%;
      border-radius: 50%;
    }


</style>