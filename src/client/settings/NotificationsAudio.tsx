import React, {ChangeEvent, useEffect, useState} from 'react'
import {isBlank} from '../common/Utils'
import {Messages, MessagesType} from '../common/Messages'
import {Input} from '../common/forms/Input'
import {Checkbox} from '../common/forms/Checkbox'
import {SecondaryButton} from '../common/forms/Button'
import {iPlay, iStop} from '../common/fonts/Icons'
import styles from './notifications-audio.scss'

export interface NotificationsAudioProps {
  playBrokenBuildSoundFx: boolean;
  brokenBuildSoundFx: string;
  setPlayBrokenBuildSoundFx: (play: boolean) => void;
  setBrokenBuildSoundFx: (sfx: string) => void;
}

function pause(audio?: HTMLAudioElement) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export function NotificationsAudio({brokenBuildSoundFx, setPlayBrokenBuildSoundFx, setBrokenBuildSoundFx, playBrokenBuildSoundFx}: NotificationsAudioProps) {

  const [errors, setErrors] = useState<string[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [soundFx, setSoundFx] = useState(brokenBuildSoundFx)
  const [playEnabled] = useState(!isBlank(brokenBuildSoundFx))
  const [playing, setPlaying] = useState(false)

  const updateSoundFx = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSoundFx(target.value)
    setErrors([])
  }

  const setSoundFxX = () => setBrokenBuildSoundFx(soundFx)

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
      setErrors(['Unable to play broken build sound because of an error.', e.message])
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
  }, [])

  const playingDisabled = isBlank(soundFx) || !playEnabled

  return (
    <>
      <Checkbox className={styles.playSfxs}
                checked={playBrokenBuildSoundFx}
                onToggle={(newValue) => setPlayBrokenBuildSoundFx(newValue)}
                data-locator='play-sounds'>
        play audio notifications
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
          broken build sound
        </Input>
        <SecondaryButton onClick={playing ? stop : play}
                         disabled={playingDisabled}
                         aria-disabled={playingDisabled}
                         icon={playing ? iStop : iPlay}>
          {playing ? 'stop' : 'play'}
        </SecondaryButton>
      </div>
      <Messages className={styles.playbackErrors}
                type={MessagesType.ERROR}
                messages={errors}/>
    </>
  )
}
