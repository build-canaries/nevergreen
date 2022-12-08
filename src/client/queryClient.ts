import { QueryClient } from '@tanstack/react-query'
import noop from 'lodash/noop'

export const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: noop,
  },
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
