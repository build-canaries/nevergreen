import React, {Component} from 'react'
import SuccessStore from '../stores/SuccessStore'
import UiMessageStore from '../stores/UiMessageStore'
import Success from './Success'
import {removeMessage, addMessage} from './SuccessActions'

function getStateFromStore() {
  return {
    messages: SuccessStore.getMessages(),
    images: SuccessStore.getImages(),
    errors: UiMessageStore.getSuccessErrors(),
    removeMessage,
    addMessage
  }
}

class SuccessContainer extends Component {
  constructor(props) {
    super(props)
    this.state = getStateFromStore()
  }

  componentDidMount() {
    const callback = () => this.setState(getStateFromStore())
    SuccessStore.addListener(callback)
    UiMessageStore.addListener(callback)
    this.setState({callback})
  }

  componentWillUnmount() {
    SuccessStore.removeListener(this.state.callback)
    UiMessageStore.removeListener(this.state.callback)
  }

  render() {
    return <Success {...this.state}/>
  }
}

export default SuccessContainer
