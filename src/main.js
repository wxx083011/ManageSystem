import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/icon.css'
import 'babel-polyfill'

import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css' // 浅绿色主题

/* ElementUI */
import ElementUI from 'element-ui'

/* ajax */
import axios from 'axios'
import QS from 'qs'

/* 导出 */
import { exportExcel } from '@/utils/excel'

/* 图表 */
/* import echarts from 'echarts'
Vue.prototype.$echarts = echarts */

/* 地图 */
import AMap from 'vue-amap'
Vue.use(ElementUI, {
  size: 'small'
})
Vue.prototype.$axios = axios
Vue.prototype.qs = QS
Vue.prototype.$exportExcel = exportExcel
Vue.use(AMap)
AMap.initAMapApiLoader({
  // 高德的key
  key: 'd2f24964568ffe6aefdae705ebbbd2b2',
  // 插件集合
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
    // 'AMap.PolyEditor',
    'AMap.Geocoder',
    'AMap.MarkerClusterer',
    'AMap.Circle',
    'AMap.PositionPicker',
    'AMap.AMapUI',
    'AMap.MouseTool'

  ],
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
