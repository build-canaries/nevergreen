import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'
import {errorMessage, isBlank} from '../common/Utils'
import {Messages, MessagesType} from '../common/Messages'
import {Input} from '../common/forms/Input'
import {Checkbox} from '../common/forms/Checkbox'
import {SecondaryButton} from '../common/forms/Button'
import {iPlay, iStop} from '../common/fonts/Icons'
import styles from './notifications-audio.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getBrokenBuildSoundFx, getPlayBrokenBuildSoundFx} from './SettingsReducer'
import {setBrokenBuildSoundFx, setPlayBrokenBuildSoundFx} from './SettingsActionCreators'

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

  const [errors, setErrors] = useState<ReadonlyArray<string>>([])
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
    setErrors([])
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
    setErrors([])
    setPlaying(true)

    try {
      await audio.play()
    } catch (e) {
      setPlaying(false)
      setErrors(['Unable to play broken build sound because of an error.', errorMessage(e)])
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
      <Checkbox className={styles.playSfxs}
                checked={playBrokenBuildSoundFx}
                onToggle={(newValue) => dispatch(setPlayBrokenBuildSoundFx(newValue))}
                data-locator='play-sounds'>
        Play audio notifications
      </Checkbox>
      <div className={styles.soundFx}>
        <Input className={styles.brokenBuildSfx}
               placeholder='audio file URL'
               onChange={updateSoundFx}
               value={soundFx}
               onBlur={setSoundFxX}
               onEnter={setSoundFxX}
               required={playBrokenBuildSoundFx}
               disabled={playing}>
          Broken build sound
        </Input>
        <SecondaryButton onClick={playing ? stop : play}
                         disabled={playingDisabled}
                         aria-disabled={playingDisabled}
                         icon={playing ? iStop : iPlay}>
          {playing ? 'Stop' : 'Play'}
        </SecondaryButton>
      </div>
      <Messages className={styles.playbackErrors}
                type={MessagesType.ERROR}
                messages={errors}/>
    </>
  )
}
