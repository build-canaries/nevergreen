import {error, info} from './common/Logger'

export async function registerServiceWorker(notify: (message: string) => void): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      registration.onupdatefound = () => {
        const installingWorker = registration.installing

        if (installingWorker) {
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  notify('New content is available, refresh to update')
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
