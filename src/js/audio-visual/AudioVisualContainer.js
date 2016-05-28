import React, {Component} from 'react'
import DisplayStore from '../stores/DisplayStore'
import {setBrokenBuildSoundFx, setBrokenBuildSounds, setBrokenBuildTimers} from './AudioVisualActions'
import AudioVisual from './AudioVisual'

function getStateFromStore() {
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
    this.state = getStateFromStore()
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
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
