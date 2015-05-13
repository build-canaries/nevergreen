var React = require('react/addons')
var Message = require('./message').Message
var AddMessage = require('./addMessage').AddMessage

module.exports = {
    AddedMessages: React.createClass({
        propTypes: {
            messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <section className='success-section'>
                    <h3 className='success-title'>Messages</h3>
                    <ul className='success-list success-text-list'>
                        {
                            this.props.messages.map(function (message) {
                                return <Message key={message.index} message={message.value} removeMessage={this.props.removeMessage.bind(null, message.index)}/>
                            }.bind(this))
                        }
                    </ul>
                </section>
            )
        }
    })
}
