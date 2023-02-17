<template>
  <div class="footerWrapper">
    <span style="margin-top: 5px">{{amountType}}排行榜</span>
    <div class="listWrapper">
      <div v-for="(item,key) in listProps" :key="key">
        <div>
          <div class="svgBackground">
            <svg-icon :name="item.svgName"/>
          </div>
          <span>{{item.tagName}}</span>
          <span>{{ item.percentage }}</span>
        </div>
        <span style="padding-right: 10px">￥{{ item.totalAmount}}</span>
      </div>
    </div>
    <div v-if="listProps.length === 0" class="NoRecord">
      <NoRecord />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";
import NoRecord from "@/components/noRecord.vue";

export default Vue.extend({
  name: "footerList",
  components: {NoRecord, SvgIcon},
  props: {
    listProps: Array,
    amountType: String
  },
})
</script>

<style lang="scss" scoped>
.footerWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  height: 100%;

  > .listWrapper {
    $height:100%;
    $NavHeight:70px;
    height: calc(#{$height} - #{$NavHeight});
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    line-height: 14px;
    font-size: 14px;
    flex-grow: 1;



    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      > div {
        display: flex;
        align-items: center;
        width: 100%;

        > span {
          display: flex;
          margin-left: 10px;
        }

        .svgBackground {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 30px;
          height: 30px;
          background: #f5f5f5;
          border-radius: 50%;
        }

        .svg-icon {
          background: #f5f5f5;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
  >.NoRecord{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>