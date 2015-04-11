var $ = require('jquery')
var React = require('react')

module.exports = {
    SimpleMessage: React.createClass({
        propTypes: {
            status: React.PropTypes.number,
            reason: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                status: 'unknown',
                reason: 'unknown'
            }
        },

        message: function () {
            if(this.props.status === 0 ) {
                return "Nevergreen is not responding"
            }
            return 'The remote server is returning a "' + this.props.reason + '"'
        },

        render: function () {
            return (
                <div className='error-message'>{this.message()}</div>
            )
        }
    })
}
