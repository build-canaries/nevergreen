import { post, ServerError } from './Gateway'
import { ProjectPrognosis } from '../domain/Project'
import { AuthTypes } from '../settings/tracking/FeedsReducer'

export interface FeedRequest {
  readonly authType: AuthTypes
  readonly encryptedAuth?: string
  readonly included?: ReadonlyArray<string>
  readonly serverType?: string
  readonly trayId: string
  readonly url: string
  readonly username?: string
}

export interface FeedApiError extends ServerError {
  readonly trayId: string
}

export interface ProjectApi {
  readonly description: string
  readonly lastBuildLabel: string
  readonly prognosis: ProjectPrognosis
  readonly projectId: string
  readonly serverType: string
  readonly timestamp: string
  readonly trayId: string
  readonly webUrl: string
}

export type ProjectsResponse = ReadonlyArray<FeedApiError | ProjectApi>

export interface ConnectionDetailsRequest {
  readonly authType: AuthTypes
  readonly url: string
  readonly accessToken?: string
  readonly encryptedAuth?: string
  readonly password?: string
  readonly username?: string
}

export function testFeedConnection(
  data: ConnectionDetailsRequest,
  signal?: AbortSignal,
): Promise<void> {
  return post({ url: '/api/test-connection', data, signal })
}
