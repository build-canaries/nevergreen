import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import Messages from '../common/messages/Messages'
import Input from '../common/forms/Input'
import Checkbox from '../common/forms/Checkbox'
import classNames from 'classnames'
import _ from 'lodash'
import './audio-settings.scss'

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

  componentWillUnmount() {
    pause(this.state.audio)
  }

  render() {
    const toggleBrokenSounds = (newValue) => this.props.setPlayBrokenBuildSoundFx(newValue)
    const updateSoundFx = (evt) => this.setState({soundFx: evt.target.value, errors: []})
    const setSoundFx = () => this.props.setBrokenBuildSoundFx(this.state.soundFx)
    const audioStopped = () => this.setState({audio: null, playing: false})
    const play = () => {
      const audio = new Audio(this.state.soundFx)
      this.setState({audio, errors: [], playing: true})
      audio.addEventListener('ended', audioStopped)
      audio.play().catch((e) => this.setState({errors: ['Unable to play broken build sound because of an error:', e.message]}))
    }
    const stop = () => {
      pause(this.state.audio)
      audioStopped()
    }
    const onValidation = (valid) => this.setState({playEnabled: valid})
    const playingDisabled = isBlank(this.state.soundFx) || !this.state.playEnabled
    const playButtonClasses = classNames('test-sound-fx', {
      play: !this.state.playing,
      stop: this.state.playing
    })

    return (
      <Container title='audio' className='audio'>
        <fieldset>
          <Checkbox label='play a sound when a build breaks' enabled={this.props.playBrokenBuildSoundFx} onToggle={toggleBrokenSounds}
                    data-locator='play-sounds' disabled={this.state.playing}/>
          <div className='sound-fx'>
            <Input type='url' className='sound-fx-input' placeholder='audio file URL' onChange={updateSoundFx} value={this.state.soundFx}
                   onBlur={setSoundFx} onEnter={setSoundFx} required={this.props.playBrokenBuildSoundFx} onValidation={onValidation}
                   readOnly={this.state.playing}>
              <span>broken build sound</span>
            </Input>
            <button className={playButtonClasses} onClick={this.state.playing ? stop : play} disabled={playingDisabled}>
              {this.state.playing ? 'stop' : 'play'}
            </button>
          </div>
          <Messages className='playback-errors' type='error' messages={this.state.errors}/>
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
