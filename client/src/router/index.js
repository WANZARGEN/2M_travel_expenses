import Vue from 'vue'
import Router from 'vue-router'

import JoinComponent from '@/components/join'
import NotFoundComponent from '@/components/not-found'
import HomeComponent from '@/components/home'
import ListComponent from '@/components/list'
// import login from '@/components/login'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/join',
      name: 'join',
      component: JoinComponent
    },
    {
      path: '/login',
      name: 'login',
      component: JoinComponent
    },
    {
      path: '/home',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/list',
      name: 'list',
      component: ListComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
})
