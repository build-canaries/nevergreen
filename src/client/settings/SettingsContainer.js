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
import {Settings} from './Settings'
import {supported} from '../common/SystemNotifications'
import {enableSystemNotifications} from '../actions/SettingsThunkActionCreators'
import {
  brokenBuildSoundFx,
  maxProjectsToShow,
  playBrokenBuildSoundFx,
  refreshTime,
  showBrokenBuildTime,
  showBuildLabel,
  showBuildTime,
  showSystemNotifications,
  showTrayName,
  systemNotificationPermissionDenied,
  systemNotificationRequestingPermission
} from '../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setShowBuildTime,
    setShowBrokenBuildTime,
    setPlayBrokenBuildSoundFx,
    setBrokenBuildSoundFx,
    setShowTrayName,
    setRefreshTime,
    setShowBuildLabel,
    setShowSystemNotifications: enableSystemNotifications,
    setMaxProjectsToShow
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    showTrayName: showTrayName(state),
    showBuildTime: showBuildTime(state),
    showBrokenBuildTime: showBrokenBuildTime(state),
    playBrokenBuildSoundFx: playBrokenBuildSoundFx(state),
    showBuildLabel: showBuildLabel(state),
    systemNotificationsSupported: supported(),
    showSystemNotifications: showSystemNotifications(state),
    systemNotificationRequestingPermission: systemNotificationRequestingPermission(state),
    systemNotificationPermissionDenied: systemNotificationPermissionDenied(state),
    brokenBuildSoundFx: brokenBuildSoundFx(state),
    refreshTime: refreshTime(state),
    validRefreshTimes: VALID_REFRESH_TIMES,
    maxProjectsToShow: maxProjectsToShow(state),
    validNumberOfProjectsToShow: VALID_PROJECTS_TO_SHOW
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
