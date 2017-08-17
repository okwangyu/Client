<template>
	<div class="editBehavior">
		<Modal v-model="modal.show" title="编辑行为" @on-cancel="cancel" width="670">
			<div class="editmodel">
				<div class="antLeft">
					<div class="antImg">
						<img src="http://api.keji110.com/uploads/behavior/behavior12@2x.png" alt="">
					</div>
					<div class="antInput">
						<span>行为名称</span>
						<span><input type="text"  v-model="new_behavior.name" :value="behavior.name" class="antInputone" placeholder="不要超过六个字符" maxlength="6"></span>
					</div>
					<div class="antInput">
						<span>行为分值</span>
						<span>
							<ul class="editscore">
								<li v-for="(v,index) in score" :key="index" 
								:class="v.item==behavior.score?'active':''"
								@click="editscore(v.item)"
								>{{v.item}}</li>
							</ul>
						</span>
					</div>
					<div class="antInputTag">
						<span>行为标签</span>
						<span>
							<ul>
								<li v-for="(v,index) in tag" :key="index" :class="v.id==behavior.tag_id?'active':''" @click="edittag(v.id)">{{v.name}}</li>
							</ul>
						</span>
					</div>
				</div>
				<div class="antRight">
					<div class="ant-tabs-tab-inner">
						<h5>系统图标</h5>
						<ul class="iconclasses">
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>
							<li><img src="http://api.keji110.com/uploads/behavior/behavior01@2x.png" alt=""></li>

						</ul>
					</div>
				</div>
			</div>
  			<div slot="footer">
  				<Button type="text" style="float:left;color:red">删除该行为</Button><Button type="ghost">取消</Button><Button type="primary">确定</Button>
  			</div>
		</Modal>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
	name:'editBehavior',
	props:['modal','behavior'],
	data(){
		return {
			score:[
				{item:1},
				{item:2},
				{item:3},
				{item:4},
				{item:5},
				{item:6},
				{item:7},
				{item:8},
				{item:9},
				{item:10}
			],
			tag:[
				{	
					id:1,
					name:'综合表现'
				},
				{	
					id:2,
					name:'思想品德'
				},
				{	
					id:3,
					name:'学业水平'
				},
				{	
					id:4,
					name:'艺术素养'
				},
				{	
					id:5,
					name:'身心健康'
				},
				{	
					id:6,
					name:'社会实践'
				},
			],
			active:'active',
			new_behavior:{},
		}
	},
  	watch:{
  		new_behavior:{
    	
        handler: function (val) {
     		console.log(1)
        },
        deep: true
     },
  	},
	methods:{
		cancel () {
			this.modal.show=false;
		},
		editscore (score) {
			this.new_behavior.score=score
		},
		edittag (tag_id) {
			this.new_behavior.tag_id=tag_id
		}
	},
	created () {
		console.log(this.behavior)
	}

}
	
</script>
<style>

	.editmodel{
		height: 445px;
		overflow: hidden;
		padding: 16px;
		padding-bottom: 0;
	}
	.antLeft{
		float: left;
		width: 280px;
	}
	.antLeft .antImg{
		overflow: hidden;
    	margin-left: 50px;
    	width: 110px;
    	height: 110px;
    	border: 1px solid #ddd;
    	border-radius: 50%;
    	text-align: center;
    	padding: 5px;
    	background: #ddd;
	}
	.antLeft .antImg img {
    	width: 100%;
    	height: 100%;
    	border-radius: 50%;
	}
	.antLeft .antInput {
    	margin-top: 10px;
    	margin-bottom: 0px;
    	font-family: Microsoft Yahei;
    	font-size: 14px;
	}
	input{
		outline: none;
	}
	.antLeft .antInput span .antInputone {
    	width: 170px;
    	border: 0;
    	border-bottom: 1px solid #999;
    	background-color: transparent;
    	box-shadow: none;
    	font-size: 14px;
    	margin-left: 10px;
    	margin-top: -5px;
	}
	.antLeft .antInput span ul li {
    	float: left;
    	display: inline-block;
    	margin-bottom: 0;
    	font-weight: 500;
    	text-align: center;
    	vertical-align: middle;
    	touch-action: manipulation;
    	cursor: pointer;
    	background-image: none;
    	white-space: nowrap;
    	line-height: 35px;
    	width: 40px;
    	height: 35px;
    	font-size: 14px;
    	user-select: none;
    	position: relative;
    	color: #666;
    	background-color: #f7f7f7;
    	border: 1px solid #d9d9d9;
    	border-radius: 4px;
    	margin: 4px;
	}
	.antLeft .antInputTag span ul li {
    	float: left;
    	display: inline-block;
   		margin-bottom: 0;
    	font-weight: 500;
    	text-align: center;
    	vertical-align: middle;
    	touch-action: manipulation;
    	cursor: pointer;
    	background-image: none;
    	white-space: nowrap;
    	line-height: 35px;
    	width: 112px;
    	height: 35px;
    	font-size: 14px;
    	user-select: none;
    	position: relative;
    	color: #666;
    	background-color: #f7f7f7;
    	border: 1px solid #d9d9d9;
    	margin: 4px;
    	border-radius: 4px;
	}
	.antInputTag {
    	clear: both;
    	margin-top: 10px;
    	margin-bottom: 5px;
    	font-family: Microsoft Yahei;
    	font-size: 14px;
	}
	.antLeft .antInput span ul {
    	margin-top: 10px;
	}
	.editscore{
		overflow: hidden;
	}
	.antRight{
		float: right;
		width: 355px;
		height: 438px;
	}
	.ant-tabs-tab-inner{

	}
	.antRight .ant-tabs-tab-inner h5 {
    	height: 35px;
    	color: #333;
    	padding: 8px 10px;
    	transition: color .3s cubic-bezier(.645, .045, .355, 1);
    	display: block;
    	text-decoration: none;
    	border-bottom: 1px solid #ddd;
    	font-weight: normal;
    	font-size: 14px;
	}
	.antRight .ant-tabs-tab-inner ul{
		margin-top: 20px;
    	height: 370px;
    	overflow: auto;
	}
	.antRight .ant-tabs-tab-inner ul li {
    	position: relative;
    	float: left;
    	width: 80px;
    	height: 80px;
    	margin: 8px 2px;
    	cursor: pointer;
    	border: 2px solid #fff;
    	background: #ddd;
    	border-radius: 50%;
    	padding: 5px;
	}
	.antRight .ant-tabs-tab-inner ul li img {
    	height: 100%;
    	width: 100%;
    	border-radius: 50%;
    	overflow: hidden;
	}
	.antLeft .antInput span ul li.active{
		background-color: #2D8CED;
		border:1px solid #2D8CED;
		color: #fff;
	}
	.antLeft .antInputTag span ul li.active{
		background-color: #2D8CED;
		border:1px solid #2D8CED;
		color: #fff;
	}
</style>