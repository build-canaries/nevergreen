import {useEffect, useRef} from 'react'
import {debug} from './Logger'

function asMilliseconds(seconds: number) {
  return seconds * 1000
}

export const useTimer = (onTrigger: () => void, intervalInSeconds: number) => {
  const cancelled = useRef(false)
  const timeoutId = useRef(0)

  const run = async () => {
    await onTrigger()
    if (cancelled.current) {
      debug('cancelled so not rescheduling')
    } else {
      timeoutId.current = window.setTimeout(run, asMilliseconds(intervalInSeconds))
      debug(`created timeout [${timeoutId.current}] to run in [${intervalInSeconds}s]`)
    }
  }

  useEffect(() => {
    cancelled.current = false
    run()
    return () => {
      debug(`clearing timeout [${timeoutId.current}]`)
      window.clearTimeout(timeoutId.current)
      cancelled.current = true
    }
  }, [onTrigger, intervalInSeconds])
}
