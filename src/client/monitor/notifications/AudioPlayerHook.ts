import {useEffect} from 'react'
import {isNotBlank} from '../../common/Utils'
import {playAudio, stopAudio} from '../../common/AudioPlayer'
import {error} from '../../common/Logger'

export function usePlayAudio(src: string): void {
  useEffect(() => {
    if (isNotBlank(src)) {
      try {
        void playAudio(src)
      } catch (e) {
        error('Unable to play audio', e)
      }
    }
    return () => {
      stopAudio(src)
    }
  }, [src])
}
