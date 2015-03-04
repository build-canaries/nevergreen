var $ = require('jquery')
var React = require('react')
var styler = require('../monitor/styler')

var SuccessMessage = React.createClass({
    render: function () {
        return (
            <div id='success-text' className='monitor-success-text'>{this.props.message}</div>
        )
    },

    shouldComponentUpdate: function () {
        return false
    },

    componentDidMount: function () {
        styler.styleProjects([{name: this.props.message}], $(this.getDOMNode()))
    }
})

var SuccessImage = React.createClass({
    render: function () {
        var fullScreenImage = {
            background: 'url(' + this.props.url + ') no-repeat center center fixed'
        }
        return (
            <div id='success-image' className='monitor-success-image' style={fullScreenImage}></div>
        )
    },

    shouldComponentUpdate: function () {
        return false
    }
})

module.exports = {
    SuccessMessage: function (message) {
        return <SuccessMessage message={message} />
    },

    SuccessImage: function (url) {
        return <SuccessImage url={url} />
    },

    renderImage: function (url) {
        React.render(<SuccessImage url={url} />, $('#content')[0])
    },

    renderMessage: function (message) {
        React.render(<SuccessMessage message={message} />, $('#content')[0])
    }
}
