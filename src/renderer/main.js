import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import apiConfig from './api/index'
import './assets/css/animate.min.css'
import VueWaves from 'vue-waves/dist/vue-waves.js'
import iView from 'iview'
import VueLocalStorage from 'vue-localstorage'
import 'iview/dist/styles/fonts/ionicons.eot'
import 'iview/dist/styles/fonts/ionicons.svg'
import 'iview/dist/styles/fonts/ionicons.ttf'
import 'iview/dist/styles/fonts/ionicons.woff'
import 'iview/dist/styles/iview.css'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
global.api = apiConfig;
Vue.use(VueWaves)
Vue.use(iView)
Vue.use(VueLocalStorage)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  computed:{
    user_info:function(){
      return this.$store.getters.get_user
    }
  },
  methods:{
	 checkLogin () {
        
		    if(this.$localStorage.get('jsq')){
           this.$router.push({path: '/timer'})
        }else if(this.$localStorage.get('meun')){
           this.$router.push('/meun');
        }else if(this.$localStorage.get('honer')){
          this.$router.push({path: '/honer'})
        }else if(this.user_info.length==0){
          this.$router.push({path: '/login'})
        }else{
          this.$router.push({path: '/classes'})
        }
	   }
  },
  created () {
     this.checkLogin()
  }
}).$mount('#app')
