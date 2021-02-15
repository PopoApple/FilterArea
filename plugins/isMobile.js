import Vue from 'vue'
import { isMobileByUrl } from '~/utils'

Vue.prototype.$isMobile = isMobileByUrl()