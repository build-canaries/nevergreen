import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../../common/ImmutableToJs'
import {selectProject} from '../../actions/TrackingActionCreators'
import {refreshTray} from '../../actions/TrackingThunkActionCreators'
import AvailableProjects from './AvailableProjects'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({refreshTray, selectProject}, dispatch)
}

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  const projects = store.getIn(['projects', ownProps.trayId]).toList()
  const selected = store.getIn(['selected', ownProps.trayId])
  return {
    trayId: ownProps.trayId,
    index: ownProps.index,
    url: tray.get('url'),
    username: tray.get('username'),
    password: tray.get('password'),
    serverType: tray.get('serverType'),
    errors: tray.get('errors'),
    timestamp: tray.get('timestamp'),
    pendingRequest: tray.get('pendingRequest'),
    projects,
    selected
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AvailableProjects))
