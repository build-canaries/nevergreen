import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import Messages from '../common/messages/Messages'
import Text from '../common/forms/Text'
import Checkbox from '../common/forms/Checkbox'
import './audio-visual.scss'

class AudioVisual extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: [], audio: null, soundFx: this.props.brokenBuildSoundFx}
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
    const updateSoundFx = (evt) => this.setState({soundFx: evt.target.value})
    const setSoundFx = () => this.props.setBrokenBuildSoundFx(this.state.soundFx)
    const testSoundFx = () => {
      const audio = new Audio(this.state.soundFx)
      this.setState({audio, errors: []})
      audio.addEventListener('ended', () => this.setState({audio: null}))
      audio.play().catch((e) => this.setState({errors: ['Unable to play audio file because of an error:', e.message]}))
    }

    return (
      <section className='audio-visual'>
        <Container title='Visual Settings'>
          <fieldset className='settings-list'>
            <p>
              <Checkbox label='Show tray name' enabled={this.props.showTrayName} onToggle={toggleTrayName}
                        data-locator='show-names'/>
            </p>
            <p>
              <Checkbox label='Show broken build time' enabled={this.props.showBrokenBuildTime}
                        onToggle={toggleBrokenBuilds} data-locator='show-times'/>
            </p>
          </fieldset>
        </Container>
        <Container title='Audio Settings'>
          <fieldset className='settings-list'>
            <p>
              <Checkbox label='Play sound for broken builds' enabled={this.props.playBrokenBuildSoundFx}
                        onToggle={toggleBrokenSounds} data-locator='play-sounds'/>
            </p>
            <div className='sound-fx'>
              <Text label='Broken build sound' placeholder='URL to an audio file' onChange={updateSoundFx}
                    value={this.state.soundFx} onBlur={setSoundFx}/>
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
