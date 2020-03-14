import Layout from '@/views/common/Layout.vue' // 布局
import loginSet from '@/views/LoginSet/index.vue' // 账户设置
import Permission from '@/views/Permission/index.vue' // 权限页面
import three from '@/views/three/index.vue' // 三级菜单

import Home from '@/views/Home/index.vue' // 系统首页
import Account from '@/views/Account/index.vue' // 账号管理
import Organization from '@/views/Organization/index.vue' // 机构管理
import EmissionsData from '@/views/EmissionsData/index.vue' // 排放数据管理
import Form from '@/views/Form/index.vue' // 实时数据流
import Obd from '@/views/Obd/index.vue' // OBD信息
import loginInfo from '@/views/LoginInfo/index.vue' // 登录信息
import Software from '@/views/Software/index.vue' // 软件管理

import Monitor from '@/views/Monitor/index.vue' // 实时监控
import Sn from '@/views/Sn/index.vue' // 序列号管理

import pathTrack from '@/views/Monitor/pathTrack.vue' // 实时监控
import Abnormal from '@/views/Abnormal/index.vue' // 异常排放管理
import abnormalDetail from '@/views/Abnormal/abnormalDetail.vue' // 异常详情
import CarManage from '@/views/CarManage/index.vue' // 车辆管理

export default [
  {
    path: '/',
    component: Layout,
    meta: { title: '自述文件' },
    children: [
      {
        path: '/loginSet',
        component: loginSet,
        meta: { title: '账户设置' }
      },
      {
        path: '/home',
        component: Home,
        meta: { title: '系统首页' }
      },
      {
        path: '/organizational',
        component: Organization,
        meta: { title: '机构管理' }
      },
      {
        path: '/account',
        component: Account,
        meta: { title: '账号管理' }
      },
      {
        path: '/emissionsData',
        component: EmissionsData,
        meta: { title: '排放数据' }
      },
      {
        path: '/form',
        component: Form,
        meta: { title: '实时数据流' }
      },
      {
        path: '/obd',
        component: Obd,
        meta: { title: 'OBD信息' }
      },
      {
        path: '/loginInfo',
        component: loginInfo,
        meta: { title: '登录明细' }
      },

      {
        path: '/CarManage',
        component: CarManage,
        meta: { title: '车辆管理' }
      },
      {
      // 三级菜单
        path: '/three',
        component: three,
        meta: { title: '三级菜单' }
      },
      {
      // 异常排放管理
        path: 'Abnormal',
        component: Abnormal,
        meta: { title: '异常排放管理' }
      },
      {
      // 异常排放管理
        path: '/abnormalDetail',
        component: abnormalDetail,
        meta: { title: '异常详情' }
      },
      {
      // 实时监控
        path: '/Monitor',
        component: Monitor,
        meta: { title: '实时监控' }
      },
      // 轨迹回放
      {
        // 实时监控
        path: '/pathTrack',
        component: pathTrack,
        meta: { title: '轨迹回放' }
      },

      {
      // 序列号管理
        path: '/sn',
        component: Sn,
        meta: { title: '序列号管理' }
      },
      {
      // 软件管理
        path: '/software',
        component: Software,
        meta: { title: '软件管理' }
      },

      {
      // 权限页面
        path: '/permission',
        component: Permission,
        meta: { title: '权限测试', permission: true }
      }
    /* {
      // 三级菜单
      path: '/three',
      component: three,
      meta: { title: '三级菜单' }
    }, */

    ]
  }]
