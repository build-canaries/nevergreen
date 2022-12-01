import {useQuery} from '@tanstack/react-query'
import {post, send} from '../gateways/Gateway'
import {FeedRequest, ProjectsResponse} from '../gateways/ProjectsGateway'
import {enrichProjects, Projects} from '../domain/Project'
import {useSelector} from 'react-redux'
import {getFeeds} from '../settings/tracking/FeedsReducer'
import {getSelectedProjects, SelectedState} from '../settings/tracking/SelectedReducer'
import {getRefreshTime, getSort} from '../settings/SettingsReducer'
import isEmpty from 'lodash/isEmpty'
import {useState} from 'react'
import {Feed} from '../domain/Feed'
import omit from 'lodash/omit'
import {enrichErrors, FeedErrors, toFeedApiError} from '../domain/FeedError'

interface InterestingProjectsHook {
  readonly loaded: boolean;
  readonly projects: Projects;
  readonly feedErrors: FeedErrors;
}

function toProjectsRequest(feed: Feed, selectedPerFeed: SelectedState): FeedRequest {
  const included = selectedPerFeed[feed.trayId]

  return {
    ...omit(feed, 'name'),
    included
  }
}

export function useInterestingProjects(): InterestingProjectsHook {
  const feeds = useSelector(getFeeds)
  const selected = useSelector(getSelectedProjects)
  const sort = useSelector(getSort)
  const refreshTime = useSelector(getRefreshTime)
  const [projects, setProjects] = useState<Projects>([])
  const [feedErrors, setFeedErrors] = useState<FeedErrors>([])

  const feedRequests = feeds
    .map((feed) => toProjectsRequest(feed, selected))

  const enabled = !isEmpty(feedRequests)
  const refetchInterval = refreshTime * 1000

  const {isLoading} = useQuery(['interesting'], async ({signal}) => {
    const data = {
      feeds: feedRequests,
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
      setFeedErrors((previousErrors) => {
        return enrichErrors(response, previousErrors)
      })
    }),
    onError: (e) => {
      setProjects([])
      setFeedErrors((previousErrors) => {
        return enrichErrors([toFeedApiError(e)], previousErrors)
      })
    }
  })
  return {
    loaded: !isLoading,
    projects,
    feedErrors
  }
}
