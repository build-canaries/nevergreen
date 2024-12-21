import type { RootState } from './configuration/ReduxStore'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import type { Store } from '@reduxjs/toolkit'
import type { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { UnhandledError } from './UnhandledError'
import Modal from 'react-modal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

interface AppProps {
  readonly appElement: string
  readonly store: Store<RootState>
  readonly router: ReturnType<typeof createBrowserRouter>
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
