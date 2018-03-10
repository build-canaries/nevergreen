import _ from 'lodash'

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

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
