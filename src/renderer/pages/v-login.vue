<template>
  <div id="wrapper">
    <v-header></v-header>
    <div class="left_form">
       <Carousel autoplay v-model="value2" :autoplay-speed="sudu">
        <Carousel-item>
            <div class="demo-carousel">
             <img src="../assets/banner.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">
             <img src="../assets/banner1.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">
              <img src="../assets/banner3.png" alt="">
            </div>
        </Carousel-item>
    </Carousel>
    </div>
    <div class="right_form">
      <div class="formtitle">校朋登录</div>
      <Tabs value="name1">
        <Tab-pane label="扫码登录" name="name1">
           <div class="noewm" :class="zhe?on:''"  @click="chongxin"><span>二维码失效,点击重新获取</span></div>
           <div class="yewm">
              <v-qrcode :bgSrc='src' :logoSrc="src2" dotScale="1" margin="10" :text="text" height="200" width="200"></v-qrcode>
           </div>
           <div class="noice">
              <span>为了您的账号安全和操作快捷</span>
              <span>请使用 <strong>校朋老师端APP</strong> 进行扫描登录</span>
           </div>
        </Tab-pane>
        <Tab-pane label="手机号登录" name="name2">
            <div style="margin-top:20px">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
        <Form-item prop="name">

            <Input v-model="formValidate.name" placeholder="请输入手机号"></Input>
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Form-item>
        <Form-item prop="pass">
            <Input type="password" v-model="formValidate.pass" placeholder="请输入密码" @on-enter="handleSubmit('formValidate')"></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click.enter="handleSubmit('formValidate')">提交</Button>
        </Form-item>
    </Form>
            </div>

        </Tab-pane>
    </Tabs>


      
   
    <div class="bottom_form">

      没有账号去web端或者APP上进行注册
    </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import vHeader from '@/pages/v-login-header'
  import vQrcode from '@/components/qrcode'
  export default {
        data () {
            return {
                value2: 0,
                sudu:5000,
                formValidate: {
                    name: '',
                    pass: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min:3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ]
                },
                t:Date.parse(new Date())/1000,
                uid:Date.parse(new Date())/1000+Math.floor(Math.random()*10000),
                src: require('@/assets/ewm.jpg'),
                src2: require('@/assets/icon.png'),
                time:'',
                zhe:true,
                on:'on'
            }
        },
        computed:{
          text:function(){
            return 'https://www.keji110.com'+'/t='+this.t+'Client='+this.uid
          }
        },
        methods: {
            handleSubmit (name) {
              var that=this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url=api.api+"v2/user/sign_in/format/json"
                        $.post(url,{username:this.formValidate.name,password:this.formValidate.pass},function(res){
 
                            if(res.error_code=='1002'){
                               that.$Message.error('账号不存在!');
                               return false
                            }
                            if(res.error_code=='1003'){
                               that.$Message.error('密码错误!');
                               return false
                            }
                            clearInterval(that.time)
                            that.$Message.success('登录成功!');
                            that.$localStorage.set('userinfo', JSON.stringify(res.data))
                            that.$store.commit('add_user',res.data)
                            that.$router.push('classes');
                        })
                       
                    } else {
                        this.$Message.error('请填写用户名和密码!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getUser(){
              let that=this
              let i=1
              this.time=setInterval(()=>{
                i++
                if(i>300){
                   clearInterval(this.time)
                   that.$Message.error('验证码失效!');
                   this.zhe=false
                }else{
                  let url=api.api+"pc/qr_login/pc/format/json"
                  $.get(url,{qr_code:this.uid},function(res){

                      if(res.error_code=='0'){
                            clearInterval(that.time)
                            that.$Message.success('登录成功!');
                            that.$localStorage.set('userinfo', JSON.stringify(res.data))
                            that.$store.commit('add_user',res.data)
                            that.$router.push('classes');

                      }
                  })
                   
                }
               
              },1000)
            },
            chongxin(){
                   this.zhe=true
                   this.t=Date.parse(new Date())/1000
                   this.uid=Math.floor(Math.random()*10000)
                   this.text='https://www.keji110.com'+'/t='+this.t+'Client='+this.uid,
                   this.getUser()
            }
        },
        components:{
          vHeader,vQrcode
        },
        created(){
          this.getUser()
        }
    }
</script>

<style>
.ivu-form-item-error-tip{
  left: 50px;
}
.noice span{
  display: block;
  line-height: 25px;
  font-size: 14px;

}
.noewm{
  height: 400px;
  width: 400px;
  position: absolute;
  background:rgba(206, 240, 252, .9);
  left: 0px;
  text-align: center;
  font-size: 20px;
  line-height: 220px;
}
.on{
  display: none;
}
.bottom_form{
  position: absolute;
  bottom: 0px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #b9dbe7;
  width: 400px;
  border-radius: 0 0 6px 6px;
}
.left_form{
  width: 600px;
  height: 500px;
  position: absolute;
  top: 18%;
  left: 4%;
}
.ivu-carousel-list{
  height: 500px;
}
.ivu-carousel-list img{
  padding-left: 50px
}
.right_form{
  width: 400px;
  position: absolute;
  right: 4%;
  top: 18%;
  height: 500px;
  background: rgba(206, 240, 252, .6);
  border-radius: 6px;
  box-shadow: 2px 2px 8px rgba(55, 55, 55, .5)
}
.right_form input{
  width: 300px;
  height: 40px;
  border-radius: 2px;
}
.right_form button{
  width: 300px;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
}
.formtitle{
  margin:30px 0px 15px;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: #333;
  text-align: center;
}
#wrapper{
  position:relative;
  height: 100%;
  background:#2aadf1;
}
.ivu-tabs-nav{
  text-align: center!important;
  float: none!important;
  background: #a3dcf7!important;
}
.ivu-tabs-ink-bar{
  left: 80px!important;
}
.ivu-tabs-nav .ivu-tabs-tab{
  font-size: 18px!important;
  padding: 15px 2px 15px 20px!important;
  text-indent: 20px!important;
}
.ivu-tabs-tabpane{
  text-align: center;
}
</style>
