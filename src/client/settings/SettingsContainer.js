import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  setBrokenBuildSoundFx,
  setPlayBrokenBuildSoundFx,
  setShowBrokenBuildTime,
  setShowTrayName,
  setRefreshTime,
  MIN_REFRESH_TIME
} from '../actions/SettingsActions'
import Settings from './Settings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setShowBrokenBuildTime,
    setPlayBrokenBuildSoundFx,
    setBrokenBuildSoundFx,
    setShowTrayName,
    setRefreshTime
  }, dispatch)
}

function mapStateToProps(store) {
  return store.get('audioVisual').set('minRefreshTime', MIN_REFRESH_TIME).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
