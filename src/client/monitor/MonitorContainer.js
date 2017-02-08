import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchInteresting} from '../actions/MonitorActions'
import {requestFullScreen} from '../actions/NevergreenActions'
import Monitor from './Monitor'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInteresting,
    requestFullScreen
  }, dispatch)
}

function mapStateToProps(store) {
  const audioVisual = store.get('audioVisual')
  const interesting = store.get('interesting')

  return Immutable.Map({
    loaded: interesting.get('loaded'),
    errors: interesting.get('errors'),
    trays: store.get('trays').toList(),
    projects: interesting.get('projects'),
    selected: store.get('selected'),
    showBrokenBuildTimers: audioVisual.get('showBrokenBuildTime'),
    showTrayName: audioVisual.get('showTrayName'),
    playBrokenBuildSounds: audioVisual.get('playBrokenBuildSoundFx'),
    brokenBuildFx: audioVisual.get('brokenBuildSoundFx'),
    messages: store.get('success'),
    refreshTime: audioVisual.get('refreshTime'),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen'])
  }).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor)
