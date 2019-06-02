import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {enableFullScreen} from './actions/NevergreenActionCreators'
import {initalise} from './actions/NevergreenThunkActionCreators'
import {checkForNewVersion} from './actions/NotificationThunkActionCreators'
import {Nevergreen} from './Nevergreen'
import {State} from './reducers/Reducer'
import {getFullScreen, getFullScreenRequested, getLoaded} from './reducers/NevergreenReducer'
import {getClickToShowMenu} from './reducers/SettingsReducer'

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
