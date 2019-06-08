import {useEffect} from 'react'
import {debug} from './Logger'

function asMilliseconds(seconds: number) {
  return seconds * 1000
}

export const useTimer = (onTrigger: () => void, intervalInSeconds: number) => {
  useEffect(() => {
    let cancelled = false
    let timeoutId = 0

    const run = async () => {
      await onTrigger()

      if (cancelled) {
        debug('cancelled so not rescheduling')
      } else {
        timeoutId = window.setTimeout(run, asMilliseconds(intervalInSeconds))
        debug(`created timeout [${timeoutId}] to run in [${intervalInSeconds}s]`)
      }
    }

    run()

    return () => {
      debug(`clearing timeout [${timeoutId}]`)
      window.clearTimeout(timeoutId)
      cancelled = true
    }
  }, [onTrigger, intervalInSeconds])
}
