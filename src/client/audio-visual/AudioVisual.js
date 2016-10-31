import React, {Component, PropTypes} from 'react'
import ConfigOption from './ConfigOption'
import Container from '../common/Container'
import Messages from '../common/messages/Messages'
import './audio-visual.scss'

class AudioVisual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      audio: null
    }
  }

  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.pause()
    }
  }

  render() {
    const toggleBrokenBuilds = (newValue) => this.props.setShowBrokenBuildTime(newValue)
    const toggleTrayName = (newValue) => this.props.setShowTrayName(newValue)
    const toggleBrokenSounds = (newValue) => this.props.setPlayBrokenBuildSoundFx(newValue)
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
        <Container title='Visual Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Show tray name'
                          enabled={this.props.showTrayName}
                          onToggle={toggleTrayName}/>
            <ConfigOption name='Show broken build time'
                          enabled={this.props.showBrokenBuildTime}
                          onToggle={toggleBrokenBuilds}/>
          </fieldset>
        </Container>
        <Container title='Audio Settings'>
          <fieldset className='settings-list'>
            <ConfigOption name='Play sound for broken builds'
                          enabled={this.props.playBrokenBuildSoundFx}
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
  showTrayName: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired
}

export default AudioVisual
