<template>
  <div class="container">

    <!--查询框-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称">
        <el-input v-model="formInline.param1" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.param2" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="loading = true,getData" :loading="loading">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="formInline.param1='',formInline.param2='',page=1,getData()">清空</el-button>
        <el-button type="warning" icon="el-icon-download" @click="$exportExcel($refs.xlsxTable,'机构列表')">导出</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit" @click="centerDialogVisible = true">新建</el-button>
      </el-form-item>
    </el-form>

    <!--分页-->
    <div class="block">
      <el-pagination background @current-change="getData" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--表格-->
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe  id="table" :data="tableData" style="width: 100%" height="700">
        <el-table-column show-overflow-tooltip  v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :width="item.width" :key="index"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" @click="centerDialogVisible = true">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--专门用来导出的-->
    <div style="display: none"   ref="xlsxTable">
      <el-table :data="tableData"><el-table-column v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :key="index"></el-table-column></el-table>
    </div>

    <!--编辑弹框-->
    <el-dialog :close-on-click-modal="false" :before-close="dialogClose()" :visible.sync="centerDialogVisible" width="30%" center>
      <edit @close="centerDialogVisible = false" @submit="submit"></edit>
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
export default {
  components: { edit },
  data () {
    return {
      loading: false,
      centerDialogVisible: false,

      // 分页
      page: 1,
      rows: 20,
      total: 100,

      // 查询参数
      formInline: {
        param1: '', // 机构名称
        param2: ''// 手机号
      },

      // 数据
      tableName:[
        {prop:'orgId',label:'序号'},
        {prop:'orgName',label:'机构名称'},
        {prop:'linkMan',label:'机构联系人'},
        {prop:'tel',label:'联系人号码'},
        {prop:'regionName',label:'所属行政区'},
        {prop:'orgAddress',label:'机构地址',width:300},
        {prop:'createTime',label:'创建时间'},
      ],
      tableData: [
        {orgId:1,orgName:'幼儿园',linkMan:'陈老板',tel:13111112269,regionName:'深圳市南山区',orgAddress:'我家门口',createTime:'2020-03-13'},
        {orgId:1,orgName:'幼儿园',linkMan:'陈老板',tel:13111112269,regionName:'深圳市南山区',orgAddress:'我家门口',createTime:'2020-03-13'},
      ]
    }
  },
  mounted () {
    this.getData(1)
  },
  methods: {
    /* 搜索 */
    getData (page) {
      this.page = page
      console.log(`当前页: ${page}`)
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },

    // 关闭弹框
    dialogClose (done) {
      console.log('关闭弹框')
    },

    submit (flag) {
      this.centerDialogVisible = false
      switch (flag) {
        case true:
          this.getData(this.page)
          this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
          break;
        case false:
          this.$message.error('错了哦，这是一条错误消息')
          break
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.area-select {
  line-height: 20px !important;
}
</style>
