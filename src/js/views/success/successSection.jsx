var React = require('react/addons')
var successRepository = require('../../storage/successRepository')
var Message = require('./messageComponent')

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
                        <form className='tracking-cctray-group-cctray-form'>
                            <div id='success-messages'>
                            {
                                this.state.messages.map(function (message, i) {
                                    return <Message.Message key={i} index={i} message={message} removeMessage={this.removeMessage.bind(this, i)} updateMessage={this.updateMessage.bind(this, i)} />
                                }.bind(this))
                                }
                            </div>
                            <button id='success-add' className='dashboard-button' onClick={this.addNewMessage}>Add</button>
                        </form>
                    </fieldset>
                </section>
            )
        },

        componentWillMount: function () {
            this.setState({messages: successRepository.getSuccessMessages()})
        },

        addNewMessage: function () {
            var newMessages = React.addons.update(this.state.messages, {
                $push: ['']
            })
            this.setState({messages: newMessages})
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
            if (this.state.messages !== nextState.messages) {
                successRepository.saveSuccessMessages(nextState.messages)
            }
        }
    })
}