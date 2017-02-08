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
    loaded: store.getIn(['nevergreen', 'loaded']),
    versionNumber: `${Package.version}+${Package.versionMeta}`,
    versionName: Package.versionName,
    versionColour: Package.versionColour,
    commitHash: Package.commitHash,
    notification: store.get('notification'),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen']),
    fullScreenRequested: store.getIn(['nevergreen', 'fullScreenRequested'])
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nevergreen)
