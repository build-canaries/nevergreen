import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enableFullScreen} from './actions/NevergreenActionCreators'
import {initalise} from './actions/NevergreenThunkActionCreators'
import {notify} from './actions/NotificationActionCreators'
import {checkForNewVersion} from './actions/NotificationThunkActionCreators'
import {Nevergreen} from './Nevergreen'
import {withRouter} from 'react-router-dom'
import {fullScreen, fullScreenRequested, getClickToShowMenu, loaded} from './reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initalise,
    checkForNewVersion,
    enableFullScreen,
    notify
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: loaded(state),
    isFullScreen: fullScreen(state),
    fullScreenRequested: fullScreenRequested(state),
    clickToShowMenu: getClickToShowMenu(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nevergreen))
