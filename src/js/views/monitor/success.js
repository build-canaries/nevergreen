var $ = require('jquery')
var React = require('react')
var styler = require('../../monitor/styler')

module.exports = {
    Message: React.createClass({
        propTypes: {
            message: React.PropTypes.string.isRequired
        },

        render: function () {
            return (
                <div id='success-text' className='monitor-success-text'>{this.props.message}</div>
            )
        },

        shouldComponentUpdate: function () {
            return false
        },

        componentDidMount: function () {
            var $node = $(this.getDOMNode())
            styler.styleProjects([{name: this.props.message}], $node, $node.parent())
        }
    }),

    Image: React.createClass({
        propTypes: {
            url: React.PropTypes.string.isRequired
        },

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
}
