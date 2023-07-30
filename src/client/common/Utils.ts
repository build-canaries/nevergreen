import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import sample from 'lodash/sample'
import startsWith from 'lodash/startsWith'
import toNumber from 'lodash/toNumber'
import trim from 'lodash/trim'
import lowerCase from 'lodash/lowerCase'
import { nanoid } from '@reduxjs/toolkit'

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
  const originalMessage = get(e, 'message')
  const message = isString(originalMessage) ? originalMessage : 'Unknown error'

  if (
    startsWith(
      lowerCase(message),
      'request has been terminated possible causes',
    )
  ) {
    return 'The network is offline or the Nevergreen server is not running'
  }

  return message
}

export function createId(): string {
  return nanoid(10)
}
