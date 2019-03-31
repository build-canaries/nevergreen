import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {dismiss} from '../actions/NotificationActionCreators'
import {Notification} from './Notification'
import {withRouter} from 'react-router-dom'
import {getFullScreen, getNotification} from '../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({dismiss}, dispatch)
}

function mapStateToProps(state) {
  return {
    notification: getNotification(state),
    fullScreen: getFullScreen(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification))
