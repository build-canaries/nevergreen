var React = require('react')

module.exports = {
    RemoveLink: React.createClass({
        propTypes: {
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <button className='success-remove dashboard-button-small' onClick={this.props.removeMessage}>
                    <span className='icon-cross'></span>
                    <span className='visuallyhidden'>remove</span>
                </button>
            )
        }
    })
}
