import { useEffect } from 'react'
import set from 'lodash/set'

export function useUpdateBrowserTitle(
  title: string,
  faviconHref = '/canaries.svg'
): void {
  useEffect(() => {
    document.title = title
    const favicon = document.querySelector('#favicon')
    if (favicon) {
      set(favicon, 'href', faviconHref)
    }
    return () => {
      document.title = 'Nevergreen'
      if (favicon) {
        set(favicon, 'href', '/canaries.svg')
      }
    }
  }, [title, faviconHref])
}
