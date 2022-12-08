import merge from 'lodash/merge'
import type { RootState } from '../configuration/ReduxStore'
import {
  MaxProjectsToShow,
  settingsRoot as settingsName,
} from '../settings/SettingsReducer'
import { selectedRoot as selectedName } from '../settings/tracking/SelectedReducer'
import { successRoot as successName } from '../settings/success/SuccessReducer'
import { feedsRoot as feedsName } from '../settings/tracking/FeedsReducer'
import { Prognosis, Project } from '../domain/Project'
import { createFeed, Feed } from '../domain/Feed'
import { RecursivePartial } from '../common/Types'
import { migrationsRoot as migrationsName } from '../configuration/MigrationsReducer'
import { ProjectApi, SortBy } from '../gateways/ProjectsGateway'
import {
  remoteLocationsRoot as remoteLocationsName,
  RemoteLocation,
} from '../settings/backup/RemoteLocationsReducer'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'
import { notificationsRoot as notificationsName } from '../settings/notifications/NotificationsReducer'
import { FeedError } from '../domain/FeedError'

export function buildState(
  subState: RecursivePartial<RootState> = {}
): RootState {
  const defaultState: RootState = {
    [settingsName]: {
      clickToShowMenu: false,
      maxProjectsToShow: MaxProjectsToShow.medium,
      refreshTime: 10,
      showBuildLabel: false,
      showBuildTime: false,
      showTrayName: false,
      showPrognosis: [],
      sort: SortBy.default,
    },
    [selectedName]: {},
    [successName]: [],
    [feedsName]: {},
    [migrationsName]: [],
    [remoteLocationsName]: {},
    [notificationsName]: {
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      enableNewVersionCheck: true,
      notifications: {},
    },
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
    webUrl: '',
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
    webUrl: '',
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
    webUrl: '',
  }
  return merge(defaultFeedError, feedError)
}

export function buildRemoteBackupLocation(
  location: Partial<RemoteLocation> = {}
): RemoteLocation {
  const defaultLocation: RemoteLocation = {
    internalId: '',
    where: RemoteLocationOptions.custom,
    url: 'http://some-url',
    exportTimestamp: '',
    importTimestamp: '',
    automaticallyExport: false,
    externalId: '',
    encryptedAccessToken: '',
    description: '',
  }
  return merge(defaultLocation, location)
}
