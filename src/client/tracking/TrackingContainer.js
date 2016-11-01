import Immutable from 'immutable'
import {connect} from 'react-redux'
import {addTray} from '../actions/TrackingActions'
import Tracking from './Tracking'

function mapDispatchToProps(dispatch) {
  return {
    addTray(url, username, password) {
      dispatch(addTray(url, username, password))
    }
  }
}

function mapStateToProps(store) {
  return Immutable.Map({trays: store.get('trays').toList()}).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracking)
