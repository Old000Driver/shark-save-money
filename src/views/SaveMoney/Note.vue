<template>
  <div class="noteWrapper">
    <svg-icon name="note"></svg-icon>
    <span>备注：</span>
    <input placeholder="写点备注吧~" v-model="note" @blur="sendNote(note)"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";

export default Vue.extend({
  name: "Note",
  components: {SvgIcon},

  data() {
    return {
      note: ''
    }
  },
  methods: {
    sendNote(note: string) {
      this.$emit('getNote', note)
    },
    clear() {
      this.note = ''
    }
  }
})
</script>

<style lang="scss">
.noteWrapper {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.9), 0 6px 6px rgba(0, 0, 0, 0.9);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .svg-icon {
    width: 20px;
  }
}
</style>