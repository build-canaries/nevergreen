import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  setBrokenBuildSoundFx,
  setMaxProjectsToShow,
  setPlayBrokenBuildSoundFx,
  setRefreshTime,
  setShowBrokenBuildTime,
  setShowBuildLabel,
  setShowBuildTime,
  setShowTrayName,
  VALID_PROJECTS_TO_SHOW,
  VALID_REFRESH_TIMES
} from '../actions/SettingsActionCreators'
import Settings from './Settings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setShowBuildTime,
    setShowBrokenBuildTime,
    setPlayBrokenBuildSoundFx,
    setBrokenBuildSoundFx,
    setShowTrayName,
    setRefreshTime,
    setShowBuildLabel,
    setMaxProjectsToShow
  }, dispatch)
}

function mapStateToProps(store) {
  const settings = store.get('audioVisual')
  return {
    showTrayName: settings.get('showTrayName'),
    showBuildTime: settings.get('showBuildTime'),
    showBrokenBuildTime: settings.get('showBrokenBuildTime'),
    playBrokenBuildSoundFx: settings.get('playBrokenBuildSoundFx'),
    showBuildLabel: settings.get('showBuildLabel'),
    brokenBuildSoundFx: settings.get('brokenBuildSoundFx'),
    setShowTrayName: settings.get('setShowTrayName'),
    refreshTime: settings.get('refreshTime'),
    validRefreshTimes: VALID_REFRESH_TIMES,
    maxProjectsToShow: settings.get('maxProjectsToShow'),
    validNumberOfProjectsToShow: VALID_PROJECTS_TO_SHOW
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
