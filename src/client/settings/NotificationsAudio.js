import React, {Component, Fragment} from 'react'
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

export class NotificationsAudio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      audio: null,
      soundFx: props.brokenBuildSoundFx,
      playEnabled: !isBlank(props.brokenBuildSoundFx),
      playing: false
    }
  }

  toggleBrokenSounds = (newValue) => {
    this.props.setPlayBrokenBuildSoundFx(newValue)
  }

  updateSoundFx = (evt) => {
    this.setState({soundFx: evt.target.value, errors: []})
  }

  setSoundFx = () => {
    this.props.setBrokenBuildSoundFx(this.state.soundFx)
  }

  audioStopped = () => {
    this.setState({audio: null, playing: false})
  }

  play = () => {
    const audio = new Audio(this.state.soundFx)
    audio.addEventListener('ended', this.audioStopped)

    this.setState({audio, errors: [], playing: true}, async () => {
      try {
        await audio.play()
      } catch (e) {
        this.setState({
          errors: ['Unable to play broken build sound because of an error.', e.message],
          playing: false
        })
      }
    })
  }

  stop = () => {
    pause(this.state.audio)
    this.audioStopped()
  }

  componentWillUnmount() {
    pause(this.state.audio)
  }

  render() {
    const {playBrokenBuildSoundFx} = this.props
    const {soundFx, playEnabled, playing, errors} = this.state

    const playingDisabled = isBlank(soundFx) || !playEnabled

    return (
      <Fragment>
        <Checkbox className={styles.playSfxs}
                  checked={playBrokenBuildSoundFx}
                  onToggle={this.toggleBrokenSounds}
                  data-locator='play-sounds'>
          play audio notifications
        </Checkbox>
        <div className={styles.soundFx}>
          <Input className={styles.brokenBuildSfx}
                 placeholder='audio file URL'
                 onChange={this.updateSoundFx}
                 value={soundFx}
                 onBlur={this.setSoundFx}
                 onEnter={this.setSoundFx}
                 required={playBrokenBuildSoundFx}
                 disabled={playing}>
            broken build sound
          </Input>
          <SecondaryButton onClick={playing ? this.stop : this.play}
                           disabled={playingDisabled}
                           aria-disabled={playingDisabled}
                           icon={playing ? iStop : iPlay}>
            {playing ? 'stop' : 'play'}
          </SecondaryButton>
        </div>
        <Messages className={styles.playbackErrors}
                  type='error'
                  messages={errors}/>
      </Fragment>
    )
  }
}

NotificationsAudio.propTypes = {
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}
