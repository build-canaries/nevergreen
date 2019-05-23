import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {dismiss} from '../actions/NotificationActionCreators'
import {Notification} from './Notification'
import {getFullScreen, getNotification} from '../reducers/Selectors'
import {State} from '../reducers/Reducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({dismiss}, dispatch)
}

function mapStateToProps(state: State) {
  return {
    notification: getNotification(state),
    fullScreen: getFullScreen(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
