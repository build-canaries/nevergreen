import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {dismiss} from '../actions/NotificationActionCreators'
import {Notification} from './Notification'
import {State} from '../reducers/Reducer'
import {getFullScreen} from '../reducers/NevergreenReducer'
import {getNotification} from '../reducers/NotificationReducer'

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
