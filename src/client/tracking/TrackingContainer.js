import Immutable from 'immutable'
import {connect} from 'react-redux'
import {addTray, removeTray, refreshTray, updateTray} from '../actions/TrackingActions'
import Tracking from './Tracking'

function mapDispatchToProps(dispatch) {
  return {
    addTray(url, username, password) {
      dispatch(addTray(url, username, password))
    },
    removeTray(trayId) {
      dispatch(removeTray(trayId))
    },
    refreshTray(tray) {
      dispatch(refreshTray(tray))
    },
    updateTray(trayId, name, url, username, oldPassword, newPassword) {
      dispatch(updateTray(trayId, name, url, username, oldPassword, newPassword))
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
