import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {reducer, State} from './Reducer'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from '@reduxjs/toolkit'
import {save} from './configuration/SaveListener'
import {backup} from './settings/backup/AutomaticBackupListener'
import {QueryClientProvider} from 'react-query'
import {AppRoutes} from './AppRoutes'
import {queryClient} from './queryClient'

const store = configureStore({reducer})
let previousState: State

store.subscribe(() => {
  const currentState = store.getState()
  void save(currentState)
  void backup(previousState, currentState, store.dispatch)
  previousState = currentState
})

Modal.setAppElement('#root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

root.render(<UnhandledError>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
</UnhandledError>)
