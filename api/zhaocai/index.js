

// 获得列表数据,还需要调整，参数项还需要调整
export function getZhaocaiList(axios, query) {
  let entityData = {}
  for(let key  in query){
    entityData[key] = query[key]
  }
  let page = entityData.page || 1
  let asc = entityData.timeSort === 'asc' ? true : false
  entityData.sourceType = entityData.sourceType || '1'
  delete entityData.page
  delete entityData.timeSort
  let params = {
    current:  page,
    entity: entityData,
    orders: [{"column": "createTime", "asc":asc}],
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csBidInfo/listByPage',
    data: JSON.stringify(params),
  })
} 

/** 获取央企字典项数据
 *  这里通过node代理来跨域请求，实际访问地址为http://bid.conschina.com/filter/central_platform.json
 */
export function getCentralJsonData (axios) {
  return axios({
    methods: 'get',
    // url: 'http://bid.conschina.com/filter/central_platform.json',
    url: '/filter/central_platform.json',
    baseURL: '/'
  })
}
// 只有在页面刷新时，或者直接通过url进入才会使用node进行服务端渲染；否则，还是要像正常的单页面应用一样，做代理请求跨域
export function getCentralJsonDataNode (axios) {
  return axios({
    methods: 'get',
    url: process.client ? '/filter/central_platform.json' : 'http://bid.conschina.com/filter/central_platform.json',
    // url: '/filter/central_platform.json',
    baseURL: '/'
  })
}
/** 获取省平台字典项数据
 *  这里通过node代理来跨域请求，实际访问地址为http://bid.conschina.com/filter/province_platform.json
 */
export function getProvinceJsonData (axios) {
  return axios({
    methods: 'get',
    // url: 'http://bid.conschina.com/filter/province_platform.json',
    url: '/filter/province_platform.json',
    baseURL: '/'
  })
}
// 只有在页面刷新时，或者直接通过url进入才会使用node进行服务端渲染；否则，还是要像正常的单页面应用一样，做代理请求跨域
export function getProvinceJsonDataNode (axios) {
  return axios({
    methods: 'get',
    url: process.client ? '/filter/province_platform.json' : 'http://bid.conschina.com/filter/province_platform.json',
    // url: '/filter/province_platform.json',
    baseURL: '/'
  })
}