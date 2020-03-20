<template>
  <div class="monitor-wrap">
    <div class="amap-wrap" :class="{ 'amap-100': fullScreen }">
      <path-track :lineArr='lineArr' ref="pathTrack" />
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
          <span>开始时间：</span>
          <el-date-picker v-model="value1" type="datetime" placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="block">
          <span>结束时间：</span>
          <el-date-picker v-model="value2" type="datetime" placeholder="结束时间">
          </el-date-picker>
        </div>
        <el-button type="primary" class="search" style="margin:10px">搜索</el-button>
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
import pathTrack from './components/pathTrack'
export default {

  components: { pathTrack },
  data () {
    return {
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
      time: '',
      people: '',
      searchword: '',
      lineArr: []
    }
  },
  mounted () {
  },
  methods: {
    drawLine (lineArr) {
      // 移除当前Marker
      this.lineArr = lineArr
      this.$refs.pathTrack.initroad()
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
    width: 385px;
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
        align-items: center;
        margin-bottom: 10px;
        margin-left: 4px;
        color: #303133;
      }
      .search {
        position: absolute;
        top: 15%;
        right: 0;
        text-align: center;
        margin-left: 10px;
      }
    }
  }
  img {
    vertical-align: middle;
  }
}
</style>
