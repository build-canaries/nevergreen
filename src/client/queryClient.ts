import {QueryClient} from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})
