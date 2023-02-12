<template>
  <div>
    <header>
      <div></div><!--占位空div不要删-->
      <div>
        <button @click="clickButton('z')"
                :class="selected === 'z'? 'selected':''">支出
        </button>
        <button @click="clickButton('s')"
                :class="selected === 's'? 'selected':''"
                style="margin-left: 20px">收入
        </button>
      </div>
      <div>
        <router-link to="/statistics">
          取消
        </router-link>
      </div>
    </header>
    <main>
      <div v-if="selected === 'z'">
        <div v-for="tag in selectedIncomeTagList" class="tag"
             @click="clickTag(tag.id)" :key="tag.id">
          <div class="circle"
               :class="selectedTag === tag.id?'selectedTag':''">
            <svg-icon :name="tag.svgName"/>
          </div>
          <span>{{ tag.name }}</span>
        </div>

        <div class="tag">
          <router-link to="/TagListPage">
            <div class="circle">
              <svg-icon name="arrow"/>
            </div>
            <span>添加</span>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div v-for="tag in selectedExpenseTagList" class="tag"
             @click="clickTag(tag.id)" :key="tag.id">
          <div class="circle"
               :class="selectedTag === tag.id?'selectedTag':''">
            <svg-icon :name="tag.svgName"/>
          </div>
          <span>{{ tag.name }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";

export default Vue.extend({
  name: "TagType",
  components: {SvgIcon},
  data() {
    return {
      selected: 'z',
      tagListId: [1, 2, 3, 4, 5],
      selectedTag: -1,
      selectedIncomeTagList: [
        {name: '餐饮', svgName: 'canYin', type: 'food', id: 1},
        {name: '购物', svgName: 'gouWu', type: 'shop', id: 5},
        {name: '交通', svgName: 'jiaoTong', type: 'transportation', id: 9},
        {name: '住宿', svgName: 'fangZi', type: 'house', id: 14},
      ],
      selectedExpenseTagList: [
        {name: '餐饮', svgName: 'canYin', type: 'food', id: 1},
        {name: '购物', svgName: 'gouWu', type: 'shop', id: 5},
      ]
    };
  },

  methods: {
    clickButton(type: string) {
      this.selected = type === 'z' ? 'z' : 's';
    },
    clickTag(id: number) {
      this.selectedTag = id
    }
  },
})
</script>

<style lang="scss" scoped>
header {
  display: flex;

  justify-content: space-between;
  background: #ffd946;

  > div {
    margin: 20px 10px 10px 10px;
  }

  button {
    font-size: 20px;
    padding: 0 10px 0 10px;
    position: relative;

    &.selected:after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: black;
      position: absolute;
      bottom: -10px;
      left: 0;
      margin: auto;
    }
  }
}

main {
  padding: 20px 20px 20px 20px;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    > .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      width: 25%;
      margin-top: 20px;

      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f2f2f2;
        width: 50px;
        height: 50px;
        border-radius: 50%;

        &.selectedTag {
          background: #ffd946;
        }
      }
    }
  }
}
</style>