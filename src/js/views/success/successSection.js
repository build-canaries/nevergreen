const React = require('react')
const AddedMessages = require('./addedMessages')
const AddedImages = require('./addedImages')
const AddMessage = require('./addMessage')
const SuccessStore = require('../../stores/SuccessStore')
const UiMessageStore = require('../../stores/UiMessageStore')
const SuccessActions = require('../../actions/SuccessActions')

function getStateFromStore() {
  return {
    messages: SuccessStore.getMessages(),
    images: SuccessStore.getImages(),
    errors: UiMessageStore.getSuccessErrors()
  }
}

module.exports = React.createClass({
  getInitialState() {
    return getStateFromStore()
  },

  componentDidMount() {
    SuccessStore.addListener(this._onChange)
    UiMessageStore.addListener(this._onChange)
  },

  componentWillUnmount() {
    SuccessStore.removeListener(this._onChange)
    UiMessageStore.removeListener(this._onChange)
  },

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Success</h2>
        <AddMessage addMessage={this._addNewMessage} validationMessages={this.state.errors}/>

        { this.state.messages.length > 0 ?
          <AddedMessages messages={this.state.messages} removeMessage={this._removeMessage}/> : '' }
        { this.state.images.length > 0 ?
          <AddedImages messages={this.state.images} removeMessage={this._removeMessage}/> : '' }
      </section>
    )
  },

  _addNewMessage(message) {
    SuccessActions.addMessage(message)
  },

  _removeMessage(message) {
    SuccessActions.removeMessage(message)
  },

  _onChange() {
    this.setState(getStateFromStore())
  }
})
