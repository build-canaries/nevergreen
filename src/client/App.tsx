import type { RootState } from './configuration/ReduxStore'
import type { ReactElement } from 'react'
import type { Router } from '@remix-run/router'
import type { Store } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { UnhandledError } from './UnhandledError'
import Modal from 'react-modal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

interface AppProps {
  readonly appElement: string
  readonly store: Store<RootState>
  readonly router: Router
}

export function App({ appElement, store, router }: AppProps): ReactElement {
  useEffect(() => {
    Modal.setAppElement(appElement)
  }, [appElement])

  return (
    <UnhandledError>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </UnhandledError>
  )
}
