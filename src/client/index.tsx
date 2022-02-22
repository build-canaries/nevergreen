import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {reducer, State} from './Reducer'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {configureStore} from '@reduxjs/toolkit'
import {save} from './configuration/SaveListener'
import {backup} from './settings/backup/AutomaticBackupListener'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppRoutes} from './AppRoutes'

const store = configureStore({reducer})
let previousState: State

store.subscribe(() => {
  const currentState = store.getState()
  void save(currentState)
  void backup(previousState, currentState, store.dispatch)
  previousState = currentState
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

Modal.setAppElement('#root')

ReactDOM.render(
  <UnhandledError>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </UnhandledError>,
  document.getElementById('root'))
