<template>
  <div class="organization">
    <div class="charts">
      <div ref="chart1" class="echarts-1"></div>
      <div class="box-card">
        <el-divider direction="vertical" class="divider"></el-divider>
        1212313213
      </div>

    </div>
    <div class="charts">
      <div ref="chart1" class="echarts-1"></div>
      <div class="box-card">
        <el-divider direction="vertical" class="divider"></el-divider>
        1212313213
      </div>

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props:['activeName'],
    watch:{
      activeName(activeName){
        if(activeName==='机构统计'){
          // console.log('重置')
          this.issue.resize()
        }
      }
    },
    data(){
      return{
        issue:null,
        options:{
          title: {
            text: '某站点用户访问来源',
            left: 90,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              label: {
                normal: {
                  show: true,
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        }
      }
    },
    mounted(){
      this.organize_issue()
    },

    methods: {
      organize_issue(){
        const chart = this.$refs.chart1;
        this.issue = echarts.init(chart)
        this.issue.setOption(this.options)
        window.addEventListener("resize", () => { this.issue.resize();});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .charts{
    background: #fff;
    display: flex;
    justify-content: space-around;
    height: 100%;
    margin: 0 0 40px 0;
    .echarts-1{
      padding: 20px 0;
      height: 500px;
      width: 100%;
    }
    .box-card{
      position: relative;
      .divider{
        position: absolute;
        left: 0;
        display: inline-block;
        height: 100%;
      }

    }
  }
</style>
