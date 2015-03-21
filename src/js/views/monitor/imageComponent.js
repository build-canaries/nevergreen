var $ = require('jquery')
var React = require('react')

module.exports = {
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
