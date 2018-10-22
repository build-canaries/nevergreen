import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeTray, setServerType, setTrayName, setTrayUrl, setTrayUsername} from '../../actions/TrackingActionCreators'
import {updateTrayId} from '../../actions/TrackingThunkActionCreators'
import {refreshTray} from '../../actions/RefreshThunkActionCreators'
import {encryptPassword} from '../../actions/PasswordThunkActionCreators'
import {TraySettings} from './TraySettings'
import {trayName, trayPassword, trayServerType, trayUrl, trayUsername} from '../../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeTray,
    setTrayName,
    setServerType,
    setTrayUsername,
    encryptPassword,
    refreshTray,
    setTrayUrl,
    updateTrayId
  }, dispatch)
}

function mapStateToProps(state, {trayId}) {
  return {
    name: trayName(state, trayId),
    url: trayUrl(state, trayId),
    username: trayUsername(state, trayId),
    password: trayPassword(state, trayId),
    serverType: trayServerType(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)
