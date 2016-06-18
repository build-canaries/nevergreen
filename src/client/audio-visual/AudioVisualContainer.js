import React, {Component} from 'react'
import DisplayStore from '../stores/DisplayStore'
import {setBrokenBuildSoundFx, setBrokenBuildSounds, setBrokenBuildTimers} from './AudioVisualActions'
import AudioVisual from './AudioVisual'

function mapStateToProps() {
  return {
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled(),
    showBrokenBuildSounds: DisplayStore.areBrokenBuildSoundsEnabled(),
    brokenBuildSoundFx: DisplayStore.brokenBuildSoundFx(),
    setBrokenBuildTimers,
    setBrokenBuildSounds,
    setBrokenBuildSoundFx
  }
}

class AudioVisualContainer extends Component {
  constructor(props) {
    super(props)
    this.state = mapStateToProps()
  }

  componentDidMount() {
    const callback = () => this.setState(mapStateToProps())
    DisplayStore.addListener(callback)
    this.setState({callback})
  }

  componentWillUnmount() {
    DisplayStore.removeListener(this.state.callback)
  }

  render() {
    return <AudioVisual {...this.state}/>
  }
}

export default AudioVisualContainer
