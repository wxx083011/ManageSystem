<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="VIN">
        <el-input v-model="formInline.vin" placeholder="请输入VIN"></el-input>
      </el-form-item>

      <el-form-item label="时间">
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.startDate" type="datetime" placeholder="选择起始时间">
        </el-date-picker> ~
        <el-date-picker   value-format="yyyy-MM-dd HH:mm:ss"  v-model="formInline.endDate" type="datetime" placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>

      <!--<el-form-item label="车速">
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input> ~
        <el-input v-model="formInline.phone" placeholder="" style="width: 50px"></el-input>
      </el-form-item>-->

      <el-form-item label="">
        <el-checkbox-group v-model="checkboxGroup4" size="mini" >
          <el-checkbox label="异常" border></el-checkbox>
          <el-checkbox label="补传" border></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="onSubmit()" :loading="loading">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh-left" @click="clear()">清空</el-button>
        <el-button type="warning" icon="el-icon-download"  :loading="downloading" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>

    <!--分页-->
    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <!--表格-->
    <div class="table" style="margin-top: 20px;text-align: center">
      <el-table  border  stripe   :data="tableData" style="width: 100%" height="700">
        <el-table-column  show-overflow-tooltip  v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :width="item.width" :key="index"></el-table-column>
      </el-table>
    </div>

    <!--专门用来导出的-->
    <div style="display: none"   ref="xlsxTable">
      <el-table :data="tableData"><el-table-column v-for="(item,index) in tableName" :prop="item.prop" :label="item.label" :key="index"></el-table-column></el-table>
    </div>
  </div>
</template>

<script>
  import {queryObdData} from '@/api/cxy'
  export default {
    data(){
      return{
        downloading:false,
        loading:false,

        //分页

        page:1,
        rows:20,
        total:100,

        //表单验证
        checkboxGroup4: [],
        formInline:{
          isFault:'',
          isBackSend:'',
          startDate:'',
          endDate:'',
          vin:'',
        },

        //数据
        tableName:[
          {prop:'obdDataID',label:'序号'},
          {prop:'deviceCoding',label:'设备号'},
          {prop:'plateNo',label:'车牌号'},
          {prop:'vin',label:'车架号（VIN）'},
          {prop:'obdProtocol',label:'OBD诊断协议'},
          {prop:'calid',label:'CALID'},
          {prop:'cvn',label:'CVN'},
          {prop:'dataTime',label:'采集时间'},
          // {prop:'dataTime',label:'发动机温度'},//?
          {prop:'cuihuaquStatus',label:'催化器转化器监控'},
          {prop:'jiareCuihuaquStatus',label:'加热催化转化器监控'},
          {prop:'zhengfaSysStatus',label:'蒸发系统监控'},
          {prop:'erciKongqiStatus',label:'二次空气系统监控'},
          {prop:'acZhilengjiStatus',label:'A/C系统制冷剂监控'},
          {prop:'paiqiJiarequStatus',label:'排气传感器加热器监控'},
          {prop:'paiqiStatus',label:'排气传感器加热监控'},
          {prop:'egrVvStatus',label:'EGR系统和VVT监控'},
          {prop:'lengqidongStatus',label:'冷启动辅助系统监控'},
          {prop:'zhengjiaStatus',label:'增压压力控制系统'},
          {prop:'dpfStatus',label:'DPF监控'},
          {prop:'srcNoxStatus',label:'SCR/NOx吸附器监控'},
          {prop:'yanghuaStatus',label:'氧化催化器监控'},
          {prop:'shihuoStatus',label:'失火监控'},
          {prop:'ranyouStatus',label:'燃油系统监控'},
         /* {prop:'zhongheStatus',label:'SCR出口温度'},
          {prop:'pressureDiff',label:'DPF压差'},
          {prop:'coolantTemperature',label:'发动机冷却液温度'},
          {prop:'tankLevel',label:'油箱液位'},
          {prop:'fuelConsumption',label:'燃油消耗量'},*/
          {prop:'zhongheStatus',label:'综合成分监控'},
          {prop:'gpsStauts',label:'定位状态'},
          {prop:'lng',label:'经度'},
          {prop:'lat',label:'纬度'},
          {prop:'height',label:'海拔'},
          {prop:'softCode',label:'软件标定识别码'},
          {prop:'guzhangdengStatus',label:'故障指示灯状态'},
          {prop:'faultCount',label:'故障码个数'},
          {prop:'faultCode',label:'故障码'},
          {prop:'iupr',label:'IUPR'},
          {prop:'isBakSent',label:'是否补传'},//?
          {prop:'isUnusual',label:'是否异常'},//?
        ],
        tableData: [],
        tableData2: []
      }
    },
    mounted(){

      this.getData()

    },
    methods:{
      getData () {

        let {rows,page} = this;
        let {isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate,vin} = this.formInline
        console.log(this.formInline)
        queryObdData({rows,page,isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate,vin})
          .then(res=>{
            console.log(res.data.data.total)
            if(res.data.success){
              this.loading = false
              this.total = res.data.data.total
              this.tableData = res.data.data.rows


              const cuihuaquStatus = {'0':'不支持', '1':'支持',}
              const jiareCuihuaquStatus = {'0':'不支持', '1':'支持',}
              const zhengfaSysStatus = {'0':'不支持', '1':'支持',}
              const erciKongqiStatus = {'0':'不支持', '1':'支持',}
              const acZhilengjiStatus = {'0':'不支持', '1':'支持',}
              const paiqiJiarequStatus = {'0':'不支持', '1':'支持',}
              const paiqiStatus = {'0':'不支持', '1':'支持',}
              const egrVvStatus = {'0':'不支持', '1':'支持',}
              const lengqidongStatus = {'0':'不支持', '1':'支持',}
              const zhengjiaStatus = {'0':'不支持', '1':'支持',}
              const dpfStatus = {'0':'不支持', '1':'支持',}
              const srcNoxStatus = {'0':'不支持', '1':'支持',}
              const yanghuaStatus = {'0':'不支持', '1':'支持',}
              const shihuoStatus = {'0':'不支持', '1':'支持',}
              const ranyouStatus = {'0':'不支持', '1':'支持',}
              const zhongheStatus = {'0':'不支持', '1':'支持',}

              const isBakSent = {'0':'否', '1':'是',};
              const isUnusual = {'0':'否', '1':'是'};
              const gpsStauts = {'0':'有效定位', '1':'无效定位',};

               this.tableData.map((item,index)=> {
                 item.cuihuaquStatus = cuihuaquStatus[item.cuihuaquStatus]
                 item.jiareCuihuaquStatus = jiareCuihuaquStatus[item.jiareCuihuaquStatus]
                 item.zhengfaSysStatus = zhengfaSysStatus[item.zhengfaSysStatus]
                 item.erciKongqiStatus = erciKongqiStatus[item.erciKongqiStatus]
                 item.acZhilengjiStatus = acZhilengjiStatus[item.acZhilengjiStatus]
                 item.paiqiJiarequStatus = paiqiJiarequStatus[item.paiqiJiarequStatus]
                 item.paiqiStatus = paiqiStatus[item.paiqiStatus]
                 item.egrVvStatus = egrVvStatus[item.egrVvStatus]
                 item.lengqidongStatus = lengqidongStatus[item.lengqidongStatus]
                 item.zhengjiaStatus = zhengjiaStatus[item.zhengjiaStatus]
                 item.dpfStatus = dpfStatus[item.dpfStatus]
                 item.srcNoxStatus = srcNoxStatus[item.srcNoxStatus]
                 item.yanghuaStatus = yanghuaStatus[item.yanghuaStatus]
                 item.shihuoStatus = shihuoStatus[item.shihuoStatus]
                 item.ranyouStatus = ranyouStatus[item.ranyouStatus]
                 item.zhongheStatus = zhongheStatus[item.zhongheStatus]
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
        this.formInline.isBackSend =0;
        this.formInline.isFault = 0;
        this.checkboxGroup4=[]
        this.page = 1;
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
        let {isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate,vin} = this.formInline
        queryObdData({rows:total,page,isBackSend,isFault,maxSpeed,minSpeed,startDate,endDate,vin})
          .then(res=>{
            console.log(res.data.data.total)
            if(res.data.success){
              this.tableData2 = res.data.data.rows

              const cuihuaquStatus = {'0':'不支持', '1':'支持',}
              const jiareCuihuaquStatus = {'0':'不支持', '1':'支持',}
              const zhengfaSysStatus = {'0':'不支持', '1':'支持',}
              const erciKongqiStatus = {'0':'不支持', '1':'支持',}
              const acZhilengjiStatus = {'0':'不支持', '1':'支持',}
              const paiqiJiarequStatus = {'0':'不支持', '1':'支持',}
              const paiqiStatus = {'0':'不支持', '1':'支持',}
              const egrVvStatus = {'0':'不支持', '1':'支持',}
              const lengqidongStatus = {'0':'不支持', '1':'支持',}
              const zhengjiaStatus = {'0':'不支持', '1':'支持',}
              const dpfStatus = {'0':'不支持', '1':'支持',}
              const srcNoxStatus = {'0':'不支持', '1':'支持',}
              const yanghuaStatus = {'0':'不支持', '1':'支持',}
              const shihuoStatus = {'0':'不支持', '1':'支持',}
              const ranyouStatus = {'0':'不支持', '1':'支持',}
              const zhongheStatus = {'0':'不支持', '1':'支持',}

              const isBakSent = {'0':'否', '1':'是',};
              const isUnusual = {'0':'否', '1':'是'};
              const gpsStauts = {'0':'有效定位', '1':'无',};

              this.tableData2.map((item,index)=> {
                item.cuihuaquStatus = cuihuaquStatus[item.cuihuaquStatus]
                item.jiareCuihuaquStatus = jiareCuihuaquStatus[item.jiareCuihuaquStatus]
                item.zhengfaSysStatus = zhengfaSysStatus[item.zhengfaSysStatus]
                item.erciKongqiStatus = erciKongqiStatus[item.erciKongqiStatus]
                item.acZhilengjiStatus = acZhilengjiStatus[item.acZhilengjiStatus]
                item.paiqiJiarequStatus = paiqiJiarequStatus[item.paiqiJiarequStatus]
                item.paiqiStatus = paiqiStatus[item.paiqiStatus]
                item.egrVvStatus = egrVvStatus[item.egrVvStatus]
                item.lengqidongStatus = lengqidongStatus[item.lengqidongStatus]
                item.zhengjiaStatus = zhengjiaStatus[item.zhengjiaStatus]
                item.dpfStatus = dpfStatus[item.dpfStatus]
                item.srcNoxStatus = srcNoxStatus[item.srcNoxStatus]
                item.yanghuaStatus = yanghuaStatus[item.yanghuaStatus]
                item.shihuoStatus = shihuoStatus[item.shihuoStatus]
                item.ranyouStatus = ranyouStatus[item.ranyouStatus]
                item.zhongheStatus = zhongheStatus[item.zhongheStatus]
                item.isUnusual = isUnusual[item.isUnusual]
                item.isBakSent = isBakSent[item.isBakSent]
                item.gpsStauts = gpsStauts[item.gpsStauts]
              })
            }
            this.downloading = false
        })
        this.$exportExcel(this.$refs.xlsxTable,'OBD信息')
      }
    }
  }
</script>

<style lang="scss"  scoped>
</style>
