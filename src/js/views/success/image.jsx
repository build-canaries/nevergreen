var React = require('react')
var RemoveLink = require('./removeLink').RemoveLink

module.exports = {
    Image: React.createClass({
        propTypes: {
            url: React.PropTypes.string.isRequired,
            removeMessage: React.PropTypes.func.isRequired
        },

        render: function () {
            return (
                <li>
                    <image className='success-list-image' src={this.props.url}/>
                    <RemoveLink removeMessage={this.props.removeMessage}/>
                </li>
            )
        }
    })
}
