import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enableFullScreen} from './actions/NevergreenActionCreators'
import {initalise} from './actions/NevergreenThunkActionCreators'
import {checkForNewVersion} from './actions/NotificationThunkActionCreators'
import {Nevergreen} from './Nevergreen'
import {withRouter} from 'react-router-dom'
import {getClickToShowMenu, getFullScreen, getFullScreenRequested, getLoaded} from './reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initalise,
    checkForNewVersion,
    enableFullScreen
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getLoaded(state),
    isFullScreen: getFullScreen(state),
    fullScreenRequested: getFullScreenRequested(state),
    clickToShowMenu: getClickToShowMenu(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nevergreen))
