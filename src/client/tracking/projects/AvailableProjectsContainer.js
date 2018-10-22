import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../../common/ImmutableToJs'
import {selectProject} from '../../actions/TrackingActionCreators'
import {refreshTray} from '../../actions/RefreshThunkActionCreators'
import {AvailableProjects} from './AvailableProjects'
import {
  projects,
  selectedProjects,
  trayErrors,
  trayPassword,
  trayServerType,
  trayTimestamp,
  trayUrl,
  trayUsername
} from '../../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({refreshTray, selectProject}, dispatch)
}

function mapStateToProps(state, {trayId}) {
  return {
    url: trayUrl(state, trayId),
    username: trayUsername(state, trayId),
    password: trayPassword(state, trayId),
    serverType: trayServerType(state, trayId),
    errors: trayErrors(state, trayId),
    timestamp: trayTimestamp(state, trayId),
    projects: projects(state, trayId),
    selected: selectedProjects(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AvailableProjects))
