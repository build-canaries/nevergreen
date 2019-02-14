import {useEffect} from 'react'
import ClipboardJS from 'clipboard'

export function useClipboard(elementSelector, onSuccess, onError) {
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
  }, [elementSelector])
}
