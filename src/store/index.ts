import Vue from 'vue'
import Vuex from 'vuex'
import {defaultIncomeTagList, TagMine} from "@/lib/defaultTagList";
import {createId} from "@/lib/createId";

Vue.use(Vuex)

interface RecordItem {
  id: number,
  tagName: string,
  account: number,
  createdAt: string,
  note: string,
}

interface RootState {
  IncomeTagList: Array<TagMine>,
  zRecordList: Array<RecordItem>,
  sRecordList: Array<RecordItem>,
}

interface saveRecordsArgs {
  tagName: string,
  account: number,
  note: string,
  type: 's' | 'z'
}

const store = new Vuex.Store({
  state: {
    IncomeTagList: [] as Array<TagMine>,
    zRecordList: [] as Array<RecordItem>,
    sRecordList: [] as Array<RecordItem>,
  },
  mutations: {
    getIncomeTagList(state) {
      const list = window.localStorage.getItem('IncomeTagList')
      state.IncomeTagList = list ? JSON.parse(list) as Array<TagMine> : defaultIncomeTagList
    },

    saveRecords(state: RootState, args: [RecordItem, 's' | 'z']) {
      const record = args[0]
      const type = args[1]
      if (type === 'z') {
        state.zRecordList.push(record)
        window.localStorage.setItem('z-recordList', JSON.stringify(state.zRecordList))
      } else {
        state.sRecordList.push(record)
        window.localStorage.setItem('s-recordList', JSON.stringify(state.sRecordList))
      }
    },
    getRecords(state) {
      const zRecordList = window.localStorage.getItem('z-recordList')
      const sRecordList = window.localStorage.getItem('s-recordList')
      if (zRecordList) {
        state.zRecordList = JSON.parse(zRecordList) as Array<RecordItem>
      }
      if (sRecordList) {
        state.sRecordList = JSON.parse(sRecordList) as Array<RecordItem>
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
          account: recordArg.account,
          createdAt: new Date().toISOString(),
          note: recordArg.note
        }
        context.commit('saveRecords', [record, recordArg.type])
        resolve(true)
      })
    },
  }
  ,
  modules: {}
})

export default store