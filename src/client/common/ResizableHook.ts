import {useEffect} from 'react'
import {debounce} from 'lodash'

const WAIT_MS = 16
const MAX_WAIT_MS = 32
const DEBOUNCE_OPTIONS = {leading: true, trailing: true, maxWait: MAX_WAIT_MS}

export const useResizable = (onResize: () => void) => {
  useEffect(() => {
    const onResizeDebounced = debounce(onResize, WAIT_MS, DEBOUNCE_OPTIONS)
    window.addEventListener('resize', onResizeDebounced)
    return () => {
      onResizeDebounced.cancel()
      window.removeEventListener('resize', onResizeDebounced)
    }
  }, [onResize])
}
