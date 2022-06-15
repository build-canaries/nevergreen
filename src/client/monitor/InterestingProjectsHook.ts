import {useQuery} from 'react-query'
import {post, send} from '../gateways/Gateway'
import {FeedRequest, ProjectsResponse} from '../gateways/ProjectsGateway'
import {enrichProjects, Projects, toProjectError} from '../domain/Project'
import {useSelector} from 'react-redux'
import {getFeeds} from '../settings/tracking/FeedsReducer'
import {getKnownProjects, ProjectState} from '../settings/tracking/ProjectsReducer'
import {getSelectedProjects, SelectedState} from '../settings/tracking/SelectedReducer'
import {getRefreshTime, getShowPrognosis, getSort} from '../settings/SettingsReducer'
import isEmpty from 'lodash/isEmpty'
import {useState} from 'react'
import {Feed} from '../domain/Feed'
import omit from 'lodash/omit'
import size from 'lodash/size'

interface InterestingProjectsHook {
  readonly loaded: boolean;
  readonly projects: Projects;
}

function toProjectsRequest(feed: Feed, knownProjects: ReadonlyArray<ProjectState>, selectedPerFeed: SelectedState): FeedRequest {
  const seen = knownProjects
    .filter((project) => project.trayId === feed.trayId)
    .map((project) => project.projectId)

  const included = selectedPerFeed[feed.trayId]

  return {
    ...omit(feed, 'name'),
    included,
    seen
  }
}

function hasIncludedProjects(projectsRequest: FeedRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function useInterestingProjects(): InterestingProjectsHook {
  const feeds = useSelector(getFeeds)
  const knownProjects = useSelector(getKnownProjects)
  const selected = useSelector(getSelectedProjects)
  const prognosis = useSelector(getShowPrognosis)
  const sort = useSelector(getSort)
  const refreshTime = useSelector(getRefreshTime)
  const [projects, setProjects] = useState<Projects>([])

  const feedRequests = feeds
    .map((feed) => toProjectsRequest(feed, knownProjects, selected))
    .filter(hasIncludedProjects)

  const enabled = !isEmpty(feedRequests)
  const refetchInterval = refreshTime * 1000

  const {isLoading} = useQuery('interesting', async ({signal}) => {
    const data = {
      feeds: feedRequests,
      prognosis,
      sort
    }
    return await send(post<ProjectsResponse>('/api/projects', data), signal)
  }, {
    enabled,
    refetchInterval,
    refetchIntervalInBackground: true,
    onSuccess: ((response) => {
      setProjects((previouslyFetchedProjects) => {
        return enrichProjects(response, previouslyFetchedProjects)
      })
    }),
    onError: (e) => {
      setProjects([toProjectError(e)])
    }
  })
  return {
    loaded: !isLoading,
    projects
  }
}
