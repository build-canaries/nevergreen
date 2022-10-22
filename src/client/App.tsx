import React, {ReactElement, ReactNode, useEffect} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {UnhandledError} from './UnhandledError'
import Modal from 'react-modal'
import {QueryClientProvider} from 'react-query'
import {queryClient} from './queryClient'
import {Store} from '@reduxjs/toolkit'
import {State} from './Reducer'

interface AppProps {
  readonly appElement: string;
  readonly store: Store<State>;
  readonly children: ReactNode;
}

export function App({appElement, store, children}: AppProps): ReactElement {
  useEffect(() => Modal.setAppElement(appElement), [appElement])

  return (
    <UnhandledError>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </UnhandledError>
  )
}
