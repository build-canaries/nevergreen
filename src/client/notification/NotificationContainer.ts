import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {dismiss} from './NotificationActionCreators'
import {Notification} from './Notification'
import {State} from '../Reducer'
import {getFullScreen} from '../NevergreenReducer'
import {getNotification} from './NotificationReducer'

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
