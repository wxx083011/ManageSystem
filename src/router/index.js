import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import Login from '@/views/Login/index.vue' // 注册


Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/emissionsData' // 默认跳转到首页
    },
    ...routers,
    {
      path: '/login',
      component: Login,
      meta: { title: '登录' }
    },

  ]
})
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 环保车联网管理系统`
  console.log(to.path)
  const ms_token = sessionStorage.getItem('ms_token')
  if (!ms_token && to.path !== '/login') {
    next('/login')
  } else {
    next()
}
})
export default router
