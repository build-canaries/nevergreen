import {isBlank, notEmpty} from '../common/Utils'

const SCHEME_REGEX = /^[a-z0-9+.-]+:/i

export function hasScheme(url) {
  return !isBlank(url) && notEmpty(url.match(SCHEME_REGEX))
}

export function removeScheme(url) {
  return url && url.replace(SCHEME_REGEX, '')
}


export function ensureHasScheme(url) {
  if (hasScheme(url)) {
    return url
  } else if (url.startsWith('//')) {
    return `http:${url}`
  } else {
    return `http://${url}`
  }
}
