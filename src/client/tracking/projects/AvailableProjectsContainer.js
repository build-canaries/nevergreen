import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../../common/ImmutableToJs'
import {selectProject} from '../../actions/TrackingActionCreators'
import {refreshTray} from '../../actions/RefreshThunkActionCreators'
import {AvailableProjects} from './AvailableProjects'
import {
  getProjects,
  getSelectedProjects,
  getTrayErrors,
  getTrayPassword,
  getTrayServerType,
  getTrayTimestamp,
  getTrayUrl,
  getTrayUsername
} from '../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({refreshTray, selectProject}, dispatch)
}

function mapStateToProps(state, {trayId}) {
  return {
    url: getTrayUrl(state, trayId),
    username: getTrayUsername(state, trayId),
    password: getTrayPassword(state, trayId),
    serverType: getTrayServerType(state, trayId),
    errors: getTrayErrors(state, trayId),
    timestamp: getTrayTimestamp(state, trayId),
    projects: getProjects(state, trayId),
    selected: getSelectedProjects(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AvailableProjects))
