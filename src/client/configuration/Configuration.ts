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
import {
  remoteLocationsRoot,
  RemoteLocationsState,
} from '../settings/backup/RemoteLocationsReducer'
import {
  SettingsConfiguration,
  settingsRoot,
} from '../settings/SettingsReducer'
import {
  selectedRoot,
  SelectedState,
} from '../settings/tracking/SelectedReducer'
import {
  SuccessConfiguration,
  successRoot,
} from '../settings/success/SuccessReducer'
import { feedsRoot, FeedsState } from '../settings/tracking/FeedsReducer'
import { AppliedMigrationsState, migrationsRoot } from './MigrationsReducer'
import { errorMessage } from '../common/Utils'
import {
  NotificationsConfiguration,
  notificationsRoot,
} from '../settings/notifications/NotificationsReducer'
import {
  personalSettingsRoot,
  PersonalSettingsState,
} from '../settings/PersonalSettingsReducer'

export enum DataSource {
  systemImport,
  userImport,
}

const Configuration = t.exact(
  t.partial({
    [settingsRoot]: SettingsConfiguration,
    [selectedRoot]: SelectedState,
    [successRoot]: SuccessConfiguration,
    [feedsRoot]: FeedsState,
    [migrationsRoot]: AppliedMigrationsState,
    [remoteLocationsRoot]: RemoteLocationsState,
    [notificationsRoot]: NotificationsConfiguration,
    [personalSettingsRoot]: PersonalSettingsState,
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
  )} supplied to ${path} expected ${expected.replaceAll(
    /Readonly<(.*)>/g,
    '$1'
  )}`
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
  if (dataSource === DataSource.userImport) {
    unset(data, personalSettingsRoot)
  }

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
  unset(cloned, personalSettingsRoot)
  return toJson(cloned)
}
