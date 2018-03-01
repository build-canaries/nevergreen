import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {dismiss} from '../actions/NotificationActionCreators'
import Notification from './Notification'
import {withRouter} from 'react-router-dom'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({dismiss}, dispatch)
}

function mapStateToProps(store) {
  return {
    notification: store.get('notification'),
    fullScreen: store.getIn(['nevergreen', 'fullScreen'])
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification))
