import React, {Component} from 'react'
import AddedMessages from './addedMessages'
import AddedImages from './addedImages'
import AddMessage from './addMessage'
import SuccessStore from '../../stores/SuccessStore'
import UiMessageStore from '../../stores/UiMessageStore'
import SuccessActions from '../../actions/SuccessActions'

function getStateFromStore() {
  return {
    messages: SuccessStore.getMessages(),
    images: SuccessStore.getImages(),
    errors: UiMessageStore.getSuccessErrors()
  }
}

class SuccessSection extends Component {
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
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Success</h2>
        <AddMessage addMessage={SuccessActions.addMessage} errors={this.state.errors}/>

        { this.state.messages.length > 0 ?
          <AddedMessages messages={this.state.messages} removeMessage={SuccessActions.removeMessage}/> : '' }
        { this.state.images.length > 0 ?
          <AddedImages messages={this.state.images} removeMessage={SuccessActions.removeMessage}/> : '' }
      </section>
    )
  }
}

export default SuccessSection
