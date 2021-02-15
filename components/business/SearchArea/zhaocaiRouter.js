/**
 * 目的：为处理招采页面选项跳转时，次级的参数id还保留，无法正确查询的问题
 * 例子一：  
 *    当前选择的参数： { 一周，省平台，江西赣州市，工程建设，交易公告，行业不限 }
 *    点击 央企招投标，从 省平台 跳转到 央企招投标， 如果不做处理，省平台后面的数据，也会保留。
 *    导致 字典项函数handleJsonDataBeta报错 或是 请求回来数据会有问题，
 * 解决思路：按钮只携带 其上级 的路由
 * 例子二：
 *    工程建设（业务类型）按钮上的route，只会携带 { 一周， 省平台，江西赣州市 }，而不会携带 交易公告 和 行业 的参数 
 * 
 */


 export function handleZhaocaiRoute( key, val, query) {
   let result = {}
  switch(key) {
    case 'rangeOfDate':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        sourceType: query.sourceType || undefined,
        sourcePlatformId: query.sourcePlatformId || undefined,
        businessId: query.businessId || undefined,
        businessTypeId: query.businessTypeId || undefined,
        tradeCode: query.tradeCode || undefined,
        [key]: val || undefined
      }
      break;
    case 'sourceType':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        [key]: val || undefined
      }
      break;
    case 'sourcePlatformId':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        sourceType: query.sourceType || undefined,
        // 这里拿不到val
        [key]: val || undefined
      }
    case 'businessId':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        sourceType: query.sourceType || undefined,
        sourcePlatformId: query.sourcePlatformId || undefined,
        [key]: val || undefined
      }
      break
    case 'businessTypeId':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        sourceType: query.sourceType || undefined,
        sourcePlatformId: query.sourcePlatformId || undefined,
        businessId: query.businessId || undefined,
        [key]: val || undefined
      }
      break
    case 'tradeCode':
      result = {
        timeSort: query.timeSort || undefined,
        keyWord: query.keyWord || undefined,
        rangeOfDate : query.rangeOfDate || undefined,
        sourceType: query.sourceType || undefined,
        sourcePlatformId: query.sourcePlatformId || undefined,
        businessId: query.businessId || undefined,
        businessTypeId: query.businessTypeId || undefined,
        [key]: val || undefined
      }
  }
  return result
 }


/**
 * 当关闭上级标签时应当清空，其子类标签。比如说关闭业务类型的tag，同时也要关闭信息类型和行业的标签
 * @param {*} key 
 * @param {*} path 当前是否处在招采页面，否则返回空对象
 */
export function  closeZhaocaiTag(key, path) {
  let result = {}
  if ( path !== '/zhaocai/'){
    return result
  }
  switch(key) {
    case 'rangeOfDate':
      break;
    case 'sourceType':
      result = {
        sourcePlatformId: undefined,
        businessId: undefined,
        businessTypeId: undefined,
        tradeCode: undefined
      }
      break;
    case 'sourcePlatformId':
      break;
    case 'businessId': 
      result = {
        businessTypeId: undefined,
        tradeCode: undefined
      }
      break;
    case 'businessTypeId':
      result = {
        tradeCode: undefined
      }
      break;
    case 'tradeCode':
      break;
  }
  return result
}

/**
 * 该函数目的是对移动端招采页面特殊处理，非移动端招采页面，返回的是空对象{}
 * @param {*} key 
 * @param {*} path 当前是否处在移动端招采页面，否则返回空对象
 */
export function handleZhaocaiRouteMobile(key, path) {
  let result = {}
  if ( path !== '/m/zhaocai/'){
    return result
  }
  switch(key) {
    case 'rangeOfDate':
    case 'sourcePlatformId':
    case 'tradeCode':
      break;
    case 'sourceType':
      result = {
        sourcePlatformId: undefined,
        businessId: undefined,
        businessTypeId: undefined,
        tradeCode: undefined,
      }
      break;
    case 'businessId':
      result = {
        businessTypeId: undefined,
        tradeCode: undefined
      }
      break;
    case 'businessTypeId':
      result = {
        tradeCode: undefined
      }
      break;
  }
  return result
}