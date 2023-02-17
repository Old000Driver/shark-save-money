<template>
  <div class="noRecordWrapper">
<div>
  <svg-icon name="noRecord"/>
  <span>暂无数据</span>
</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";

export default Vue.extend({
  name: "noRecord.vue",
  components: {SvgIcon}

})
</script>

<style lang="scss" scoped>
.noRecordWrapper{
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  >div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    >span{
      margin-top: 10px;
    }
  }



}
</style>