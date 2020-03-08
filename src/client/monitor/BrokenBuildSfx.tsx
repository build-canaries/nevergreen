import React, {useEffect, useRef} from 'react'
import {reduce, size} from 'lodash'
import {isBlank} from '../common/Utils'
import {isSick, Project, ProjectError} from '../domain/Project'
import {useSelector} from 'react-redux'
import {getBrokenBuildSoundFx, getPlayBrokenBuildSoundFx} from '../settings/SettingsReducer'

interface BrokenBuildSfxProps {
  readonly projects: ReadonlyArray<Project>;
  readonly errors: ReadonlyArray<ProjectError>;
}

export function BrokenBuildSfx({projects, errors}: BrokenBuildSfxProps) {
  const sfxNode = useRef<HTMLAudioElement>(null)
  const playBrokenBuildSounds = useSelector(getPlayBrokenBuildSoundFx)
  const brokenBuildFx = useSelector(getBrokenBuildSoundFx)

  useEffect(() => {
    const sfx = sfxNode.current
    return () => {
      if (sfx) {
        sfx.pause()
      }
    }
  }, [])

  const numberOfErrors = size(errors)
  const projectIsBroken = reduce(projects, (previous, project) => previous || isSick(project), false)
  const playBrokenSfx = playBrokenBuildSounds && !isBlank(brokenBuildFx) && (projectIsBroken || numberOfErrors > 0)

  if (!playBrokenSfx) {
    return null
  }

  return (
    <audio ref={sfxNode}
           src={brokenBuildFx}
           autoPlay
           data-locator='broken-build-sound'/>
  )
}
