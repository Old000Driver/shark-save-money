<template>
  <div class="wrapper">
    <main>
      <TagType @getTag="getTag" ref="TagType"/>
    </main>
    <footer>
      <Note @getNote="getNote" ref="Note"/>
      <NumberPad @getAccount="getAccount" @submit="submit" ref="NumberPad"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TagType from "@/components/SaveMoney/TagType.vue";
import Note from "@/components/SaveMoney/Note.vue";
import NumberPad from "@/components/SaveMoney/NumberPad.vue";

export default Vue.extend({
  name: 'saveMoney',
  components: {NumberPad, Note, TagType},

  data() {
    return {
      note: '',
      account: 0,
      type: '',
      tagName: '',
      selectedTag: -1,
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

      if (!payload.tagName) {
        alert('请选择标签')
        return
      } else if (!payload.account) {
        alert('请输入金额')
        return
      }
      const res = await this.$store.dispatch('saveRecords', payload)
      if (res) {
        alert('保存成功')
        this.clearTable()
        await this.$router.push('/Statistics')
      } else {
        alert('保存失败')
      }
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
    },
    clearTable() {
      this.note = ''
      this.account = 0
      this.type = ''
      this.tagName = '';

      (this.$refs.TagType as any).clear();
      (this.$refs.Note as any).clear();
      (this.$refs.NumberPad as any).clear();
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