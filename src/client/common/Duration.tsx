import React, {useMemo, useState} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {abbreviateDuration, formatAsDuration} from './DateTime'
import {useTimer} from './TimerHook'
import {isBlank} from './Utils'

interface DurationProps {
  abbreviate?: boolean;
  timestamp?: string | null;
  fullDescriptionPrefix?: string;
  fullDescriptionSuffix?: string;
}

const ONE_MINUTE = 60

export function Duration({timestamp, fullDescriptionPrefix, fullDescriptionSuffix, abbreviate}: DurationProps) {
  const [duration, setDuration] = useState(formatAsDuration(timestamp))

  const update = useMemo(() => () => setDuration(formatAsDuration(timestamp)), [timestamp])

  useTimer(update, ONE_MINUTE)

  const fullDescription = [fullDescriptionPrefix, duration, fullDescriptionSuffix]
    .filter((text) => !isBlank(text))
    .join(' ')

  return (
    <>
      {abbreviate && (
        <>
          <VisuallyHidden>{fullDescription}.</VisuallyHidden>
          <span data-locator='duration' aria-hidden>
            {abbreviateDuration(duration)}
          </span>
        </>
      )}
      {!abbreviate && (
        <span data-locator='duration'>{fullDescription}</span>
      )}
    </>
  )
}
