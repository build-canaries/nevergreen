import React, {Component, PropTypes} from 'react'
import ConfigOption from './ConfigOption'
import Container from '../common/Container'
import Messages from '../common/messages/Messages'
import './audio-visual.scss'

class AudioVisual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.pause()
    }
  }

  render() {
    const toggleBrokenBuilds = (newValue) => this.props.setBrokenBuildTimers(newValue)
    const toggleBrokenSounds = (newValue) => this.props.setBrokenBuildSounds(newValue)
    const setSoundFx = () => this.props.setBrokenBuildSoundFx(this.refs.soundFx.value)
    const testSoundFx = () => {
      const audio = new Audio(this.refs.soundFx.value)
      this.setState({audio, errors: []})
      audio.addEventListener('ended', () => this.setState({audio: null}))
      audio.play()
        .catch((e) => this.setState({errors: ['Unable to play audio file because of an error:', e.message]}))
    }

    return (
      <section className='audio-visual'>
        <Container title='Display Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Show broken build timers'
                          enabled={this.props.showBrokenBuildTimers}
                          onToggle={toggleBrokenBuilds}/>
          </fieldset>
        </Container>
        <Container title='Audio Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Enable sound for broken builds'
                          enabled={this.props.showBrokenBuildSounds}
                          onToggle={toggleBrokenSounds}/>
            <div className='sound-fx'>
              <label htmlFor='sound-fx'>Broken build sound</label>
              <input id='sound-fx'
                     ref='soundFx'
                     type='text'
                     placeholder='URL to an audio file'
                     defaultValue={this.props.brokenBuildSoundFx}
                     onBlur={setSoundFx}/>
              <button className='test' onClick={testSoundFx}>test</button>
              <Messages type='notification' messages={this.state.errors}/>
            </div>
          </fieldset>
        </Container>
      </section>
    )
  }
}

AudioVisual.propTypes = {
  showBrokenBuildTimers: PropTypes.bool.isRequired,
  showBrokenBuildSounds: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string.isRequired,
  setBrokenBuildTimers: PropTypes.func.isRequired,
  setBrokenBuildSounds: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}

export default AudioVisual
