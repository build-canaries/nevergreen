import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addTray} from '../actions/TrackingActions'
import Tracking from './Tracking'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(store) {
  return {trayIds: store.get('trays').keySeq().toJS()}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
