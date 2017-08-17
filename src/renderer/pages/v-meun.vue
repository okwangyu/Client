<template>
  <div class="meun_logo">
    <img src="../assets/meun.png" alt="" @click="dakai()" >
    <div class="drag"></div>
  </div>
</template>

<script>
  var ipcRenderer=require('electron').ipcRenderer;
  const {app,BrowserWindow,ipcMain} = require('electron')
   export default {
    name: 'classes',
    data () {
            return {
               
            }
    },
    methods:{
      dakai () {
        this.$localStorage.remove('meun')
        ipcRenderer.send('show-main');
      }
    }
  }
</script>

<style>
  body{
    border:none!important;
    background: transparent!important;
  }
  .meun_logo{
    cursor:pointer;
  }
  .meun_logo img{
    width: 100%;

    
  }
  #app{
    background: transparent!important
  }
  .bgx1cont{
    background: transparent!important
  }
  .drag{
    width: 100px;
    height: 50px;
    line-height: 30px;
    position: absolute;
    left: 0px;
    top:80px;
    text-align: center;
    cursor:move;
    -webkit-app-region: drag;
  }
</style>
