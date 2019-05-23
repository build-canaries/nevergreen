import {isBlank, notEmpty} from '../common/Utils'

const SCHEME_REGEX = /^[a-z0-9+.-]+:/i

export function hasScheme(url: string) {
  return !isBlank(url) && notEmpty(url.match(SCHEME_REGEX))
}

export function removeScheme(url: string) {
  return url.replace(SCHEME_REGEX, '')
}


export function ensureHasScheme(url: string) {
  if (hasScheme(url)) {
    return url
  } else if (url.startsWith('//')) {
    return `http:${url}`
  } else {
    return `http://${url}`
  }
}
