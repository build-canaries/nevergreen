import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {selectProject} from '../../actions/TrackingActionCreators'
import {refreshTray} from '../../actions/RefreshThunkActionCreators'
import {AvailableProjects} from './AvailableProjects'
import {
  getTrayErrors,
  getTrayPassword,
  getTrayServerType,
  getTrayTimestamp,
  getTrayUrl,
  getTrayUsername
} from '../../reducers/TraysReducer'
import {State} from '../../reducers/Reducer'
import {getSelectedProjects} from '../../reducers/SelectedReducer'
import {getProjects} from '../../reducers/ProjectsReducer'

interface AvailableProjectsContainerProps {
  trayId: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({refreshTray, selectProject}, dispatch)
}

function mapStateToProps(state: State, {trayId}: AvailableProjectsContainerProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(AvailableProjects)
