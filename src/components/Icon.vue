<template>
  <div class="iconWrapper" v-if="icon!=='arrow'">
      <SvgIcon :name="icon"/>
    <span>{{ name || '' }}</span>
  </div>
  <div class="iconWrapper" v-else>
    <div class="arrowIcon">
      <SvgIcon :name="icon"/>
    </div>
    <SvgIcon name=""/>
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import Vue from "vue";

export default Vue.extend({
  name: 'Nav',
  components: {SvgIcon},
  props: {
    name: String,
    icon: String,
  },
});
</script>

<style scoped lang="scss">
.iconWrapper {
  position: relative;

  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > .arrowIcon {
    position: absolute;
    top: -26px;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffd946;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>