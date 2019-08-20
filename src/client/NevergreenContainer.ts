import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {enableFullScreen} from './NevergreenActionCreators'
import {initalise} from './NevergreenThunkActionCreators'
import {checkForNewVersion} from './notification/NotificationThunkActionCreators'
import {Nevergreen} from './Nevergreen'
import {State} from './Reducer'
import {getFullScreen, getFullScreenRequested, getLoaded} from './NevergreenReducer'
import {getClickToShowMenu} from './settings/SettingsReducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({
    initalise,
    checkForNewVersion,
    enableFullScreen
  }, dispatch)
}

function mapStateToProps(state: State) {
  return {
    loaded: getLoaded(state),
    isFullScreen: getFullScreen(state),
    fullScreenRequested: getFullScreenRequested(state),
    clickToShowMenu: getClickToShowMenu(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nevergreen)
