import {connect} from 'react-redux'
import {addTray} from '../actions/TrackingActions'
import Tracking from './Tracking'

function mapDispatchToProps(dispatch) {
  return {
    addTray(url, username, password, existingTrays) {
      dispatch(addTray(url, username, password, existingTrays))
    }
  }
}

function mapStateToProps(store) {
  return {trays: store.get('trays').toList().toJS()}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracking)
