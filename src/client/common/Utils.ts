import {get, isEmpty, isNaN, isNumber, isString, sample, toNumber, trim} from 'lodash'

export function isBlank(val: unknown): boolean {
  return isString(val) ? isEmpty(trim(val)) : true
}

export function isNotBlank(val: unknown): val is string {
  return !isBlank(val)
}

export function isNumeric(val: unknown): boolean {
  if (isNumber(val)) {
    return true
  }

  if (isBlank(val)) {
    return false
  }

  return !isNaN(toNumber(val))
}

export function randomFrom<T>(arr: T[] | ReadonlyArray<T>): T {
  return sample(arr) as T
}

export function notEmpty(val: unknown): boolean {
  return !isEmpty(val)
}

export function errorMessage(e: unknown): string {
  return get(e, 'message') as string || 'Unknown error'
}
