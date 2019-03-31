import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {fetchInteresting} from '../actions/MonitorThunkActionCreators'
import {requestFullScreen} from '../actions/NevergreenActionCreators'
import {Monitor} from './Monitor'
import {
  getBrokenBuildSoundFx,
  getFullScreen,
  getInterestingErrors,
  getInterestingLoaded,
  getInterestingPendingRequest,
  getInterestingProjects,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getSelectedProjects,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName,
  getSuccessMessages,
  getTrays
} from '../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen}, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getInterestingLoaded(state),
    errors: getInterestingErrors(state),
    trays: getTrays(state),
    projects: getInterestingProjects(state),
    selected: getSelectedProjects(state),
    showBuildTimers: getShowBuildTime(state),
    showBrokenBuildTimers: getShowBrokenBuildTime(state),
    showTrayName: getShowTrayName(state),
    showBuildLabel: getShowBuildLabel(state),
    playBrokenBuildSounds: getPlayBrokenBuildSoundFx(state),
    brokenBuildFx: getBrokenBuildSoundFx(state),
    messages: getSuccessMessages(state),
    refreshTime: getRefreshTime(state),
    isFullScreen: getFullScreen(state),
    maxProjectsToShow: getMaxProjectsToShow(state),
    pendingRequest: getInterestingPendingRequest(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Monitor))
