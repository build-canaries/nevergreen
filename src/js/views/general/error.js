var $ = require('jquery')
var React = require('react')
var styler = require('../../monitor/styler')

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
            return 'Failed to fetch projects because a "' + this.props.status + '" status was returned with the message "' + this.props.reason + '"'
        },

        render: function () {
            return (
                <div>{this.message()}</div>
            )
        },

        componentDidMount: function () {
            var $node = $(this.getDOMNode())
            styler.styleProjects([{name: this.message()}], $node, $node)
        }
    })
}
