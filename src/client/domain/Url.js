import {isBlank, notEmpty} from '../common/Utils'

const SCHEME_REGEX = /^https?:/i

export function hasScheme(url) {
  return !isBlank(url) && notEmpty(url.match(SCHEME_REGEX))
}

export function removeScheme(url) {
  return url && url.replace(SCHEME_REGEX, '')
}
