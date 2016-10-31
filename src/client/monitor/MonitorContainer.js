import Immutable from 'immutable'
import {connect} from 'react-redux'
import {fetchInteresting} from '../actions/MonitorActions'
import Monitor from './Monitor'

function mapDispatchToProps(dispatch) {
  return {
    fetchInteresting(trays, selected) {
      return dispatch(fetchInteresting(trays, selected))
    }
  }
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
    messages: store.get('success')
  }).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor)
