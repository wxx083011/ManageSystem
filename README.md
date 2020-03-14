# vue-manage

基于 vue2.0+element.UI+vue-amap+echart 的后台管理系统的后台管理系统的后台管理系统解决方案。

## 前言

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于 vue.js，使用 vue-cli3 脚手架，引用 Element UI 组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。

## 功能

- [x] Element UI
- [x] 登录/注销
- [x] echart
- [x] 表格
- [x] 表单
- [x] vue-amap 的标注和画圆轨迹回放，窗体信息展示
- [x] echart 的图文展示

## 安装步骤

```
git clone https://github.com/wxx083011/vue-manage.git      // 把模板下载到本地
cd vue-manage   // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## Vue 中使用高德地图历史轨迹回放

```

Vue 中使用高德地图历史轨迹回放(一)-基础功能
第一步：引入高德地图
要达到官方高德地图 API 中的效果，可以先看官方 API 链接：https://lbs.amap.com/api/javascript-api/example/marker/replaying-historical-running-data
如果是 vue 项目我们可以直接通过 npm i vue-amap -S 安装在我们项目里面
```

第二步：main.js 中配置
在 main.js 中配置
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
key: "你的 key",
plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
// 默认高德 sdk 版本为 1.4.4
v: '1.4.4'
});

第三步：初始化地图和轨迹
配置好了 main.js 就可以在你 vue 页面中使用了，给定一个 div 容器 id=‘container’,初始化高德地图

//初始化地图
initMap() {
this.map = new AMap.Map("container", {
resizeEnable: true, //窗口大小调整
center: this.firstArr, //中心 firstArr: [116.478935, 39.997761],
zoom: 20
});
this.marker = new AMap.Marker({
map: this.map,
position: this.firstArr,
icon: "https://webapi.amap.com/images/car.png",
offset: new AMap.Pixel(-26, -13), //调整图片偏移
autoRotation: true, //自动旋转
angle: -90 //图片旋转角度
});
},
//初始化轨迹
initroad() {
//绘制还未经过的路线
this.polyline = new AMap.Polyline({
map: this.map,
path: this.lineArr,
showDir: true,
strokeColor: "#28F", //线颜色--蓝色
// strokeOpacity: 1, //线透明度
strokeWeight: 6 //线宽
// strokeStyle: "solid" //线样式
});
//绘制路过了的轨迹
var passedPolyline = new AMap.Polyline({
map: this.map,
strokeColor: "#AF5", //线颜色-绿色
//path: this.lineArr,
// strokeOpacity: 1, //线透明度
strokeWeight: 6 //线宽
// strokeStyle: "solid" //线样式
});
this.marker.on("moving", e => {

passedPolyline.setPath(e.passedPath);
});
this.map.setFitView(); //合适的视口
},

mounted() {
this.initMap();
this.initroad();
},

这样你就可以看到和官方例子中一样的效果了----不过你是从其他路由跳转进来的才有这个效果。

注意 ：你在该页面手动刷新浏览器一下 就会发现报错

[Vue warn]: Error in mounted hook: "ReferenceError: AMap is not defined"

在你执行初始化的时候，AMap 是 not defined。

小知识：undefined 与 not defined
undefined 是 javascript 语言中定义的五个原始类中的一个， 声明了，未定义。undefined 并不是程序报错，而是程序允许的一个值。
not defined 是 没有定义也没有声明，他其实就是不存在

所以要异步一下，加个延迟就好了，等页面上的数据都加载好了在执行初始化地图

mounted() {
setTimeout(() => {
this.initMap();
this.initroad();
}, 1000);
},

第四步：轨迹回放控制
轨迹回放控制：开始动画，暂停动画，继续动画，停止动画

    startAnimation() {
      this.marker.moveAlong(this.lineArr, this.markerSpeed);
    },
    pauseAnimation() {
      this.marker.pauseMove();
    },
    resumeAnimation() {
      this.marker.resumeMove();
    },
    stopAnimation() {
      this.marker.stopMove();
    },
