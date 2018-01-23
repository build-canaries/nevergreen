/* eslint-disable no-console */

export function debug(message, ...data) {
  if (process.env.NODE_ENV !== 'production') {
    if (console.debug) {
      console.debug(message, data)
    }
  }
}

export function info(message, ...data) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(message, data)
  }
}

export function warn(message, ...data) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message, data)
  }
}

export function error(message, e) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, e)
  }
}
