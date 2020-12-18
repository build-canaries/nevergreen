import {useEffect} from 'react'
import {isBlank} from '../../common/Utils'
import {useSelector} from 'react-redux'
import {getBrokenBuildSoundFx, getPlayBrokenBuildSoundFx} from '../../settings/SettingsReducer'
import * as log from '../../common/Logger'
import {isNewlySick, Projects} from '../../domain/Project'

export function useAudioNotifications(projects: Projects): void {
  const playBrokenBuildSounds = useSelector(getPlayBrokenBuildSoundFx)
  const brokenBuildFx = useSelector(getBrokenBuildSoundFx)

  useEffect(() => {
    if (!playBrokenBuildSounds || isBlank(brokenBuildFx)) {
      return
    }

    let sfx: HTMLAudioElement

    const playAudio = async () => {
      if (projects.some(isNewlySick)) {
        sfx = new Audio(brokenBuildFx)
        try {
          await sfx.play()
        } catch (e) {
          log.error(`Unable to play audio notification ${brokenBuildFx} because of an error`, e)
        }
      }
    }

    void playAudio()

    return () => {
      if (sfx?.paused === false) {
        sfx?.pause()
      }
    }
  }, [projects, playBrokenBuildSounds, brokenBuildFx])
}
