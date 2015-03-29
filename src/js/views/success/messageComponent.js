var React = require('react/addons')
var $ = require('jquery')

var RemoveLink = React.createClass({
    propTypes: {
        removeMessage: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <button className='success-remove dashboard-button-small' onClick={this.onClick}>
                <span className='icon-cross'></span>
                <span className='visuallyhidden'>remove</span>
            </button>
        )
    },

    onClick: function () {
        this.props.removeMessage()
    }
})

module.exports = {
    Message: React.createClass({
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
                        value={this.props.message}
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
}
