const moment = require('moment')
moment.locale('ko')

class ValueUtils {
  constructor() {
    throw new Error()
  }

  static empty(str, includeBlank = true) {
    const empty = str === null || str === undefined || (includeBlank && str === '')
    return empty
  }

  static nonEmpty(str, includeBlank = true) {
    return !ValueUtils.empty(str, includeBlank)
  }

  static nvl(str, defaultValue = '') {
    if (ValueUtils.empty(str)) { return defaultValue }
    return str
  }

  /** Date */
  static dt(str) {
    return moment(str)
  }

  static dt2from(str, format = 'YYYY-MM-DD HH:mm:ss') {
    if (ValueUtils.empty(str)) { return null }
    const dt = ValueUtils.dt(str)
    return dt.format(format)
  }

  static now(format = 'YYYY-MM-DD HH:mm:ss') {
    const dt = ValueUtils.dt()
    return ValueUtils.dt2from(dt, format)
  }
}

module.exports = ValueUtils