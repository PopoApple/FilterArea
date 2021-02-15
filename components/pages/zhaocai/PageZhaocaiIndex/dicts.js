
export const timeDict = [
  { value: null , label: '全部'},
  { value: '2', label: '一周' },
  { value: '3', label: '一个月' },
  { value: '4', label: '三个月' },
  // { value: '5', label: '半年' },
  // { value: '6', label: '一年' }
]

export const dataSource = [
  {value: null, label: '省平台'},
  {value:'2', label: '央企招投标'}
]

// 以下为处理省平台，央企招投标json数据的方法,
/**
 * 1、处理来源平台，根据来源平台的选择情况，返回 数据来源选择代码（暂时没有做） 和 剩余筛选栏的字典项内容
 * @param {*} query 路由导航的的参数
 * @param {*} province 省平台json对象 
 * @param {*} central 央企json对象
 * @return {*}  
 */
export function handleDataSource (query, province, central) {
  let result = {}
  if ( query.sourceType === '1' || !query.sourceType) {
    result.sign = '1'
    result.businessList = province.businessList
    result.platformList = province.platformList
  } else if ( query.sourceType === '2') {
    result.sign = '2'
    result.businessList = central.businessList
    result.platformList = central.platformList
  } else {
    // console.log('平台来源不限')
  }
  return result
}

/**
 * 2、处理交易来源，处理数组的键名，目标格式为{ regionName: ***，id: *** },返回选择“交易来源”的字典项，即用于级联选择器的数据
 * @param {*} sign “数据来源”选择的结果，省平台sign='1' ，央企sign='2'
 * @param {*} raw 判断“数据来源”后的传入字典项内容
 * @return {*} 
 */
export function handleAreaSource (sign, raw) {
  let result = []
  // 1、省级平台，从省级，到市级，到具体的招标单位，已对接完成
  if ( sign === '1' ) {
    result = raw
  }
  // 2、央企，已对接完成
  if ( sign === '2' ) {
    result = raw.map((current) => {
      return { regionName: current.platformName, id: current.platformId }
    })
  } 
  return result
}

/**
 * 3、获取业务类型，同时记录默认值（省平台默认值为不限，央企默认值为工程建设）
 * @param {*} sign “数据来源”选择的结果，省平台sign='1' ，央企sign='2'
 * @param {*} raw 
 * @return {*} 
 */
export function handleBusiness (sign, raw) {
  // console.log(sign, raw)
  let result = {}
  // 获取默认值
  if ( sign === '1' ) {
    result.business = raw.map((current) => {
      if ( current.businessName === '不限' ) { 
        result.defaultId = current.businessId
      }
      return { value: current.businessId ,label: current.businessName }
    })
  }
  if ( sign === '2' ) {
    result.business = raw.map((current) => {
      if ( current.businessName === '工程建设' ) { 
        result.defaultId = current.businessId
      }
      return { value: current.businessId ,label: current.businessName }
    })
  }
  return result
}


/**
 * 4、处理业务类型(也是：获取信息类型),返回选择“业务类型”后的字典项，即“信息类型”字典项
 * @param {*} query 路由导航查询参数
 * @param {*} sign “数据来源”选择的结，省平台sign='1' ，央企sign='2'
 * @param {*} raw  传入的字典项内容
 * @param {*} defaultId 信息类型默认的选项，省平台的“不限”，央企的工程建设
 * @return 返回值为 信息类型的字典项 以及   信息类型对应的infoTypeList，是handleInformationTypes的原材料raw
 */
export function handleBusinessTypes (query, sign, raw, defaultId) {
  // console.log(defaultId)
  let result = {}
  // 如果query为空，将“不限”的businessId赋值给query; 特殊情况 央企只有“工程建设 ”
  // 用于省平台
  if ( sign === '1' ) {
    query = query ? query : defaultId
    for (let i = 0; i < raw.length; i++ ) {
      if ( raw[i].businessId === query ) {
        result.dict = raw[i].infoTypeList.map((current) => {
          if ( current.infoTypeName === '不限' ) { 
            result.defaultId = current.infoTypeId
          }
          return { value: current.infoTypeId, label: current.infoTypeName }
        })
        result.infoTypeList = raw[i].infoTypeList
      }
    }
  }
  // 用于央企招投标
  if ( sign === '2') {
    query = query ? query : defaultId
    for (let i = 0; i < raw.length; i++ ) {
      if ( raw[i].businessId === query ) {
        result.dict = raw[i].infoTypeList.map((current) => {
          if ( current.infoTypeName === '不限' ) { 
            result.defaultId = current.infoTypeId
          }
          return { value: current.infoTypeId, label: current.infoTypeName }
        })
        result.infoTypeList = raw[i].infoTypeList
      }
    }
  }
  // console.log(result)
  return result
}

/** 
 * 5、处理信息类型（也是：获取行业），返回选择“信息类型”后的数据，即“行业筛选“字典项
 * @param {*} query 路由传递的参数，
 * @param {*} raw 传入的字典项，信息类型infoTypeList 下的 行业 tradeList
 * @param {*} defaultId 默认信息类型下的行业
 */
export function handleInformationTypes (query, raw, defaultId) {
  let result =[]
  query = query ? query : defaultId
  for (let i = 0; i < raw.length; i++ ) {
    if ( raw[i].infoTypeId === query && raw[i].tradeList ) {
      result = raw[i].tradeList.map((current) => {
        return { value: current.dictValue, label: current.dictLabel }
      })
    }
  }
  // console.log(result)
  return result
}


// 一些想法：
// 是否有必要添加键名校验，如果键名变动，维护可能会比较困难
// 逻辑复杂，最好添加注释
// 处理筛选栏数据的方式，一层套一层，耦合在一起，比较难阅读。后期在结构上重新调整，
