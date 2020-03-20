<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="VIN">
        <el-input v-model="formInline.vin" placeholder="请输入VIN"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="formInline.plateNo" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.startDate" type="datetime" placeholder="选择起始时间">
        </el-date-picker> ~
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.endDate" type="datetime" placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="onSubmit()" :loading="loading">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="clear()">清空</el-button>
        <el-button type="warning" icon="el-icon-download"  :loading="downloading" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>

    <!--分页-->
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--表格-->
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table border stripe :data="tableData" style="width: 100%"  height="700" >
        <el-table-column show-overflow-tooltip  v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :width="item.width" :key="index"></el-table-column>
      </el-table>
    </div>

    <!--专门用来导出的-->
    <div style="display: none"   ref="xlsxTable">
      <el-table :data="tableData2"><el-table-column v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :key="index"></el-table-column></el-table>
    </div>

  </div>
</template>

<script>
  import {queryCarloginrec} from '@/api/cxy'
  export default {
    data(){
      return{
        loading:false,
        downloading:false,

        //分页
        page:1,
        rows:20,
        total:100,

        //表单验证
        formInline:{
          plateNo:'',
          vin:'',
          startDate:'',
          endDate:'',
        },

        //数据
        tableName:[
          {prop:'loginId',label:'序号'},
          {prop:'dataTime',label:'登陆时间'},
          {prop:'dataNo',label:'登入流水号'},
          {prop:'deviceCoding',label:'设备编码'},
          {prop:'plateNo',label:'车牌号'},
          {prop:'vin',label:'车架号（VIN）'},
          {prop:'sim',label:'SIM卡号'},
          {prop:'deviceVer',label:'终端固件版本细分号'},
          {prop:'engineeStorque',label:'发动机参考扭矩'},
          {prop:'uploadTime',label:'上传时间'},
          {prop:'lng',label:'经度'},
          {prop:'lat',label:'纬度'},
          {prop:'height',label:'海拔'},
          // {prop:'dataTime',label:'软件版本'},
          // {prop:'dataTime',label:'登陆类型'},
          // {prop:'gpsStauts',label:'定位状态'},
          ],
        tableData: [],
        tableData2: [],
      }
    },
    mounted(){

      this.getData()

    },
    methods:{
      getData () {
        let {rows,page} = this
        let {plateNo,vin,startDate,endDate} = this.formInline
        queryCarloginrec({rows:this.rows,page,plateNo,vin,startDate,endDate})
          .then(res=>{
            console.log(res.data.data.total)
            if(res.data.success){
              this.loading = false
              this.total = res.data.data.total
              this.tableData = res.data.data.rows

              const isBakSent = {
                  '0':'否',
                  '1':'是',
                }
              ;const isUnusual = {
                  '0':'否',
                  '1':'是',
                }
              ;
              const gpsStauts = {
                '0':'有效定位',
                '1':'无效定位',
              };

              this.tableData.map((item,index)=> {
                item.isUnusual = isUnusual[item.isUnusual]
                item.isBakSent = isBakSent[item.isBakSent]
                item.gpsStauts = gpsStauts[item.gpsStauts]
              })

            }
        })

      },

      onSubmit(){

        this.loading = true
        this.getData()
      },

      clear(){
        for(let a in this.formInline){this.formInline[ a ] = ''}
        this.page = 1
        this.getData()
      },

      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.getData()
      },

      exportExcel(){
        this.downloading = true
        let {total,page} = this
        let {plateNo,vin,startDate,endDate} = this.formInline
        queryCarloginrec({rows:total,page,plateNo,vin,startDate,endDate})
          .then(res=>{
            if(res.data.success){
              this.tableData2 = res.data.data.rows

              const isBakSent = {
                  '0':'否',
                  '1':'是',
                }
              ;const isUnusual = {
                  '0':'否',
                  '1':'是',
                }
              ;
              const gpsStauts = {
                '0':'有效定位',
                '1':'无效定位',
              };

              this.tableData2.map((item,index)=> {
                item.isUnusual = isUnusual[item.isUnusual]
                item.isBakSent = isBakSent[item.isBakSent]
                item.gpsStauts = gpsStauts[item.gpsStauts]
              })

            }
            this.downloading = false
        })

        this.$exportExcel(this.$refs.xlsxTable,'登录日志')
      }

    }
  }
</script>

<style lang="scss"  scoped>

</style>
