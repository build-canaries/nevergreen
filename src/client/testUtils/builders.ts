import merge from 'lodash/merge'
import {State} from '../Reducer'
import {MaxProjectsToShow, SETTINGS_ROOT} from '../settings/SettingsReducer'
import {SELECTED_ROOT} from '../settings/tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import {FEEDS_ROOT} from '../settings/tracking/FeedsReducer'
import {Prognosis, Project} from '../domain/Project'
import {createFeed, Feed} from '../domain/Feed'
import {RecursivePartial} from '../common/Types'
import {DEFAULT_REFRESH_TIME} from '../settings/SettingsActionCreators'
import {APPLIED_MIGRATIONS_ROOT} from '../configuration/MigrationsReducer'
import {ProjectApi, SortBy} from '../gateways/ProjectsGateway'
import {BACKUP_REMOTE_LOCATIONS_ROOT, RemoteLocation} from '../settings/backup/RemoteLocationsReducer'
import {RemoteLocationOptions} from '../settings/backup/RemoteLocationOptions'
import {NOTIFICATIONS_ROOT} from '../settings/notifications/NotificationsReducer'
import {FeedError} from '../domain/FeedError'

export function buildState(subState: RecursivePartial<State> = {}): State {
  const defaultState: State = {
    [SETTINGS_ROOT]: {
      clickToShowMenu: false,
      maxProjectsToShow: MaxProjectsToShow.medium,
      refreshTime: DEFAULT_REFRESH_TIME,
      showBuildLabel: false,
      showBuildTime: false,
      showTrayName: false,
      showPrognosis: [],
      sort: SortBy.default
    },
    [SELECTED_ROOT]: {},
    [SUCCESS_ROOT]: [],
    [FEEDS_ROOT]: {},
    [APPLIED_MIGRATIONS_ROOT]: [],
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {},
    [NOTIFICATIONS_ROOT]: {
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      enableNewVersionCheck: true,
      notifications: {}
    }
  }
  return merge(defaultState, subState)
}

export function buildFeed(feed: Partial<Feed> = {}): Feed {
  return createFeed('some-tray-id', 'http://some-url', feed)
}

export function buildProject(project: Partial<Project> = {}): Project {
  const defaultProject: Project = {
    lastBuildLabel: '',
    description: 'some-name',
    previousPrognosis: undefined,
    prognosis: Prognosis.unknown,
    projectId: 'some-project-id',
    serverType: '',
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultProject, project)
}

export function buildProjectApi(project: Partial<ProjectApi> = {}): ProjectApi {
  const defaultProject: ProjectApi = {
    lastBuildLabel: '',
    description: 'some-name',
    prognosis: Prognosis.unknown,
    projectId: 'some-project-id',
    serverType: '',
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultProject, project)
}

export function buildFeedError(feedError: Partial<FeedError> = {}): FeedError {
  const defaultFeedError: FeedError = {
    description: 'some-error',
    prognosis: Prognosis.error,
    previousPrognosis: undefined,
    timestamp: '',
    trayId: '',
    webUrl: ''
  }
  return merge(defaultFeedError, feedError)
}

export function buildRemoteBackupLocation(location: Partial<RemoteLocation> = {}): RemoteLocation {
  const defaultLocation: RemoteLocation = {
    internalId: '',
    where: RemoteLocationOptions.custom,
    url: 'http://some-url',
    exportTimestamp: '',
    importTimestamp: '',
    automaticallyExport: false,
    externalId: '',
    encryptedAccessToken: '',
    description: ''
  }
  return merge(defaultLocation, location)
}
