import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {fetchInteresting} from '../actions/MonitorThunkActionCreators'
import {requestFullScreen} from '../actions/NevergreenActionCreators'
import Monitor from './Monitor'
import {triggerSystemNotifications} from '../domain/Notifications'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen}, dispatch)
}

function mapStateToProps(store) {
  const settings = store.get('audioVisual')
  const interesting = store.get('interesting')

  return {
    loaded: interesting.get('loaded'),
    errors: interesting.get('errors'),
    trays: store.get('trays').toList(),
    projects: interesting.get('projects'),
    selected: store.get('selected'),
    showBuildTimers: settings.get('showBuildTime'),
    showBrokenBuildTimers: settings.get('showBrokenBuildTime'),
    showTrayName: settings.get('showTrayName'),
    showBuildLabel: settings.get('showBuildLabel'),
    playBrokenBuildSounds: settings.get('playBrokenBuildSoundFx'),
    brokenBuildFx: settings.get('brokenBuildSoundFx'),
    messages: store.get('success'),
    refreshTime: settings.get('refreshTime'),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen']),
    maxProjectsToShow: settings.get('maxProjectsToShow'),
    pendingRequest: interesting.get('pendingRequest'),
    showSystemNotifications: settings.get('showSystemNotifications'),
    triggerSystemNotifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Monitor))
