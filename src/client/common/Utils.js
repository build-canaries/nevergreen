import _ from 'lodash'
import format from 'date-fns/format'
import subSeconds from 'date-fns/sub_seconds'

const ONE_MINUTE_IN_SECONDS = 60
const ONE_HOUR_IN_SECONDS = 3600
const ONE_DAY_IN_SECONDS = 86400

export function isNumber(val) {
  if (_.isNumber(val)) {
    return true
  }

  if (isBlank(val)) {
    return false
  }

  return !_.isNaN(_.toNumber(val))
}

export function isBlank(s) {
  return _.isString(s) ? _.isEmpty(_.trim(s)) : true
}

export function friendlyFormatDuration(seconds) {
  if (seconds < ONE_MINUTE_IN_SECONDS) {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
  } else if (seconds < ONE_HOUR_IN_SECONDS) {
    const minutes = Math.floor(seconds / ONE_MINUTE_IN_SECONDS)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  } else if (seconds < ONE_DAY_IN_SECONDS) {
    const hours = Math.floor(seconds / ONE_HOUR_IN_SECONDS)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  } else {
    const days = Math.floor(seconds / ONE_DAY_IN_SECONDS)
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }
}

export function now() {
  return format(new Date())
}

export function randomDateInPast(seconds = ONE_DAY_IN_SECONDS) {
  return format(subSeconds(now(), _.random(0, seconds)))
}

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
