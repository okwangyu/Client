import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/classes',
      name: 'classes',
      component: require('@/pages/v-classes')
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/v-login')
    },
    {
      path: '/timer',
      name: 'timer',
      component: require('@/pages/v-timer')
    },
    {
      path: '/student/class_id/:class_id/class_subject_id/:class_subject_id',
      name: 'student',
      component: require('@/pages/v-student')
    },
    {
      path:'/group',
      name:'group',
      component: require('@/pages/v-group')
    },
    {
      path:'/page',
      name:'page',
      component: require('@/pages/v-page')
    },
    {
      path: '/',
      component: require('@/pages/v-classes')
    },
    {
      path:'/report',
      name:'report',
      component:require('@/pages/v-report')
    },
    {
      path:'/honer',
      name:'honer',
      component:require('@/pages/v-honer')
    },
    {
      path:'/setting/class_id/:class_id',
      name:'setting',
      component:require('@/pages/v-setting'),
      children:[
        {
          path:'*',
          redirect:'/setclass'
        },
        {
          path:'/setclass',
          name:'setclass',
          component:require('@/pages/v-setclass')
        },
        {
          path:'/setbehair',
          name:'setbehair',
          component:require('@/pages/v-setbehair')
        },
        {
          path:'/setstudent',
          name:'setstudent',
          component:require('@/pages/v-setstudent')
        },
        {
          path:'/setsubject',
          name:'setsubject',
          component:require('@/pages/v-setsubject')
        }

      ]
    },
    {
      path:'/meun',
      name:'meun',
      component:require('@/pages/v-meun')
    }
  ]
})
