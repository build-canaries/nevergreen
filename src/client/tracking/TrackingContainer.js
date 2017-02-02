import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addTray} from '../actions/TrackingActions'
import Tracking from './Tracking'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(store) {
  return {trays: store.get('trays').toList().toJS()}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracking)
