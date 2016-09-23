import {connect} from 'react-redux'
import {
  setBrokenBuildSoundFx,
  setBrokenBuildSounds,
  setBrokenBuildTimers,
  setTrayNameToggled
} from '../actions/AudioVisualActions'
import AudioVisual from './AudioVisual'

function mapDispatchToProps(dispatch) {
  return {
    setBrokenBuildTimers(value) {
      dispatch(setBrokenBuildTimers(value))
    },
    setBrokenBuildSounds(value) {
      dispatch(setBrokenBuildSounds(value))
    },
    setBrokenBuildSoundFx(value) {
      dispatch(setBrokenBuildSoundFx(value))
    },
    setTrayNameToggled(value) {
      dispatch(setTrayNameToggled(value))
    }
  }
}

function mapStateToProps(store) {
  return store.get('audioVisual').toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioVisual)
