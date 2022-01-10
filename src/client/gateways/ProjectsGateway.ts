import {fakeRequest, post, Request, ServerError} from './Gateway'
import {Prognosis, ProjectPrognosis} from '../domain/Project'
import {SelectedState} from '../tracking/SelectedReducer'
import size from 'lodash/size'
import omit from 'lodash/omit'
import {AuthTypes, Tray} from '../domain/Tray'
import {ProjectState} from '../tracking/ProjectsReducer'

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

interface BaseFeedRequest {
  readonly authType: AuthTypes;
  readonly included?: ReadonlyArray<string>;
  readonly includeNew: boolean;
  readonly seen: ReadonlyArray<string>;
  readonly serverType?: string;
  readonly trayId: string;
  readonly url: string;
}

interface UnauthenticatedFeedRequest extends BaseFeedRequest {
  readonly authType: AuthTypes.none;
}

interface EncryptedBasicFeedRequest extends BaseFeedRequest {
  readonly authType: AuthTypes.basic;
  readonly encryptedPassword: string;
  readonly username: string;
}

interface UnencryptedBasicFeedRequest extends BaseFeedRequest {
  readonly authType: AuthTypes.basic;
  readonly password: string;
  readonly username: string;
}

interface EncryptedTokenFeedRequest extends BaseFeedRequest {
  readonly authType: AuthTypes.token;
  readonly encryptedToken: string;
}

interface UnencryptedTokenFeedRequest extends BaseFeedRequest {
  readonly authType: AuthTypes.token;
  readonly accessToken: string;
}

export type FeedRequest =
  UnauthenticatedFeedRequest
  | UnencryptedBasicFeedRequest
  | EncryptedBasicFeedRequest
  | UnencryptedTokenFeedRequest
  | EncryptedTokenFeedRequest

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

function toProjectsRequest(feed: Tray, knownProjects: ReadonlyArray<ProjectState>, selectedPerTray?: SelectedState): FeedRequest {
  const seen = knownProjects
    .filter((project) => project.trayId === feed.trayId)
    .map((project) => project.projectId)

  const included = selectedPerTray
    ? selectedPerTray[feed.trayId]
    : undefined

  return {
    ...omit(feed, 'name'),
    included,
    seen
  } as FeedRequest
}

function hasIncludedProjects(projectsRequest: FeedRequest) {
  return projectsRequest.includeNew || size(projectsRequest.included) > 0
}

export function fetchAll(trays: ReadonlyArray<Tray>, knownProjects: ReadonlyArray<ProjectState>): Request<ProjectsResponse> {
  const feeds = trays
    .map((tray) => toProjectsRequest(tray, knownProjects))

  const data: ProjectsRequest = {
    feeds,
    sort: SortBy.description
  }

  return post('/api/projects', data)
}

export function interesting(
  trays: ReadonlyArray<Tray>,
  knownProjects: ReadonlyArray<ProjectState>,
  selectedPerTray: SelectedState,
  prognosis: ReadonlyArray<Prognosis>,
  sort: SortBy
): Request<ProjectsResponse> {
  const feeds = trays
    .map((tray) => toProjectsRequest(tray, knownProjects, selectedPerTray))
    .filter(hasIncludedProjects)

  const data: ProjectsRequest = {
    feeds,
    prognosis,
    sort
  }

  return size(feeds) === 0
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
