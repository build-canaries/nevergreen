import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enableFullScreen} from './actions/NevergreenActionCreators'
import {initalise} from './actions/NevergreenThunkActionCreators'
import {notify} from './actions/NotificationActionCreators'
import {checkForNewVersion} from './actions/NotificationThunkActionCreators'
import {keyboardShortcut} from './actions/ShortcutActionCreators'
import Nevergreen from './Nevergreen'
import {withRouter} from 'react-router-dom'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initalise,
    checkForNewVersion,
    keyboardShortcut,
    enableFullScreen,
    notify
  }, dispatch)
}

function mapStateToProps(store) {
  return {
    loaded: store.getIn(['nevergreen', 'loaded']),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen']),
    fullScreenRequested: store.getIn(['nevergreen', 'fullScreenRequested'])
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nevergreen))
