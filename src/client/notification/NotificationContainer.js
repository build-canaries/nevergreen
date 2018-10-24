import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {dismiss} from '../actions/NotificationActionCreators'
import {Notification} from './Notification'
import {withRouter} from 'react-router-dom'
import {fullScreen, notification} from '../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({dismiss}, dispatch)
}

function mapStateToProps(state) {
  return {
    notification: notification(state),
    fullScreen: fullScreen(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification))
