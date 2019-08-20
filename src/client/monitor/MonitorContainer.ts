import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {fetchInteresting} from './MonitorThunkActionCreators'
import {requestFullScreen} from '../NevergreenActionCreators'
import {Monitor} from './Monitor'
import {State} from '../Reducer'
import {abortPendingRequest} from '../NevergreenThunkActionCreators'
import {getInterestingErrors, getInterestingLoaded, getInterestingProjects} from './InterestingReducer'
import {
  getBrokenBuildSoundFx,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName
} from '../settings/SettingsReducer'
import {getFullScreen} from '../NevergreenReducer'
import {getSuccessMessages} from '../success/SuccessReducer'
import {getTrays} from '../tracking/TraysReducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen, abortPendingRequest}, dispatch)
}

function mapStateToProps(state: State) {
  return {
    loaded: getInterestingLoaded(state),
    errors: getInterestingErrors(state),
    trays: getTrays(state),
    projects: getInterestingProjects(state),
    showBuildTimers: getShowBuildTime(state),
    showBrokenBuildTimers: getShowBrokenBuildTime(state),
    showTrayName: getShowTrayName(state),
    showBuildLabel: getShowBuildLabel(state),
    playBrokenBuildSounds: getPlayBrokenBuildSoundFx(state),
    brokenBuildFx: getBrokenBuildSoundFx(state),
    messages: getSuccessMessages(state),
    refreshTime: getRefreshTime(state),
    isFullScreen: getFullScreen(state),
    maxProjectsToShow: getMaxProjectsToShow(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
