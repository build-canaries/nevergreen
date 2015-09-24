var React = require('react/addons')
var AddedMessages = require('./addedMessages')
var AddedImages = require('./addedImages')
var AddMessage = require('./addMessage')
var SuccessStore = require('../../stores/SuccessStore')
var SuccessActions = require('../../actions/SuccessActions')

function getStateFromStore() {
  return {
    messages: SuccessStore.getMessages(),
    images: SuccessStore.getImages()
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return getStateFromStore()
  },

  componentDidMount: function () {
    SuccessStore.addListener(this._onChange)
  },

  componentWillUnmount: function () {
    SuccessStore.removeListener(this._onChange)
  },

  render: function () {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Success</h2>
        <fieldset className='tracking-cctray-group'>
          <AddMessage addMessage={this._addNewMessage}/>

          { this.state.messages.length > 0 ?
            <AddedMessages messages={this.state.messages} removeMessage={this._removeMessage}/> : '' }
          { this.state.images.length > 0 ?
            <AddedImages messages={this.state.images} removeMessage={this._removeMessage}/> : '' }
        </fieldset>
      </section>
    )
  },

  _addNewMessage: function (message) {
    SuccessActions.addMessage(message)
  },

  _removeMessage: function (message) {
    SuccessActions.removeMessage(message)
  },

  _onChange: function () {
    if (this.isMounted()) {
      this.setState(getStateFromStore())
    }
  }
})