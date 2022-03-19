import random from 'lodash/random'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import subSeconds from 'date-fns/subSeconds'
import {isBlank} from './Utils'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const oneMinuteInSeconds = 60
const oneHourInSeconds = 3600
const oneDayInSeconds = 86400

export function secondsToString(seconds: number): string {
  if (seconds < oneMinuteInSeconds) {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
  } else if (seconds < oneHourInSeconds) {
    const minutes = Math.floor(seconds / oneMinuteInSeconds)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  } else if (seconds < oneDayInSeconds) {
    const hours = Math.floor(seconds / oneHourInSeconds)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  } else {
    const days = Math.floor(seconds / oneDayInSeconds)
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }
}

export function now(): string {
  return format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')
}

export function randomDateInPast(seconds = oneDayInSeconds): string {
  return format(subSeconds(new Date(), random(0, seconds)), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')
}

export function formatAsDuration(timestamp?: string | null): string {
  return timestamp && !isBlank(timestamp)
    ? formatDistanceToNow(parseISO(timestamp))
    : 'unknown'
}
