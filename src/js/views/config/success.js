var React = require('react/addons')
var $ = require('jquery')
var successRepository = require('../../storage/successRepository')
var messages = require('../../services/messages')

var SuccessMessage = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        message: React.PropTypes.string.isRequired,
        removeMessage: React.PropTypes.func.isRequired,
        updateMessage: React.PropTypes.func.isRequired
    },

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
        this.props.updateMessage(event.target.value)
    }
})

var RemoveLink = React.createClass({
    propTypes: {
        removeMessage: React.PropTypes.func.isRequired
    },

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
                        return <SuccessMessage key={i} index={i} message={message} removeMessage={this.removeMessage.bind(this, i)} updateMessage={this.updateMessage.bind(this, i)} />
                    }.bind(this))
                    }
                </div>
                <button id='success-add' className='dashboard-button' onClick={this.addNewMessage}>Add</button>
            </div>
        )
    },

    addNewMessage: function (event) {
        var newMessage = messages.newMessage()
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

var SuccessSection = React.createClass({
    propTypes: {
        messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

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
