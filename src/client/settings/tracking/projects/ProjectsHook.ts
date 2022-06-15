import {useQuery, UseQueryResult} from 'react-query'
import {post, send} from '../../../gateways/Gateway'
import {ProjectsResponse, SortBy} from '../../../gateways/ProjectsGateway'
import {isError as isProjectError, Projects} from '../../../domain/Project'
import {Feed} from '../../../domain/Feed'
import omit from 'lodash/omit'
import {projectsFetched} from '../TrackingActionCreators'
import {useDispatch} from 'react-redux'

export function useProjects(feed: Feed, enabled: boolean): UseQueryResult<Projects, Error> {
  const dispatch = useDispatch()
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
  }, {
    enabled,
    onSuccess: (res) => {
      dispatch(projectsFetched(feed.trayId, res, feed.includeNew))
    }
  })
}
