<template>
  <div>
    <div ref="chart" style="width: 100%;height: 500px;background: #Fff"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props:['activeName'],
    watch:{
      activeName(activeName){
        if(activeName==='工单统计'){
          // console.log('重置')
          this.issue.resize()
        }
      }
    },
    data(){
      return{
        issue:null,
        options:{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        }
      }
    },
    mounted(){
      this.organize_issue()
    },

    methods: {
      organize_issue(){
        const chart = this.$refs.chart;
        this.issue = echarts.init(chart)
        this.issue.setOption(this.options)
        window.addEventListener("resize", () => { this.issue.resize();});
      },
    }
  }
</script>
