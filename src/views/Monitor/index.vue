<template>
  <div class="monitor-wrap">
    <div class="amap-wrap" :class="{ 'amap-100': fullScreen }">
      <vueMap ref="vueMap" />
      <!-- 收缩按钮 -->
      <div class="icon-wrap" @click="fullScreen = !fullScreen">
        <i :class="[!fullScreen ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
      </div>
    </div>
    <div class="right-menu" v-show="!fullScreen">
      <div class="filter-wrap">
        <el-select v-model="people" filterable placeholder="请选择" popper-class='select-option'>
          <el-option v-for="item in searchPeople" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="time" class="time" placeholder="">
          <el-option v-for="item in timeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button>刷新</el-button>
      </div>
      <div class="filter-wrap">
        <el-input v-model="searchword" placeholder="请输入内容" class="search-input"></el-input>
        <el-button class="search">搜索</el-button>
      </div>
      <div>
        <el-tabs :stretch='true' v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="在线 17/100" name="online"></el-tab-pane>
          <el-tab-pane label="离线 83/100" name="offline"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="filter-wrap" style="height:76%">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @select-all="selectAll" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="检测员名字" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="address" label="设备序列号" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination background layout="prev, pager, next" :total="50" style="max-width:100%">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import vueMap from './vueMap'
export default {
  components: { vueMap },
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        position: [121.536477, 31.126924]
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        position: [121.538097, 31.126337]
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        position: [121.535973, 31.125593]
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        position: [121.538065, 31.127007]
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '深圳 1518 弄',
        position: [114.113155, 22.549061]
      }],
      multipleSelection: [],
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
          label: '10s'
        },
        {
          value: '选项2',
          label: '20s'
        }
      ],
      // 表单model
      people: '',
      time: '',
      searchword: ''
    }
  },
  methods: {
    // 获取地图的配置
    // 全选时候
    selectAll () {
      this.$refs.vueMap.zoom = 5
    },
    toggleSelection (rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
        this.$refs.vueMap.zoom = 5
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$refs.vueMap.getMarker(val)
      if (val.length > 0) {
        this.$refs.vueMap.center = val[val.length - 1].position
        this.$refs.vueMap.zoom = 16
      } else {
        this.$refs.vueMap.markerCenter = this.$refs.vueMap.originCenter
        this.$refs.vueMap.zoom = 16
      }
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
    width: 400px;
    height: 100%;
    padding: 8px;
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
      .search-input {
        flex: 1;
      }
      .search {
        text-align: center;
        margin-left: 10px;
      }
    }
  }
}
</style>
