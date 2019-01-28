import Vue from 'vue'
import Router from 'vue-router'

import JoinComponent from '@/components/join'
import LoginComponent from '@/components/login'
import NotFoundComponent from '@/components/not-found'
import HomeComponent from '@/components/home'
import ListComponent from '@/components/list'
import EditComponent from '@/components/edit'
import AccountComponent from '@/components/account'
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
      component: LoginComponent
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
      path: '/edit',
      name: 'edit',
      component: EditComponent
    },
    {
      path: '/account',
      name: 'account',
      component: AccountComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
})
