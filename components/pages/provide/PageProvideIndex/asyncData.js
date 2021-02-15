import { apiListPage } from '~/api/material/materialGoods'

const loadDict = (type) => {
  return new Promise(res => {
    let dict
    if (type === 'welfare-type') {
      dict = [
        { value: '1', label: '五险一金' },
        { value: '2', label: '双休' },
        { value: '3', label: '定期团建' },
        { value: '4', label: '七天年假' },
        { value: '5', label: '时间自由' },
        { value: '6', label: '无需加班' },
      ]
    }
    if (type === 'price') {
      dict = [
        { value: '0-100', label: '0-100' },
        { value: '100-200', label: '100-200' },
        { value: '200-300', label: '200-300' },
      ]
    }
    if (type === 'main') {
      dict = []
      for (let i = 1; i <= 2; i++) {
        dict.push({ value: String(i), label: '选项' + i })
      }
    }
    if (type === 'test') {
      dict = []
      for (let i = 1; i <= 3; i++) {
        dict.push({ value: String(i), label: '选项' + i })
      }
    }
    if (type === 'test-long') {
      dict = []
      for (let i = 1; i <= 20; i++) {
        dict.push({ value: String(i), label: '选项' + i })
      }
    }
    if (type === 'test-long-2') {
      dict = []
      for (let i = 21; i <= 40; i++) {
        dict.push({ value: String(i), label: '选项' + i })
      }
    }
    if (type === 'cascader') {
      dict = [
        { 
          code: '1', name: '选项1', children: [
            { code: '1-1', name: '选项1-1', children: [
              { code: '1-1-1', name: '选项1-1-1' },
              { code: '1-1-2', name: '选项1-1-2' },
            ] },
            { code: '1-2', name: '选项1-2', children: [
              { code: '1-2-1', name: '选项1-2-1' },
            ] },
          ] 
        },
        { 
          code: '2', name: '选项2'
        }
      ]
    }
    res(dict)
  })
}

export default ({ $axios, query, error, redirect, route  }) => {
  if (!query.main) {
    redirect(route, { ...query, main: '1' })
  }
  return Promise.all([
    apiListPage($axios, query),
    loadDict('welfare-type'),
    loadDict('price'),
    loadDict('main'),
    loadDict('test'),
    loadDict('test-long'),
    loadDict('test-long-2'),
    loadDict('cascader'),
  ]).then(([res, dictWelfareType, dictPrice, dictMain, dictTest, dictTestLong, dictTestLong2, dictCascader]) => {
    return { list: res.data.list, total: res.data.totalElements, totalPages: res.data.totalPages, dictWelfareType, dictPrice, dictMain, dictTest, dictTestLong, dictTestLong2, dictCascader, routeName: route.name, query }
  })
}