<template>
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

</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";

export default Vue.extend({
  name: "listBlock",
  components: {
    SvgIcon,
  },
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