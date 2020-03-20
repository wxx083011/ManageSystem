<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="时间">
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.startDate" type="datetime" placeholder="选择起始时间">
        </el-date-picker> ~
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.endDate" type="datetime" placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车速">
        <el-input v-model="formInline.minSpeed" placeholder="" style="width: 50px"></el-input> ~
        <el-input v-model="formInline.maxSpeed" placeholder="" style="width: 50px"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="checkboxGroup4" size="mini">
          <el-checkbox label="异常" border></el-checkbox>
          <el-checkbox label="补传" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit()" :loading="loading">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="clear()">清空</el-button>
        <el-button type="warning" icon="el-icon-download" :loading="downloading" @click="exportExcel">导出</el-button>
      </el-form-item>
      <!--<el-form-item label="刷新频率(秒)">
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input>
      </el-form-item>-->
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
  import {queryCarDataFlow} from '@/api/cxy'
  export default {
    data () {
      return {
        loading:false,
        downloading:false,

        // 分页
        page: 1,
        rows: 20,
        total: 100,

        // 表单验证
        checkboxGroup4: [],
        formInline: {
          isBackSend: 0,
          isFault: 0,
          maxSpeed: '',
          minSpeed: '',
          startDate: '',
          endDate: ''
        },

        // 数据
        tableName:[
          // {prop:'dataFlowId',label:'序号'},
          {prop:'dataTime',label:'采集时间',width:155},
          {prop:'deviceCoding',label:'设备号'},//?
          {prop:'plateNo',label:'车牌号'},
          {prop:'vin',label:'车架号（VIN）'},
          {prop:'speed',label:'车速'},
          {prop:'engineSpeed',label:'发动机转速'},
          {prop:'atmosPressure',label:'大气压力',width:60},
          {prop:'outStorque',label:'发动机净输出扭矩'},
          {prop:'frictionTorque',label:'摩擦扭矩'},
          // {prop:'srcUpNox',label:'发动机燃料流量'},
          // {prop:'srcDownNox',label:'SCR上游NOx传感器输出值'},
          {prop:'reactantSurplus',label:'反应剂余量',width:70},
          {prop:'intakeVolume',label:'进气量'},
          {prop:'putTemperature',label:'SCR入口温度'},
          {prop:'outTemperature',label:'SCR出口温度'},
          {prop:'pressureDiff',label:'DPF压差',width:60},
          {prop:'coolantTemperature',label:'发动机冷却液温度'},
          {prop:'tankLevel',label:'油箱液位',width:60},
          /*{prop:'fuelConsumption',label:'燃油消耗量'},
          {prop:'fuelInjectionQuantity',label:'喷油量'},
          {prop:'voltage',label:'电瓶电压'},
          {prop:'engienStart',label:'发动机启动时间'},*/
          {prop:'gpsStauts',label:'定位状态',width:65},
          {prop:'lng',label:'经度'},
          {prop:'lat',label:'纬度'},
          // {prop:'height',label:'海拔'},
          // {prop:'faultLampStatus',label:'故障指示灯状态'},
          // {prop:'faultCount',label:'故障码个数'},
          // {prop:'faultCode',label:'故障码'},
          {prop:'isBakSent',label:'是否补传',width:50},//?
          {prop:'isUnusual',label:'是否异常',width:50},//?
        ],
        tableData: [],
        tableData2: [],
      }
    },
    mounted(){

      this.getData()

    },
    methods: {
      getData () {
        let {rows,page} = this;
        let {isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate} = this.formInline
        queryCarDataFlow({rows,page,isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate})
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
        this.checkboxGroup4.includes('异常')?this.formInline.isFault = 1 : this.formInline.isFault = 0;
        this.checkboxGroup4.includes('补传')?this.formInline.isBackSend = 1 : this.formInline.isBackSend = 0;
        this.getData()
      },

      clear(){
        for(let a in this.formInline){this.formInline[ a ] = ''}
        this.formInline.isBackSend =0
        this.formInline.isFault = 0
        this.checkboxGroup4=[]
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
        this.checkboxGroup4.includes('异常')?this.formInline.isFault = 1 : this.formInline.isFault = 0;
        this.checkboxGroup4.includes('补传')?this.formInline.isBackSend = 1 : this.formInline.isBackSend = 0;
        let {total,page} = this;
        let {isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate} = this.formInline
        queryCarDataFlow({rows:total,page,isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate})
          .then(res=>{
            console.log(res.data.data.total)
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

        this.$exportExcel(this.$refs.xlsxTable,'数据流列表')
      }

    }
  }
</script>

<style lang="scss"  scoped>
</style>
