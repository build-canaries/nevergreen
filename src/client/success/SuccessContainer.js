import Immutable from 'immutable'
import {connect} from 'react-redux'
import {addMessage, removeMessage} from '../actions/SuccessActions'
import Success from './Success'

function mapDispatchToProps(dispatch) {
  return {
    addMessage(message) {
      dispatch(addMessage(message))
    },
    removeMessage(message) {
      dispatch(removeMessage(message))
    }
  }
}

function mapStateToProps(store) {
  const success = store.get('success')
  return Immutable.Map({
    messages: success.get('texts'),
    images: success.get('images')
  }).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Success)
