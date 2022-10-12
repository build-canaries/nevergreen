import {save} from './LocalRepository'
import debounce from 'lodash/debounce'
import {reducer, State} from '../Reducer'
import {configureStore} from '@reduxjs/toolkit'
import {backup} from '../settings/backup/AutomaticBackupListener'

async function saveRaw(currentState: State) {
  await save(currentState)
}

const saveDebounced = debounce(saveRaw, 200, {maxWait: 1000})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    void saveDebounced.flush()
  }
})

export const store = configureStore({reducer})

let previousState: State

store.subscribe(() => {
  const currentState = store.getState()
  void saveDebounced(currentState)
  void backup(previousState, currentState, store.dispatch)
  previousState = currentState
})
