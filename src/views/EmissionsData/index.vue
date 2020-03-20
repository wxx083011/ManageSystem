<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称">
        <el-input v-model="formInline.name" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" :loading="false">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="onSubmit">清空</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
        <el-button type="success" icon="el-icon-first-aid-kit">新建</el-button>
      </el-form-item>
    </el-form>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="rows"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table  border  stripe   :data="tableData" style="width: 100%" height="700">
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="设备号"></el-table-column>
        <el-table-column prop="name" label="车牌号" ></el-table-column>
        <el-table-column prop="province" label="车架号（VIN）" ></el-table-column>
        <el-table-column prop="province" label="SIM卡号" ></el-table-column>
        <el-table-column prop="province" label="所属机构" ></el-table-column>
        <el-table-column prop="province" label="颗粒物监控" ></el-table-column>
        <el-table-column prop="city" label="就绪状态报警" ></el-table-column>
        <el-table-column prop="city" label="在线状态" ></el-table-column>
        <el-table-column prop="zip" label="拆除报警"  ></el-table-column>
        <el-table-column prop="zip" label="反应剂余量"  ></el-table-column>
        <el-table-column prop="zip" label="尿素液位"  ></el-table-column>
        <el-table-column prop="zip" label="排气烟度"  ></el-table-column>
        <el-table-column prop="zip" label="故障指示灯状态"  ></el-table-column>
        <el-table-column prop="zip" label="故障码"  ></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template>
            <el-button size="mini" type="primary" @click="centerDialogVisible = true"  style="margin-left:10px">OBD信息</el-button>
            <el-button size="mini" type="primary" @click="centerDialogVisible = true">实时数据</el-button>
            <el-button size="mini" type="primary" @click="centerDialogVisible = true" style="margin-top:8px">登录明细</el-button>
            <el-button size="mini" type="primary" @click="centerDialogVisible = true" style="margin-top:8px">实时追踪</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        //分页
        cities: ['故障码', '报警', '补传'],
        checkboxGroup4: [],
        page:1,
        rows:20,
        total:100,
        centerDialogVisible:false,
        //表单验证
        formInline:{
          name:'',
          phone:'',
          startTime:'',
          endTime:'',
        },

        //数据
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
    methods:{
      /*查询按钮*/
      onSubmit(){
        console.log('查询')
      },
      deleteRow(){
        console.log('查询')
      },
      dialogClose(){

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="scss"  scoped>
</style>
