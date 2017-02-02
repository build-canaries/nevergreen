import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeTray, refreshTray, updateTray, selectProject, clearTrayHighlight} from '../../actions/TrackingActions'
import Tray from './Tray'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeTray,
    refreshTray,
    updateTray,
    selectProject,
    clearTrayHighlight
  }, dispatch)
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
