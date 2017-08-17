const state={
	user_info:[]
}
const mutations={
	add_user(state,action){
    	state.user_info=action
  	},
}
const getters={
	get_user(state){
    	return state.user_info
  	},
}
export default {
  state,
  mutations,
  getters
}