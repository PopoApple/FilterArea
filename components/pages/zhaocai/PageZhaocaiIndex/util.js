// 这个文件为处理json文件的方法,并处理成字典项

import { Divider } from 'element-ui'
import { timeDict, dataSource } from './dicts'


/**
 * 
 * @param {*} query 路由route.query
 * @param {*} province 省平台json文件
 * @param {*} central 央企招投标json文件
 */
export function  handleJsonDataBeta( query, province, central ) {
  // 通过路由判断，逻辑为： 1. 省平台/央企  =>  2.交易来源 => 3.业务类型 => 4.信息类型 => 5.行业
  // 1、数据来源处理测试
  let sourceType = handleSourceType(query, province, central)
  let sourceTypeDict = sourceType
  // 2、交易来源处理测试
  let sourcePlatform = handleSourcePlatform( sourceType.sign, sourceType.platformList)
  let sourcePlatformDict = sourcePlatform 
  // 3、业务类型获取测试
  let business = handleBusiness(sourceType.sign, sourceType.businessList)
  let businessDict = business.dict
  // 4、业务类型处理测试
  let businessType = handleBusinessTypes( query.businessId, sourceType.sign, sourceType.businessList, business.defaultId)
  let businessTypeDict = businessType.dict
  // 5、信息类型处理测试
  let trade = handleTrade( query.businessTypeId, businessType.infoTypeList, businessType.defaultId )
  let tradeDict = trade
  
  let bidDict = { timeDict, dataSource, sourceTypeDict, sourcePlatformDict, businessDict, businessTypeDict, tradeDict }
  return bidDict
}





// 以下为处理省平台，央企招投标json数据的方法,
/**
 * 1、处理来源平台，根据来源平台的选择情况，返回 数据来源选择代码（暂时没有做） 和 剩余筛选栏的字典项内容
 * @param {*} query 路由导航的的参数
 * @param {*} province 省平台json对象 
 * @param {*} central 央企json对象
 * @return {*}  
 */
function handleSourceType (query, province, central) {
  let result = {}
  if ( query.sourceType === '2') {
      result.sign = '2'
      result.businessList = central.businessList
      result.platformList = central.platformList
    } else {
      result.sign = '1'
      result.businessList = province.businessList
      result.platformList = province.platformList
    }
  return result
}

/**
 * 2、处理交易来源，处理数组的键名，目标格式为{ regionName: ***，id: *** },返回选择“交易来源”的字典项，即用于级联选择器的数据
 * @param {*} sign “数据来源”选择的结果，省平台sign='1' ，央企sign='2'
 * @param {*} raw 判断“数据来源”后的传入字典项内容
 * @return {*} 
 */
function handleSourcePlatform (sign, raw) {
  let result = []
  // 1、省级平台，从省级，到市级，到具体的招标单位，已对接完成
  if ( sign === '1' ) {
    let result1 = raw.map(current1 => {
      let rank1 ={}
      rank1.regionName = current1.regionName
      rank1.id = current1.id || null
      rank1.children = !current1.children ? null :  current1.children.map(current2 => {
        let rank2 ={}
        rank2.regionName = current2.regionName
        rank2.id = current2.id || null
        rank2.children = !current2.children ? null :current2.children.map((current3) => {
          let rank3 = {}
          rank3.regionName = current3.regionName
          rank3.id = current3.id
          return rank3
        })
        return rank2
      })
      return rank1
    })
    result = result1
    // result= raw
    return result
  }
  // 2、央企，已对接完成
  if ( sign === '2' ) {
    result = raw.map((current) => {
      if( current.platformName === '不限') {
        return { regionName: current.platformName, id: null }
      }
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
function handleBusiness (sign, raw) {
  // console.log(sign, raw)
  let result = {}
  // 获取默认值
  if ( sign === '1' ) {
    result.dict = raw.map((current) => {
      if ( current.businessName === '不限' ) { 
        result.defaultId = current.businessId
        return{ value: null ,label: current.businessName }
      }
      return { value: current.businessId ,label: current.businessName }
    })
  }
  if ( sign === '2' ) {
    result.dict = raw.map((current) => {
      if ( current.businessName === '工程建设' ) { 
        result.defaultId = current.businessId
        return{ value: null ,label: current.businessName }
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
function handleBusinessTypes (query, sign, raw, defaultId) {
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
            return { value: null, label: current.infoTypeName }
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
            return { value: null, label: current.infoTypeName }
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
 * @param {*} raw 传入的字典项，信息类型BusinessTypes 下的 行业 tradeList
 * @param {*} defaultId 默认信息类型下的行业
 */
function handleTrade (query, raw, defaultId) {
  let result =[]
  query = query ? query : defaultId
  if (raw) {
    for (let i = 0; i < raw.length; i++ ) {
      if ( raw[i].infoTypeId === query && raw[i].tradeList ) {
        result = raw[i].tradeList.map((current) => {
          if( current.dictLabel === '不限') {
            return { value: null, label: current.dictLabel }
          }
          return { value: current.dictValue, label: current.dictLabel }
        })
      }
    }
  }
  // console.log(result)
  return result
}