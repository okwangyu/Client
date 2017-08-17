<template>
  <div>
    <v-loading v-if="spinShow"></v-loading>
    <div class="main-panel">
        <div class="thumb-panel">
          <div class="setting-label">班级头像: </div>
          <img :src="newimg?newimg:img" class="class-thumb-preview">
          <div class="uploader">

            <Upload
            :format="['jpg','jpeg','png']"
            action="http://upload.qiniu.com/"
            :headers="headers"
            :data="headers"
            :show-upload-list="false"
            :on-success="handleSuccess"
            >
            <Button type="ghost" shape="circle" icon="ios-cloud-upload-outline">选择要上传文件的图片</Button>
            </Upload>
              
            </div>
          </div>
          <div class="ant-form-item">
            <div><span>班级名称:</span> <Input v-model="value2" style="width:200px;"></Input></div>
          </div>  

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
           file: null,
           headers:{
             token:''
           },
           host:api,
           newimg:'',
           value2: ''
        }
    },
    computed:{
      current_classes:function(){
        return this.$store.getters.get_current_classes
      },
      img:function(){
        return api.api+this.current_classes.class.icon
      }
    },
    methods: {
            handleBeforeUpload(){
                let _this=this
                let url="http://test.keji110.com/api/qiniu/getToken/format/json"
                $.get(url,{},function(res){
                    _this.headers.token=res.token
                })
            },
            handleSuccess(res, file){
              this.newimg=api.url+res.key
            }
      
    },
    created () {
      console.log(this.current_classes)
        this.handleBeforeUpload()
    },
    components:{
          vHeader,vLoading,vMenu
    }
  }
</script>
<style scoped>
   .main-panel{
    position: relative;
    margin-left: 0px;
    height: 100%;
    background-color: #fff;
    padding: 40px;
    overflow-y: auto;
   }
   .thumb-panel{
      overflow: hidden;
      width: 416px;
      border-bottom: 1px solid #eee;
   }
   .setting-label{
    font-size: 14px;
    width: 106px;
    line-height: 80px;
    float: left;
    padding-bottom: 40px;
    color: #333;
   }
   .class-thumb-preview{
    float: left;
    width: 80px;
    height: 80px;
    border-radius: 50%;
   }
   .uploader{
      float: left;
      margin-top: 20px;
      margin-left: 20px;
   }
   .ant-form-item{
     border-bottom: 1px solid #eee;
     height: 60px;
     width: 416px;
   }
</style>