<template>
  <main>
    <div v-for="(value,key) in showList" :key="key">
      <div class="listHead">
        <div>
          <span>{{ value.chineseDate }}</span>
          <span style="margin-left: 10px">{{ value.week }}</span>
        </div>
        <span>{{ value.totalAmount }}</span>
      </div>
      <div class="dataList" v-for="(item,key) in value.records" :key="key">
        <div class="dataType">
          <SvgIcon :name="item.svgName"/>
          <span style="margin-left: 10px">{{ item.tagName }}</span>
        </div>
        <span>{{ item.account }}</span>
      </div>
    </div>
  </main>

</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";
import {RecordItem} from "@/custom";
import {tagList} from "@/lib/defaultTagList";
import {createAt} from "@/lib/createAt";

interface showRecord extends RecordItem {
  svgName?: string;
}

interface ShowList {
  [key: string]: {
    week: string;
    chineseDate: string;
    totalAmount: string;
    records: showRecord[];
  }
}

export default Vue.extend({
  name: "listBlock",
  components: {
    SvgIcon,
  },
  props: {
    zList: Array,
    sList: Array,
    selectedDate: String,
  },
  data() {
    return {
      showList: {} as ShowList
    }
  },
  methods: {
    getShowList() {
      const records = this.zList.concat(this.sList) as Array<RecordItem>
      const showList: ShowList = {}
      for (let index in records) {
        let date = records[index].createdAt
        if (date in showList) {
          showList[date].records.push(records[index])
        } else {
          showList[date] = {
            week: '',
            chineseDate: '',
            totalAmount: '',
            records: [records[index]]
          }
        }
      }
      return showList
    },
    getWeek(num: number) {
      //生成一周
      if (num === 0) {
        return '星期天'
      } else if (num === 1) {
        return '星期一'
      } else if (num === 2) {
        return '星期二'
      } else if (num === 3) {
        return '星期三'
      } else if (num === 4) {
        return '星期四'
      } else if (num === 5) {
        return '星期五'
      } else if (num === 6) {
        return '星期六'
      } else {
        return ''
      }
    },
    getChineseDate(date: string) {
      let nowDate = new Date().toISOString()
      const oldDate = new Date(date).toISOString()
      const diff = Date.parse(nowDate) - Date.parse(oldDate)
      const oneDayMilliseconds = 1000 * 60 * 60 * 24
      let diffDays = Math.floor(diff / oneDayMilliseconds)
      if (diffDays > 24){
        let chineseDate = date.slice(5)
        chineseDate = chineseDate.replace('-', '月')
        return chineseDate + '日'
      }

      const nowDay = parseInt(createAt().slice(8))
      const oldDay = parseInt(date.slice(8))
      diffDays = nowDay - oldDay
      if (date === createAt()) {
        return '今天'
      } else if (diffDays < 2 && diffDays >= 1) {
        // 目标日期在昨天之前
        return '昨天'
      } else if ( diffDays < 3) {
        // 目标日期在今天之后
        return '前天'
      } else {
        return ''
      }
    },
    sortShowList(showList: ShowList) {
      const list = Object.keys(showList).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
      })
      const newList: ShowList = {}
      for (let index in list) {
        newList[list[index]] = showList[list[index]]
      }
      return newList
    },
    fetchSvg(tagName: string) {
      const list = tagList
      let svgName = ''
      for (let index in list) {
        let list2 = list[index]
        for (let index2 in list2) {
          if (list2[index2].name === tagName) {
            svgName = list2[index2].svgName
          }
        }
      }
      return svgName
    },
  },
  watch: {
    zList() {
      const showList = this.getShowList()
      for (let key in showList) {
        let totalAmount = 0
        showList[key].week = this.getWeek(new Date(key).getDay()) as string
        showList[key].chineseDate = this.getChineseDate(key)
        totalAmount = showList[key].records.reduce((sum, record) => {
          return sum + record.account
        }, 0)
        if (totalAmount > 0) {
          showList[key].totalAmount = '收入:￥' + totalAmount
        } else {
          showList[key].totalAmount = '支出:￥' + Math.abs(totalAmount)
        }

        for (let index in showList[key].records) {
          let record = showList[key].records[index]
          record.svgName = this.fetchSvg(record.tagName)
        }
      }
      this.showList = this.sortShowList(showList)
      console.log('showList', this.showList)
    }
  }
})
</script>

<style lang="scss" scoped>
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