import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    firstMes:false,
    receiveVa:'',
    ifsc:'',
    currency:'VND' // 货币
  },
  mutations: {
  
  },
  actions: {
  },
  modules: {
  }
})
