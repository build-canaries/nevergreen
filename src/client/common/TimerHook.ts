import {useEffect} from 'react'
import {debug} from './Logger'

type Cancel = () => void
type OnTrigger = () => (Cancel | void | Promise<Cancel> | Promise<void>)

function asMilliseconds(seconds: number) {
  return seconds * 1000
}

export const useTimer = (onTrigger: OnTrigger, intervalInSeconds: number): void => {
  useEffect(() => {
    let cancelled = false
    let timeoutId = 0
    let cancel: Cancel | void

    const run = async () => {
      cancel = await onTrigger()

      if (cancelled) {
        debug('cancelled so not rescheduling')
      } else {
        timeoutId = window.setTimeout(() => {
          void run()
        }, asMilliseconds(intervalInSeconds))
        debug(`created timeout [${timeoutId}] to run in [${intervalInSeconds}s]`)
      }
    }

    void run()

    return () => {
      debug(`clearing timeout [${timeoutId}]`)
      window.clearTimeout(timeoutId)
      cancelled = true
      if (cancel) {
        cancel()
      }
    }
  }, [onTrigger, intervalInSeconds])
}
