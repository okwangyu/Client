const state={
  classes_list:[],
  current_subject:[],
  current_classes:[],
  behaviorlist:[],
  classes_student:[]
}
const mutations={
  add_student(state,action){
    state.classes_student=action
  },
  del_student(state,action){
    state.classes_student.splice(action,1)
  },
  add_behavior(state,action){
    state.behaviorlist=action
  },
  classespush(state,action){
    state.classes_list=action
  },
  add_current_subject(state,action){
    state.current_subject=action
  },
  add_current_classes(state,action){
    state.current_classes=action
  }
}
const getters={
  get_classes_student(state){
    return state.classes_student
  },
  get_behavior_list(state){
    return state.behaviorlist
  },
  get_current_subject(state){
    return state.current_subject
  },
  get_current_classes(state){
    return state.current_classes
  },
  get_classes_list(state){
    state.classes_list.forEach(function(item,index){
        if(item.class.grade==0){
            item.class.nianji='学前班'
        }
        if(item.class.grade==1){
            item.class.nianji='一年级'
        }
        if(item.class.grade==2){
            item.class.nianji='二年级'
        }
        if(item.class.grade==3){
            item.class.nianji='三年级'
        }
        if(item.class.grade==4){
            item.class.nianji='四年级'
        }
        if(item.class.grade==5){
            item.class.nianji='五年级'
        }
        if(item.class.grade==6){
            item.class.nianji='六年级'
        }
        if(item.class.grade==7){
            item.class.nianji='初一'
        }
        if(item.class.grade==8){
            item.class.nianji='初二'
        }
        if(item.class.grade==9){
            item.class.nianji='初三'
        }
        if(item.class.grade==10){
            item.class.nianji='高一'
        }
        if(item.class.grade==11){
            item.class.nianji='高二'
        }
        if(item.class.grade==12){
            item.class.nianji='高三'
        }
        if(item.class.grade==13){
            item.class.nianji='其他'
        }
    })
    return state.classes_list
  },
}
export default {
  state,
  mutations,
  getters
}