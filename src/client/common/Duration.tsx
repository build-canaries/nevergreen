import React, {useCallback, useState} from 'react'
import {formatAsDuration} from './DateTime'
import {useTimer} from './TimerHook'
import {isBlank} from './Utils'

interface DurationProps {
  readonly timestamp?: string | null;
  readonly prefix?: string;
  readonly suffix?: string;
}

const ONE_MINUTE = 60

export function Duration({timestamp, prefix, suffix}: DurationProps) {
  const [duration, setDuration] = useState(formatAsDuration(timestamp))

  const update = useCallback(() => setDuration(formatAsDuration(timestamp)), [timestamp])

  useTimer(update, ONE_MINUTE)

  const fullDescription = [prefix, duration, suffix]
    .filter((text) => !isBlank(text))
    .join(' ')

  return (
    <span data-locator='duration'>{fullDescription}</span>
  )
}
