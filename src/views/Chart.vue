<template>
  <Layout>
    <header>
      <top-nav @changeType="getType"/>
    </header>
    <main>
      <Chart :chartProps = chartProps :timeType="timeType" :amountType="amountType"/>
    </main>
    <footer>
      <footer-list/>
    </footer>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Vue from 'vue';
import Chart from "@/components/Chart/LineChart.vue";
import FooterList from "@/components/Chart/FooterList.vue";
import TopNav from "@/components/Chart/TopNav.vue";

export default Vue.extend({
  name: 'chart',
  components: {TopNav, FooterList, Layout, Chart},
  data() {
    return {
      zRecords: this.$store.state.zRecordList,
      sRecords: this.$store.state.sRecordList,
      amountType: '支出',
      timeType: '',
      week: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
      year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      chartProps: {
        xData: [] as string[],
        yData: [] as number[],
        totalAmount: 0,
        averageAmount: 0
      }
    }
  },
  methods: {
    getType(amountType: string, timeType: string) {
      this.amountType = amountType
      this.timeType = timeType
      this.computeChartProps(amountType, timeType)
    },
    getMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const days = new Date(year, month, 0).getDate();
      return Array.from({length: days}, (_, i) => `${i + 1}`);
    },
    getWeekDates() {
      const today = new Date();  // 当前日期的 Date 对象
      const todayWeekday = today.getDay();  // 当前星期几（0-6）
      const firstDay = new Date(today.setDate(today.getDate() - todayWeekday + 1));  // 当前周的第一天
      const weekDates = [];  // 当前周的日期数组
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDay);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().substring(0, 10);
        weekDates.push(dateString);
      }
      return weekDates;
    },
    computeChartProps(amountType: string, timeType: string) {
      let records = []
      let totalAmount = 0
      const dateAmount = {} as { [key: string]: number }
      if (amountType === '支出') {
        records = this.zRecords
      } else {
        records = this.sRecords
      }
      if (timeType === 'week') {
        this.chartProps.xData = this.week
        const weekDates = this.getWeekDates()
        for (let index in records) {
          let item = records[index]
          let day = item.createdAt

          if (weekDates.includes(day)) {
            totalAmount += Math.abs(item.account)
            dateAmount[day] = Math.abs(item.account)
          }
        }
        const keys = Object.keys(dateAmount)
        for (let key in weekDates){
          const date = weekDates[key]
           if(!keys.includes(date)){
             dateAmount[date] = 0
           }
        }
        for (let key in dateAmount){
          let tempKey = key.slice(8)
          dateAmount[tempKey] = dateAmount[key]
          delete dateAmount[key]
        }
        this.chartProps.yData = Object.entries(dateAmount)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .map(item => item[1]);
        this.chartProps.totalAmount = totalAmount
        this.chartProps.averageAmount = parseFloat((totalAmount / 7).toFixed(2))
      } else if (timeType === 'month') {
        this.chartProps.xData = this.getMonth()
      } else if (timeType === 'year') {
        this.chartProps.xData = this.year
      }
    }

  },
});
</script>

<style lang="scss" scoped>

</style>