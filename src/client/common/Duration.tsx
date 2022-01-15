import React, {ReactElement} from 'react'
import {formatAsDuration} from './DateTime'
import {isBlank} from './Utils'
import {useQuery} from 'react-query'

interface DurationProps {
  readonly timestamp?: string | null;
  readonly prefix?: string;
  readonly suffix?: string;
}

export function Duration({timestamp, prefix, suffix}: DurationProps): ReactElement {
  const {data: duration} = useQuery(['duration', timestamp],
    () => formatAsDuration(timestamp),
    {
      initialData: formatAsDuration(timestamp),
      refetchInterval: 60 * 1000,
      refetchIntervalInBackground: true
    })

  const fullDescription = [prefix, duration, suffix]
    .filter((text) => !isBlank(text))
    .join(' ')

  return (
    <span data-locator='duration'>{fullDescription}</span>
  )
}
