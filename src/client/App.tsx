import type { RootState } from './configuration/ReduxStore'
import type { ReactElement, ReactNode } from 'react'
import React, { useEffect } from 'react'
import type { Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { UnhandledError } from './UnhandledError'
import Modal from 'react-modal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

interface AppProps {
  readonly appElement: string
  readonly store: Store<RootState>
  readonly children: ReactNode
}

export function App({ appElement, store, children }: AppProps): ReactElement {
  useEffect(() => Modal.setAppElement(appElement), [appElement])

  return (
    <UnhandledError>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </UnhandledError>
  )
}
