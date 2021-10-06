import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'
import {errorMessage, isBlank} from '../../common/Utils'
import {Input} from '../../common/forms/Input'
import {Checkbox} from '../../common/forms/Checkbox'
import {SecondaryButton} from '../../common/forms/Button'
import {useDispatch, useSelector} from 'react-redux'
import {getBrokenBuildSoundFx, getPlayBrokenBuildSoundFx} from '../SettingsReducer'
import {setBrokenBuildSoundFx, setPlayBrokenBuildSoundFx} from '../SettingsActionCreators'
import styles from './notifications-audio.scss'
import {Stop} from '../../common/icons/Stop'
import {Play} from '../../common/icons/Play'

function pause(audio?: HTMLAudioElement) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export function NotificationsAudio(): ReactElement {
  const dispatch = useDispatch()
  const brokenBuildSoundFx = useSelector(getBrokenBuildSoundFx)
  const playBrokenBuildSoundFx = useSelector(getPlayBrokenBuildSoundFx)

  const [audioError, setAudioError] = useState('')
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [soundFx, setSoundFx] = useState(brokenBuildSoundFx)
  const [playEnabled, setPlayEnabled] = useState(!isBlank(brokenBuildSoundFx))
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setSoundFx(brokenBuildSoundFx)
    setPlayEnabled(!isBlank(brokenBuildSoundFx))
  }, [brokenBuildSoundFx])

  const updateSoundFx = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSoundFx(target.value)
    setAudioError('')
  }

  const setSoundFxX = () => dispatch(setBrokenBuildSoundFx(soundFx))

  const audioStopped = () => {
    setAudio(undefined)
    setPlaying(false)
  }

  const play = async () => {
    const audio = new Audio(soundFx)
    audio.addEventListener('ended', audioStopped)

    setAudio(audio)
    setAudioError('')
    setPlaying(true)

    try {
      await audio.play()
    } catch (e) {
      setPlaying(false)
      setAudioError(errorMessage(e))
    }
  }

  const stop = () => {
    pause(audio)
    audioStopped()
  }

  useEffect(() => {
    return () => {
      pause(audio)
    }
  }, [audio])

  const playingDisabled = isBlank(soundFx) || !playEnabled

  return (
    <>
      <Checkbox checked={playBrokenBuildSoundFx}
                onToggle={(newValue) => dispatch(setPlayBrokenBuildSoundFx(newValue))}
                data-locator='play-sounds'>
        Play audio notifications
      </Checkbox>
      <Input placeholder='audio file URL'
             onChange={updateSoundFx}
             value={soundFx}
             onBlur={setSoundFxX}
             onEnter={setSoundFxX}
             required={playBrokenBuildSoundFx}
             disabled={playing}
             error={audioError}>
        Broken build sound
      </Input>
      <SecondaryButton onClick={playing ? stop : play}
                       disabled={playingDisabled}
                       aria-disabled={playingDisabled}
                       icon={playing ? <Stop/> : <Play/>}
                       className={styles.play}>
        {playing
          ? 'Stop broken build sound'
          : 'Preview broken build sound'}
      </SecondaryButton>
    </>
  )
}
