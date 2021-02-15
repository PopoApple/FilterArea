import filterData from './filter'

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

export function apiGetfilter(axios) {
  return new Promise(res => {
    res(filterData)
  })
}