import React, { ReactElement, useEffect, useState } from 'react'
import { SuccessMessage } from '../common/SuccessMessage'
import { SuccessImage } from './SuccessImage'
import { isBlank, randomFrom } from '../common/Utils'
import { isValidHttpUrl } from '../domain/Url'
import { useSelector } from 'react-redux'
import { getSuccessMessages } from '../settings/success/SuccessReducer'
import { Projects } from '../domain/Project'
import { FeedErrors } from '../domain/FeedError'
import isEmpty from 'lodash/isEmpty'
import { getShowPrognosis } from '../settings/SettingsReducer'

interface SuccessProps {
  readonly projects: Projects
  readonly feedErrors: FeedErrors
}

export function Success({
  projects,
  feedErrors,
}: SuccessProps): ReactElement | null {
  const showPrognosis = useSelector(getShowPrognosis)
  const messages = useSelector(getSuccessMessages)
  const [message, setMessage] = useState('')

  const interestingProjects = projects.filter((project) =>
    showPrognosis.includes(project.prognosis)
  )
  const success = isEmpty(interestingProjects) && isEmpty(feedErrors)

  useEffect(() => {
    if (success) {
      setMessage(randomFrom(messages))
    }
  }, [success, messages])

  if (!success || isBlank(message)) {
    return null
  }

  if (isValidHttpUrl(message)) {
    return <SuccessImage url={message} />
  } else {
    return <SuccessMessage message={message} />
  }
}
