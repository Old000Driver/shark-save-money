<template>
  <div class="wrapper">
    <main>
      <TagType/>
    </main>
    <footer>
      <Note @getNote="(value)=>{this.note = value}"/>
      <NotePad/>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TagType from "@/views/SaveMoney/TagType.vue";
import Note from "@/views/SaveMoney/Note.vue";
import NotePad from "@/views/SaveMoney/NumberPad.vue";

export default Vue.extend({
  name: 'saveMoney',
  components: {NotePad, Note, TagType},

  data() {
    return {
      note: ''
    }
  }

});
</script>

<style lang="scss" scoped>
body {
  min-height: 100vh;
}

.wrapper {
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > main {
    width: 100vw;
    flex-grow: 1;
  }
}
</style>