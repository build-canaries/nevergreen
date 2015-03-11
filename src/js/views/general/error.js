var $ = require('jquery')
var React = require('react')
var styler = require('../../monitor/styler')

var Error = React.createClass({

    message: function () {
        return 'Failed to fetch projects because a "' + this.props.status + '" status was returned with the message "' + this.props.reason + '"'
    },

    render: function () {
        return (
            <div>{this.message()}</div>
        )
    },

    componentDidMount: function () {
        styler.styleProjects([{name: this.message()}], $(this.getDOMNode()), $('#content'))
    }
})

module.exports = {
    render: function (data) {
        React.render(<Error status={data.status} reason={data.statusText}/>, $('#content')[0])
    }
}
