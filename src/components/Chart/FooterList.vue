<template>
  <div class="footerWrapper">
    <span style="margin-top: 5px">支出排行榜</span>
    <div class="listWrapper">
      <div>
        <div>
          <div class="svgBackground">
            <svg-icon name="canYin"/>
          </div>
          <span>餐饮</span>
          <span>100%</span>
        </div>
        <span style="padding-right: 10px">123455</span>
      </div>

      <div>
        <div>
          <div class="svgBackground">
            <svg-icon name="canYin"/>
          </div>
          <span>餐饮</span>
          <span>100%</span>
        </div>
        <span style="padding-right: 10px">123455</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";

export default Vue.extend({
  name: "footerList",
  components: {SvgIcon}

})
</script>

<style lang="scss" scoped>
.footerWrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 20px;

  >.listWrapper{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    line-height: 14px;
    font-size: 14px;
    flex-grow: 1;

    >div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      >div{
        display: flex;
        align-items: center;
        width: 100%;
        >span{
          display: flex;
          margin-left: 10px;
        }
        .svgBackground{
          display: flex;
          justify-content: center;
          align-items: center;

          width: 30px;
          height: 30px;
          background: #f5f5f5;
          border-radius: 50%;
        }
        .svg-icon{
          background: #f5f5f5;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }


    }

  }
}
</style>