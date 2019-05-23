import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {addMessage, removeMessage} from '../actions/SuccessActionCreators'
import {Success} from './Success'
import {getSuccessMessages} from '../reducers/Selectors'
import {State} from '../reducers/Reducer'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(state: State) {
  return {
    messages: getSuccessMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success)
