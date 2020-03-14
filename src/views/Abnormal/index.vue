<template>
  <div class="abnormal-discharge container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="设备号">
        <el-input v-model="formInline.param1" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="formInline.param2" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="车架号号">
        <el-input v-model="formInline.param3" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="所属机构">
        <el-input v-model="formInline.param4" placeholder="请输入账号"></el-input>
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
        <el-table-column fixed="right" label="操作" width="200">
          <template>
            <el-button size="mini" type="primary" @click="$router.push({path:'/Monitor'})">实时跟踪</el-button>
            <el-button size="mini" type="primary" @click="$router.push({path:'/abnormalDetail'})">异常详情</el-button>
            <el-button size="mini" type="primary" style="margin: 10px 7px 0 0px;" @click="$router.push({path:'/Monitor'})">查看轨迹</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
const item = {
  city: '序号11',
  'deviceCoding': '设备号',
  '车牌号11': '车牌号11',
  vin: '车架号(VIN)',
  'faultLampStatus': '故障指示灯状态',
  'faultCount': '故障码',
  'org': '所属机构',
  'mobil': 'SIM卡号',
  'SIM卡号': 'SIM卡号',
  '颗粒物监控11': '颗粒物监控11',
  '就绪状态报警11': '就绪状态报警11',
  '离线报警11': '离线报警11',
  '拆除报警11': '拆除报警11'
}

export default {

  data () {
    return {
      dialogVisible: false,
      dialogForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      titleList: [
        { prop: 'city', label: '序号11' },
        { prop: 'deviceCoding', label: '设备号' },
        { prop: 'city', label: '车牌号11' },
        { prop: 'vin', label: '车架号(VIN)', width: 100 },
        { prop: 'org', label: '所属机构' },
        { prop: 'mobil', label: 'SIM卡号' },
        { prop: 'date', label: '颗粒物监控11' },
        { prop: 'date', label: '就绪状态报警11' },
        { prop: 'name', label: '离线报警11' },
        { prop: 'date', label: '拆除报警11' },
        { prop: 'faultLampStatus', label: '故障指示灯状态' },
        { prop: 'faultCount', label: '故障码' }
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
    // 点击弹框下的取消
    handleCancel () {
      this.dialogVisible = false
    },
    // 关闭弹窗
    handleCloseBindWarnStandard () {
      this.dialogVisible = false
    },
    // 拍品新增、修改弹窗提交
    submitForm (val) {
      console.log(val)
      this.dialogVisible = false
    },
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
