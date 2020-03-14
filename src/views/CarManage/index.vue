<template>
  <div class="car-manage container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="车牌号">
        <el-input v-model="formInline.param1" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item label="设备号">
        <el-input v-model="formInline.param2" placeholder="请输入设备号"></el-input>
      </el-form-item>
      <el-form-item label="所属机构">
        <el-select v-model="formInline.param3" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" :loading="false">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="onSubmit">清空</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit">新建</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
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
            <el-button size="mini" type="primary" @click="dialogVisible = true">修改</el-button>
            <el-button size="mini" type="primary" @click="imgVisible()">查看行驶证</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <add-editor-dialog :dialogForm="dialogForm" :dialogVisible.sync="dialogVisible" @getCancel="handleCancel" @closeBindWarnStandard="handleCloseBindWarnStandard" @submitForm="submitForm">
    </add-editor-dialog>
  </div>
</template>

<script>
import AddEditorDialog from './addEdite'
// import AddedEditorDialog from './components/AddedEditorDialog'
const item = {
  date: '2016-05-03',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}
export default {
  components: { AddEditorDialog },
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      // 弹窗
      dialogVisible: false,
      dialogForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      options: [{
        value: '选项1',
        label: '机构1'
      }, {
        value: '选项2',
        label: '机构2'
      }],
      value: '',
      titleList: [
        { prop: 'city', label: '序号11' },
        { prop: 'plateNo ', label: '车牌号' },
        { prop: 'deviceCoding', label: '设备号' },
        { prop: 'city', label: '联系电话11' },
        { prop: 'address', label: '车主姓名11', width: 100 },
        { prop: 'mobil ', label: '绑定SIM号' },
        { prop: 'name', label: '车系11' },
        { prop: 'carStyle ', label: '车型' },
        { prop: 'date', label: '排放标准11' },
        { prop: 'carType', label: '车辆类型' },
        { prop: 'date', label: '燃油种类11' },
        { prop: 'vinSn', label: 'VIN' },
        { prop: 'drivingLicense ', label: '发动机型号' },
        { prop: 'org ', label: '所属机构' },
        { prop: 'licenseAddress', label: '地址' }
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
    imgVisible () {
      console.log(this.$refs.imgVisible)
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
    },
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
    }
  }
}
</script>

<style lang="scss"  scoped>
.car-manage {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  font-size: 14px;
}
</style>
