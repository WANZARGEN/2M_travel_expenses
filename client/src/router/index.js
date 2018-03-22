import Vue from 'vue'
import Router from 'vue-router'
import join from '@/components/join'
// import login from '@/components/login'
// import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: login
    // },
    // {
    //   path: '/home',
    //   component: home
    // },
    {
      path: '/join',
      component: join
    }
  ]
})
