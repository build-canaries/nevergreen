var React = require('react')
var $ = require('jquery')
var repository = require('../../storage/repository')
var successRepository = require('../../storage/successRepository')(repository)
var messages = require('../../services/messages')

var SuccessMessage = React.createClass({
    render: function () {
        return (
            <div>
                <label htmlFor={'success-message-' + this.props.index}>Message</label>
                <input id={'success-message-' + this.props.index}
                    className='success-message-input'
                    type='text'
                    name='success-message'
                    value={this.props.message.value}
                    onChange={this.onChange}
                    placeholder='success message or image url'/>
                {this.props.index > 0 ? <RemoveLink removeMessage={this.props.removeMessage} /> : ''}
            </div>
        )
    },

    onChange: function (event) {
        var value = event.target.value;

        this.setState({value: value})
        this.props.saveMessages(value)
    }
})

var RemoveLink = React.createClass({
    render: function () {
        return (
            <a href='#' className='success-remove' onClick={this.onClick}>remove</a>
        )
    },

    onClick: function (event) {
        this.props.removeMessage()
        event.preventDefault()
    }
})

var SuccessMessages = React.createClass({
    getInitialState: function () {
        return {messages: this.props.messages};
    },

    render: function () {
        return (
            <div>
                <div id='success-messages'>
                {
                    this.state.messages.map(function (message, i) {
                        return <SuccessMessage key={i} index={i} message={message} removeMessage={this.removeMessage.bind(this, i)} saveMessages={this.saveMessages.bind(this, i)} />
                    }.bind(this))
                }
                </div>
                <button id='success-add' className='dashboard-button' onClick={this.addNewMessage}>Add</button>
            </div>
        )
    },

    addNewMessage: function (event) {
        var newMessage = messages.newMessage()
        this.state.messages.push(newMessage)
        this.setState({ messages: this.state.messages})
        event.preventDefault()
    },

    removeMessage: function (index) {
        this.state.messages.splice(index, 1)
        this.setState({ messages: this.state.messages})
        successRepository.saveSuccessMessages(this.state.messages)
    },

    saveMessages: function (index, value) {
        this.state.messages[index] = messages.newMessage(value)
        this.setState({ messages: this.state.messages})
        successRepository.saveSuccessMessages(this.state.messages)
    }
})

var SuccessSection = React.createClass({
    render: function () {
        return (
            <section id='success' className='dashboard-main-section'>
                <h2 className='visuallyhidden'>Success</h2>
                <fieldset className='tracking-cctray-group'>
                    <form className='tracking-cctray-group-cctray-form'>
                        <SuccessMessages messages={this.props.messages} />
                    </form>
                </fieldset>
            </section>
        )
    }
})

module.exports = {
    render: function (messages) {
        React.render(<SuccessSection messages={messages} />, $('#success-content')[0])
    }
}
