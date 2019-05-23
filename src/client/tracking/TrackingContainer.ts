import {addTray} from '../actions/TrackingThunkActionCreators'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {getTrayIds} from '../reducers/Selectors'
import {Tracking} from './Tracking'
import {State} from '../reducers/Reducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(state: State) {
  return {
    trayIds: getTrayIds(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
