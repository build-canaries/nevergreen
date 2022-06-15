import {post, Request, ServerError} from './Gateway'
import {ProjectPrognosis} from '../domain/Project'
import {AuthTypes} from '../domain/Feed'

export enum SortBy {
  default = 'default',
  description = 'description',
  prognosis = 'prognosis',
  timestamp = 'timestamp'
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
