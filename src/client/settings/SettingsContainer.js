import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  setBrokenBuildSoundFx,
  setClickToShowMenu,
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
  getBrokenBuildSoundFx,
  getClickToShowMenu,
  getMaxProjectsToShow,
  getPlayBrokenBuildSoundFx,
  getRefreshTime,
  getShowBrokenBuildTime,
  getShowBuildLabel,
  getShowBuildTime,
  getShowSystemNotifications,
  getShowTrayName,
  getSystemNotificationPermissionDenied,
  getSystemNotificationRequestingPermission
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
    setMaxProjectsToShow,
    setClickToShowMenu
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    showTrayName: getShowTrayName(state),
    showBuildTime: getShowBuildTime(state),
    showBrokenBuildTime: getShowBrokenBuildTime(state),
    playBrokenBuildSoundFx: getPlayBrokenBuildSoundFx(state),
    showBuildLabel: getShowBuildLabel(state),
    systemNotificationsSupported: supported(),
    showSystemNotifications: getShowSystemNotifications(state),
    systemNotificationRequestingPermission: getSystemNotificationRequestingPermission(state),
    systemNotificationPermissionDenied: getSystemNotificationPermissionDenied(state),
    brokenBuildSoundFx: getBrokenBuildSoundFx(state),
    refreshTime: getRefreshTime(state),
    validRefreshTimes: VALID_REFRESH_TIMES,
    maxProjectsToShow: getMaxProjectsToShow(state),
    validNumberOfProjectsToShow: VALID_PROJECTS_TO_SHOW,
    clickToShowMenu: getClickToShowMenu(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
