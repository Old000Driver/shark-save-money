import Vue from 'vue'
import Vuex from 'vuex'
import {defaultIncomeTagList, TagMine} from "@/lib/defaultTagList";
import {createId} from "@/lib/createId";

Vue.use(Vuex)

interface RecordItem {
  id: number,
  tagName: string,
  amount: number,
  createdAt: string,
  note: string,
}

interface RootState {
  IncomeTagList: Array<TagMine>,
  recordList: Array<RecordItem>,
}

interface saveRecordsArgs {
  tagName: string,
  amount: number,
  note: string,
  type: 's' | 'z'
}

const store = new Vuex.Store({
  state: {
    IncomeTagList: [] as Array<TagMine>,
    recordList: [] as Array<RecordItem>,
  },
  mutations: {
    fetchIncomeTagList(state) {
      const list = window.localStorage.getItem('IncomeTagList')
      state.IncomeTagList = list ? JSON.parse(list) as Array<TagMine> : defaultIncomeTagList
    },

    saveRecords(state: RootState, args: [RecordItem, 's' | 'z']) {
      const record = args[0]
      const type = args[1]
      console.log(type)
      state.recordList.push(record)
      if (type === 'z') {
        window.localStorage.setItem('z-recordList', JSON.stringify(state.recordList))
      } else {
        window.localStorage.setItem('s-recordList', JSON.stringify(state.recordList))
      }
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
    fetchTag({state}, tagId) {
      return new Promise((resolve) => {
        for (const index in state.IncomeTagList) {
          if (state.IncomeTagList[index].id === tagId) {
            resolve(true)
          }
        }
        resolve(false)
      })
    },

    saveRecords(context, recordArg: saveRecordsArgs) {
      return new Promise((resolve) => {
        const record: RecordItem = {
          id: createId(),
          tagName: recordArg.tagName,
          amount: recordArg.amount,
          createdAt: new Date().toISOString(),
          note: recordArg.note
        }
        context.commit('saveRecord', [record, recordArg.type])
        resolve(true)
      })
    },
  }
  ,
  modules: {}
})

export default store