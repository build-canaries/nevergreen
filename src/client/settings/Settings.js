import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import Messages from '../common/messages/Messages'
import Text from '../common/forms/Text'
import Checkbox from '../common/forms/Checkbox'
import './settings.scss'

class AudioVisual extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: [], audio: null, soundFx: this.props.brokenBuildSoundFx, refreshTime: props.refreshTime}
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
    const updateSoundFx = (evt) => this.setState({soundFx: evt.target.value, errors: []})
    const setSoundFx = () => this.props.setBrokenBuildSoundFx(this.state.soundFx)
    const testSoundFx = () => {
      const audio = new Audio(this.state.soundFx)
      this.setState({audio, errors: []})
      audio.addEventListener('ended', () => this.setState({audio: null}))
      audio.play().catch((e) => this.setState({errors: ['Unable to play audio file because of an error:', e.message]}))
    }
    const updateRefreshTime = (evt) => this.setState({refreshTime: evt.target.value})
    const setRefreshTime = () => this.props.setRefreshTime(this.state.refreshTime)

    return (
      <section className='audio-visual'>
        <Container title='timing'>
          <label className='refresh-time'>
            <span>poll for tray changes every</span>
            <input type='number' min={this.props.minRefreshTime} step='1' value={this.state.refreshTime} onChange={updateRefreshTime}
                   onBlur={setRefreshTime}/>
            <span>seconds</span>
          </label>
        </Container>
        <Container title='display'>
          <Checkbox label='show tray name' enabled={this.props.showTrayName} onToggle={toggleTrayName} data-locator='show-names'/>
          <Checkbox label='show broken build time' enabled={this.props.showBrokenBuildTime} onToggle={toggleBrokenBuilds} data-locator='show-times'/>
        </Container>
        <Container title='audio'>
          <fieldset>
            <Checkbox label='play a sound when a build breaks' enabled={this.props.playBrokenBuildSoundFx} onToggle={toggleBrokenSounds}
                      data-locator='play-sounds'/>
            <div className='sound-fx'>
              <Text label='broken build sound' className='sound-fx-input' placeholder='audio file URL' onChange={updateSoundFx}
                    value={this.state.soundFx} onBlur={setSoundFx}/>
              <button className='test-sound-fx' onClick={testSoundFx}>test</button>
              <Messages type='error' messages={this.state.errors}/>
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
  setBrokenBuildSoundFx: PropTypes.func.isRequired,
  refreshTime: PropTypes.number.isRequired,
  minRefreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired
}

export default AudioVisual
