<template>
  <div class="navWrapper">
    <div class="type">
      <select @change="changeType" :value="amountType">
        <option>支出</option>
        <option>收入</option>
      </select>
    </div>
    <div class="timeSelector">
      <div @click="clickTimeSelector('week')"
           :class="selectedTime === 'week' ? 'selected':''">周
      </div>
      <div @click="clickTimeSelector('month')"
           :class="selectedTime === 'month' ? 'selected':''">月
      </div>
      <div @click="clickTimeSelector('year')"
           :class="selectedTime === 'year' ? 'selected':''">年
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "TopNave",

  data() {
    return {
      selectedTime: 'week',
      amountType: '支出'
    }
  },
  methods: {
    clickTimeSelector(type: string) {
      this.selectedTime = type
      const amountType = this.amountType
      const timeType = this.selectedTime
      this.$emit('changeType', amountType, timeType)
    },
    changeType($event?: Event){
      if ($event) {
        this.amountType = ($event.target as HTMLSelectElement).value
      }
      const amountType = this.amountType
      const timeType = this.selectedTime
      this.$emit('changeType', amountType, timeType)
    }
  },
  created() {
    this.changeType()
  }

})
</script>

<style lang="scss" scoped>
.navWrapper {
  background: #ffd946;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
  }

  > .type {
    margin: 10px 0 5px 0;

    > select {
      font-size: 20px;
    }
  }

  .timeSelector {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5px 0 12px 0;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 30px;
      border: 1px solid black;
      width: 30%;

      &.selected {
        color: #ffd946;
        background: black;
      }
    }
  }

  div:first-child {
    border-radius: 4px 0 0 4px;
  }

  div:nth-child(3) {
    border-radius: 0 4px 4px 0;
  }
}
</style>