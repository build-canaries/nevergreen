import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import Messages from '../common/messages/Messages'
import Input from '../common/forms/Input'
import Checkbox from '../common/forms/Checkbox'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './audio-settings.scss'

function isBlank(s) {
  return _.isEmpty(_.trim(s))
}

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

function pause(audio) {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

class AudioSettings extends Component {
  constructor(props) {
    super(props)
    const soundFx = isBlank(props.brokenBuildSoundFx) || hasScheme(props.brokenBuildSoundFx)
      ? this.props.brokenBuildSoundFx
      : `${window.location.origin}/${props.brokenBuildSoundFx}`
    this.state = {errors: [], audio: null, soundFx, playEnabled: !isBlank(props.brokenBuildSoundFx), playing: false}
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
    this.setState({audio, errors: [], playing: true})
    audio.addEventListener('ended', this.audioStopped)
    audio.play().catch((e) => this.setState({errors: ['Unable to play broken build sound because of an error:', e.message], playing: false}))
  }

  stop = () => {
    pause(this.state.audio)
    this.audioStopped()
  }

  onValidation = (valid) => {
    this.setState({playEnabled: valid})
  }

  componentWillUnmount() {
    pause(this.state.audio)
  }

  render() {
    const playingDisabled = isBlank(this.state.soundFx) || !this.state.playEnabled
    const playButtonClasses = classNames(styles.testSoundFx, {
      [styles.play]: !this.state.playing,
      [styles.stop]: this.state.playing
    })

    return (
      <Container title='audio' className={styles.container}>
        <fieldset>
          <Checkbox checked={this.props.playBrokenBuildSoundFx} onToggle={this.toggleBrokenSounds} data-locator='play-sounds'
                    disabled={this.state.playing}>
            <span>play a sound when a build breaks</span>
          </Checkbox>
          <div className={styles.soundFx}>
            <Input type='url' className={styles.soundFxInput} placeholder='audio file URL' onChange={this.updateSoundFx} value={this.state.soundFx}
                   onBlur={this.setSoundFx} onEnter={this.setSoundFx} required={this.props.playBrokenBuildSoundFx} onValidation={this.onValidation}
                   disabled={this.state.playing}>
              <span>broken build sound</span>
            </Input>
            <button className={playButtonClasses} onClick={this.state.playing ? this.stop : this.play} disabled={playingDisabled}>
              {this.state.playing ? 'stop' : 'play'}
            </button>
          </div>
          <Messages className={styles.playbackErrors} type='error' messages={this.state.errors}/>
        </fieldset>
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

export default AudioSettings
