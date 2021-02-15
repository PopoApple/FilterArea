

export const isMobile = userAgent => {
  return /(phone|pod|iPhone|iPod|ios|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(userAgent)
}

export const isMobileByUrl = () => location.href.indexOf('/m/') > -1

export const pxtorem = px => {
  if (!px) {
    return null
  }
  let rootValue = 75
  px = String(px)
  px = px.replace('px', '')
  const pixels = parseFloat(px)
  const fixedVal = pixels / rootValue
  return fixedVal === 0 ? '0' : fixedVal + 'rem'
}

/** 
校验数字
*/
export const checkNumber = (value) => {
  return /^-?(0|[1-9]\d*)\.*\d*$/.test(value)
}

/** 
格式化价格
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
*/
export const formatPrice = (number, decimals = 2, dec_point, thousands_sep) => {
  if (number === '面议') {
    return '面议'
  }
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  if (number <= 0) {
    return '面议'
  }
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return '￥' + s.join(dec);
}

/** 
指定长度分割数组
  * 参数说明：
  * array：数组
  * size:长度
*/
export const chunk = (array, size) => {
  //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
  const length = array.length
  //判断不是数组，或者size没有设置，size小于1，就返回空数组
  if (!length || !size || size < 1) {
    return []
  }
  //核心部分
  let index = 0 //用来表示切割元素的范围start
  let resIndex = 0 //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  let result = new Array(Math.ceil(length / size))
  //进行循环
  while (index < length) {
    //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size))
  }
  //输出新数组
  return result
}



/**
 * 数字转整数 如 100000 转为10万
 * @param {需要转化的数} num
 * @param {需要保留的小数位数} point
 */
export const tranNumber = (num, point) => {
  let numStr = num.toString()
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr;
  }
  //大于8位数是亿
  else if (numStr.length > 8) {
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
  }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else if (numStr.length > 5) {
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
  }
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
export const isNotEmpty = (obj) => {
  let flag = true
  if (obj === '' || obj == null || obj === undefined || obj === 'undefined') {
    flag = false
  }
  return flag
}

/**
 * 计算至今相差时间
 * @param {需要转化的日期} date
 */
export const dateStr = (date) => {
  //获取js 时间戳
  var time = new Date().getTime()
  //去掉 js 时间戳后三位
  time = parseInt((time - date) / 1000)
  //存储转换值
  var s
  if (time < 60 * 10) {
    //十分钟内
    return '刚刚'
  } else if (time < 60 * 60 && time >= 60 * 10) {
    //超过十分钟少于1小时
    s = Math.floor(time / 60)
    return s + '分钟前'
  } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
    //超过1小时少于24小时
    s = Math.floor(time / 60 / 60)
    return s + '小时前'
  } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
    //超过1天少于30天内
    s = Math.floor(time / 60 / 60 / 24)
    return s + '天前'
  } else {
    //超过30天ddd
    var date = new Date(parseInt(date))
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  }
}
export const uuid = (len, radix) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

//扁平化处理，默认子集为children---
export const flatten = (checkData) => {
  if (checkData) {
    return [].concat(...checkData.map(item => [].concat(item, ...flatten(item ? item.children ? item.children : [] : []))))
  }

}

export const getTotalPage = total => {
  if (!total) {
    return 0
  }
  return Math.ceil(total / 10)
}

/**
  * 生成随机len位数字
  */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}

export const trim = value => {
  if (value == null) {
    return "";
  }
  return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
}

export const notNull = (obj) => {//判断某对象不为空..返回true 否则 false
  if (obj === null) return false; else if (obj === undefined) return false; else if (obj === "undefined") return false; else if (obj === "") return false; else if (obj === "[]") return false; else if (obj === "{}") return false;
  else if (obj === NaN) return false; else if (obj === "NaN") return false; else return true;
}


/** 
 * 校验传入的时间格式是否为yyyy-mm-dd
 */
export const IsDate = (date) => {
  let reg = /^(\d{4})-(\d{2})-(\d{2})$/
  if (date == "") return false
  if (!reg.test(date.slice(0, 10))) {
    // console.log('传入时间格式错误！')
    return false;
  }
  return true;
}



export const getHtmlText = (html) => {
  if (!html) {
    return null
  }
  let text = html.replace(/<.*?>/gi, '')
  text = text.replace(/&nbsp;/g, '')
  text = text.replace(/[\r\n]/g,'')
  text = text.replace(/\s/g, '')
  return text
}

//保留n位小数（不四舍五入）
export function formatDecimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}