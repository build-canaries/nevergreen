import {
  Prognosis,
  prognosisDisplay,
  Projects,
  sortedPrognosisByPriority,
} from '../../domain/Project'
import { useEffect, useState } from 'react'
import { useUpdateBrowserTitle } from '../../common/BrowserTitleHook'
import { FeedErrors } from '../../domain/FeedError'
import { prognosisIconsSvg } from '../../common/icons/prognosis/IconPrognosis'
import { isBlank } from '../../common/Utils'

interface Interesting {
  readonly prognosis: Prognosis
  readonly count: number
}

const defaultTitle = 'Monitor'

export function useBrowserTitleSummary(
  projects: Projects,
  feedErrors: FeedErrors,
): void {
  const [title, setTitle] = useState<string>(defaultTitle)
  const [favicon, setFavicon] = useState<string>()

  useUpdateBrowserTitle(title, favicon)

  useEffect(() => {
    const toCheck = [...feedErrors, ...projects]

    const countProjectsWithPrognosis = (prognosis: Prognosis): Interesting => {
      const withPrognosis = toCheck.filter(
        (project) => project.prognosis === prognosis,
      )
      return { prognosis, count: withPrognosis.length }
    }
    const hasProjects = (interesting: Interesting): boolean => {
      return interesting.count > 0
    }
    const summary = (interesting: Interesting): string => {
      return `${interesting.count.toString()} ${prognosisDisplay(
        interesting.prognosis,
        true,
      )}`
    }

    const activePrognosis = sortedPrognosisByPriority()
      .map(countProjectsWithPrognosis)
      .filter(hasProjects)

    const summaries = activePrognosis.map(summary)
    const title = summaries.join(', ')

    setTitle(isBlank(title) ? defaultTitle : title)

    const highestPriority = activePrognosis.at(0)
    if (highestPriority) {
      setFavicon(prognosisIconsSvg[highestPriority.prognosis])
    } else {
      setFavicon(undefined)
    }
  }, [projects, feedErrors])
}
