import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {VisuallyHidden} from './VisuallyHidden'
import {abbreviateDuration, formatAsDuration} from './DateTime'
import {useTimer} from './TimerHook'
import {isBlank} from './Utils'

const ONE_MINUTE = 60

export function Duration({timestamp, fullDescriptionPrefix, fullDescriptionSuffix, abbreviate}) {
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

Duration.propTypes = {
  abbreviate: PropTypes.bool,
  timestamp: PropTypes.string,
  fullDescriptionPrefix: PropTypes.string,
  fullDescriptionSuffix: PropTypes.string
}
