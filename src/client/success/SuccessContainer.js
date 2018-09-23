import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addMessage, removeMessage} from '../actions/SuccessActionCreators'
import Success from './Success'
import {successMessages} from '../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(state) {
  return {
    messages: successMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Success))
