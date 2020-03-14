<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="产品型号">
        <el-input v-model="formInline.phone" placeholder="请输入产品型号"></el-input>
      </el-form-item>
      <el-form-item label="车型">
        <el-input v-model="formInline.phone" placeholder="请输入车型"></el-input>
      </el-form-item>
      <el-form-item label="软件名称">
        <el-input v-model="formInline.phone" placeholder="请输入软件名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <!--<el-checkbox-group fill="pink"  v-model="checkboxGroup4" size="mini" >
          <el-checkbox-button fill="pink"  v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>-->
        <el-checkbox-group v-model="checkboxGroup4" size="mini">
          <el-checkbox label="未发布" border ></el-checkbox>
          <el-checkbox label="未审核" border></el-checkbox>
          <el-checkbox label="已下架" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" :loading="false">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="onSubmit">清空</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit">新建</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%" max-height="650">
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="产品型号"></el-table-column>
        <el-table-column prop="date" label="品牌分类"></el-table-column>
        <el-table-column prop="date" label="车型"></el-table-column>
        <el-table-column prop="date" label="软件名称"></el-table-column>
        <el-table-column prop="name" label="软件版本"></el-table-column>
        <el-table-column prop="province" label="发布状态"></el-table-column>
        <el-table-column prop="city" label="发布时间"></el-table-column>
        <el-table-column prop="address" label="发布人"></el-table-column>
        <el-table-column prop="zip" label="更改明细"></el-table-column>
        <el-table-column fixed="right" label="下载" width="150">
          <template slot-scope="scope">
            <el-button type="success" plain size="mini">下载</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template slot-scope="scope">
            <el-button type="primary" style="margin-left: 10px;margin-bottom: 10px" size="mini" @click="centerDialogVisible = true">修改</el-button>
            <el-button size="mini" type="success" @click="centerDialogVisible = true">审核</el-button>
            <el-button size="mini" type="warning" @click="centerDialogVisible = true">发布</el-button>
            <el-button size="mini" type="danger" @click="centerDialogVisible = true">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :close-on-click-modal="false" :before-close="dialogClose()" :visible.sync="centerDialogVisible" width="450px" center>
      <edit  @close="centerDialogVisible = false" @submit="submit" ></edit>
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
export default {
  components: { edit },
  data () {
    return {
      checkboxGroup4:[],
      // 分页
      page: 1,
      rows: 20,
      total: 100,
      centerDialogVisible: false,
      // 表单验证
      formInline: {
        roler:'',
        orgr:'',
        name: '',
        phone: ''
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
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },{
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
    },
    submit (flag) {
      this.centerDialogVisible = false
      switch (flag) {
        case true:
          this.getData(this.page)
          this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
          break
        case false:
          this.$message.error('错了哦，这是一条错误消息')
          break
      }
    }
  }
}
</script>

<style lang="scss"  scoped>

</style>
