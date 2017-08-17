<template>
   <div class="setbehair">
    <v-loading v-if="spinShow"></v-loading>
    <div>
          <div class="SetList">
            <div class="head">受表扬</div>
            <div class="behairSetList" >
              <ul>
                <li v-for="(list,index) in behaviorlist.positive" :key="index" class="edit-behavior" @click="edit(list)">
                    <a href="javascript:;">
                      <i class="behaviorscore">{{list.score}}</i>
                      <img src="http://www.uxuj.cn/Public/images/icon-edit.png" class="icon-edit">
                      <img :src="apiurl.api+list.icon" class="round">
                      <span>{{list.name}}</span>
                    </a>
                </li>
                <li class="edit-behavior">
                  <a href="javascript:;">
                    <p class="medal-add"><Icon type="plus"></Icon></p>
                  </a>
                </li>
              </ul>
          </div>
          </div>
          <div class="SetList">
            <div class="head">待改进</div>
            <div class="behairSetList" >
              <ul>
                <li v-for="(list,index) in behaviorlist.negativ" :key="index" class="edit-behavior">
                    <a href="javascript:;">
                      <i class="behaviorscore cha">{{list.score}}</i>
                      <img src="http://www.uxuj.cn/Public/images/icon-edit.png" class="icon-edit">
                      <img :src="apiurl.api+list.icon" class="round">
                      <span>{{list.name}}</span>
                    </a>
                </li>
                <li class="edit-behavior">
                  <a href="javascript:;">
                    <p class="medal-add"><Icon type="plus"></Icon></p>
                  </a>
                </li>
              </ul>
          </div>
          </div>
    </div>
    <v-editbehaior :modal="modal" :behavior="behavior"></v-editbehaior> 
  </div>
</template>

<script>

   import vLoading from '@/components/loading'
   import VEditbehaior from '@/components/editBehavior'
   import $ from 'jquery'
   export default {
    name: 'classes',
    data () {
        return {
           spinShow: false,
           id:'',
           apiurl:api,
           modal:{
            show:false
           },
           behavior:[]
        }
    },
    computed:{
        behaviorlist:function(){
            return this.$store.getters.get_behavior_list
        }
    },
    methods: {
         edit (item) {
            this.modal.show=true
            this.behavior=item
         }
      
    },
    created () {
    },
    components:{
          vLoading,VEditbehaior
    }
  }
</script>
<style scoped>
    .setbehair{
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      overflow: auto;
    }
    .SetList{
      padding: 0px 30px;
      overflow-y: auto;

    }
    .edit-behavior{
      float: left;
      height: 116px;
      margin: 10px 20px;
      text-align: center;
      cursor: pointer;
      position: relative;
      font-size: 12px;
    }
    .icon-edit{
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      background: none;
      border-radius: 50%;
    }
    .behairSetList ul li a{
      display: block;
      height: 116px;
      overflow: hidden;
      font-size: 12px;
      text-decoration: none;
    }
    .behairSetList ul li a img{
      width: 80px;
      height: 80px;
      padding: 5px;
      background: #eee;
      border-radius: 50%;
      overflow: hidden;
    }
    .behairSetList ul li a .behaviorscore{
      font-size: 14px;
      display: block;
      position: absolute;
      right: -5px;
      top: -5px;
      font-style: normal;
      background: #0089EC;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      line-height: 26px;
      border: 2px solid #fff;
      color: #fff;
      z-index: 2;
    }
    .behairSetList ul li a .cha{
      background: red
    }
    .behairSetList ul li:hover a img.icon-edit {
      display: block;
      opacity: .9;
    }
    .behairSetList ul li a span {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      display: block;
      color: #333;
    }
    .head {
      font-size: 16px;
      color: #333;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
    }
    .medal-add{
      cursor: pointer;
      float: left;
      height: 80px;
      width: 80px;
      line-height: 80px;
      border: 2px dashed #bfbfbf;
      border-radius: 40px;
    }
    .medal-add i{
      font-size: 20px;
      left: 30px;
      top: 30px;
      background: none;
      color: #ddd;
    }
</style>