import { apiListPage } from '~/api/material/materialGoods'
export default ({ $axios, query, error }) => {
  return apiListPage($axios, query).then(res => {
    return { list: res.data.list, total: res.data.totalElements, totalPages: res.data.totalPages }
  })
}