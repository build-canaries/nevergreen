import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername
} from '../../actions/TrackingActionCreators'
import {encryptPassword} from '../../actions/PasswordThunkActionCreators'
import {TraySettings} from './TraySettings'
import {
  getTrayIncludeNew,
  getTrayName,
  getTrayPassword,
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
    setTrayUsername,
    encryptPassword,
    setTrayUrl,
    setIncludeNew
  }, dispatch)
}

function mapStateToProps(state: State, {trayId}: TraySettingsContainerProps) {
  return {
    name: getTrayName(state, trayId),
    url: getTrayUrl(state, trayId),
    username: getTrayUsername(state, trayId),
    password: getTrayPassword(state, trayId),
    serverType: getTrayServerType(state, trayId),
    includeNew: getTrayIncludeNew(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)
