import {useEffect} from 'react'
import {isBlank} from '../common/Utils'
import {isError, isSick, Projects} from '../domain/Project'
import {useSelector} from 'react-redux'
import {getBrokenBuildSoundFx, getPlayBrokenBuildSoundFx} from '../settings/SettingsReducer'

export function useSoundEffect(projects: Projects): void {
  const playBrokenBuildSounds = useSelector(getPlayBrokenBuildSoundFx)
  const brokenBuildFx = useSelector(getBrokenBuildSoundFx)

  useEffect(() => {
    const projectIsBroken = projects.some((project) => isError(project) || isSick(project))
    const playBrokenSfx = playBrokenBuildSounds && !isBlank(brokenBuildFx) && projectIsBroken
    let sfx: HTMLAudioElement
    if (playBrokenSfx) {
      sfx = new Audio(brokenBuildFx)
      void sfx.play()
    }
    return () => {
      sfx?.pause()
    }
  }, [projects, playBrokenBuildSounds, brokenBuildFx])
}
