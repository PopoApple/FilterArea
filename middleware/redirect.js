import { isMobile } from '~/utils'
import Vue from 'vue'

export default function ({ isServer, req, redirect, route }) {
  let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  let isM = isMobile(userAgent)
  let query = route.query
  let hasSlash = true
  let path = route.path
  if (route.path.slice(-1) !== '/') {
    path = path + '/'
    hasSlash = false
  }
  if (path.indexOf('/m/') > -1 && !isM) {
    redirect(302, path.substring(2), query)
  } else if (path.indexOf('/m/') < 0 && isM) {
    redirect(302, '/m' + path, query)
  } else if (!hasSlash) {
    redirect(path, query)
  }
  Vue.prototype.$isMobile = isM
}