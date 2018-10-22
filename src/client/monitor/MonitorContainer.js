import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {fetchInteresting} from '../actions/MonitorThunkActionCreators'
import {requestFullScreen} from '../actions/NevergreenActionCreators'
import {Monitor} from './Monitor'
import {
  brokenBuildSoundFx,
  fullScreen,
  interestingErrors,
  interestingLoaded,
  interestingPendingRequest,
  interestingProjects,
  maxProjectsToShow,
  playBrokenBuildSoundFx,
  refreshTime,
  selectedProjects,
  showBrokenBuildTime,
  showBuildLabel,
  showBuildTime,
  showTrayName,
  successMessages,
  trays
} from '../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen}, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: interestingLoaded(state),
    errors: interestingErrors(state),
    trays: trays(state),
    projects: interestingProjects(state),
    selected: selectedProjects(state),
    showBuildTimers: showBuildTime(state),
    showBrokenBuildTimers: showBrokenBuildTime(state),
    showTrayName: showTrayName(state),
    showBuildLabel: showBuildLabel(state),
    playBrokenBuildSounds: playBrokenBuildSoundFx(state),
    brokenBuildFx: brokenBuildSoundFx(state),
    messages: successMessages(state),
    refreshTime: refreshTime(state),
    isFullScreen: fullScreen(state),
    maxProjectsToShow: maxProjectsToShow(state),
    pendingRequest: interestingPendingRequest(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Monitor))
