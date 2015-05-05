var React = require('react/addons')
var successRepository = require('../../storage/successRepository')
var messagesController = require('../../controllers/messages')
var AddedMessages = require('./addedMessages').AddedMessages
var AddedImages = require('./addedImages').AddedImages
var AddMessage = require('./addMessage').AddMessage

module.exports = {
    SuccessSection: React.createClass({
        getInitialState: function () {
            return {messages: successRepository.getSuccessMessages()}
        },

        render: function () {
            var messages = this.messages()
            var images = this.images()

            return (
                <section id='success' className='dashboard-main-section'>
                    <h2 className='visuallyhidden'>Success</h2>
                    <fieldset className='tracking-cctray-group'>
                        <AddMessage addMessage={this.addNewMessage}/>

                        { messages.length > 0 ? <AddedMessages messages={messages} removeMessage={this.removeMessage}/> : '' }
                        { images.length > 0 ? <AddedImages messages={images} removeMessage={this.removeMessage}/> : '' }
                    </fieldset>
                </section>
            )
        },

        addNewMessage: function (message) {
            var newMessages = React.addons.update(this.state.messages, {
                $push: [message]
            })
            this.setState({messages: newMessages})
        },

        removeMessage: function (index) {
            var newMessages = React.addons.update(this.state.messages, {
                $splice: [[index, 1]]
            })
            this.setState({messages: newMessages})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.messages !== nextState.messages) {
                successRepository.saveSuccessMessages(nextState.messages)
            }
        },

        images: function () {
            return this.indexedMessages().filter(function (message) {
                return messagesController.isUrl(message.value)
            })
        },

        messages: function () {
            return this.indexedMessages().filter(function (message) {
                return !messagesController.isUrl(message.value)
            })
        },

        indexedMessages: function () {
            return this.state.messages.map(function (message, i) {
                return {index: i, value: message}
            })
        }
    })
}