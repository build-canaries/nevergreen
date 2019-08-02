import {addTray} from '../actions/TrackingThunkActionCreators'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {Tracking} from './Tracking'
import {State} from '../reducers/Reducer'
import {getTrayIds} from '../reducers/TraysReducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(state: State) {
  return {
    trayIds: getTrayIds(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
