<template>
  <div class="path-track content">
    <div id="container" style="height:100%;width:100%">
    </div>
    <!-- 轨迹回放操作栏 path-track-tool-->
    <div class="path-track-tool">
      <h4>轨迹回放控制</h4>
      <el-button type="primary" @click="startAnimation()">开始动画</el-button>
      <el-button type="primary" @click="pauseAnimation()">暂停动画</el-button>
      <el-button type="primary" @click="resumeAnimation()">继续动画</el-button>
      <el-button type="primary" @click="stopAnimation()">停止动画</el-button>
    </div>
  </div>
</template>
  <style>
.amap-demo {
  height: 300px;
}
</style>

<script>

export default {
  data () {
    return {
      markerSpeed: 200,
      lineArr: [
        [116.478935, 39.997761],
        [116.478939, 39.997825],
        [116.478912, 39.998549],
        [116.478912, 39.998549],
        [116.478998, 39.998555],
        [116.478998, 39.998555],
        [116.479282, 39.99856],
        [116.479658, 39.998528],
        [116.480151, 39.998453],
        [116.480784, 39.998302],
        [116.480784, 39.998302],
        [116.481149, 39.998184],
        [116.481573, 39.997997],
        [116.481863, 39.997846],
        [116.482072, 39.997718],
        [116.482362, 39.997718],
        [116.483633, 39.998935],
        [116.48367, 39.998968],
        [116.484648, 39.999861]]
    }
  },
  mounted () {
    setTimeout(() => {
      this.initMap()
      this.initroad()
    }, 1000)
  },
  methods: {
    startAnimation () {
      this.marker.moveAlong(this.lineArr, this.markerSpeed)
    },
    pauseAnimation () {
      this.marker.pauseMove()
    },
    resumeAnimation () {
      this.marker.resumeMove()
    },
    stopAnimation () {
      this.marker.stopMove()
    },
    initMap () {
      this.map = new AMap.Map('container', {
        resizeEnable: true, // 窗口大小调整
        center: this.firstArr, // 中心 firstArr: [116.478935, 39.997761],
        zoom: 20
      })
      this.marker = new AMap.Marker({
        map: this.map,
        position: [116.478935, 39.997761],
        icon: 'https://webapi.amap.com/images/car.png',
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      })
    },
    // 初始化轨迹
    initroad () {
      // 绘制还未经过的路线
      this.polyline = new AMap.Polyline({
        map: this.map,
        path: this.lineArr,
        showDir: true,
        strokeColor: '#28F', // 线颜色--蓝色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })

      // 绘制路过了的轨迹
      var passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: '#AF5', // 线颜色-绿色
        // path: this.lineArr,
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })
      this.marker.on('moving', e => {
        passedPolyline.setPath(e.passedPath)
      })
      this.map.setFitView() // 合适的视口
    }

  }

}
</script>
<style lang="scss"  scoped>
.path-track {
  position: relative;
  .path-track-tool {
    position: absolute;
    bottom: 47px;
    right: 19px;
    background: #fff;
    padding: 20px;
    h4{
      margin-bottom: 10px;
    }
  }
}
</style>
