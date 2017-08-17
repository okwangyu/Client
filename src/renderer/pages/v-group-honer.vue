<template>

  <div class="honer">
    <div class="honer_top"><img src="../assets/honer.jpg" alt=""></div>
    <div class="honer_con">
        <div class="honer_stu_list" v-for="(item,index) in stu" :key="index">
          <div class="honer_index">{{index+1}}</div>
          <div class="honer_img"><img :src="item.group_info.class_group_icon" alt=""></div>
          <div class="honer_name">{{item.group_info.class_group_name}}</div>
          <div class="honer_score"><span>{{item.group_info.score}}</span></div>
        </div>
    </div>

  </div>

</template>

<script>
var ipcRenderer=require('electron').ipcRenderer;
const {app,BrowserWindow,ipcMain} = require('electron')
export default {
  name: 'honer',
  props:['conlists'],
  computed:{
    stu:function(){
       var obj={};  
       obj=JSON.parse(JSON.stringify(this.conlists)); //this.templateData是父组件传递的对象  
       obj.sort(function(a,b){
          return b.group_info.score - a.group_info.score
       })
       return obj 
    }
  },
  methods:{

  },
  created(){

  },
  components:{}

}
</script>

<style scoped>

    .honer_bottom{
      height: 60px;
      position: absolute;
      bottom: 0px;
      background: #ddd;
      left: 0px;
      right: 0px;

    }
    .honer{
      position: fixed;
      width: 265px;
      right: 0px;
      top: 0px;
      bottom:0px;
      border-radius:0px 6px 0px 0px;

    }
    .honer_top{
      height: 51px;
      border-radius:0px 6px 6px 0px;
      -webkit-app-region: drag;
    }
    .honer_top img{
      border-radius:0px 6px 6px 0px;
    }
    .honer_con{
      position: absolute;
      top: 51px;
      left: 0px;
      right: 0px;
      bottom: 5px;
      background: #fff;
      overflow: auto;
      padding:10px 5px;
      border-radius:0px 0px 6px;
    }
    .honer_stu_list{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #efefef;
      font-size: 20px;
    }
    .honer_index{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      float: left;
    }
    .honer_img{
      float: left;
      width: 30px;
      height: 30px;
    }
    .honer_name{
      float: left;
      margin-left: 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 100px;
    }
    .honer_img img{
      width: 100%
    }
    .honer_score{
      float: right;
      width: 50px;
      height: 50px;
      text-align: right;
      line-height: 50px;
      padding-right: 10px;
    }
    .honer_score span{
      display: inline-block;
      min-width: 30px;
      height: 30px;
      background: #2aadf1;
      color: #fff;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
    }
</style>
