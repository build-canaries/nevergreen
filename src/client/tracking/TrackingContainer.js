import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addTray} from '../actions/TrackingThunkActionCreators'
import {Tracking} from './Tracking'
import {trayIds} from '../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(state) {
  return {
    trayIds: trayIds(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Tracking))
