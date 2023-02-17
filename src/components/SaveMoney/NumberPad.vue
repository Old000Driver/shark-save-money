<template>
  <div>
    <div class="numberPad">
      <div class="output">{{ output }}</div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">OK</button>
        <button class="zero" @click="inputContent">0</button>
        <button @click="inputContent" class="dot">.</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NumberPad",
  data() {
    return {
      output: '0',
    }
  },
  methods: {
    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) {
        return;
      }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      if (this.output.indexOf('.') >= 0) {
        const [integer, decimal] = this.output.split('.')
        if (decimal.length >= 2) {
          return
        }
      }
      this.output += input;
    },

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    },

    clear() {
      this.output = '0';
    },

    ok() {
      const account = parseFloat(this.output)
      this.$emit('getAccount', account)
      this.$emit('submit')
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    font-size: 18px;
    font-weight: bold;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 36px;
    border-top: 2px solid #e8e8e8;
    background: white;
  }

  .buttons {
    padding-top: 4px;

    &::after {
      content: '';
      clear: both;
      display: block;
    }

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: 1px solid #f5f5f5;

      &.selected::after {
        background: #ffd946;

      }

      &.ok {
        height: 64*2px;
        float: right;
        background: #ffd946;
      }

      &.zero {
        width: 25*2%;
      }

      &.dot {
        font-weight: bold;
      }


    }
  }
}
</style>