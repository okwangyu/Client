<template>
   <div>
    <v-loading v-if="spinShow"></v-loading>
    <div>科目管理</div>
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
           spinShow: false
        }
    },
    computed:{

    },
    methods: {

      
    },
    created () {
      
    },
    components:{
          vHeader,vLoading,vMenu
    }
  }
</script>
<style scoped>
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
      right: 1px;
      height: 50px;
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
    .activeclass{
      background-color: #d6ebff;
      color: #0099e8;
    }
    .setting_right{
      background: #fff;
      position: absolute;
      left: 220px;
      right: 1px;
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