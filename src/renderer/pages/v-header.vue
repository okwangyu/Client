<template>
  	<header @dblclick="max(type)" :class="bg" :style="honer">
  		<div class="logo" @click="back()">
  			<img src="../assets/logo.png" alt="">
  		</div>
  		<div class="toptitle">
  			<slot></slot>
			<div class="iframe" >
				<span class="pifu">

				
						 <Dropdown trigger="click" @on-click="pifu">
        					<a href="javascript:void(0)" style="color:#fff">
           						<Icon type="paintbucket"></Icon>
        					</a>
        					<Dropdown-menu slot="list">
            					<Dropdown-item name="bgx1">十面霾伏</Dropdown-item>
            					<Dropdown-item name="bgx2">冰天雪地</Dropdown-item>
            					<Dropdown-item name="bgx3">清凉一夏</Dropdown-item>
            					<Dropdown-item name="bgx4">落叶知秋</Dropdown-item>
            					<Dropdown-item name="bgx5">言简意赅</Dropdown-item>
        					</Dropdown-menu>
    					</Dropdown>
				</span>				
  				<!-- <span class="minus" @click="mini()"><Icon type="ios-minus-empty"></Icon></span> -->
  				<span class="browsers" @click="max(type)"><Icon type="ios-browsers-outline"></Icon></span>
  				<span class="close" @click="out()"><Icon type="ios-close-empty"></Icon></span>
  			</div>
  		</div>
  		
  	</header>
</template>
<script>
	var ipcRenderer=require('electron').ipcRenderer;
    const {app,BrowserWindow,ipcMain} = require('electron')
	export default {
		data(){
			return {
				type:1,
				bg:this.$localStorage.get('skin')?this.$localStorage.get('skin'):'bgx3'
			}
		},
		watch:{
			bg:{
				handler:function(val){
				},
				deep: true
			}
		},
		computed:{
			honer:function(){
        	
         		return this.$store.getters.get_honer
      		}
		},
		methods:{
			mini () {
				this.$localStorage.remove('jsq')
       			ipcRenderer.send('hide-window');
     		},
     		max (type){
     			if(type){
     				ipcRenderer.send('show-window');
     				this.type=0
     				
     			}else{
     				ipcRenderer.send('orignal-window');
     				this.type=1
     				
     			}
				
     		},

     		out (){
     			this.$localStorage.remove('jsq')
     			this.$localStorage.set('meun','meun')
      			ipcRenderer.send('window-all-closed');
      			ipcRenderer.on('youmenu',(event, arg) => {
      				if(arg=='you'){
      					this.$localStorage.remove('meun')
      				}
      			});
    		},
    		back(){
    			this.$localStorage.remove('jsq')
          		this.$router.push('/classes');
    		},
    		pifu(name){
    			this.bg=name
    			this.$localStorage.set('skin',name)
    		}
    	}
	}
</script>
<style>
header{
	height: 50px;
	background: #2aadf1;
	line-height: 50px;
	-webkit-app-region: drag;
	position: relative;
	cursor: move;
}
.logo{
	position: absolute;
	z-index: 2;
	left: 10px;
	top: 0px;
	height: 50px;
	width: 100px;
	-webkit-app-region: no-drag;
	cursor: pointer;
}
.logo img{
	margin-left: 10px;
	height: 70%;
	vertical-align: middle;
}
.iframe{
	position: absolute;
	z-index: 2;
	right: 10px;
	top: 0px;
	color: #fff;
	text-align: right;
	-webkit-app-region: no-drag;
	cursor: pointer;
}

.iframe span.browsers{
	float: left;
	font-size: 20px;

}
.iframe span.minus{
	float: left;
	font-size: 38px;

}
.iframe span.close{
	float: left;
	font-size: 38px;

}
.toptitle{
	position: relative;
	text-align: center;
	color: #fff;
	font-size: 18px;
}
.bgx1{
	background: url('../assets/bgx1.jpg')!important;
}
.bgx2{
	background: url('../assets/bgx2.jpg');
}
.bgx3{
	background: url('../assets/bgx3.jpg');
}
.bgx4{
	background: url('../assets/bgx4.jpg');
}
.bgx5{
	background:#2aadf1;
}
</style>
