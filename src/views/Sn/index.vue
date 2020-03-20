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
      <el-table border stripe :data="tableData" style="width: 100%" height="700">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip v-for="(item,index) in titleList" :key="index"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="dialogVisible = true">修改</el-button>
            <el-popconfirm title="确认激活该账户吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
              <el-button size="mini" type="primary" slot="reference">激活</el-button>
            </el-popconfirm>
            <el-popconfirm title="确认禁用该账户吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
              <el-button size="mini" type="danger" slot="reference">禁用</el-button>
            </el-popconfirm>
            <el-popconfirm title="确认解绑该账户吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
              <el-button size="mini" type="primary" slot="reference">解绑</el-button>
            </el-popconfirm>
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
        { prop: 'deviceCoding', label: '设备号' },
        { prop: 'deviceCoding', label: '加密ID' },
        { prop: 'city', label: '数字公钥' },
        { prop: 'city', label: '激活类型' },
        { prop: 'city', label: '激活状态' },
        { prop: 'address', label: '绑定状态', width: 100 },
        { prop: 'mobil ', label: '绑定车辆' },
        { prop: 'org ', label: '所属机构' },
        { prop: 'org ', label: '配置软件' },
        { prop: 'name', label: '产品型号' },
        { prop: 'carStyle ', label: '导入时间' },
        { prop: 'date', label: '激活日期' },
        { prop: 'carType', label: '软件版本' }
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
