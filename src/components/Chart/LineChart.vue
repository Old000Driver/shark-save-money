<template>
  <div class="chartWrapper">
    <span>{{ showTimeType }}</span>
    <div class="amountWrapper">
      <span>总{{ amountType }}:￥{{ chartProps.totalAmount }}</span>
      <span>平均值:￥{{ chartProps.averageAmount }}</span>
    </div>
    <div id="chart"/>
  </div>

</template>

<script lang="ts">
import Vue from "vue"
import * as echarts from 'echarts';

interface Data {
  myChart: echarts.ECharts,
  maxValue: number,
  showTimeType: string
}

export default Vue.extend({
  name: "Chart",
  props: {
    chartProps: Object,
    timeType: String,
    amountType: String
  },
  data(): Data {
    return {
      myChart: {} as echarts.ECharts,
      maxValue: 0,
      showTimeType: '',
    }
  },
  watch: {
    chartProps() {
      this.changeTypeName()
      this.setEcharts(this.chartProps.xData, this.chartProps.yData, this.maxValue)
    },
  },
  methods: {
    initEcharts() {
      this.myChart = echarts.init(window.document.getElementById('chart') as HTMLDivElement)
    },
    changeTypeName(){
      if (this.timeType === 'week') {
        this.showTimeType = '本周'
      } else if (this.timeType === 'month') {
        this.showTimeType = '本月'
      } else {
        this.showTimeType = '今年'
      }
    },
    setEcharts(xData: string[], yData: number[], maxValue: number) {
      if (this.myChart) {
        this.myChart.setOption({
          xAxis: {
            data: xData
          },
          yAxis: [{
            axisLabel: {
              show: false
            },
            splitLine: {
              show: true,

              lineStyle: {
                color: '#ddd',
                width: 1,
                type: 'dashed'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,1)', 'rgba(250,250,250,1)']
              }
            },
            splitNumber: 2,
            min: 0,
            max: maxValue,
            interval: maxValue / 2,
          }],
          series: [
            {
              type: 'line',
              data: yData,
            }
          ]
        })
      }

    },
  },
  mounted() {
    this.initEcharts()
    this.maxValue = Math.max(...this.chartProps.yData)
    this.changeTypeName()
    this.setEcharts(this.chartProps.xData, this.chartProps.yData, this.maxValue)
  }
})
</script>

<style lang="scss" scoped>
.chartWrapper {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 1px solid #A6ACAF;

  > span {
    width: 100%;
    text-align: left;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #A6ACAF;
  }

  > .amountWrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    padding: 10px 0 0 20px;
    font-size: 14px;
    color: #A6ACAF;
  }

  > #chart {
    width: 100%;
    height: 100%;
  }
}
</style>