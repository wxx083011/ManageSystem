<template>
  <div class="abnormal-discharge container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称">
        <el-input v-model="formInline.name" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formInline.phone" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="formInline.phone" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" :loading="false">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="onSubmit">清空</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit">新建</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%" max-height="700">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip v-for="(item,index) in titleList" :key="index"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const item = {
  date: '2016-05-03',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}
export default {
  data () {
    return {
      titleList: [
        { prop: 'city', label: '序号' },
        { prop: 'province', label: '设备号' },
        { prop: 'city', label: '车牌号' },
        { prop: 'address', label: '车架号(VIN)', width: 100 },
        { prop: 'city', label: '采集时间' },
        { prop: 'name', label: '行驶里程' },
        { prop: 'date', label: '车速' },
        { prop: 'date', label: '发动机转速  ' },
        { prop: 'name', label: '大气压力' },
        { prop: 'date', label: '发动机净输出扭矩' },
        { prop: 'date', label: '摩擦扭矩' },
        { prop: 'name', label: '发动机燃料流量' },
        { prop: 'date', label: 'SCR上游NOx传感器输出值' },
        { prop: 'name', label: 'SCR下游NOx传感器输出值' },
        { prop: 'name', label: '反应剂余量' },
        { prop: 'name', label: '进气量' },
        { prop: 'name', label: 'SCR入口温度' },
        { prop: 'name', label: 'SCR出口温度' },
        { prop: 'name', label: 'DPF压差' },
        { prop: 'name', label: '发动机冷却液温度' },
        { prop: 'name', label: '油箱液位' },
        { prop: 'name', label: '定位状态' }
      ],
      // 分页
      page: 1,
      rows: 20,
      total: 100,
      centerDialogVisible: false,
      // 表单验证
      formInline: {
        name: '',
        phone: ''
      },
      // 数据
      tableData: Array(10).fill(item)
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
.abnormal-discharge {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  font-size: 14px;
}
</style>
