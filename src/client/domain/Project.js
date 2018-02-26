import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import {isBlank, isNumber} from '../common/Utils'

export const PROGNOSIS_SICK = 'sick'
export const PROGNOSIS_HEALTHY_BUILDING = 'healthy-building'
export const PROGNOSIS_SICK_BUILDING = 'sick-building'
export const PROGNOSIS_UNKNOWN = 'unknown'

export function formatDuration(timestamp) {
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

export function formatBuildLabel(buildLabel, maxLength = 10) {
  if (isBlank(buildLabel)) {
    return ''
  }

  return isNumber(buildLabel)
    ? `#${buildLabel}`
    : buildLabel.substr(0, maxLength)
}

export function isSick(prognosis) {
  return prognosis === PROGNOSIS_SICK
}

export function isBuilding(prognosis) {
  return prognosis === PROGNOSIS_HEALTHY_BUILDING || prognosis === PROGNOSIS_SICK_BUILDING
}
