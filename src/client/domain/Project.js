import _ from 'lodash'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export const PROGNOSIS_SICK = 'sick'
export const PROGNOSIS_HEALTHY_BUILDING = 'healthy-building'
export const PROGNOSIS_SICK_BUILDING = 'sick-building'
export const PROGNOSIS_UNKNOWN = 'unknown'

export function formatTimeBroken(timeBroken) {
  return timeBroken ? distanceInWordsToNow(timeBroken) : 'unknown'
}

export function abbreviateTimeBroken(formattedTimeBroken) {
  return formattedTimeBroken
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

export function formatBuildLabel(buildLabel) {
  const asNumber = _.toNumber(buildLabel)
  if (_.isNaN(asNumber)) {
    return buildLabel.substr(0, 10)
  }
  return `#${buildLabel}`
}

export function isSick(prognosis) {
  return prognosis === PROGNOSIS_SICK
}
