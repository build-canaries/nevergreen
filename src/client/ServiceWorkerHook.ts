import { useEffect } from 'react'
import { error, info } from './common/Logger'

export function useServiceWorker(showBanner: (message: string) => void): void {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if (
        process.env.NODE_ENV === 'production' &&
        'serviceWorker' in navigator
      ) {
        try {
          const registration =
            await navigator.serviceWorker.register('/service-worker.js')
          registration.onupdatefound = () => {
            const installingWorker = registration.installing

            if (installingWorker) {
              installingWorker.onstatechange = () => {
                switch (installingWorker.state) {
                  case 'installed':
                    if (navigator.serviceWorker.controller) {
                      showBanner(
                        'A new version is available, refresh to update!',
                      )
                    } else {
                      info('Content is now available offline')
                    }
                    break
                  case 'redundant':
                    info('The installing service worker became redundant')
                    break
                }
              }
            }
          }
          info('Service worker registration successful', registration)
        } catch (err) {
          error('Service worker registration failed', err)
        }
      }
    }

    void registerServiceWorker()
  }, [showBanner])
}
