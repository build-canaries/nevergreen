import {fakeRequest, post, Request, ServerError} from './Gateway'
import {Prognosis, ProjectPrognosis} from '../domain/Project'
import {SelectedState} from '../settings/tracking/SelectedReducer'
import size from 'lodash/size'
import omit from 'lodash/omit'
import {AuthTypes, Feed} from '../domain/Feed'
import {ProjectState} from '../settings/tracking/ProjectsReducer'

export enum SortBy {
  default = 'default',
  description = 'description',
  prognosis = 'prognosis',
  timestamp = 'timestamp'
}

interface ProjectsRequest {
  readonly feeds: ReadonlyArray<FeedRequest>;
  readonly prognosis?: ReadonlyArray<Prognosis>;
  readonly sort?: SortBy;
}

export interface FeedRequest {
  readonly authType: AuthTypes;
  readonly encryptedPassword?: string;
  readonly encryptedToken?: string;
  readonly includeNew: boolean;
  readonly included?: ReadonlyArray<string>;
  readonly seen: ReadonlyArray<string>;
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
  readonly username?: string;
}

export interface ProjectError extends ServerError {
  readonly trayId: string;
}

export interface ProjectApi {
  readonly description: string;
  readonly isNew: boolean;
  readonly lastBuildLabel: string;
  readonly prognosis: ProjectPrognosis;
  readonly projectId: string;
  readonly serverType: string;
  readonly timestamp: string;
  readonly trayId: string;
  readonly webUrl: string;
}

export type ProjectsResponse = ReadonlyArray<ProjectError | ProjectApi>

function toProjectsRequest(feed: Feed, knownProjects: ReadonlyArray<ProjectState>, selectedPerFeed?: SelectedState): FeedRequest {
  const seen = knownProjects
    .filter((project) => project.trayId === feed.trayId)
    .map((project) => project.projectId)

  const included = selectedPerFeed
    ? selectedPerFeed[feed.trayId]
    : undefined

  return {
    ...omit(feed, 'name'),
    included,
    seen
  }
}

function hasIncludedProjects(projectsRequest: FeedRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(feeds: ReadonlyArray<Feed>, knownProjects: ReadonlyArray<ProjectState>): Request<ProjectsResponse> {
  const feedRequests = feeds
    .map((feed) => toProjectsRequest(feed, knownProjects))

  const data: ProjectsRequest = {
    feeds: feedRequests,
    sort: SortBy.description
  }

  return post('/api/projects', data)
}

export function interesting(
  feeds: ReadonlyArray<Feed>,
  knownProjects: ReadonlyArray<ProjectState>,
  selectedPerTray: SelectedState,
  prognosis: ReadonlyArray<Prognosis>,
  sort: SortBy
): Request<ProjectsResponse> {
  const feedRequests = feeds
    .map((feed) => toProjectsRequest(feed, knownProjects, selectedPerTray))
    .filter(hasIncludedProjects)

  const data: ProjectsRequest = {
    feeds: feedRequests,
    prognosis,
    sort
  }

  return size(feedRequests) === 0
    ? fakeRequest([])
    : post('/api/projects', data)
}

interface ConnectionDetailsRequest {
  readonly authType: AuthTypes;
  readonly url: string;
  readonly accessToken?: string;
  readonly encryptedAccessToken?: string;
  readonly password?: string;
  readonly encryptedPassword?: string;
  readonly username?: string;
}

export function testFeedConnection(details: ConnectionDetailsRequest): Request<void> {
  return post('/api/test-connection', details)
}
