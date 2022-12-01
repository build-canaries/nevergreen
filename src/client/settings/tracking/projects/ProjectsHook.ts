import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {post, send} from '../../../gateways/Gateway'
import {ProjectsResponse, SortBy} from '../../../gateways/ProjectsGateway'
import {Project} from '../../../domain/Project'
import {isError as isProjectError} from '../../../domain/FeedError'
import {Feed} from '../../../domain/Feed'
import omit from 'lodash/omit'

export function useProjects(feed: Feed): UseQueryResult<ReadonlyArray<Project>, Error> {
  return useQuery(['available-projects', feed.trayId], async ({signal}) => {
    const data = {
      feeds: [{
        ...omit(feed, 'name'),
      }],
      sort: SortBy.description
    }
    const fetchedProjects = await send(post<ProjectsResponse>('/api/projects', data), signal)
    if (fetchedProjects.some(isProjectError)) {
      const errorMessages = fetchedProjects.map((projectError) => projectError.description)
      throw new Error(errorMessages.join(', '))
    }
    return fetchedProjects
  })
}
