import {Prognosis, prognosisDisplay, Projects} from '../../domain/Project'
import {useEffect, useState} from 'react'
import capitalize from 'lodash/capitalize'
import {notificationIcons} from '../../settings/notifications/icons/NotificationIcon'
import {useUpdateBrowserTitle} from '../../common/BrowserTitleHook'
import {reversePrognosisPriority} from './NotificationsHook'
import {useSelector} from 'react-redux'
import {getShowPrognosis} from '../../settings/SettingsReducer'
import {FeedErrors} from '../../domain/FeedError'

const defaultTitle = 'Monitor'

export function useBrowserTitleSummary(projects: Projects, feedErrors: FeedErrors): void {
  const showPrognosis = useSelector(getShowPrognosis)
  const [title, setTitle] = useState<string>(defaultTitle)
  const [favicon, setFavicon] = useState<string>()

  useUpdateBrowserTitle(title, favicon)

  useEffect(() => {
    const toCheck = [...feedErrors, ...projects]
    const summaries = [...reversePrognosisPriority]
      .reverse()
      .filter((prognosis) => prognosis === Prognosis.error || showPrognosis.includes(prognosis))
      .filter((prognosis) => {
        const withPrognosis = toCheck.filter((project) => project.prognosis === prognosis)
        return withPrognosis.length > 0
      })
      .map((prognosis) => {
        const withPrognosis = toCheck.filter((project) => project.prognosis === prognosis)
        return `${withPrognosis.length} ${capitalize(prognosisDisplay(prognosis))}`
      })

    setTitle(summaries.join(', ') || defaultTitle)

    reversePrognosisPriority
      .forEach((prognosis) => {
        const withPrognosis = toCheck.filter((project) => project.prognosis === prognosis)
        if (withPrognosis.length > 0) {
          setFavicon(notificationIcons[prognosis])
        }
      })
  }, [projects, feedErrors, showPrognosis])
}
