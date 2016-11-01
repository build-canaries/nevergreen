import {connect} from 'react-redux'
import {initalise} from './actions/NevergreenActions'
import {dismiss, checkForNewVersion} from './actions/NotificationActions'
import {keyboardShortcut} from './actions/ShortcutActions'
import Nevergreen from './Nevergreen'
import Package from '../../package'

function mapDispatchToProps(dispatch) {
  return {
    initalise() {
      return dispatch(initalise())
    },
    checkForNewVersion(version) {
      dispatch(checkForNewVersion(version, window.location.hostname))
    },
    dismiss() {
      dispatch(dismiss())
    },
    keyboardShortcut(show) {
      dispatch(keyboardShortcut(show))
    }
  }
}

function mapStateToProps(store) {
  return {
    loaded: store.get('nevergreen').get('loaded'),
    versionNumber: Package.version,
    versionName: Package.versionName,
    versionColour: Package.versionColour,
    versionMeta: Package.versionMeta,
    commitHash: Package.commitHash,
    notification: store.get('notification')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nevergreen)
