/* eslint-disable no-console */

export function debug(data) {
  if (process.env.NODE_ENV !== 'production') {
    if (console.debug) {
      console.debug(data)
    }
  }
}

export function info(data) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(data)
  }
}

export function warn(data) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(data)
  }
}

export function error(data, e) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(data, e)
  }
}
