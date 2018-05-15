import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {removeTray, setServerType, setTrayName, setTrayUrl, setTrayUsername} from '../../actions/TrackingActionCreators'
import {refreshTray, updateTrayId} from '../../actions/TrackingThunkActionCreators'
import {encryptPassword} from '../../actions/PasswordThunkActionCreators'
import TraySettings from './TraySettings'

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

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  return {
    trayId: ownProps.trayId,
    name: tray.get('name'),
    url: tray.get('url'),
    username: tray.get('username'),
    password: tray.get('password'),
    serverType: tray.get('serverType'),
    pendingRequest: tray.get('pendingRequest')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)
