import {useEffect} from 'react'
import set from 'lodash/set'

export interface UpdateBrowserTitleHookProps {
  readonly title: string;
  readonly faviconHref?: string;
}

export function useUpdateBrowserTitle({title, faviconHref = '/canaries.svg'}: UpdateBrowserTitleHookProps): void {
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
