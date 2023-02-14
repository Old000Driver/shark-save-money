<template>
  <Layout>
    <header style="background: #ffd946">
      <div style="font-size: 20px">
        <img src="../assets/img/name.png" style="width: 60%"/>
      </div>
      <div class="topNav">
        <div>
          <div class="timeSelector">
            <select v-model="selectedYear" style="font-size: 16px;">
              <option v-for="year in years"
                      :value="year" :key="year">
                {{ year + '年' }}
              </option>
            </select>
            <select class="Bold" v-model="selectedMonth">
              <option v-for="month in months"
                      :value="month" :key="month">
                {{ month + '月' }}
              </option>
            </select>
          </div>
          <div class="income">
            <span>收入</span>
            <div class="Bold">yyy.00
              <div></div>
            </div>
          </div>
        </div>
        <div class="expenses">
          <span>支出</span>
          <div class="Bold">xxx.00</div>
        </div>
      </div>
    </header>
    <main>
      <div>
        <div class="listHead">
          <div>
            <span>今天</span>
            <span style="margin-left: 10px">星期天</span>
          </div>
          <span>收入:xxx</span>
        </div>
        <div class="dataList">
          <div class="dataType">
            <SvgIcon name="statistics"/>
            <span style="margin-left: 10px">餐饮</span>
          </div>
          <span>-999</span>
        </div>
      </div>
    </main>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";


interface Data {
  selectedYear: number,
  selectedMonth: string,
  years: number[],
  months: string[],
}

export default Vue.extend({
  name: 'Statistics',
  components: {
    SvgIcon,
  },
  data(): Data {
    return {
      selectedYear: 2023,
      selectedMonth: '',
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
    }
  },
  beforeCreate() {
    this.$store.commit('getRecords')
  },
  beforeMount() {
    this.getYears()
  }
});
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

.listHead {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid #A6ACAF;
  font-size: 14px;
  color: grey;
}

.dataList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 10px 10px;
  padding-bottom: 4px;

  .dataType {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .svg-icon {
    width: 18px;
  }
}

</style>