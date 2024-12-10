import type { RootState } from '../configuration/ReduxStore'
import type { ProjectApi } from '../gateways/ProjectsGateway'
import merge from 'lodash/merge'
import {
  displaySettingsRoot,
  MaxProjectsToShow,
  SortBy,
} from '../settings/display/DisplaySettingsReducer'
import { selectedRoot } from '../settings/tracking/SelectedReducer'
import { successRoot } from '../settings/success/SuccessReducer'
import {
  AuthTypes,
  Feed,
  feedsRoot,
  ServerTypes,
  TrackingMode,
} from '../settings/tracking/FeedsReducer'
import { Prognosis, Project } from '../domain/Project'
import { RecursivePartial } from '../common/Types'
import { migrationsRoot } from '../configuration/MigrationsReducer'
import {
  RemoteLocation,
  remoteLocationsRoot,
} from '../settings/backup/RemoteLocationsReducer'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'
import { notificationsRoot } from '../settings/notifications/NotificationsReducer'
import { FeedError } from '../domain/FeedError'
import { personalSettingsRoot } from '../settings/PersonalSettingsReducer'
import { otherSettingsRoot } from '../settings/other/OtherSettingsReducer'
import { prognosisSettingsRoot } from '../settings/prognosis/PrognosisSettingsReducer'

export function buildState(
  subState: RecursivePartial<RootState> = {},
): RootState {
  const defaultState: RootState = {
    [displaySettingsRoot]: {
      maxProjectsToShow: MaxProjectsToShow.medium,
      refreshTime: 10,
      showPrognosisName: false,
      showBuildLabel: false,
      showBuildTime: false,
      showTrayName: false,
      sort: SortBy.default,
    },
    [otherSettingsRoot]: {
      clickToShowMenu: false,
    },
    [selectedRoot]: {},
    [successRoot]: {
      messages: [],
      backgroundColour: '',
      textColour: '',
    },
    [feedsRoot]: {},
    [migrationsRoot]: [],
    [remoteLocationsRoot]: {},
    [notificationsRoot]: {
      enableNewVersionCheck: true,
    },
    [personalSettingsRoot]: {
      allowAudioNotifications: false,
      allowSystemNotifications: false,
      backupRemoteLocations: {},
    },
    [prognosisSettingsRoot]: {
      [Prognosis.error]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
      [Prognosis.sick]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
      [Prognosis.sickBuilding]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
      [Prognosis.healthy]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
      [Prognosis.healthyBuilding]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
      [Prognosis.unknown]: {
        show: false,
        systemNotification: false,
        sfx: '',
        textColour: '',
        backgroundColour: '',
      },
    },
  }
  return merge(defaultState, subState)
}

export function buildFeed(feed: Partial<Feed> = {}): Feed {
  const defaultFeed: Feed = {
    trayId: 'some-id',
    url: 'http://some-url',
    authType: AuthTypes.none,
    serverType: ServerTypes.generic,
    trackingMode: TrackingMode.everything,
  }
  return merge(defaultFeed, feed)
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
  location: Partial<RemoteLocation> = {},
): RemoteLocation {
  const defaultLocation: RemoteLocation = {
    internalId: '',
    where: RemoteLocationOptions.custom,
    url: 'http://some-url',
  }
  return merge(defaultLocation, location)
}
