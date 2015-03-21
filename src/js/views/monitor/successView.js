var $ = require('jquery')
var React = require('react')
var Message = require('./messageComponent')
var Image = require('./imageComponent')
var messagesController = require('../../controllers/messages')

module.exports = {
    Success: React.createClass({
        getInitialState: function () {
            return {message: '=(^.^)='}
        },

        render: function () {
            if (messagesController.isUrl(this.state.message)) {
                return <Image.Image url={this.state.message} />
            } else {
                return <Message.Message message={this.state.message} />
            }
        },

        componentWillMount: function () {
            messagesController.randomMessage(this.setMessage)
        },

        setMessage: function (message) {
            this.setState({message: message})
        }
    })
}
