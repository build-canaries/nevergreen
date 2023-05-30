import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import { isBlank } from './Utils'
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
  return formatISO(new Date())
}

export function formatAsDuration(timestamp?: string | null): string {
  return timestamp && !isBlank(timestamp)
    ? formatDistanceToNow(parseISO(timestamp))
    : 'unknown'
}
