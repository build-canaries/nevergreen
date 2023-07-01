import { useQuery } from '@tanstack/react-query'
import { post } from '../gateways/Gateway'
import { FeedRequest, ProjectsResponse } from '../gateways/ProjectsGateway'
import { enrichProjects, Projects } from '../domain/Project'
import { Feed, getFeeds } from '../settings/tracking/FeedsReducer'
import {
  getSelectedProjects,
  SelectedState,
} from '../settings/tracking/SelectedReducer'
import {
  getRefreshTime,
  getSort,
} from '../settings/display/DisplaySettingsReducer'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'
import omit from 'lodash/omit'
import { enrichErrors, FeedErrors, toFeedApiError } from '../domain/FeedError'
import { useAppSelector } from '../configuration/Hooks'

interface InterestingProjectsHook {
  readonly isLoading: boolean
  readonly projects: Projects
  readonly feedErrors: FeedErrors
}

function toProjectsRequest(
  feed: Feed,
  selectedPerFeed: SelectedState
): FeedRequest {
  const included = selectedPerFeed[feed.trayId]

  return {
    ...omit(feed, 'name'),
    included,
  }
}

export function useInterestingProjects(): InterestingProjectsHook {
  const feeds = useAppSelector(getFeeds)
  const selected = useAppSelector(getSelectedProjects)
  const sort = useAppSelector(getSort)
  const refreshTime = useAppSelector(getRefreshTime)
  const [projects, setProjects] = useState<Projects>([])
  const [feedErrors, setFeedErrors] = useState<FeedErrors>([])

  const feedRequests = feeds.map((feed) => toProjectsRequest(feed, selected))

  const enabled = !isEmpty(feedRequests)
  const refetchInterval = refreshTime * 1000

  const { isLoading, data, error } = useQuery(
    ['interesting'],
    async ({ signal }) => {
      const data = {
        feeds: feedRequests,
        sort,
      }
      return await post<ProjectsResponse>({
        url: '/api/projects',
        data,
        signal,
      })
    },
    {
      enabled,
      refetchInterval,
      refetchIntervalInBackground: true,
    }
  )

  useEffect(() => {
    if (data) {
      setProjects((previouslyFetchedProjects) =>
        enrichProjects(data, previouslyFetchedProjects)
      )
      setFeedErrors((previousErrors) => enrichErrors(data, previousErrors))
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setProjects([])
      setFeedErrors((previousErrors) =>
        enrichErrors([toFeedApiError(error)], previousErrors)
      )
    }
  }, [error])

  return {
    isLoading,
    projects,
    feedErrors,
  }
}
