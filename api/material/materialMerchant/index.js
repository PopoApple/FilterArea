//查询商家列表
export function apiListPage(axios, query) {
  let { page, productTypeId, regionCode } = query
  let params = {
    current: page ? page : 1,
    entity: {
      productTypeId: productTypeId,
      regionCode: regionCode,
    },
    size: 10,
  }
  return axios({
    method: 'post',
    url: 'csMerchant/listByPage',
    data: JSON.stringify(params),
  })
}

//获取查询条件
export function apiGetfilter(axios) {
  return axios({
    method: 'get',
    url: '/csMerchant/filter',
  })
}