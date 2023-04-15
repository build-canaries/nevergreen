import { Prognosis, prognosisDisplay, Projects } from '../../domain/Project'
import { useEffect, useState } from 'react'
import capitalize from 'lodash/capitalize'
import { useUpdateBrowserTitle } from '../../common/BrowserTitleHook'
import { getShowPrognosis } from '../../settings/display/DisplaySettingsReducer'
import { FeedErrors } from '../../domain/FeedError'
import { useAppSelector } from '../../configuration/Hooks'
import { prognosisIconsSvg } from '../../common/icons/prognosis/IconPrognosis'

interface Interesting {
  readonly prognosis: Prognosis
  readonly count: number
}

const defaultTitle = 'Monitor'

export function useBrowserTitleSummary(
  projects: Projects,
  feedErrors: FeedErrors
): void {
  const showPrognosis = useAppSelector(getShowPrognosis)
  const [title, setTitle] = useState<string>(defaultTitle)
  const [favicon, setFavicon] = useState<string>()

  useUpdateBrowserTitle(title, favicon)

  useEffect(() => {
    const toCheck = [...feedErrors, ...projects]

    const isBeingShown = (prognosis: Prognosis): boolean => {
      return prognosis === Prognosis.error || showPrognosis.includes(prognosis)
    }
    const countProjectsWithPrognosis = (prognosis: Prognosis): Interesting => {
      const withPrognosis = toCheck.filter(
        (project) => project.prognosis === prognosis
      )
      return { prognosis, count: withPrognosis.length }
    }
    const hasProjects = (interesting: Interesting): boolean => {
      return interesting.count > 0
    }
    const summary = (interesting: Interesting): string => {
      return `${interesting.count} ${capitalize(
        prognosisDisplay(interesting.prognosis)
      )}`
    }

    const activePrognosis = Object.values(Prognosis)
      .filter(isBeingShown)
      .map(countProjectsWithPrognosis)
      .filter(hasProjects)

    const summaries = activePrognosis.map(summary)

    setTitle(summaries.join(', ') || defaultTitle)

    const highestPriority = activePrognosis.at(0)
    if (highestPriority) {
      setFavicon(prognosisIconsSvg[highestPriority.prognosis])
    }
  }, [projects, feedErrors, showPrognosis])
}
