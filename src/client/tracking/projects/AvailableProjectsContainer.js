import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {refreshTray, selectProject} from '../../actions/TrackingActions'
import AvailableProjects from './AvailableProjects'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({refreshTray, selectProject}, dispatch)
}

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  const projects = store.getIn(['projects', ownProps.trayId]).toList()
  const selected = store.getIn(['selected', ownProps.trayId])
  return Immutable.Map().merge({projects, selected}, tray, ownProps).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableProjects)
