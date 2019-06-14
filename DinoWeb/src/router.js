import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  fallback: false,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/form01'
    },
    {
      path: '/form01',
      name: 'form01',
      component: () => import('./views/form01.vue')
      // component: resolve => require(['@/views/form01.vue'], resolve)
    },
    {
      path: '/form01b',
      name: 'form01b',
      component: () => import('./views/form01b.vue')
      // component: resolve => require(['@/views/form01b.vue'], resolve)
    },
    {
      path: '/form02',
      name: 'form02',
      component: () => import('./views/form02.vue')
      // component: resolve => require(['@/views/form02.vue'], resolve)
    },
    {
      path: '/form03',
      name: 'form03',
      component: () => import('./views/form03.vue')
      // component: resolve => require(['@/views/form03.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/form01'
    }
  ]
})
