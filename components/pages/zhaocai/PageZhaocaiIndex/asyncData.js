import { getZhaocaiList, getCentralJsonDataNode, getProvinceJsonDataNode } from '~/api/zhaocai'
import { handleJsonDataBeta } from './util'

export default ({ $axios, query, error, store }) => {
  // return Promise.all([
  //   apiList($axios, query), apiFilter($axios)
  // ]).then(([resList, resFilter]) => {
  //   return { list: resList.data.list, total: resList.data.totalPages, filter: resFilter.data }
  // })
  // .catch(e => {
  //   // 网络错误或者业务错误都进这里，错误对象格式为：{statusCode, message}
  //   console.log('asyncData apiGoodsList 错误:', e)
  //  使用 error({statusCode: 123, message: 'xxx'})跳到错误页面：layout/error.vue
  // })
  return getZhaocaiList($axios, query).then( res => {
    let zhaocaiList = res.data.list
    let total = res.data.totalElements
    let sortBtnTimeValue = query['timeSort'] || null
    let keyWordValue = query['keyWord'] || null
    return { zhaocaiList, total, sortBtnTimeValue, keyWordValue }
  }).catch(e => {
    // console.log(e)
  })
}

