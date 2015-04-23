var $ = require('jquery')
var React = require('react')
var Message = require('./messageComponent').Message
var Image = require('./imageComponent').Image
var messagesController = require('../../controllers/messages')

module.exports = {
    Success: React.createClass({
        getInitialState: function () {
            return {message: messagesController.randomMessage()}
        },

        render: function () {
            if (messagesController.isUrl(this.state.message)) {
                return <Image url={this.state.message}/>
            } else {
                return <Message message={this.state.message}/>
            }
        },

        componentWillMount: function () {
            this.setState({message: messagesController.randomMessage()})
        }
    })
}
