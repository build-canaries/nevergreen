import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchInteresting} from '../actions/MonitorActions'
import {requestFullScreen} from '../actions/NevergreenActions'
import Monitor from './Monitor'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen}, dispatch)
}

function mapStateToProps(store) {
  const settings = store.get('audioVisual')
  const interesting = store.get('interesting')

  return Immutable.Map({
    loaded: interesting.get('loaded'),
    errors: interesting.get('errors'),
    trays: store.get('trays').toList(),
    projects: interesting.get('projects'),
    selected: store.get('selected'),
    showBrokenBuildTimers: settings.get('showBrokenBuildTime'),
    showTrayName: settings.get('showTrayName'),
    showBuildLabel: settings.get('showBuildLabel'),
    playBrokenBuildSounds: settings.get('playBrokenBuildSoundFx'),
    brokenBuildFx: settings.get('brokenBuildSoundFx'),
    messages: store.get('success'),
    refreshTime: settings.get('refreshTime'),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen'])
  }).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor)
