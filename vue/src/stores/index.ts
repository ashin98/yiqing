import { defineStore } from 'pinia'
import {getApiList} from '../server/index'
import type {RootObject,Children,ChinaAdd,ChinaTotal,StatisGradeCityDetail} from './type'
export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list:<RootObject>{},
    item:<Children[]>[],
    chinaAdd:<ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    cityDetail:<StatisGradeCityDetail[]>[],
  }),
  getters: {
    
  },
  actions: {
    async getList(){
     const result = await getApiList()
     this.list = result
     //localStorage.setItem('list',result)
     this.chinaAdd = this.list.data.diseaseh5Shelf.chinaAdd
     this.chinaTotal = this.list.data.diseaseh5Shelf.chinaTotal
     this.cityDetail = this.list.data.statisGradeCityDetail
     console.log(this.list)
    }
  }
})
