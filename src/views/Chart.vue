<template>
  <Layout>
    <div class="chartWrapper">
      <top-nav @changeType="getType"/>
      <Chart :chartProps=chartProps :timeType="timeType" :amountType="amountType"/>
      <div class="footerWrapper">
        <footer-list :amountType="amountType" :listProps="listProps"/>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Vue from 'vue';
import Chart from "@/components/Chart/LineChart.vue";
import FooterList from "@/components/Chart/FooterList.vue";
import TopNav from "@/components/Chart/TopNav.vue";
import {fetchSvg} from "@/lib/fetchSvg";

export default Vue.extend({
  name: 'chart',
  components: {TopNav, FooterList, Layout, Chart},
  data() {
    return {
      zRecords: this.$store.state.zRecordList,
      sRecords: this.$store.state.sRecordList,
      amountType: '支出',
      timeType: '',
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      chartProps: {
        xData: [] as string[],
        yData: [] as number[],
        totalAmount: 0,
        averageAmount: 0
      },
      listProps: [{}]
    }
  },
  methods: {
    getType(amountType: string, timeType: string) {
      this.amountType = amountType
      this.timeType = timeType
      // console.log('111', amountType, timeType)
      this.computeChartProps(amountType, timeType)
      this.computeListProps(amountType, timeType)
    },
    getXMonth() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const days = new Date(year, month, 0).getDate();
      return Array.from({length: days}, (_, i) => `${i + 1}`);
    },
    getYMonth() {
      const currentDate = new Date();

      // 获取当前月份的天数
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
      const daysInMonth = new Date(year, month, 0).getDate();

      // 构建日期数组
      const dateArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const day = i < 10 ? `0${i}` : i;
        const monthStr = month < 10 ? `0${month}` : month;
        const date = `${year}-${monthStr}-${day}`;
        dateArray.push(date);
      }
      return dateArray;
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
    getOneYearMonth() {
      // 获取当前年份
      const currentYear = new Date().getFullYear();
      // 用于存储所有月份的数组
      const months = [];
      // 循环从 1 到 12
      for (let i = 1; i <= 12; i++) {
        // 构造对应月份的 Date 对象
        const date = new Date(currentYear, i - 1, 1);
        // 将 Date 对象格式化为字符串，格式为 'yyyy-mm'
        const monthString = date.toISOString().slice(0, 7);
        // 将格式化后的字符串推入数组
        months.push(monthString);
      }
      return months
    },
    getDates(timeType: string) {
      if (timeType === 'week') {
        this.chartProps.xData = this.week
        return this.getWeekDates()
      } else if (timeType === 'month') {
        this.chartProps.xData = this.getXMonth()
        return this.getYMonth()
      } else if (timeType === 'year') {
        this.chartProps.xData = this.year
        return this.getOneYearMonth()
      } else {
        return ['']
      }
    },
    computeChartProps(amountType: string, timeType: string) {
      let records = []
      let totalAmount = 0
      let dates = ['']
      const dateAmount = {} as { [key: string]: number }

      if (amountType === '支出') {
        records = this.zRecords
      } else {
        records = this.sRecords
      }

      dates = this.getDates(timeType)
      // console.log('timeType', timeType, records)

      for (let index in records) {
        let item = records[index]
        let day = timeType === 'year' ?
            item.createdAt.slice(0, 7) : item.createdAt
        if (dates.includes(day)) {
          totalAmount += Math.abs(item.account)
          dateAmount[day] = Math.abs(item.account)
        }
      }
      const keys = Object.keys(dateAmount)
      for (let key in dates) {
        const date = dates[key]
        if (!keys.includes(date)) {
          dateAmount[date] = 0
        }
      }
      for (let key in dateAmount) {
        let tempKey = key.slice(-2)
        dateAmount[tempKey] = dateAmount[key]
        delete dateAmount[key]
      }
      this.chartProps.yData = Object.entries(dateAmount)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map(item => item[1]);

      this.chartProps.totalAmount = totalAmount
      if (timeType === 'week') {
        this.chartProps.averageAmount = parseFloat((totalAmount / 7).toFixed(2))
      } else if (timeType === 'month') {
        this.chartProps.averageAmount = parseFloat((totalAmount / 30).toFixed(2))
      } else if (timeType === 'year') {
        this.chartProps.averageAmount = parseFloat((totalAmount / 12).toFixed(2))
      }
      // console.log('dateAmount',dateAmount)
    },
    computeListProps(amountType: string, timeType: string) {
      let records = []
      let dates = ['']
      const amountTypes = {} as { [key: string]: { svgName: string, tagName: string, percentage?: any, totalAmount: number } }

      if (amountType === '支出') {
        records = this.zRecords
      } else {
        records = this.sRecords
      }

      dates = this.getDates(timeType)
      for (let index in records) {
        let item = records[index]
        let day = timeType === 'year' ?
            item.createdAt.slice(0, 7) : item.createdAt
        if (dates.includes(day)) {
          if (amountTypes[item.tagName]) {
            amountTypes[item.tagName].totalAmount += Math.abs(item.account)
          } else {
            amountTypes[item.tagName] = {
              svgName: fetchSvg(item.tagName),
              tagName: item.tagName,
              totalAmount: Math.abs(item.account)
            }
          }
        }
      }

      // 计算percentage
      let totalAmount = 0
      for (let key in amountTypes) {
        totalAmount += amountTypes[key].totalAmount
      }
      for (let key in amountTypes) {
        amountTypes[key].percentage =
            parseFloat((amountTypes[key].totalAmount / totalAmount * 100)
                .toFixed(2)) + '%'
      }
      this.listProps = Object.entries(amountTypes)
          .sort((a, b) => b[1].totalAmount - a[1].totalAmount)
          .map(item => item[1]);

      // console.log(this.listProps)
    }
  },
  created() {
    this.$store.commit('getRecords')
    this.zRecords = this.$store.state.zRecordList
    this.sRecords = this.$store.state.sRecordList
  }
});
</script>

<style lang="scss" scoped>
.chartWrapper {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  > .footerWrapper {
    height: 100%;
    flex-grow: 1;
  }
}

footer {
  height: 100%;
}
</style>