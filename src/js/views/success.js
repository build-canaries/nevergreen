var $ = require('jquery')
var React = require('react')
var styler = require('../monitor/styler')

var SuccessMessage = React.createClass({
    render: function () {
        return (
            <li>
                <div className='monitor-outerContainer'>
                    <div id='success-text' className='monitor-innerContainer'>{this.props.message}</div>
                </div>
            </li>
        )
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return !successMessageDisplayed()
    }
})

var SuccessImage = React.createClass({
    render: function () {
        var fullScreenImage = {
            background: 'url(' + this.props.url + ') no-repeat center center fixed',
            backgroundSize: 'contain'
        }
        return (
            <li>
                <div className='monitor-outerContainer'>
                    <div id='success-image' className='monitor-success-image monitor-innerContainer' style={fullScreenImage}></div>
                </div>
            </li>
        )
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return !successMessageDisplayed()
    }
})

module.exports = {
    renderImage: function (url) {
        React.render(<SuccessImage url={url} />, $('#content')[0])
        styler.styleProjects()
    },

    renderMessage: function (message) {
        React.render(<SuccessMessage message={message} />, $('#content')[0])
        styler.styleProjects()
    }
}

function successMessageDisplayed() {
    return $('#success-image').length !== 0 || $('#success-text').length !== 0
}
