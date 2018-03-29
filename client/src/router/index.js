import Vue from 'vue'
import Router from 'vue-router'

import JoinComponent from '@/components/join'
import NotFoundComponent from '@/components/not-found'
import HomeComponent from '@/components/home'
// import login from '@/components/login'
// import home from '@/components/home'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'join',
    //   component: join
    // },
    // {
    //   path: '/home',
    //   component: home
    // },
    {
      path: '/join',
      name: 'join',
      component: JoinComponent
    },
    {
      path: '/home',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
})
