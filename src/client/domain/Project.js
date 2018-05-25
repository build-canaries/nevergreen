import {isBlank, isNumber} from '../common/Utils'

export const PROGNOSIS_SICK = 'sick'
export const PROGNOSIS_HEALTHY_BUILDING = 'healthy-building'
export const PROGNOSIS_SICK_BUILDING = 'sick-building'
export const PROGNOSIS_UNKNOWN = 'unknown'

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

export function isError(project) {
  return project.isError === true
}
