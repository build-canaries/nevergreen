import type { Feed } from '../FeedsReducer'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { post } from '../../../gateways/Gateway'
import { ProjectsResponse } from '../../../gateways/ProjectsGateway'
import { Project } from '../../../domain/Project'
import { isError as isProjectError } from '../../../domain/FeedError'
import omit from 'lodash/omit'
import { SortBy } from '../../display/DisplaySettingsReducer'

export function useProjects(
  feed: Feed,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
): UseQueryResult<ReadonlyArray<Project>, Error> {
  return useQuery({
    queryKey: ['available-projects', feed.trayId],
    queryFn: async ({ signal }) => {
      const data = {
        feeds: [
          {
            ...omit(feed, 'name'),
          },
        ],
        sort: SortBy.description,
      }
      const fetchedProjects = await post<ProjectsResponse>({
        url: '/api/projects',
        data,
        signal,
      })
      if (fetchedProjects.some(isProjectError)) {
        const errorMessages = fetchedProjects.map(
          (projectError) => projectError.description,
        )
        throw new Error(errorMessages.join(', '))
      }
      return fetchedProjects
    },
  })
}
