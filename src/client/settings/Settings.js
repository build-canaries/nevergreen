import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TimingSettings from './TimingSettings'
import DisplaySettings from './DisplaySettings'
import AudioSettings from './AudioSettings'
import './settings.scss'

class Settings extends Component {
  render() {
    return (
      <section className='settings'>
        <TimingSettings {...this.props}/>
        <DisplaySettings {...this.props}/>
        <AudioSettings {...this.props}/>
      </section>
    )
  }
}

Settings.propTypes = {
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

export default Settings
