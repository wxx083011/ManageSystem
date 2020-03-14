<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="时间">
        <el-date-picker v-model="formInline.startTime" type="datetime" placeholder="选择起始时间">
        </el-date-picker> ~
        <el-date-picker v-model="formInline.endTime" type="datetime" placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车速">
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input> ~
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input>
      </el-form-item>
      <el-form-item label="">
        <!--<el-checkbox-group fill="pink"  v-model="checkboxGroup4" size="mini" >
          <el-checkbox-button fill="pink"  v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>-->
        <el-checkbox-group v-model="checkboxGroup4" size="mini">
          <el-checkbox label="故障码" border></el-checkbox>
          <el-checkbox label="报警" border></el-checkbox>
          <el-checkbox label="补传" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" :loading="false">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="onSubmit">清空</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
      </el-form-item>
      <el-form-item label="刷新频率(秒)">
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%" max-height="700">
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="设备号"></el-table-column>
        <el-table-column prop="name" label="车牌号"></el-table-column>
        <el-table-column prop="province" label="车架号（VIN）"></el-table-column>
        <el-table-column prop="city" label="采集时间"></el-table-column>
        <el-table-column prop="address" label="行驶里程"></el-table-column>
        <el-table-column prop="zip" label="车速"></el-table-column>
        <el-table-column prop="zip" label="发动机转速"></el-table-column>
        <el-table-column prop="zip" label="大气压力"></el-table-column>
        <el-table-column prop="zip" label="发动机净输出扭矩" style="color: red"></el-table-column>
        <el-table-column prop="zip" label="摩擦扭矩"></el-table-column>
        <el-table-column prop="zip" label="发动机燃料流量"></el-table-column>
        <el-table-column prop="zip" label="SCR上游NOx传感器输出值"></el-table-column>
        <el-table-column prop="zip" label="SCR下游NOx传感器输出值"></el-table-column>
        <el-table-column prop="zip" label="反应剂余量"></el-table-column>
        <el-table-column prop="zip" label="进气量"></el-table-column>
        <el-table-column prop="zip" label="SCR入口温度"></el-table-column>
        <el-table-column prop="zip" label="SCR出口温度"></el-table-column>
        <el-table-column prop="zip" label="DPF压差"></el-table-column>
        <el-table-column prop="zip" label="发动机冷却液温度"></el-table-column>
        <el-table-column prop="zip" label="油箱液位"></el-table-column>
        <el-table-column prop="zip" label="燃油消耗量"></el-table-column>
        <el-table-column prop="zip" label="喷油量"></el-table-column>
        <el-table-column prop="zip" label="电瓶电压"></el-table-column>
        <el-table-column prop="zip" label="发动机启动时间"></el-table-column>
        <el-table-column prop="zip" label="定位状态"></el-table-column>
        <el-table-column prop="zip" label="经度"></el-table-column>
        <el-table-column prop="zip" label="纬度"></el-table-column>
        <el-table-column prop="zip" label="海拔"></el-table-column>
        <el-table-column prop="zip" label="故障指示灯状态"></el-table-column>
        <el-table-column prop="zip" label="故障码个数"></el-table-column>
        <el-table-column prop="zip" label="故障码"></el-table-column>
        <el-table-column prop="zip" label="补传"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分页
      cities: ['故障码', '报警', '补传'],
      checkboxGroup4: [],
      page: 1,
      rows: 20,
      total: 100,
      centerDialogVisible: false,
      // 表单验证
      formInline: {
        name: '',
        phone: '',
        startTime: '',
        endTime: ''
      },

      // 数据
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    /* 查询按钮 */
    onSubmit () {
      console.log('查询')
    },
    deleteRow () {
      console.log('查询')
    },
    dialogClose () {

    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss"  scoped>
</style>
