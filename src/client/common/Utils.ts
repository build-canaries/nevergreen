import {isEmpty, isNaN, isNumber as _isNumber, isString, sample, toNumber, trim} from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBlank(s: any) {
  return isString(s) ? isEmpty(trim(s)) : true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(val: any) {
  if (_isNumber(val)) {
    return true
  }

  if (isBlank(val)) {
    return false
  }

  return !isNaN(toNumber(val))
}

export function randomFrom<T>(arr: T[]): T {
  return sample(arr) as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function notEmpty(val: any) {
  return !isEmpty(val)
}
