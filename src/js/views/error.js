var $ = require('jquery')
var React = require('react')

var Error = React.createClass({
    render: function () {
        return (
            <div>Failed to fetch projects because a "{this.props.status}" status was returned with the message "{this.props.reason}"</div>
        )
    }
})

module.exports = {
    render: function (data) {
        React.render(<Error status={data.status} reason={data.statusText}/>, $('#content')[0])
    }
}
