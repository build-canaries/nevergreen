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
import {getTrayIncludeNew, trayName, trayPassword, trayServerType, trayUrl, trayUsername} from '../../reducers/Selectors'

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
    name: trayName(state, trayId),
    url: trayUrl(state, trayId),
    username: trayUsername(state, trayId),
    password: trayPassword(state, trayId),
    serverType: trayServerType(state, trayId),
    includeNew: getTrayIncludeNew(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)
