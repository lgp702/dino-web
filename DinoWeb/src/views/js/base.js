export default function install(Vue, options) {
  Vue.prototype.find = function(list, f) {
    return list.filter(f)[0]
  }
  Vue.prototype.deepCopy = function(obj, cache) {
    let self = this
    if (cache === void 0) cache = []

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    var hit = this.find(cache, function(c) {
      return c.original === obj
    })
    if (hit) {
      return hit.copy
    }

    var copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy: copy
    })

    Object.keys(obj).forEach(function(key) {
      copy[key] = self.deepCopy(obj[key], cache)
    })

    return copy
  }
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Vue.prototype.DateFormat = function(date, fmt) {
    //author: meizz
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
  }
  Vue.prototype.IsNullOrEmpty = function(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return true
    } else if (typeof obj === 'string' && obj.length === 0) {
      return true
    } else if (obj instanceof Array && obj.length === 0) {
      return true
    } else if (
      typeof obj === 'object' &&
      Object.getOwnPropertyNames(obj).length === 0
    ) {
      return true
    } else if (typeof obj === 'number' || obj instanceof Date) {
      return false
    } else {
      return false
    }
  }
}
