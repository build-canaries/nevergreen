var React = require('react/addons')
var $ = require('jquery')
var successRepository = require('../../storage/successRepository')
var messagesController = require('../../controllers/messages')
var Message = require('./messageComponent')

module.exports = {
    Messages: React.createClass({
        propTypes: {
            messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        },

        getInitialState: function () {
            return {messages: this.props.messages};
        },

        render: function () {
            return (
                <div>
                    <div id='success-messages'>
                {
                    this.state.messages.map(function (message, i) {
                        return <Message.Message key={i} index={i} message={message} removeMessage={this.removeMessage.bind(this, i)} updateMessage={this.updateMessage.bind(this, i)} />
                    }.bind(this))
                    }
                    </div>
                    <button id='success-add' className='dashboard-button' onClick={this.addNewMessage}>Add</button>
                </div>
            )
        },

        addNewMessage: function (event) {
            var newMessage = messagesController.newMessage()
            var newMessages = React.addons.update(this.state.messages, {
                $push: [newMessage]
            })
            this.setState({messages: newMessages})
            event.preventDefault()
        },

        removeMessage: function (index) {
            var newMessages = React.addons.update(this.state.messages, {
                $splice: [[index, 1]]
            })
            this.setState({messages: newMessages})
        },

        updateMessage: function (index, value) {
            var command = {}
            command[index] = {$set: {value: value}}
            var newMessages = React.addons.update(this.state.messages, command)
            this.setState({messages: newMessages})
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (this.state.message !== nextState.messages) {
                successRepository.saveSuccessMessages(nextState.messages)
            }
        }
    })
}
