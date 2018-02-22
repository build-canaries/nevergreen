import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import TimingSettings from './TimingSettings'
import DisplaySettings from './DisplaySettings'
import AudioSettings from './AudioSettings'
import Title from '../common/Title'

class Settings extends Component {
  render() {
    return (
      <Fragment>
        <Title>Settings</Title>
        <TimingSettings {...this.props}/>
        <DisplaySettings {...this.props}/>
        <AudioSettings {...this.props}/>
      </Fragment>
    )
  }
}

Settings.propTypes = {
  showTrayName: PropTypes.bool.isRequired,
  showBrokenBuildTime: PropTypes.bool.isRequired,
  playBrokenBuildSoundFx: PropTypes.bool.isRequired,
  showBuildLabel: PropTypes.bool.isRequired,
  brokenBuildSoundFx: PropTypes.string,
  setShowBrokenBuildTime: PropTypes.func.isRequired,
  setShowTrayName: PropTypes.func.isRequired,
  setPlayBrokenBuildSoundFx: PropTypes.func.isRequired,
  setBrokenBuildSoundFx: PropTypes.func.isRequired,
  refreshTime: PropTypes.number.isRequired,
  setRefreshTime: PropTypes.func.isRequired,
  setShowBuildLabel: PropTypes.func.isRequired
}

export default Settings
