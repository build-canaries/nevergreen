import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {fetchInteresting} from '../actions/MonitorThunkActionCreators'
import {requestFullScreen} from '../actions/NevergreenActionCreators'
import {Monitor} from './Monitor'
import {State} from '../reducers/Reducer'
import {abortPendingRequest} from '../actions/NevergreenThunkActionCreators'
import {getInterestingErrors, getInterestingLoaded, getInterestingProjects} from '../reducers/InterestingReducer'
import {
  getBrokenBuildSoundFx,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName
} from '../reducers/SettingsReducer'
import {getFullScreen} from '../reducers/NevergreenReducer'
import {getSuccessMessages} from '../reducers/SuccessReducer'
import {getTrays} from '../reducers/TraysReducer'
import {getSelectedProjects} from '../reducers/SelectedReducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen, abortPendingRequest}, dispatch)
}

function mapStateToProps(state: State) {
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
    maxProjectsToShow: getMaxProjectsToShow(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
