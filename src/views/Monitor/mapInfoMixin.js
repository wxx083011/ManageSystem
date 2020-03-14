// * @FileDescription: 地图插件的配置 *
//   @Date: 2020/3/17 *
export let mapInfoMixin = {
  data () {
    return {
      center: [121.5273285, 31.21515044],
      originCenter: [],
      zoom: 16,
      // 插件
      plugin: [{
        pName: 'Geolocation',
        events: {
          // o 是高德地图定位插件实例
          // init (o) {
          //   // 获取地图的中心点
          //   o.getCurrentPosition((status, result) => {
          //     if (result && result.position) {
          //       console.log(result)
          //       self.lng = result.position.lng
          //       self.lat = result.position.lat
          //       self.originCenter = [self.lng, self.lat]
          //       self.loaded = true
          //     }
          //   })
          // }
        }
      }],
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
          path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
          events: {
            click: () => {
              alert('click polygon')
              // console.log(amapManager.getComponent(0))
              // console.log(this.$refs.map.$$getCenter())
              // console.log(this.$refs.polygon_0[0].$$getPath())
            }
          }
        }
      ]
    }
  },
  // 当组件的dom准备好了之后触发的
  mounted () {
  },
  methods: {
    getMarkerContent (item, width, height, isRotate = false) {
      const content = `<div><img src= "${this.mapIcon}" style="width:30px;" alt=""> </div>`
      return content
    }
  }
}
