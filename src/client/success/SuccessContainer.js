import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addMessage, removeMessage} from '../actions/SuccessActions'
import Success from './Success'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(store) {
  return {
    messages: store.get('success').toJS()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success)
