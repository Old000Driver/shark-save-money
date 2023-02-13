import Vue from 'vue'
import Vuex from 'vuex'
import {defaultIncomeTagList, TagMine} from "@/lib/defaultTagList";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    IncomeTagList: [] as Array<TagMine>
  },
  mutations: {
    fetchIncomeTagList(state) {
      const list = window.localStorage.getItem('IncomeTagList')
      state.IncomeTagList = list ? JSON.parse(list) as Array<TagMine> : defaultIncomeTagList
    }
  },
  actions: {
    addIncomeTagList({state}, tag: TagMine) {
      return new Promise((resolve) => {
        const res = state.IncomeTagList.find(item => item.id === tag.id)
        if (res) {
          resolve(false)
        } else {
          state.IncomeTagList.push(tag)
          window.localStorage.setItem('IncomeTagList', JSON.stringify(state.IncomeTagList))
          resolve(true)
        }
      })
    },
    fetchTag({commit, state}, tagId) {
      return new Promise((resolve) => {
        for (const index in state.IncomeTagList) {
          if (state.IncomeTagList[index].id === tagId) {
            resolve(true)
          }
        }
        resolve(false)
      })
    }
  }
  ,
  modules: {}
})
