
<template>
  <div class="map-wrap">
    <el-amap class="amap-box" :plugin="plugin" :zoom="zoom" :center="center" :expandZoomRange="true">
      <!-- 多边形 -->
      <el-amap-polygon v-for="(polygon, index) in polygons" :key="'polygon'+index" :vid="index" :ref="`polygon_${index}`" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></el-amap-polygon>
      <!-- 地图标注 -->
      <el-amap-marker :events="marker.events" :content="getMarkerContent()" v-for="(marker,index) in markers" :vid="index" :position="marker.position" :key="marker.id"></el-amap-marker>
      <!-- 标注点点击窗体信息 -->
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible">
        <div>
          <div>时间:{{window.info.date }}</div>
          <div>名字:{{window.info.name }}</div>
          <div class='pathTrack'>地址:{{window.info.address }}</div>
          <button @click="lookPathTrack()">查看轨迹</button>
        </div>
      </el-amap-info-window>
    </el-amap>
    <!-- 测距功能/多边形 -->
    <div class="map-tool">
      <p class="tool">测距</p>
      <p class="tool">清除绘制</p>
      <el-select v-model="rangeItem" placeholder="请选择">
        <el-option v-for="item in selectRange" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    let self = this
    return {
      mapIcon: require('./images/icon.png'),
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
      // 插件
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
  mounted () { },
  methods: {
    lookPathTrack () {
      this.$router.push({ path: '/pathTrack' })
    },
    // 自定义图标
    getMarkerContent () {
      const content = `<div><img src= "${this.mapIcon}" style="width:30px;margin-top:12px" alt=""> </div>`
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
    }
  }
}
</style>
