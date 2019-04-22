import {useEffect} from 'react'
import {debug} from './Logger'

function asMilliseconds(seconds) {
  return seconds * 1000
}

export const useTimer = (onTrigger, intervalInSeconds) => {
  let cancelled = false
  let timeoutId

  const run = async () => {
    await onTrigger()
    if (cancelled) {
      debug('cancelled so not rescheduling')
    } else {
      timeoutId = setTimeout(run, asMilliseconds(intervalInSeconds))
      debug(`created timeout [${timeoutId}] to run in [${intervalInSeconds}s]`)
    }
  }

  useEffect(() => {
    run()
    return () => {
      debug(`clearing timeout [${timeoutId}]`)
      clearTimeout(timeoutId)
      cancelled = true
    }
  }, [onTrigger, intervalInSeconds])
}
