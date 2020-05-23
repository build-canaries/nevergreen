import {useEffect} from 'react'
import ClipboardJS, {Event} from 'clipboard'

export function useClipboard(elementSelector: string, onSuccess: (evt: Event) => void, onError: (evt: Event) => void): void {
  useEffect(() => {
    const clipboard = new ClipboardJS(elementSelector)

    clipboard.on('error', (evt) => onError(evt))

    clipboard.on('success', (evt) => {
      onSuccess(evt)
      evt.clearSelection()
    })

    return () => {
      clipboard.destroy()
    }
  }, [elementSelector, onSuccess, onError])
}
