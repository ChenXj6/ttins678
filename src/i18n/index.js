import VueI18n from 'vue-i18n'
import Vue from 'vue'
 
Vue.use(VueI18n)
 
const i18n = new VueI18n({
    locale: window.localStorage.getItem('language') === null ? 'th' : window.localStorage.getItem('language'), // 语言标识
    messages: {
        // 'cn': require('./lang/cn'),   // 中文语言包
        'en': require('./lang/en.js'),    // 英文语言包
        // 'yn': require('./lang/yn.js'),  //越南文语言包
        'th': require('./lang/th.js'),  //越南文语言包
    },
})
  
export default  i18n