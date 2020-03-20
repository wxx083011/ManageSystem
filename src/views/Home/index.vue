<template>
  <div class="wrap center">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="机构统计" name="机构统计">
        <organization :activeName="activeName"></organization>
      </el-tab-pane>
      <el-tab-pane label="工单统计" name="工单统计">
        <work-order :activeName="activeName"></work-order>
      </el-tab-pane>
      <el-tab-pane label="故障率统计" name="故障率统计">
        <fault-rate :activeName="activeName"></fault-rate>
      </el-tab-pane>
      <el-tab-pane label="车辆排放污染热力图" name="车辆排放污染热力图">
        <amap></amap>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import workOrder from './workOrder.vue'
import organization from './organization.vue'
import faultRate from './faultRate.vue'
import amap from './amap.vue'
export default {
  components: { workOrder, organization, faultRate, amap },
  data () {
    return {
      activeName: '机构统计'
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }

  }
}
</script>
<style lang="scss"  >
.wrap {
  width: 100%;
  .el-tabs {
    width: 100%;
    #tab-车辆排放污染热力图,
    #tab-机构统计,
    #tab-工单统计,
    #tab-故障率统计 {
      font-size: 18px;
    }
  }
}
</style>
