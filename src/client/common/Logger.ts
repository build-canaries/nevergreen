/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debug(message: string, ...data: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    if (console.debug) {
      console.debug(message, data)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function info(message: string, ...data: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(message, data)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(message: string, ...data: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message, data)
  }
}

export function error(message: string, e: Error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, e)
  }
}
