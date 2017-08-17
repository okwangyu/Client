<template>
    <div >
        <div class="footer" :style="honer">
        <v-menu></v-menu>
        <div class="student_btn" v-if="list_status.bottom_show">
            <div class="btn_wrap">
              <div class="chuqin" @click="chuqin()" >
                  <Icon type="happy"></Icon><span>出勤</span>
              </div>
              <div class="line"></div>
              <div class="chuqin"  @click="allCheck()">
                <Icon type="ios-checkmark"></Icon><span>多选</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="suiji()">
                  <Icon type="shuffle"></Icon><span >随机</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="chongzhi()">
                <Icon type="trash-a"></Icon><span>重置</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="jishi()">
                <Icon type="clock"></Icon><span>计时</span>
              </div>
            </div>
        </div>
        <div class="student_btn" v-if="list_status.select_show">
         


          <Row class="smain">
            <Col span="24">
                <div class="handle">
                    <div class="status" :class="{ active:checkcont == lists.length }" @click="quanbu(list_status.list_ischeck)">
                           <Icon type="ios-checkmark-empty"></Icon>
                    </div>
                    <div class="statusfont">选择全部</div>
                    <Button type="ghost" disabled shape="circle" v-if="checkcont==0">{{status.name}}(0个学生)</Button>
                    <Button  type="primary" shape="circle" v-if="checkcont!=0 && status.type==2" @click="piliang()">{{status.name}}({{checkcont}}个学生)</Button>
                    <Button type="primary" shape="circle" v-if="checkcont!=0 && status.type==1" @click="chong()">{{status.name}}({{checkcont}}个学生)</Button>
                    <Button type="ghost" shape="circle" @click="quxiao()">取消</Button>
                </div>
            </Col>
        </Row>


        </div>

        <div class="student_btn" v-if="list_status.attendance_bottom">
         


          <Row class="smain">
            <Col span="24">
                <div class="handle">
                    <Button shape="circle" @click="allattendance()">{{ attendance.name }}</Button>
                    <Button shape="circle" type="primary" @click="updateatt()">保存</Button>
                    <Button shape="circle" @click="quxiao()">退出</Button>
                </div>
            </Col>
        </Row>


        </div>



        <div class="right_btn">
          
          <!--<Button shape="circle">
             <span @click="report()">光荣榜</span> 
          </Button>
          -->
        </div>
     </div>
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
    var ipcRenderer=require('electron').ipcRenderer;
    const BrowserWindow= require('electron').remote.BrowserWindow
    const path = require('path')
    import vMenu from '@/components/menu'
    export default {
        data () {
            return {
                apiurl:api,
                modal1:false,
                status:{
                  type:1,
                  name:'重置分数'
                },
                attendance:{
                    name:'全部出勤',
                    type:true
                },
                class_id:this.$route.params.class_id,
                class_subject_id:this.$route.params.class_subject_id
            }
        },
        computed:{
          lists:function(){
            return this.$store.getters.lists
          },
          list_status:function(){
              return this.$store.getters.get_list_status
          },
          honer:function(){
              return this.$store.getters.get_honer
          },
          honer_show:function(){
              return this.$store.getters.get_honer_show
          }
        },
        props:['checkcont'],
        methods:{
                suiji(){
                  this.$emit('suji')
                },
                allCheck(){
                  let type=this.list_status.list_show?false:true
                  this.$store.commit('changecheck',2)
                  this.status.name='进行点评'
                  this.status.type=2
                },
                quanbu(type){
                  this.$store.commit('quanxuan',type) 
                },
                quxiao(){
                  this.$store.commit('changecheck',1)
                },
                piliang(){
                  this.$emit('ping')
                },
                chongzhi(){
                  let type=this.list_status.list_show?false:true
                  this.status.name='重置分数'
                  this.status.type=1
                  this.$store.commit('changecheck',2)
                },
                chong(){
                  this.$emit('chongzhi')
                },
                chuqin(){
                 this.$store.commit('changecheck',3)
                },
                allattendance(){
                  let type=this.attendance.type?1:3
                 this.$store.commit('allat',type)
                 this.attendance.type=!this.attendance.type
                 this.attendance.name=this.attendance.type?'全部缺勤':'全部出勤'
                },
                updateatt(){
                  this.$emit('updateattend')
                },
                report(){
                 
                },
                jishi(){
                    if(win){
                      return false
                    }
                      this.$localStorage.set('jsq', 'jsq')  
                      const modelURL = process.env.NODE_ENV === 'development'? `http://localhost:9080`: `file://${__dirname}/index.html`
                      const win = new BrowserWindow({
                          height: 400,
                          useContentSize: false,
                          width: 490,
                          alwaysOnTop:true,
                          transparent: true,
                          frame:false,
                          alwaysOnTop:true
                      })
                      win.loadURL(modelURL)
                      win.show()
                },
                open (link) {
                  this.$electron.shell.openExternal(link)
                }
        },
        components:{vMenu}
    }
</script>
<style scoped>
    .footer{
      position: fixed;
      bottom: 2px;
      left: 2px;
      right: 266px;
      height: 70px;
      background: #fff;
      border-radius: 0 0 6px 6px;
      border-top: 1px solid #eee;
      vertical-align: middle;
      z-index: 1000;
    }
    .line{
      display: inline-block;
      height: 20px;
      width: 1px;
      background: #ddd;
      vertical-align: middle;
    }
    .student_btn{
      float: left;
      width: 70%;
      text-align: left;
      height: 70px;
      margin: 0 auto;
      line-height: 70px;
    }
    .btn_wrap{
      text-align: center;
      width: 100%;
      height: 70px;
      margin: 0 auto;
      line-height: 70px;
    }
    .chuqin{
      display: inline-block;
      width: 90px;
      font-size: 18px;
      cursor: pointer;

      position:relative;
    }
    .chuqin span{
      position: absolute;
      width: 50px;
      height: 70px;
      top: 0px;
    }
    .chuqin i{
      margin-left: -35px;
      height: 70px;
      line-height: 70px;
      vertical-align:middle;
      font-size: 20px;
    }
    .right_btn{
      float: right;
      width: 10%;
      text-align: right;
      height: 70px;
      line-height: 70px;
      margin-right: 30px;
    }
    .ivu-poptip{
      float: left;
    }
    .back {
      float:left;
      position: relative;
      width: 50px;
      font-size: 40px;
      cursor: pointer;
      color: #333;
      text-align: center;
      margin-left: 50px;
    }
    .back span{
      position: absolute;
      top: 42px;
      left: -2px;
      display: block;
      clear:both;
      font-size: 14px;
      width: 50px;
    }
    
    .student_btn{
      height: 70px;
      text-align: center;
    }
    .student_btn .handle {
        height: inherit;
    }
    .student_btn .smain {
        line-height: 70px;
    }
    .student_btn .handle-tiem {
        /*width: 120px;*/
        cursor: pointer;
        float: left;
        text-align: center;
        margin-right: 40px;
    }
    .student_btn .handle-tiem img {
        display: inline;
        vertical-align: middle;
        margin-right: 3px;
        width: 28px;
    }
    .student_btn .handle-tiem span {
        font-weight: normal;
        font-size: 16px;
        vertical-align: middle;
    }
    .student_btn .handle button{
        margin:0 10px;
        padding:6px 40px;
    }
    .student_btn .status{
        cursor: pointer;
        vertical-align:middle;
        background: #e2e2e2;
        width: 25px;
        height: 25px;
        border-radius:50%;
        display: inline-block;
        line-height: 25px;
        color: #fff;
        font-size: 22px;
        text-align: center;
    }
    .student_btn .status i{
        font-size: 20px;
    }
    .student_btn .status.active{
        background: #0097eb;
    }
    .student_btn .statusfont{
        font-size: 16px;
        display: inline-block;
        vertical-align:middle;
        padding: 0 10px;
    }
    .left_btn{
      text-align: left;
    }

</style>