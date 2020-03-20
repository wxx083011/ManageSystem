
<template>
  <div class="map-wrap">
    <el-amap class="amap-box" :events='events ' :plugin="plugin" :zoom="zoom" :center="center" :expandZoomRange="true">
      <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events"></el-amap-polyline>
      <el-amap-marker :events="marker.events" :content='marker.content' v-for="(marker,index) in markers" :vid="index" :position="marker.position" :key="marker.id"></el-amap-marker>
      <!-- 标注点点击窗体信息 -->
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div class="window-wrap">
          <div>车牌号：{{window.info.date }}</div>
          <div>车主：{{window.info.name }}</div>
          <div>手机号：{{window.info.name }}</div>
          <div>报警数：{{window.info.name }}</div>
          <div>车速：{{window.info.name }}</div>
          <div>位置：{{window.info.name }}</div>
          <div class='pathTrack'>地址:{{window.info.address }}</div>
          <div class="btn-wrap">
            <el-button type="primary" size='small' @click="lookPathTrack()"> 行程轨迹</el-button>
            <el-button type="primary" size='small' @click="lookPathTrack()">实时追踪</el-button>
            <el-button type="primary" size='small' @click="lookPathTrack()">车辆信息</el-button>
          </div>
        </div>
      </el-amap-info-window>
    </el-amap>
    <!-- 测距功能/多边形 -->
    <div class="map-tool">
      <p class="tool" @click="testDistance">测距</p>
      <p class="tool" @click="clearDraw">清除绘制</p>
      <el-select v-model="rangeItem" placeholder="请选择">
        <el-option v-for="item in selectRange" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

</template>

<script>

import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
let mouseTool = null
// 监听draw事件可获取画好的覆盖物
var overlays = []
export default {

  data () {
    let self = this
    return {
      mapIcon: require('../images/icon.png'),
      starMark: require('../images/starMark.png'),
      endMark: require('../images/endMark.png'),
      markers: [],
      windows: [],
      window: '',
      center: [121.5273285, 31.21515044],
      selectRange: [
        {
          value: '选项1',
          label: '框选'
        },
        {
          value: '选项2',
          label: '多边形'
        },
        {
          value: '选项3',
          label: '圆形半径'
        }
      ],
      rangeItem: '',
      originCenter: [],
      zoom: 16,
      amapManager,
      events: {
        init (map) {
          amapManager.setMap(map)
          mouseTool = new AMap.MouseTool(map)
          mouseTool.on('draw', function (e) {
            overlays.push(e.obj)
            // 调用本地函数处理画出来的对象
            self.getDrawInfo(e.obj)
          })
        },
        // 点击事件
        'click': (e) => {
          console.log(self.isLine)
          if (self.isLine) {
            self.clickLine(e)
          }
        }
      },
      // 画线
      polyline: {
        path: [],
        events: {
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat])
            console.log(newPath)
          }
        },
        editable: false
      },
      isLine: false,
      flag: false,
      basePosition: [],
      plugin: [
        'ToolBar',
        {
          // 加工具栏，卫星路况
          pName: 'MapType',
          defaultType: 0
        },

        {
          // 获取当前位置的中心点
          pName: 'Geolocation',
          events: {
            // o 是高德地图定位插件实例
            init (o) {
              // 获取地图的中心点
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  console.log(result)
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.originCenter = [self.lng, self.lat]
                }
              })
            }
          }
        }
      ],
      // 画圆
      circles: [
        {
          center: [121.538065, 31.127007],
          radius: 200,
          fillOpacity: 0.5,
          events: {
            click: () => {
              alert('click')
            }
          }
        }
      ],
      // 多边形
      polygons: [
        {
          draggable: true,
          path: [
            [121.5273285, 31.21515044],
            [121.5293285, 31.21515044],
            [121.5293285, 31.21915044],
            [121.5273285, 31.21515044]
          ],
          events: {
            click: () => {
              alert('click polygon')
            }
          }
        }
      ],
      count: 0
    }
  },
  mounted () {

  },
  methods: {

    lookPathTrack () {
      this.$router.push({ path: '/pathTrack' })
    },
    // 自定义图标
    getMarkerContent () {
      const content = `<div><img src= "${this.mapIcon}"  style="width:40px;margin-top:15px;margin-left: -10px;" alt=""> </div>`
      return content
    },
    // 获取坐标点窗体
    getMarker (markerList) {
      let markers = []
      let windows = []
      let self = this
      markerList.map((marker, index) => {
        markers.push({
          position: marker.position,
          content: `<div><img src= "${this.mapIcon}" style="width:40px;margin-top:15px;margin-left: -10px;" alt=""> </div>`,
          events: {
            click (e) {
              console.log(e)
              self.windows.forEach(window => {
                window.visible = false
              })
              self.window = self.windows[index]
              self.$nextTick(() => {
                self.window.visible = true
              })
            }
          }
        })
        windows.push({
          position: marker.position,
          visible: false,
          info: marker
        })
      })
      this.markers = markers
      this.windows = windows
    },
    // 清除绘制
    clearDraw () {
      amapManager.getMap().remove(overlays)
      this.$emit('clearDraw')
      overlays = []
      this.markers = []
      this.polyline.path = []
      this.isLine = false
    },
    // 点击开始测距
    testDistance () {
      this.clearDraw()
      this.isLine = true
      this.flag = true
      this.$message.success('请选择任意两点测距！')
    },
    // 连线
    clickLine (e) {
      let _this = this
      let currentPosition = [e.lnglat.lng, e.lnglat.lat]
      if (this.markers.length === 0) {
        this.polyline.path = []
        this.starPosition = currentPosition
        this.polyline.path.push(currentPosition)
        this.markers.push({
          position: currentPosition,
          content: `<div style="color: black;font-weight: bold;margin-top: 10px; "><img src=${_this.starMark}>起点</div>`
        })
        console.log(this.markers)
      } else {
        this.GetDistance(this.starPosition[0], this.starPosition[1], currentPosition[0], currentPosition[1])
        this.polyline.path = []
        this.polyline.path.push(this.starPosition)
        this.polyline.path.push(currentPosition)
        console.log(this.polyline.path)
        this.markers[1] = ({
          position: currentPosition,
          content: `<div style="color: black;font-weight: bold; margin-top: 10px;"><img src=${_this.endMark}>终点${_this.distance}</div>`
        })
      }
    },
    // 获取两点之间的距离
    GetDistance (lat1, lng1, lat2, lng2) {
      let radLat1 = lat1 * Math.PI / 180.0
      let radLat2 = lat2 * Math.PI / 180.0
      let a = radLat1 - radLat2
      let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
      s = s * 6378.137// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000
      this.distance = s + 'km'
      console.log(s)
    }
  }
}
</script>
<style lang="scss"  scoped>
.map-wrap {
  width: 100%;
  height: 100%;
  .map-tool {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 102px;
    right: 11px;
    .tool {
      width: 60px;
      margin: 5px 0;
      padding: 2px;
      background: #fff;
      border: solid 1px #ccc;
      font-size: 12px;
      float: right;
      text-align: right;
    }
  }
  .window-wrap {
    padding: 10px;
    .btn-wrap {
      margin-top: 10px;
    }
  }
}
</style>
