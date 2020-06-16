/* eslint-disable no-console */

export function debug(message: string, ...data: unknown[]): void {
  if (process.env.NODE_ENV !== 'production') {
    if (console.debug) {
      console.debug(message, data)
    }
  }
}

export function info(message: string, ...data: unknown[]): void {
  if (process.env.NODE_ENV !== 'production') {
    console.info(message, data)
  }
}

export function warn(message: string, ...data: unknown[]): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message, data)
  }
}

export function error(message: string, e: Error): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, e)
  }
}

/* eslint-enable no-console */

export enum PerformanceMark {
  calculatingIdealFontSize = 'Calculating ideal font size',
}

const nevergreenEmoji = String.fromCodePoint(0x1F424) // baby chick

export function mark(name: PerformanceMark): void {
  if ('performance' in window) {
    performance.mark(name)
  }
}

export function measure(name: string, mark: PerformanceMark): void {
  if ('performance' in window) {
    const formattedName = `${nevergreenEmoji} ${name}`
    performance.measure(formattedName, mark)
    performance.clearMarks(mark)
    performance.clearMeasures(formattedName)
  }
}
