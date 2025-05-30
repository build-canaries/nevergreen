import { save } from './LocalRepository'
import debounce from 'lodash/debounce'
import { configureStore } from '@reduxjs/toolkit'
import { backup } from '../settings/backup/AutomaticBackupListener'
import { combineReducers } from 'redux'
import {
  displaySettingsRoot,
  reducer as displaySettingsReducer,
} from '../settings/display/DisplaySettingsReducer'
import {
  reducer as selectedReducer,
  selectedRoot,
} from '../settings/tracking/SelectedReducer'
import {
  reducer as successReducer,
  successRoot,
} from '../settings/success/SuccessReducer'
import {
  feedsRoot,
  reducer as feedsReducer,
} from '../settings/tracking/FeedsReducer'
import {
  migrationsRoot,
  reducer as migrationsReducer,
} from './MigrationsReducer'
import {
  reducer as remoteLocationsReducer,
  remoteLocationsRoot,
} from '../settings/backup/RemoteLocationsReducer'
import {
  notificationsRoot,
  reducer as notificationsReducer,
} from '../settings/notifications/NotificationsReducer'
import {
  personalSettingsRoot,
  reducer as personalSettingsReducer,
} from '../settings/PersonalSettingsReducer'
import {
  otherSettingsRoot,
  reducer as otherSettingsReducer,
} from '../settings/other/OtherSettingsReducer'
import {
  prognosisSettingsRoot,
  reducer as prognosisSettingsReducer,
} from '../settings/prognosis/PrognosisSettingsReducer'

async function saveRaw(currentState: RootState) {
  await save(currentState)
}

const saveDebounced = debounce(saveRaw, 200, { maxWait: 1000 })

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    void saveDebounced.flush()
  }
})

export const reducer = combineReducers({
  [displaySettingsRoot]: displaySettingsReducer,
  [otherSettingsRoot]: otherSettingsReducer,
  [selectedRoot]: selectedReducer,
  [successRoot]: successReducer,
  [feedsRoot]: feedsReducer,
  [migrationsRoot]: migrationsReducer,
  [remoteLocationsRoot]: remoteLocationsReducer,
  [notificationsRoot]: notificationsReducer,
  [personalSettingsRoot]: personalSettingsReducer,
  [prognosisSettingsRoot]: prognosisSettingsReducer,
})

export const store = configureStore({ reducer })

let previousState: RootState

store.subscribe(() => {
  const currentState = store.getState()
  void saveDebounced(currentState)
  void backup(previousState, currentState, store.dispatch)
  previousState = currentState
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
