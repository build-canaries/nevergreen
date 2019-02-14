import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isBlank} from '../common/Utils'
import {Messages} from '../common/Messages'
import {Input} from '../common/forms/Input'
import {Checkbox} from '../common/forms/Checkbox'
import {SecondaryButton} from '../common/forms/Button'
import {iPlay, iStop} from '../common/fonts/Icons'
import styles from './notifications-audio.scss'

function pause(audio) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export function NotificationsAudio({brokenBuildSoundFx, setPlayBrokenBuildSoundFx, setBrokenBuildSoundFx, playBrokenBuildSoundFx}) {

  const [errors, setErrors] = useState([])
  const [audio, setAudio] = useState(null)
  const [soundFx, setSoundFx] = useState(brokenBuildSoundFx)
  const [playEnabled] = useState(!isBlank(brokenBuildSoundFx))
  const [playing, setPlaying] = useState(false)

  const updateSoundFx = ({target}) => {
    setSoundFx(target.value)
    setErrors([])
  }

  const setSoundFxX = () => setBrokenBuildSoundFx(soundFx)

  const audioStopped = () => {
    setAudio(null)
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
                type='error'
                messages={errors}/>
    </>
  )
}

NotificationsAudio.propTypes = {
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}
