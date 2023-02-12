<template>
  <div>
    <header>
      <div class="topNav">
        <div>
          <router-link to="/saveMoney">
            <svg-icon name="left"/>
          </router-link>
          <span>添加支出类型</span>
        </div>
        <span>完成</span>
      </div>
      <div>
        <div class="selectedTag">
          <div>
            <span>选中标签：</span>
            <svg-icon :name="svgName"/>
          </div>
          <span>{{ tagName }}</span>
        </div>
      </div>
    </header>
    <main>
      <div v-for="(value,key) in tagList" :key="key">
        <span style="color: #A6ACAF">{{ getChinese(key) }}</span>
        <div class="tagList">
          <div v-for="(item,key) in value" :key="key"
               @click="selectTag(item.svgName,item.name)">
            <Icon :icon="item.svgName"
                  :name="item.name"/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon.vue";
import Icon from "@/components/Icon.vue";
import {getDefaultTagList, TagMine} from "@/lib/defaultTagList";

interface Data {
  tagList: { [key: string]: Array<TagMine> }
  svgName: string,
  tagName: string,
}

export default Vue.extend({
  name: "TagListPage",
  components: {SvgIcon, Icon},


  data(): Data {
    return {
      tagList: getDefaultTagList(),
      svgName: '',
      tagName: '',
    }
  },
  methods: {
    getChinese(name: string) {
      if (name === 'food') {
        name = '餐饮'
      } else if (name === 'shop') {
        name = '购物'
      } else if (name === 'house') {
        name = '住宿'
      } else {
        name = '交通'
      }
      return name
    },
    selectTag(svgName: string, tagName: string) {
      this.tagName = tagName
      this.svgName = svgName
    }
  },
  mounted() {
    // this.tagList = getDefaultTagList()

    // const list: any = getDefaultTagList()
    // for (let key in list) {
    //   console.log(typeof (key))
    // }


  }
})
</script>

<style lang="scss">
header {
  .topNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    padding: 0 20px 0 20px;
    background: #ffd946;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > span {
      font-size: 16px;
      padding: 6px;
      border-radius: 13px 13px 13px 13px;
      background: whitesmoke;
    }

    .svg-icon {
      width: 20px;
    }
  }

  .selectedTag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 0 10px 0 10px;
    border-bottom: 1px solid #e9e9e9;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .svg-icon {
      width: 20px;
    }
  }
}

main {
  > div {
    margin-top: 20px;
  }

  .tagList {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .svg-icon {
      padding-bottom: 10px !important;
      margin-top: 30px;
    }
  }
}
</style>