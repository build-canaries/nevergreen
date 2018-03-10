import _ from 'lodash'
import format from 'date-fns/format'
import subSeconds from 'date-fns/sub_seconds'
import {isBlank} from './Utils'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const ONE_MINUTE_IN_SECONDS = 60
const ONE_HOUR_IN_SECONDS = 3600
const ONE_DAY_IN_SECONDS = 86400

export function secondsToString(seconds) {
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

export function formatAsDuration(timestamp) {
  return !isBlank(timestamp) ? distanceInWordsToNow(timestamp) : 'unknown'
}

export function abbreviateDuration(duration) {
  if (isBlank(duration)) {
    return ''
  }

  return duration
    .replace('unknown', '??')
    .replace('less than a', '<1')
    .replace('about ', '')
    .replace('almost ', '')
    .replace('over ', '>')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')
    .replace(/ months?/, 'mo')
    .replace(/ years?/, 'y')
}
