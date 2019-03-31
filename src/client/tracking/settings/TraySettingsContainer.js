import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  removeTray,
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername
} from '../../actions/TrackingActionCreators'
import {encryptPassword} from '../../actions/PasswordThunkActionCreators'
import {TraySettings} from './TraySettings'
import {getTrayIncludeNew, getTrayName, getTrayPassword, getTrayServerType, getTrayUrl, getTrayUsername} from '../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeTray,
    setTrayName,
    setServerType,
    setTrayUsername,
    encryptPassword,
    setTrayUrl,
    setIncludeNew
  }, dispatch)
}

function mapStateToProps(state, {trayId}) {
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
