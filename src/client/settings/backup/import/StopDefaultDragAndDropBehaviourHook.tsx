import {useEffect} from 'react'

/** This stops the browser allowing files to be dropped anywhere in the window to open them */
export function useStopDefaultDragAndDropBehaviour(): void {
  useEffect(() => {
    const listener = (evt: DragEvent) => {
      evt.preventDefault()
    }

    window.addEventListener('dragover', listener)
    window.addEventListener('drop', listener)

    return () => {
      window.removeEventListener('dragover', listener)
      window.removeEventListener('drop', listener)
    }
  }, [])
}
