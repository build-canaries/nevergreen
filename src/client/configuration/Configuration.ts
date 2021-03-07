import * as t from 'io-ts'
import {Errors} from 'io-ts'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import last from 'lodash/last'
import unset from 'lodash/unset'
import {State} from '../Reducer'
import {fromJson, toJson} from '../common/Json'
import {migrate} from './Migrate'
import {UntrustedData} from './LocalRepository'
import {Either, flatten, left, map, mapLeft, right} from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../settings/backup/RemoteLocationsReducer'
import {SETTINGS_ROOT} from '../settings/SettingsReducer'
import {PROJECTS_ROOT} from '../tracking/ProjectsReducer'
import {SELECTED_ROOT} from '../tracking/SelectedReducer'
import {SUCCESS_ROOT} from '../settings/success/SuccessReducer'
import {TRAYS_ROOT} from '../tracking/TraysReducer'
import {APPLIED_MIGRATIONS_ROOT} from './MigrationsReducer'
import {errorMessage} from '../common/Utils'

export enum DataSource {
  BrowserStorage,
  UserImport
}

const Configuration = t.exact(t.partial({
  [SETTINGS_ROOT]: t.exact(t.partial({
    showTrayName: t.boolean,
    showBuildTime: t.boolean,
    playBrokenBuildSoundFx: t.boolean,
    brokenBuildSoundFx: t.string,
    refreshTime: t.number,
    showBuildLabel: t.boolean,
    showSystemNotifications: t.boolean,
    maxProjectsToShow: t.keyof({
      small: null,
      medium: null,
      large: null,
      all: null
    }),
    clickToShowMenu: t.boolean,
    showPrognosis: t.readonlyArray(t.keyof({
      healthy: null,
      sick: null,
      'healthy-building': null,
      'sick-building': null,
      unknown: null,
      error: null
    })),
    sort: t.keyof({
      default: null,
      description: null,
      prognosis: null,
      timestamp: null
    }),
    enableNewVersionCheck: t.boolean
  }), SETTINGS_ROOT),
  [PROJECTS_ROOT]: t.record(t.string, t.readonlyArray(t.exact(t.intersection([
    t.type({
      projectId: t.string,
      trayId: t.string,
      description: t.string
    }),
    t.partial({
      isNew: t.boolean,
      removed: t.boolean
    })
  ]))), PROJECTS_ROOT),
  [SELECTED_ROOT]: t.record(t.string, t.readonlyArray(t.string), SELECTED_ROOT),
  [SUCCESS_ROOT]: t.readonlyArray(t.string, SUCCESS_ROOT),
  [TRAYS_ROOT]: t.record(t.string, t.exact(t.intersection([
    t.type({
      trayId: t.string,
      url: t.string
    }),
    t.partial({
      authType: t.keyof({
        none: null,
        basic: null,
        token: null
      }),
      encryptedAccessToken: t.string,
      encryptedPassword: t.string,
      includeNew: t.boolean,
      name: t.string,
      serverType: t.string,
      timestamp: t.string,
      username: t.string
    })
  ])), TRAYS_ROOT),
  [APPLIED_MIGRATIONS_ROOT]: t.readonlyArray(t.exact(t.type({
    id: t.string,
    timestamp: t.string
  })), APPLIED_MIGRATIONS_ROOT),
  [BACKUP_REMOTE_LOCATIONS_ROOT]: t.record(t.string, t.exact(t.intersection([
    t.type({
      internalId: t.string,
      url: t.string,
      where: t.keyof({
        custom: null,
        github: null,
        gitlab: null
      })
    }),
    t.partial({
      exportTimestamp: t.string,
      importTimestamp: t.string,
      automaticallyExport: t.boolean,
      externalId: t.string,
      encryptedAccessToken: t.string,
      description: t.string
    })
  ])), BACKUP_REMOTE_LOCATIONS_ROOT)
}))

export type Configuration = t.TypeOf<typeof Configuration>

function validationErrorMessage(actual: unknown, path: string, expected: string) {
  return `Invalid value ${toJson(actual)} supplied to ${path} expected ${expected}`
}

function additionalFiltering(data: UntrustedData, dataSource: DataSource): void {
  if (dataSource === DataSource.UserImport) {
    unset(data, [SETTINGS_ROOT, 'showSystemNotifications'])
  }
}

function toErrorPath(errors: Errors): ReadonlyArray<string> {
  return errors.map((error) => {
    // io-ts seems to add a 0 to every context, not sure why so just remove the first instance
    const path = error.context.map((context) => context.key).join('/').replace('/0/', '/')
    return validationErrorMessage(error.value, path, last(error.context)?.type?.name || '???')
  })
}

function validateTrayIdsMatchForTrays(configuration: Configuration, errors: string[]) {
  Object.entries(configuration.trays || {}).forEach(([key, tray]) => {
    if (tray && tray.trayId !== key) {
      errors.push(validationErrorMessage(tray.trayId, `/${TRAYS_ROOT}/${key}/trayId`, toJson(key)))
    }
  })
}

function validateTrayIdsMatchForProjects(configuration: Configuration, errors: string[]) {
  Object.entries(configuration.projects || {}).forEach(([key, projects]) => {
    projects.forEach((project, i) => {
      if (project.trayId !== key) {
        errors.push(validationErrorMessage(project.trayId, `/${PROJECTS_ROOT}/${key}/${i}/trayId`, toJson(key)))
      }
    })
  })
}

function validateRemoteLocationIdsMatch(configuration: Configuration, errors: string[]) {
  Object.entries(configuration.backupRemoteLocations || {}).forEach(([key, location]) => {
    if (location && location.internalId !== key) {
      errors.push(validationErrorMessage(location.internalId, `/${BACKUP_REMOTE_LOCATIONS_ROOT}/${key}/internalId`, toJson(key)))
    }
  })
}

function additionalValidation(configuration: Configuration): Either<ReadonlyArray<string>, Configuration> {
  const errors: string[] = []

  validateTrayIdsMatchForTrays(configuration, errors)
  validateTrayIdsMatchForProjects(configuration, errors)
  validateRemoteLocationIdsMatch(configuration, errors)

  return isEmpty(errors)
    ? right(configuration)
    : left(errors)
}

function validateAndFilter(data: UntrustedData, dataSource: DataSource): Either<ReadonlyArray<string>, Configuration> {
  additionalFiltering(data, dataSource)

  return pipe(
    Configuration.decode(data),
    mapLeft(toErrorPath),
    map(additionalValidation),
    flatten)
}

export function toConfiguration(untrustedData: string | Readonly<UntrustedData>, dataSource: DataSource): Either<ReadonlyArray<string>, Configuration> {
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

export function toExportableConfigurationJson(state: State): string {
  const cloned = cloneDeep(state)

  const remoteBackups = cloned[BACKUP_REMOTE_LOCATIONS_ROOT]
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  Object.keys(remoteBackups).forEach((internalId) => {
    // @ts-ignore
    delete remoteBackups[internalId]['importTimestamp']
    // @ts-ignore
    delete remoteBackups[internalId]['exportTimestamp']
  })

  // @ts-ignore
  delete cloned[SETTINGS_ROOT]['showSystemNotifications']
  /* eslint-enable @typescript-eslint/ban-ts-comment*/

  return toJson(cloned)
}
