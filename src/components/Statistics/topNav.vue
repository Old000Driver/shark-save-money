<template>
  <header style="background: #ffd946">
    <div style="font-size: 20px">
      <img src="@/assets/img/name.png" style="width: 60%" alt=""/>
    </div>
    <div class="topNav">
      <div>
        <div class="timeSelector">
          <select v-model="selectedYear"
                  @change="dateChange"
                  style="font-size: 16px;">
            <option v-for="year in years"
                    :value="year" :key="year">
              {{ year + '年' }}
            </option>
          </select>
          <select class="Bold" v-model="selectedMonth"
                  @change="dateChange">
            <option v-for="month in months"
                    :value="month" :key="month">
              {{ month + '月' }}
            </option>
          </select>
        </div>
        <div class="income">
          <span>收入</span>
          <div class="Bold">
            {{ Math.abs(zTotal)  }}
            <div></div>
          </div>
        </div>
      </div>
      <div class="expenses">
        <span>支出</span>
        <div class="Bold">{{ sTotal }}</div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue"
import {RecordItem} from "@/custom";


interface Data {
  selectedYear: number,
  selectedMonth: string,
  years: number[],
  months: string[],
  zRecords: Array<RecordItem>,
  sRecords: Array<RecordItem>,
  zTotal: number,
  sTotal: number,
  selectedDate: string

}

export default Vue.extend({
  name: "topNav",
  data(): Data {
    return {
      selectedYear: 2023,
      selectedMonth: '',
      zRecords: this.$store.state.zRecordList,
      sRecords: this.$store.state.sRecordList,
      zTotal: 0,
      sTotal: 0,
      selectedDate: '',
      years: [],
      months: ['01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10', '11', '12'],
    }
  },
  methods: {
    getYears() {
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear
      const month = new Date().getMonth() + 1
      if (month < 10) {
        this.selectedMonth = '0' + month.toString()
      } else {
        this.selectedMonth = month.toString()
      }
      for (let i = 1900; i <= currentYear; i++) {
        this.years.push(i);
      }
    },
    getSelectedDate() {
      this.selectedDate = this.selectedYear + '-' + this.selectedMonth
    },
    dateChange() {
      this.getSelectedDate()
      this.getTotalAmount()
    },
    getTotalAmount() {
      this.zTotal = 0
      this.sTotal = 0
      // 筛选出当年当月的数据
      const zList = this.getNowMothList(this.zRecords)
      zList.forEach((item: RecordItem) => {
        this.zTotal += item.account
      })

      const sList = this.getNowMothList(this.sRecords)
      sList.forEach((item: RecordItem) => {
        this.sTotal += item.account
      })

      const selectedDate = this.selectedDate
      this.$emit('getRecordList', zList, sList,selectedDate)
    },
    getNowMothList(records: Array<RecordItem>) {
      return records.filter((item: RecordItem) => {
        return item.createdAt.slice(0, 7) === this.selectedDate
      })
    },
  },
  created() {
    this.getYears()
    this.dateChange()

  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;

  > .topNav {
    display: flex;
    justify-content: space-between;
    height: 100%;

    > div {
      display: flex;

      margin: 0 10px 0 10px;
      width: 30%;
    }

    .expenses, .income, .timeSelector {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    .timeSelector {
      > select {
        margin-top: 10px;
      }
    }

    .income {
      margin-left: 40px;

      > div {
        position: relative;
        margin-top: 10px;

        div {
          position: absolute;
          bottom: 0;
          left: -20px;
          height: 30px;
          border-left: 2px solid #A6ACAF;
        }
      }
    }

    .expenses {
      > div {
        margin-top: 10px;
      }
    }

  }
}

.Bold {
  font-size: 20px;
  font-weight: bold;
}
</style>