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
  const success = store.get('success')

  return Immutable.Map({
    loaded: interesting.get('loaded'),
    errors: interesting.get('errors'),
    trays: store.get('trays').toList(),
    projects: interesting.get('projects'),
    selected: store.get('selected'),
    showBrokenBuildTimers: audioVisual.get('brokenBuildTimersEnabled'),
    showTrayName: audioVisual.get('showTrayName'),
    playBrokenBuildSounds: audioVisual.get('brokenBuildSoundsEnabled'),
    brokenBuildFx: audioVisual.get('brokenBuildSoundFx'),
    messages: success.get('images').concat(success.get('texts'))
  }).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor)
