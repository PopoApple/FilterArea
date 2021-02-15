import { checkNumber } from '~/utils'

export const getPriceRangeInputValue = (inputValue) => {
  let val1 = inputValue[0]
  let val2 = inputValue[1]
  if (val1 === null || val1 === '' || val1 === undefined) {
    val1 = ''
  } else if (checkNumber(val1)) {
    val1 = parseFloat(val1)
  } else {
    return
  }
  if (val2 === null || val2 === '' || val2 === undefined) {
    val2 = ''
  } else if (checkNumber(val2)) {
    val2 = parseFloat(val2)
  } else {
    return
  }
  return !val1 && !val2 ? null : `${val1}-${val2}`
}

export const getAreaCascaderLabel = (options, val) => {
  if (!val) {
    return ''
  }
  let provinceCode = val.slice(0, 2)
  let provinceValue = provinceCode.length === 2 ? provinceCode : null
  let cityCode = val.slice(0, 4)
  let cityValue = cityCode.length === 4 ? cityCode : null
  let areaCode = val.slice(0, 6)
  let areaValue = areaCode.length === 6 ? areaCode : null
  let labelArry = []
  for (let i = 0; i < options.length; i++) {
    let provinceOpt = options[i]
    if (provinceOpt.code === provinceValue) {
      labelArry.push(provinceOpt.name)
      if (cityValue) {
        for (let j = 0; j < provinceOpt.children.length; j++) {
          let cityOpt = provinceOpt.children[j]
          if (cityOpt.code === cityValue) {      
            labelArry.push(cityOpt.name)
            if (areaValue) {
              for (let k = 0; k < cityOpt.children.length; k++) {
                let areaOpt = cityOpt.children[k]
                if (areaOpt.code === areaValue) {
                  labelArry.push(areaOpt.name)
                }
              }
            }
          }
        }
      }
    }
  }
  return labelArry.join(' / ')
}

export const addNoSelectOption = (options) => {
  let newTree = [{code: 'aa', name: '不限', children: [{ code: 'aaaa', name: '不限', children: [{ code: 'aaaaaa', name: '不限' }] }]}]
  for (let i = 0; i < options.length; i++) {
    let provinceChildren = [
      { code: options[i].code + 'aa', name: '不限', children: [{ code: options[i].code + 'aaaa', name: '不限' }] },
      ...options[i].children,
    ]
    for (let j = 0; j < provinceChildren.length; j++) {
      let cityOpt = provinceChildren[j]
      cityOpt.children = cityOpt.children || []
      cityOpt.children = [
        { code: provinceChildren[j].code + 'aa', name: '不限' },
        ...cityOpt.children ,
      ]
    }
    let provinceOpt = {
      ...options[i],
      children: provinceChildren,
    }
    newTree.push(provinceOpt)
  }
  return newTree
}