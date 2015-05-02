var React = require('react/addons')
var RemoveLink = require('./removeLink').RemoveLink

module.exports = {
    Message: React.createClass({
        propTypes: {
            message: React.PropTypes.string.isRequired,
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                    <li className='success-item'>
                        <span className='success-message'>{this.props.message}</span>
                        <RemoveLink removeMessage={this.props.removeMessage}/>
                    </li>
            )
        }
    })
}
