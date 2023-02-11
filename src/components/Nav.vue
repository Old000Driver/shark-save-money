<template>
  <div class="Nav">
    <router-link to="/statistics" active-class="selected">
      <Icon name="明细" icon="statistics"/>
    </router-link>
    <router-link to="/saveMoney">
      <Icon name="记账" icon="arrow"/>
    </router-link>
    <router-link to="/chart" active-class="selected">
      <Icon name="图表" icon="chart"/>
    </router-link>
  </div>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
import Vue from "vue";

export default Vue.extend({
  name: 'Nav',
  components: {Icon},

  data() {
    return {
      defaultColor: '#000',
      selectedColor: '#ffd946',
    }
  },
  methods: {

  }
});
</script>

<style lang="scss">
.Nav {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid grey;
  width: 100%;
  height: 70px;
}

.selected {
  .svg-icon {
    width: 44px;
    height: 44px;
    fill: #ffd946;
  }
}


</style>