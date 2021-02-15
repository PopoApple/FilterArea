export function apiMockList(query) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = {
        data: {
          total: 125, code: 200, records: [
            { id: '1', merchantId: 'a', name: '建筑咨询与设计', merchantName: '山东宏远建筑有限公司', type: '建筑类', area: '经济开发区', price: 200, imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png', baseInfo: '基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息基本信息' },
            { id: '2', merchantId: 'a', name: '商品数据2商品数据2商品数据2商品数据2商品数据2商品数据2商品数据2', type: '建筑类', merchantName: '山东宏远建筑有限公司山东宏远建筑有限公司山东宏远建筑有限公司山东宏远建筑有限公司山东宏远建筑有限公司山东宏远建筑有限公司', area: '经济开发区经济开发区经济开发区经济开发区经济开发区经济开发区经济开发区', },
            { id: '3', merchantId: 'b', name: '商品数据' + JSON.stringify(query) },
          ]
        }
      }
      res(data)
    }, 500)
  })
}
