import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {initalise, enableFullScreen} from './actions/NevergreenActions'
import {dismiss, checkForNewVersion} from './actions/NotificationActions'
import {keyboardShortcut} from './actions/ShortcutActions'
import Nevergreen from './Nevergreen'
import Package from '../../package'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initalise,
    checkForNewVersion,
    dismiss,
    keyboardShortcut,
    enableFullScreen
  }, dispatch)
}

function mapStateToProps(store) {
  return {
    loaded: store.get('nevergreen').get('loaded'),
    versionNumber: `${Package.version}+${Package.versionMeta}`,
    versionName: Package.versionName,
    versionColour: Package.versionColour,
    commitHash: Package.commitHash,
    notification: store.get('notification'),
    isFullScreen: store.get('nevergreen').get('fullScreen'),
    fullScreenRequested: store.get('nevergreen').get('fullScreenRequested')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nevergreen)
