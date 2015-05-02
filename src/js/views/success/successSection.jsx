var React = require('react/addons')
var successRepository = require('../../storage/successRepository')
var messagesController = require('../../controllers/messages')
var Message = require('./message').Message
var Image = require('./image').Image
var AddMessage = require('./addMessage').AddMessage

module.exports = {
    SuccessSection: React.createClass({
        getInitialState: function () {
            return {messages: successRepository.getSuccessMessages()}
        },

        render: function () {
            return (
                <section id='success' className='dashboard-main-section'>
                    <h2 className='visuallyhidden'>Success</h2>
                    <fieldset className='tracking-cctray-group'>
                        <AddMessage addMessage={this.addNewMessage}/>

                        <section className='success-section'>
                            <h3 className='success-title'>Messages</h3>
                            <ul className='success-list'>
                            {
                                this.state.messages.map(function (message, i) {
                                    return !messagesController.isUrl(message) ? <Message key={i} message={message} removeMessage={this.removeMessage.bind(this, i)}/> : ''
                                }.bind(this))
                            }
                            </ul>
                        </section>
                        <section className='success-section'>
                            <h3 className='success-title'>Images</h3>
                            <ul className='success-list'>
                            {
                                this.state.messages.map(function (message, i) {
                                    return messagesController.isUrl(message) ? <Image key={i} url={message} removeMessage={this.removeMessage.bind(this, i)}/> : ''
                                }.bind(this))
                            }
                            </ul>
                        </section>
                    </fieldset>
                </section>
            )
        },

        componentWillMount: function () {
            this.setState({messages: successRepository.getSuccessMessages()})
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
        }
    })
}