import { Prognosis, Project, Projects } from '../../domain/Project'
import { FeedError, FeedErrors } from '../../domain/FeedError'
import { useAudioNotifications } from './AudioNotificationsHook'
import { useBrowserTitleSummary } from './BrowserTitleSummaryHook'
import { useSystemNotifications } from './SystemNotificationsHook'

export function recentlyTransitioned(
  projects: ReadonlyArray<Project | FeedError>,
  prognosis: Prognosis
) {
  return projects.filter((project) => {
    return (
      project.prognosis === prognosis && project.previousPrognosis !== prognosis
    )
  })
}

export const reversePrognosisPriority = [
  Prognosis.healthy,
  Prognosis.unknown,
  Prognosis.healthyBuilding,
  Prognosis.sickBuilding,
  Prognosis.sick,
  Prognosis.error,
]

export function useNotifications(
  projects: Projects,
  feedErrors: FeedErrors
): void {
  useBrowserTitleSummary(projects, feedErrors)
  useAudioNotifications(projects, feedErrors)
  useSystemNotifications(projects, feedErrors)
}
