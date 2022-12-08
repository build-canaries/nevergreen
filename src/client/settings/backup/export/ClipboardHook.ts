import { useEffect } from 'react'
import ClipboardJS from 'clipboard'

export function useClipboard(
  elementSelector: string,
  onSuccess: () => void,
  onError: () => void
): boolean {
  const supported = ClipboardJS.isSupported()

  useEffect(() => {
    if (!supported) {
      return
    }

    const clipboard = new ClipboardJS(elementSelector)

    clipboard.on('error', onError)

    clipboard.on('success', (evt) => {
      onSuccess()
      evt.clearSelection()
    })

    return () => {
      clipboard.destroy()
    }
  }, [elementSelector, onSuccess, onError, supported])

  return supported
}
