import { apiListPage } from '~/api/material/materialMerchant'
export default ({ $axios, query, error }) => {
  return apiListPage($axios, query).then(res => {
    return { list: res ? res.data ? res.data.records : [] : [], total: res ? res.data ? res.data.total : 0 : 0, totalPages: res ? res.data ? res.data.pages : 1 : 1 }
  })
}