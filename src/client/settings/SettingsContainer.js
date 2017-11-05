import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  setBrokenBuildSoundFx,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowTrayName
} from '../actions/SettingsActionCreators'
import Settings from './Settings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setShowBrokenBuildTime,
    setPlayBrokenBuildSoundFx,
    setBrokenBuildSoundFx,
    setShowTrayName,
    setRefreshTime,
    setShowBuildLabel
  }, dispatch)
}

function mapStateToProps(store) {
  const audioVisual = store.get('audioVisual')
  return {
    showTrayName: audioVisual.get('showTrayName'),
    showBrokenBuildTime: audioVisual.get('showBrokenBuildTime'),
    playBrokenBuildSoundFx: audioVisual.get('playBrokenBuildSoundFx'),
    showBuildLabel: audioVisual.get('showBuildLabel'),
    brokenBuildSoundFx: audioVisual.get('brokenBuildSoundFx'),
    setShowTrayName: audioVisual.get('setShowTrayName'),
    refreshTime: audioVisual.get('refreshTime')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
