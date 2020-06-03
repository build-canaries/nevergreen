import {get, isEmpty, isNaN, isNumber, isString, sample, startsWith, toNumber, trim, lowerCase} from 'lodash'

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
  const originalMessage = get(e, 'message') as unknown
  const message = isString(originalMessage)
    ? originalMessage
    : 'Unknown error'

  if (startsWith(lowerCase(message), 'request has been terminated possible causes')) {
    return 'The network is offline or the Nevergreen server is not running'
  }

  return message
}
