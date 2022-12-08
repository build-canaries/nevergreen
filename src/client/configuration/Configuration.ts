import type { RootState } from './ReduxStore'
import type { UntrustedData } from './LocalRepository'
import type { Errors } from 'io-ts'
import * as t from 'io-ts'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import last from 'lodash/last'
import unset from 'lodash/unset'
import { fromJson, toJson } from '../common/Json'
import { migrate } from './Migrate'
import { Either, flatten, left, map, mapLeft, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { remoteLocationsRoot } from '../settings/backup/RemoteLocationsReducer'
import { MaxProjectsToShow, settingsRoot } from '../settings/SettingsReducer'
import { selectedRoot } from '../settings/tracking/SelectedReducer'
import { successRoot } from '../settings/success/SuccessReducer'
import { feedsRoot } from '../settings/tracking/FeedsReducer'
import { migrationsRoot } from './MigrationsReducer'
import { errorMessage } from '../common/Utils'
import { notificationsRoot } from '../settings/notifications/NotificationsReducer'
import { Prognosis } from '../domain/Project'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'
import { AuthTypes, TrackingMode } from '../domain/Feed'

export enum DataSource {
  browserStorage,
  userImport,
}

const NotificationDetails = t.exact(
  t.partial({
    systemNotification: t.boolean,
    sfx: t.string,
  })
)

const Configuration = t.exact(
  t.partial({
    [settingsRoot]: t.exact(
      t.partial({
        showTrayName: t.boolean,
        showBuildTime: t.boolean,
        refreshTime: t.number,
        showBuildLabel: t.boolean,
        maxProjectsToShow: t.keyof({
          [MaxProjectsToShow.small]: null,
          [MaxProjectsToShow.medium]: null,
          [MaxProjectsToShow.large]: null,
          [MaxProjectsToShow.all]: null,
        }),
        clickToShowMenu: t.boolean,
        showPrognosis: t.readonlyArray(
          t.keyof({
            [Prognosis.healthy]: null,
            [Prognosis.sick]: null,
            [Prognosis.healthyBuilding]: null,
            [Prognosis.sickBuilding]: null,
            [Prognosis.unknown]: null,
            [Prognosis.error]: null,
          })
        ),
        sort: t.keyof({
          default: null,
          description: null,
          prognosis: null,
          timestamp: null,
        }),
      }),
      settingsRoot
    ),
    [selectedRoot]: t.record(t.string, t.readonlyArray(t.string), selectedRoot),
    [successRoot]: t.readonlyArray(t.string, successRoot),
    [feedsRoot]: t.record(
      t.string,
      t.exact(
        t.intersection([
          t.type({
            trayId: t.string,
            url: t.string,
          }),
          t.partial({
            authType: t.keyof({
              [AuthTypes.none]: null,
              [AuthTypes.basic]: null,
              [AuthTypes.token]: null,
            }),
            encryptedAccessToken: t.string,
            encryptedPassword: t.string,
            name: t.string,
            serverType: t.string,
            timestamp: t.string,
            trackingMode: t.keyof({
              [TrackingMode.everything]: null,
              [TrackingMode.selected]: null,
            }),
            username: t.string,
          }),
        ])
      ),
      feedsRoot
    ),
    [migrationsRoot]: t.readonlyArray(
      t.exact(
        t.type({
          id: t.string,
          timestamp: t.string,
        })
      ),
      migrationsRoot
    ),
    [remoteLocationsRoot]: t.record(
      t.string,
      t.exact(
        t.intersection([
          t.type({
            internalId: t.string,
            url: t.string,
            where: t.keyof({
              [RemoteLocationOptions.custom]: null,
              [RemoteLocationOptions.gitHub]: null,
              [RemoteLocationOptions.gitLab]: null,
            }),
          }),
          t.partial({
            exportTimestamp: t.string,
            importTimestamp: t.string,
            automaticallyExport: t.boolean,
            externalId: t.string,
            encryptedAccessToken: t.string,
            description: t.string,
          }),
        ])
      ),
      remoteLocationsRoot
    ),
    [notificationsRoot]: t.exact(
      t.partial({
        allowAudioNotifications: t.boolean,
        allowSystemNotifications: t.boolean,
        enableNewVersionCheck: t.boolean,
        notifications: t.exact(
          t.partial({
            [Prognosis.error]: NotificationDetails,
            [Prognosis.sick]: NotificationDetails,
            [Prognosis.sickBuilding]: NotificationDetails,
            [Prognosis.healthyBuilding]: NotificationDetails,
            [Prognosis.unknown]: NotificationDetails,
            [Prognosis.healthy]: NotificationDetails,
          })
        ),
      }),
      notificationsRoot
    ),
  })
)

export type Configuration = t.TypeOf<typeof Configuration>

function validationErrorMessage(
  actual: unknown,
  path: string,
  expected: string
) {
  return `Invalid value ${toJson(
    actual
  )} supplied to ${path} expected ${expected}`
}

function additionalFiltering(
  data: UntrustedData,
  dataSource: DataSource
): void {
  if (dataSource === DataSource.userImport) {
    unset(data, [notificationsRoot, 'allowSystemNotifications'])
  }
}

function toErrorPath(errors: Errors): ReadonlyArray<string> {
  return errors.map((error) => {
    // io-ts seems to add a 0 to every context, not sure why so just remove the first instance
    const path = error.context
      .map((context) => context.key)
      .join('/')
      .replace('/0/', '/')
    return validationErrorMessage(
      error.value,
      path,
      last(error.context)?.type?.name || '???'
    )
  })
}

function validateFeedIdsMatchForFeeds(
  configuration: Configuration,
  errors: string[]
) {
  Object.entries(configuration.trays || {}).forEach(([key, feed]) => {
    if (feed && feed.trayId !== key) {
      errors.push(
        validationErrorMessage(
          feed.trayId,
          `/${feedsRoot}/${key}/trayId`,
          toJson(key)
        )
      )
    }
  })
}

function validateRemoteLocationIdsMatch(
  configuration: Configuration,
  errors: string[]
) {
  Object.entries(configuration.backupRemoteLocations || {}).forEach(
    ([key, location]) => {
      if (location && location.internalId !== key) {
        errors.push(
          validationErrorMessage(
            location.internalId,
            `/${remoteLocationsRoot}/${key}/internalId`,
            toJson(key)
          )
        )
      }
    }
  )
}

function additionalValidation(
  configuration: Configuration
): Either<ReadonlyArray<string>, Configuration> {
  const errors: string[] = []

  validateFeedIdsMatchForFeeds(configuration, errors)
  validateRemoteLocationIdsMatch(configuration, errors)

  return isEmpty(errors) ? right(configuration) : left(errors)
}

function validateAndFilter(
  data: UntrustedData,
  dataSource: DataSource
): Either<ReadonlyArray<string>, Configuration> {
  additionalFiltering(data, dataSource)

  return pipe(
    Configuration.decode(data),
    mapLeft(toErrorPath),
    map(additionalValidation),
    flatten
  )
}

export function toConfiguration(
  untrustedData: string | Readonly<UntrustedData>,
  dataSource: DataSource
): Either<ReadonlyArray<string>, Configuration> {
  try {
    const data = isString(untrustedData)
      ? fromJson(untrustedData)
      : cloneDeep(untrustedData)
    migrate(data)
    return validateAndFilter(data, dataSource)
  } catch (error) {
    return left([errorMessage(error)])
  }
}

export function toExportableConfigurationJson(state: RootState): string {
  const cloned = cloneDeep(state)

  const remoteBackups = cloned[remoteLocationsRoot]
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  Object.keys(remoteBackups).forEach((internalId) => {
    // @ts-ignore
    delete remoteBackups[internalId]['importTimestamp']
    // @ts-ignore
    delete remoteBackups[internalId]['exportTimestamp']
  })

  // @ts-ignore
  delete cloned[notificationsRoot]['allowSystemNotifications']
  /* eslint-enable @typescript-eslint/ban-ts-comment*/

  return toJson(cloned)
}
