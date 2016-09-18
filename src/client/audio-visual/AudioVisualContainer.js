import React, {Component} from 'react'
import DisplayStore from '../stores/DisplayStore'
import {setBrokenBuildSoundFx, setBrokenBuildSounds, setBrokenBuildTimers, setTrayNameToggled} from './AudioVisualActions'
import AudioVisual from './AudioVisual'

function mapStateToProps() {
  return {
    showBrokenBuildTimers: DisplayStore.areBrokenBuildTimersEnabled(),
    showTrayName: DisplayStore.areTrayNameEnabled(),
    showBrokenBuildSounds: DisplayStore.areBrokenBuildSoundsEnabled(),
    brokenBuildSoundFx: DisplayStore.brokenBuildSoundFx(),
    setBrokenBuildTimers,
    setTrayNameToggled,
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
