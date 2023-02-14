<template>
  <div class="wrapper">
    <main>
      <TagType @getTag="getTag(tagName,type)"/>
    </main>
    <footer>
      {{[this.tagName,this.note,this.account,this.type]}}
      <Note @getNote="getNote(note)"/>
      <NumberPad @getAccount="getAccount(account)"
               @submit="submit"/>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TagType from "@/views/SaveMoney/TagType.vue";
import Note from "@/views/SaveMoney/Note.vue";
import NumberPad from "@/views/SaveMoney/NumberPad.vue";
import note from "@/views/SaveMoney/Note.vue";

export default Vue.extend({
  name: 'saveMoney',
  components: {NumberPad, Note, TagType},

  data() {
    return {
      note: '',
      account: 0,
      type: '',
      tagName: '',
    }
  },
  methods: {
    async submit() {
      const payload = {
        tagName: this.tagName,
        account: this.account,
        note: this.note,
        type: this.type
      }
      console.log('4444',payload)
      await this.$store.dispatch('saveRecords', payload)
    },
    getTag(tagName: string, type: string) {
      this.tagName = tagName
      this.type = type
    },
    getAccount(account: number) {
      this.account = account
    },
    getNote(value: string) {
      this.note = value
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