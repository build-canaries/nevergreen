var React = require('react')

module.exports = {
    RemoveLink: React.createClass({
        propTypes: {
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <button className='success-remove button' onClick={this.props.removeMessage} title='remove'>
                    <span className='icon-cross'></span>
                    <span className='visually-hidden'>remove</span>
                </button>
            )
        }
    })
}
