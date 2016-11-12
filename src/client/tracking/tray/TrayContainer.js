import Immutable from 'immutable'
import {connect} from 'react-redux'
import {removeTray, refreshTray, updateTray, selectProject, clearTrayHighlight} from '../../actions/TrackingActions'
import Tray from './Tray'

function mapDispatchToProps(dispatch) {
  return {
    removeTray(trayId) {
      dispatch(removeTray(trayId))
    },
    refreshTray(tray) {
      dispatch(refreshTray(tray))
    },
    updateTray(trayId, name, url, username, oldPassword, newPassword) {
      dispatch(updateTray(trayId, name, url, username, oldPassword, newPassword))
    },
    selectProject(trayId, projectUrl, selected) {
      dispatch(selectProject(trayId, projectUrl, selected))
    },
    clearTrayHighlight(trayId) {
      dispatch(clearTrayHighlight(trayId))
    }
  }
}

function mapStateToProps(store, ownProps) {
  return Immutable.Map()
    .merge({
      projects: store.get('projects').get(ownProps.trayId).toList(),
      selected: store.get('selected').get(ownProps.trayId)
    }, ownProps)
    .toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tray)
