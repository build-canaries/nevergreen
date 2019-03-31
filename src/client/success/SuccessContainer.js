import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addMessage, removeMessage} from '../actions/SuccessActionCreators'
import {Success} from './Success'
import {getSuccessMessages} from '../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(state) {
  return {
    messages: getSuccessMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Success))
