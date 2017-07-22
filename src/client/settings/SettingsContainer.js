import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setBrokenBuildSoundFx, setPlayBrokenBuildSoundFx, setRefreshTime, setShowBrokenBuildTime, setShowTrayName, setShowBrokenBuildLabel} from '../actions/SettingsActions'
import Settings from './Settings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setShowBrokenBuildTime,
    setPlayBrokenBuildSoundFx,
    setBrokenBuildSoundFx,
    setShowTrayName,
    setRefreshTime,
    setShowBrokenBuildLabel
  }, dispatch)
}

function mapStateToProps(store) {
  return store.get('audioVisual').toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
