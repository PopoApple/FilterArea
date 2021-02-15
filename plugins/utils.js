import Vue from 'vue'
import { 
    pxtorem, 
    //loadDicts, formatPrice, getTotalPage 
} from '~/utils'
import { validatenull } from '~/utils/validate'

Vue.prototype.$pxtorem = pxtorem
// Vue.prototype.$loadDicts = loadDicts
// Vue.prototype.$formatPrice = formatPrice
// Vue.prototype.$getTotalPage = getTotalPage
Vue.prototype.$validateNull = validatenull
