import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/User'
import classes from './modules/Classes'
import student from './modules/Student'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
  	user,
  	classes,
  	student
  },
  strict: process.env.NODE_ENV !== 'production'
})
