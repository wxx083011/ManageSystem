<template>
  <div class="monitor-wrap">
    <div class="amap-wrap" :class="{ 'amap-100': fullScreen }">
      <div id="container" style="height:100%;width:100%">
        <div class="progress-wrap" v-if="lineArr.length>0">
          <div class="pic-wrap">
            <img src="./images/start.png" v-if="progStatus==='开始'" @click="startAnimation()" alt="">
            <img src="./images/pause.png" v-if="progStatus==='暂停'" @click="pauseAnimation()" alt="">
            <img src="./images/start.png" v-if="progStatus==='继续'" @click="resumeAnimation()" alt="">
            <img src="./images/stop.png" @click="stopAnimation()" alt="">
          </div>
          <div class="progress">
            <div class="percentage" :style="{width:percentage+'%'}"></div>
          </div>
          <div class="pic-wrap" style="width:150px">
            <el-button @click="setSpeed('加速')">加速</el-button>
            <el-button @click="setSpeed('减速')">减速</el-button>
          </div>
        </div>
      </div>
      <!-- 收缩按钮 -->
      <div class="icon-wrap" @click="fullScreen = !fullScreen">
        <i :class="[!fullScreen ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
      </div>
    </div>
    <div class="right-menu" v-show="!fullScreen">
      <div class="filter-wrap">
        <el-select v-model="people" style="flex: 1;" filterable placeholder="请选择" popper-class='select-option'>
          <el-option v-for="item in searchPeople" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="time" class="time" placeholder="">
          <el-option v-for="item in timeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="time-wrap" style="position: relative;">
        <div class="block">
          <el-date-picker size='mini' v-model="value1" type="datetime" placeholder="开始时间">
          </el-date-picker>&nbsp;至&nbsp;
          <el-date-picker size='mini' v-model="value2" type="datetime" placeholder="结束时间">
          </el-date-picker>
        </div>
        <el-button class="search">搜索</el-button>
      </div>
      <div>
        <el-tabs :stretch='true' v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="今天 17/100" name="online"></el-tab-pane>
          <el-tab-pane label="本周 83/100" name="offline"></el-tab-pane>
          <el-tab-pane label="报警 83/100" name="alarm"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="list-wrap scroll_content">
        <el-card class="box-card" v-for="(car,index) in tableList" :key="index" :body-style="{ padding: '5px',margin:'5px'}">
          <p class="card-info"><span style="float:left;"><img class="icon" src="./images/startIcon.png" alt=""> 起点：</span> <span> {{car.startAdd}}</span></p>
          <p class="card-info"><span style="float:left">起始时间：</span><span> {{car.startTime}}</span></p>
          <p class="card-info"><span style="float:left"><img class="icon" src="./images/endIcon.png" alt="">终点：</span><span> {{car.endAdd}}</span></p>
          <p class="card-info"><span style="float:left">结束时间：</span><span> {{car.endTime}}</span></p>
          <el-button type="primary">行驶1.75km</el-button>
          <el-button type="primary">报警三次</el-button>
          <el-button type="primary" @click="drawLine(car.lineArr)">回放</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// import vueMap from './vueMap'
export default {
  components: {},
  data () {
    return {
      percentage: 0,
      progStatus: '开始',
      tableList: [
        {
          startAdd: '广东省深圳市南海大道3025号',
          endAdd: '广东省深圳市南海大道3025号',
          startTime: '2020年3月1日 13:06:45',
          endTime: '2020年3月1日 13:06:45',
          lineArr: [
            [116.478935, 39.997761],
            [116.478939, 39.997825],
            [116.478912, 39.998549],
            [116.478912, 39.998549],
            [116.478998, 39.998555],
            [116.478998, 39.998555]]
        },
        {
          startAdd: '广东省深圳市南海大道3025号',
          endAdd: '广东省深圳市南海大道3025号',
          startTime: '2020年3月1日 13:06:45',
          endTime: '2020年3月1日 13:06:45',
          lineArr: [
            [116.478998, 39.998555],
            [116.478998, 39.998555],
            [116.479282, 39.99856],
            [116.479658, 39.998528],
            [116.480151, 39.998453],
            [116.480784, 39.998302]]
        },
        {
          startAdd: '广东省深圳市南海大道3025号',
          endAdd: '广东省深圳市南海大道3025号',
          startTime: '2020年3月1日 13:06:45',
          endTime: '2020年3月1日 13:06:45',
          lineArr: [
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
        }, {
          startAdd: '广东省深圳市南海大道3025号',
          endAdd: '广东省深圳市南海大道3025号',
          startTime: '2020年3月1日 13:06:45',
          endTime: '2020年3月1日 13:06:45',
          lineArr: [
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
        }, {
          startAdd: '广东省深圳市南海大道3025号',
          endAdd: '广东省深圳市南海大道3025号',
          startTime: '2020年3月1日 13:06:45',
          endTime: '2020年3月1日 13:06:45',
          lineArr: [
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
      ],
      value1: '',
      value2: '',
      activeName: 'online',
      fullScreen: false,
      // 下拉框选项
      searchPeople: [
        {
          value: '选项1',
          label: '张三检测'
        },
        {
          value: '选项2',
          label: '李四检测'
        }
      ],
      timeList: [
        {
          value: '选项1',
          label: '行程轨迹'
        },
        {
          value: '选项2',
          label: '实时轨迹'
        }
      ],
      // 表单model
      people: '',
      time: '',
      searchword: '',
      markerSpeed: 100,
      lineArr: [],
      pathSimplifierIns: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.initMap()
    }, 800)
  },
  methods: {
    // 初始化轨迹
    initroad () {
      let that = this
      that.map.clearMap()
      console.log(this.navg)
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }
        if (that.pathSimplifierIns) {
          that.pathSimplifierIns.setData([])
        }
        // 创建一个巡航轨迹路线
        that.pathSimplifierIns = new PathSimplifier({
          zIndex: 100, // 地图层级，
          map: that.map, // 所属的地图实例
          // 巡航路线轨迹列表
          getPath: function (pathData, pathIndex) {
            return pathData.path
          },
          // hover每一个轨迹点，展示内容
          getHoverTitle: function (pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
            }
            return pathData.name + '，点数量' + pathData.path.length
          },
          // 自定义样式，可设置巡航器样式，巡航轨迹样式，巡航轨迹点击、hover等不同状态下的样式，不设置则用默认样式，详情请参考api文档
          // 绘制路线节点
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })
        // 设置数据
        that.pathSimplifierIns.setData([{
          name: '路线0',
          path: that.lineArr
        }])
        // 对第一条线路（即索引 0）创建一个巡航器
        var navg = that.pathSimplifierIns.createPathNavigator(0, {
          loop: false, // 循环播放
          speed: that.markerSpeed// 巡航速度，单位千米/小时
        })
        navg.on('move', function (a) {
          let percentage = 0
          let { idx, tail } = navg.getCursor()
          let len = a.target.path.length
          if (navg.isCursorAtPathEnd()) {
            // 收尾处理
            that.stopAnimation()
            that.percentage = 100
          } else {
            percentage = ((idx + tail) / len) * 100
          }
          that.percentage = percentage
        })
        that.navg = navg
      })
    },
    initMap () {
      this.map = new AMap.Map('container', {
        expandZoomRange: true,
        resizeEnable: true, // 窗口大小调整
        center: this.firstArr, // 中心 firstArr: [116.478935, 39.997761],
        zoom: 13
      })
    },
    drawLine (lineArr) {
      // 移除当前Marker
      this.progStatus = '开始'
      this.lineArr = lineArr
      this.initroad()
    },
    startAnimation () {
      this.navg.start()
      this.progStatus = '暂停'
      // this.marker.moveAlong(this.lineArr, this.markerSpeed)
    },
    pauseAnimation () {
      this.progStatus = '继续'
      this.navg.pause()
    },
    resumeAnimation () {
      this.progStatus = '暂停'
      this.navg.resume()
    },
    stopAnimation () {
      this.percentage = 0
      this.progStatus = '开始'
      this.markerSpeed = 100
      this.navg.stop()
      this.initroad()
    },
    // 调速
    setSpeed (status) {
      if (this.navg != null) {
        if (status === '加速') {
          this.markerSpeed += 50
        } else if (status === '减速') {
          this.markerSpeed -= 50
        }
        this.navg.setSpeed(this.markerSpeed)
      }
    },
    toggleSelection (rows) {
      console.log(rows)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 14px;
  .amap-wrap {
    position: relative;
    width: 80%;
    flex: 1;
    height: 100%;
    #container {
    }
    .progress-wrap {
      position: absolute;
      bottom: 30px;
      z-index: 9;
      width: 100%;
      padding: 10px;
      background: #fff;
      display: flex;
      align-items: center;
      .pic-wrap {
        width: 100px;
        margin: 0 5px;
      }
      .progress {
        flex: 1;
        height: 6px;
        background: #ebeef5;
        border-radius: 50px;
        .percentage {
          height: 100%;
          border-radius: 50px;
          background: #409eff;
        }
      }
    }

    .icon-wrap {
      position: absolute;
      top: 50%;
      right: 0;
      font-size: 45px;
      color: #409eff;
    }
  }
  .amap-100 {
    width: 100%;
  }
  .right-menu {
    box-sizing: border-box;
    width: 420px;
    height: 100%;
    padding: 8px;
    margin-left: 8px;
    background: #ffffff;
    .filter-wrap {
      width: 100%;
      font-size: 14px;
      display: flex;
      flex: 1;
      margin-bottom: 10px;
      .time {
        width: 30%;
        text-align: center;
        margin: 0 5px;
      }
      .search {
        text-align: center;
        margin-left: 10px;
      }
    }
    .list-wrap {
      height: 78%;
      overflow-y: auto;
      overflow-x: hidden;
      .box-card {
        background: #eee;
        width: 98%;
        margin: 0 auto;
        margin-bottom: 10px;
        padding: 5px;
        box-sizing: border-box;
        .card-info {
          padding: 5px 0;
          .icon {
            width: 25px;
          }
        }
      }
    }
    .time-wrap {
      position: relative;
      .block {
        display: flex;
        margin-bottom: 10px;
      }
      .search {
        // text-align: center;
        // margin-left: 10px;
        // position: absolute;
        // right: 0;
        // top: 18%;
      }
    }
  }
  img {
    vertical-align: middle;
  }
}
</style>
