<template>
  <div class="container">
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
        <el-button type="warning" icon="el-icon-download">导出</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit" @click="centerDialogVisible = true">新建</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-pagination background @current-change="getData" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%" max-height="700">
        <el-table-column prop="orgId" label="序号"></el-table-column>
        <el-table-column prop="orgName" label="机构名称"></el-table-column>
        <el-table-column prop="linkMan" label="机构联系人"></el-table-column>
        <el-table-column prop="tel" label="联系人号码"></el-table-column>
        <el-table-column prop="regionName" label="所属行政区"></el-table-column>
        <el-table-column prop="orgAddress" label="机构地址" width="300"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" @click="centerDialogVisible = true">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      // 分页
      page: 1,
      rows: 20,
      total: 100,
      // 表单验证
      formInline: {
        param1: '', // 机构名称
        param2: ''// 手机号
      },
      centerDialogVisible: false,
      // 数据
      tableData: []
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
          break
        case false:
          this.$message.error('错了哦，这是一条错误消息')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.area-select {
  line-height: 20px !important;
}
</style>
