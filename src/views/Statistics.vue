<template>
  <Layout>
    <div class="StatisticsWrapper">

      <top-nav @getRecordList="getRecordList"/>
      <div class="listBlock">
        <list-block :zList=zList :sList="sList"/>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import TopNav from "@/components/Statistics/topNav.vue";
import ListBlock from "@/components/Statistics/listBlock.vue";
import {RecordItem} from "@/custom";

type Data = {
  zList: Array<RecordItem>,
  sList: Array<RecordItem>,
  selectedDate: string
}
export default Vue.extend({
  name: 'Statistics',
  components: {
    ListBlock,
    TopNav,
  },
  data(): Data {
    return {
      zList: [],
      sList: [],
      selectedDate: ''
    }
  },

  methods: {
    getRecordList(zList: Array<RecordItem>, sList: Array<RecordItem>, selectedDate: string) {
      this.zList = zList
      this.sList = sList
      this.selectedDate = selectedDate
    }
  },
  beforeCreate() {
    this.$store.commit('getRecords')
  },


});
</script>

<style lang="scss" scoped>
.StatisticsWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  > .listBlock {
    height: 100%;
  }
}
</style>