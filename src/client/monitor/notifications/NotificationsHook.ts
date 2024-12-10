import { Prognosis, Project, Projects } from '../../domain/Project'
import { FeedError, FeedErrors } from '../../domain/FeedError'
import { useAudioNotifications } from './AudioNotificationsHook'
import { useBrowserTitleSummary } from './BrowserTitleSummaryHook'
import { useSystemNotifications } from './SystemNotificationsHook'
import { useAppSelector } from '../../configuration/Hooks'
import { useMemo } from 'react'
import { getShowPrognosis } from '../../settings/prognosis/PrognosisSettingsReducer'

export function recentlyTransitioned(
  projectsAndErrors: ReadonlyArray<Project | FeedError>,
  prognosis: Prognosis,
): ReadonlyArray<Project | FeedError> {
  return projectsAndErrors.filter((projectOrError) => {
    return (
      projectOrError.prognosis === prognosis &&
      projectOrError.previousPrognosis !== prognosis
    )
  })
}

export function useNotifications(
  projects: Projects,
  feedErrors: FeedErrors,
  muted: boolean,
): void {
  const showPrognosis = useAppSelector(getShowPrognosis)
  const interestingProjects = useMemo(
    () =>
      projects.filter((project: Project): boolean => {
        return showPrognosis.includes(project.prognosis)
      }),
    [projects, showPrognosis],
  )

  useBrowserTitleSummary(interestingProjects, feedErrors)
  useAudioNotifications(interestingProjects, feedErrors, muted)
  useSystemNotifications(interestingProjects, feedErrors)
}
