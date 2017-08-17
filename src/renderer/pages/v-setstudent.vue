<template>
   <div class="setstudent">
        <div class="setstudent_top">
          <span>学生列表({{lists.length}}人)</span>
          <Button type="primary" shape="circle" @click="daochu()">导出学生</Button>
          <Button type="primary" shape="circle" @click="tianjia()">添加学生</Button></div>
        <div><Table border :columns="columns7" :data="lists" ref="table"></Table></div>
        <v-saddstudent :modal="modal3" @addstude="addstu"></v-saddstudent>
        <Modal v-model="modal7">
         <p slot="header"> 
            <span>提示信息</span>
        </p>
        <p class="restFont">
          <Icon type="information-circled" color="#ff9900"></Icon>
          确定要删除这个学生么？
        </p>
        <div slot="footer">
            <Button  @click="qu()">取消</Button>
            <Button type="primary" @click="caozuo()">确认删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import $ from 'jquery'
import VSaddstudent from '@/components/addStudent'
export default {
        data () {
            return {
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '学生ID',
                        key: 'student_id',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        key: 'name_class',
                        
                    },
                    {
                        title: '添加时间',
                        key: 'create_at',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                               h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight:'5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                modal3:{
                  show:false
                },
                modal7:false,
                index:''

            }
        },
        computed:{
          lists:function(){
            return this.$store.getters.get_classes_student
          },
          user_info:function(){
            return this.$store.getters.get_user
          },
          current_classes:function(){
            return this.$store.getters.get_current_classes
          }
        },
        methods: {
            qu(){
              this.modal7=false
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
            },
            remove (index) {
                this.index=index
                this.modal7=true
            },
            caozuo () {
                this.modal7=false
                let _this=this;
                $.ajax({
                    type:'post',
                    url:api.api+'pc/students/delete/format/json',
                    dataType:'JSON',
                    data:{
                      student_id:_this.lists[_this.index].student_id
                    },
                    success:function(res){
                      if(!res.error_code){
                        _this.$Message.success('删除成功');
                       
                      }else{
                        _this.$Message.error('删除失败');
                      }
                      
                    }
                })
                 _this.$store.commit('del_student',_this.index)
            },
            edit(index){
                console.log(this.lists[index])
            },
            daochu(){
              this.$refs.table.exportCsv({
                  filename: '学生列表'
              })
            },
            tianjia(){
               this.modal3.show=true
             },
            addstu(arr){
             
              let studentIds=[]
              let _this=this
              arr.forEach(function(item){
                  studentIds.push({
                    icon_class:item.icon,
                    name_class:item.name,
                  })
              })
              $.ajax({
                    url:api.api+'v3/student/createBatchForPc/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_id:_this.current_classes.class_id,
                        create_by:_this.user_info.id,
                        class_name:_this.current_classes.class.name,
                        user_name:_this.user_info.username,
                        students:JSON.stringify(studentIds)
                    },
                    success:function(res){
                        if(!res.error_code){
                          _this.modal3.show=false;
                          _this.$Message.success('添加成功');
                          _this.get_student();
                        }
                    }

              })

            },
        },
        created(){
        },
        components:{VSaddstudent}
    }
</script>
<style scoped>
    .setstudent{
      padding:0 10px 0px;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 1px;
      bottom: 5px;
      overflow: auto;
    }
    .setstudent_top{
      height: 50px;
      line-height: 50px;
      text-align: right;
    }
    .setstudent_top span{
      float: left;
      font-size: 14px;
    }
    .setstudent_top button{

    }
    .restFont{
          padding: 10px 16px;
          font-size: 16px;
    }
</style>