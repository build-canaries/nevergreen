import type { RootState } from './ReduxStore'
import type { UntrustedData } from './LocalRepository'
import cloneDeep from 'lodash/cloneDeep'
import isString from 'lodash/isString'
import unset from 'lodash/unset'
import { fromJson, toJson } from '../common/Json'
import { migrate } from './Migrate'
import {
  remoteLocationsRoot,
  RemoteLocationsState,
} from '../settings/backup/RemoteLocationsReducer'
import {
  DisplaySettingsConfiguration,
  displaySettingsRoot,
} from '../settings/display/DisplaySettingsReducer'
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
import {
  NotificationsConfiguration,
  notificationsRoot,
} from '../settings/notifications/NotificationsReducer'
import {
  personalSettingsRoot,
  PersonalSettingsState,
} from '../settings/PersonalSettingsReducer'
import {
  otherSettingsRoot,
  OtherSettingsState,
} from '../settings/other/OtherSettingsReducer'
import { z } from 'zod'
import { errorMessage } from '../common/Utils'

export enum DataSource {
  systemImport,
  userImport,
}

const Configuration = z
  .object({
    [displaySettingsRoot]: DisplaySettingsConfiguration,
    [otherSettingsRoot]: OtherSettingsState,
    [selectedRoot]: SelectedState,
    [successRoot]: SuccessConfiguration,
    [feedsRoot]: FeedsState.superRefine(validateFeedIdsMatchForFeeds),
    [migrationsRoot]: AppliedMigrationsState,
    [remoteLocationsRoot]: RemoteLocationsState.superRefine(
      validateRemoteLocationIdsMatch
    ),
    [notificationsRoot]: NotificationsConfiguration,
    [personalSettingsRoot]: PersonalSettingsState,
  })
  .partial()

export type Configuration = z.infer<typeof Configuration>

function validateIdsMatch<K extends string>(
  o: Record<string, Record<K, string>>,
  ctx: z.RefinementCtx,
  idKey: K
) {
  Object.entries(o).forEach(([key, val]) => {
    if (val && val[idKey] !== key) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Mismatched ID expected "${key}", received "${val[idKey]}"`,
        path: [key, idKey],
      })
    }
  })
}

function validateFeedIdsMatchForFeeds(feeds: FeedsState, ctx: z.RefinementCtx) {
  validateIdsMatch<'trayId'>(feeds, ctx, 'trayId')
}

function validateRemoteLocationIdsMatch(
  backupRemoteLocations: RemoteLocationsState,
  ctx: z.RefinementCtx
) {
  validateIdsMatch<'internalId'>(backupRemoteLocations, ctx, 'internalId')
}

function validateAndFilter(
  data: UntrustedData,
  dataSource: DataSource
): Configuration {
  if (dataSource === DataSource.userImport) {
    unset(data, personalSettingsRoot)
  }

  return Configuration.parse(data)
}

export function toConfiguration(
  untrustedData: string | Readonly<UntrustedData>,
  dataSource: DataSource
): Configuration {
  const data = isString(untrustedData)
    ? fromJson(untrustedData)
    : cloneDeep(untrustedData)
  migrate(data)
  return validateAndFilter(data, dataSource)
}

export function toExportableConfigurationJson(state: RootState): string {
  const cloned = cloneDeep(state)
  unset(cloned, personalSettingsRoot)
  return toJson(cloned)
}

function formatZodIssue(zi: z.ZodIssue): string {
  return `${zi.message} at $.${zi.path.join('.')}`
}

export function formatConfigurationErrorMessages(
  err: unknown
): ReadonlyArray<string> {
  if (err instanceof z.ZodError) {
    return err.issues.map(formatZodIssue)
  } else {
    return [errorMessage(err)]
  }
}
