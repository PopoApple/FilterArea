import { validatenull } from '@/utils/validate'
import filterData from './filter'
//查询商品列表
export function apiListPage(axios, query) {
  return new Promise(res => {
    res({
      data: { list: [
        {id: '1', query},
        {id: '2', query},
      ], totalElements: 0, totalPages: 0 }
    })
  })
}

//获取查询条件
export function apiGetfilter(axios) {
  return new Promise(res => {
    res(filterData)
  })
}