import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {setIncludeNew, setServerType, setTrayName, setTrayUrl} from '../../actions/TrackingActionCreators'
import {setAuth} from '../../actions/AuthenticationThunkActionCreators'
import {TraySettings} from './TraySettings'
import {
  getTrayAuthType,
  getTrayIncludeNew,
  getTrayName,
  getTrayServerType,
  getTrayUrl,
  getTrayUsername
} from '../../reducers/TraysReducer'
import {State} from '../../reducers/Reducer'
import {removeTrayThunk} from '../../actions/TrackingThunkActionCreators'

interface TraySettingsContainerProps {
  trayId: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({
    removeTray: removeTrayThunk,
    setTrayName,
    setServerType,
    setTrayUrl,
    setIncludeNew,
    setAuth
  }, dispatch)
}

function mapStateToProps(state: State, {trayId}: TraySettingsContainerProps) {
  return {
    name: getTrayName(state, trayId),
    url: getTrayUrl(state, trayId),
    authType: getTrayAuthType(state, trayId),
    username: getTrayUsername(state, trayId),
    serverType: getTrayServerType(state, trayId),
    includeNew: getTrayIncludeNew(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)
