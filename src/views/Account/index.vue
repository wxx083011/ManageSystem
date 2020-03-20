<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称">
        <el-select v-model="formInline.orgr" placeholder="请选择机构">
          <el-option
            v-for="item in orgs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formInline.phone" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formInline.roler" placeholder="请选择角色">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%" height="700">
        <el-table-column v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :width="item.width" :key="index"></el-table-column>
        <el-table-column fixed="right" label="操作" width="225">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="centerDialogVisible = true">修改</el-button>
            <el-popconfirm title="确认禁用该账户吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
              <el-button size="mini" type="danger"  slot="reference">禁用</el-button>
            </el-popconfirm>
            <el-popconfirm title="确认重置该账户密码吗？" @onConfirm="deleteRow(scope.$index, scope.row)">
              <el-button size="mini" type="info"  slot="reference">密码重置</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--专门用来导出的-->
    <div style="display: none"   ref="xlsxTable">
      <el-table :data="tableData"><el-table-column v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :key="index"></el-table-column></el-table>
    </div>

    <el-dialog :close-on-click-modal="false" :before-close="dialogClose()" :visible.sync="centerDialogVisible" width="450px" center>
      <edit></edit>
    </el-dialog>
  </div>
</template>

<script>
  import {queryAccount} from '@/api/cxy'
  import edit from './edit'
  export default {
    components: { edit },
    data () {
      return {
        roles:[
          {'value':1,'label':'管理员'},
          {'value':2,'label':'客服'}
        ],
        orgs:[
          {'value':1,'label':'机构1'},
          {'value':2,'label':'机构2'}
        ],
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
        tableName:[
          {prop:'orgId',label:'序号'},
          {prop:'orgName',label:'账号'},
          {prop:'linkMan',label:'姓名'},
          {prop:'tel',label:'联系人号码'},
          {prop:'regionName',label:'手机号'},
          {prop:'orgAddress',label:'角色'},
          {prop:'createTime',label:'所属机构'},
          {prop:'createTime',label:'创建时间'},
        ],
        tableData: [{
          orgId: '2016-05-03',
          orgName: '王小虎',
          linkMan: '上海',
          regionName: '普陀区',
          orgAddress: '上海市普陀区金沙江路 1518 弄',
          tel: 200333,
          createTime: 200333
        }]
      }
    },
    mounted(){
      this.onSubmit()
    },
    methods: {
      /* 查询按钮 */
      onSubmit () {
        console.log('查询')
        queryAccount().then(res=>{

        })
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
