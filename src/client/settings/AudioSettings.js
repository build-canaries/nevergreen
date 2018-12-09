import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import {isBlank} from '../common/Utils'
import {Container} from '../common/Container'
import {Messages} from '../common/Messages'
import {Input} from '../common/forms/Input'
import {Checkbox} from '../common/forms/Checkbox'
import styles from './audio-settings.scss'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

function pause(audio) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export class AudioSettings extends Component {

  constructor(props) {
    super(props)
    const soundFx = isBlank(props.brokenBuildSoundFx) || hasScheme(props.brokenBuildSoundFx)
      ? this.props.brokenBuildSoundFx
      : `${window.location.origin}/${props.brokenBuildSoundFx}`
    this.state = {
      errors: [],
      audio: null,
      soundFx,
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

  play = async () => {
    const audio = new Audio(this.state.soundFx)
    this.setState({audio, errors: [], playing: true})
    audio.addEventListener('ended', this.audioStopped)
    try {
      await audio.play()
    } catch (e) {
      this.setState({
        errors: ['Unable to play broken build sound because of an error.', e.message],
        playing: false
      })
    }
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
    const playButtonClasses = classNames({
      [styles.play]: !playing,
      [styles.stop]: playing
    })

    return (
      <Container title='audio' className={styles.container}>
        <Checkbox className={styles.playSfxs}
                  checked={playBrokenBuildSoundFx}
                  onToggle={this.toggleBrokenSounds}
                  data-locator='play-sounds'>
          play a sound when a build breaks
        </Checkbox>
        <div className={styles.soundFx}>
          <Input type='url'
                 className={styles.brokenBuildSfx}
                 placeholder='audio file URL'
                 onChange={this.updateSoundFx}
                 value={soundFx}
                 onBlur={this.setSoundFx}
                 onEnter={this.setSoundFx}
                 required={playBrokenBuildSoundFx}
                 disabled={playing}>
            broken build sound
          </Input>
          <button className={playButtonClasses}
                  onClick={playing ? this.stop : this.play}
                  disabled={playingDisabled}
                  aria-disabled={playingDisabled}>
            {playing ? 'stop' : 'play'}
          </button>
        </div>
        <Messages className={styles.playbackErrors}
                  type='error'
                  messages={errors}/>
      </Container>
    )
  }
}

AudioSettings.propTypes = {
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}
