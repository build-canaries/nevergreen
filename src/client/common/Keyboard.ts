import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/pause/mousetrap-pause'
import {useCallback, useEffect} from 'react'

type Callback = (e: ExtendedKeyboardEvent, combo: string) => void

export function triggerShortcut(keys: string): void {
  Mousetrap.trigger(keys)
}

export function pauseShortcuts(): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  Mousetrap.pause()
}

export function unpauseShortcuts(): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  Mousetrap.unpause()
}

export function useShortcut(keys: string | string[], callback: Callback, deps: ReadonlyArray<unknown> = []): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCallback = useCallback(callback, deps)

  useEffect(() => {
    Mousetrap.bind(keys, memoCallback)
    return () => {
      Mousetrap.unbind(keys)
    }
  }, [keys, memoCallback])
}
