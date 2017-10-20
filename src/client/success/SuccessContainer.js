import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addMessage, removeMessage} from '../actions/SuccessActions'
import Success from './Success'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(store) {
  return {messages: store.get('success')}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Success))
