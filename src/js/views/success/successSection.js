var React = require('react/addons')
var $ = require('jquery')
var Messages = require('./messagesComponent')

var SuccessSection = React.createClass({
    propTypes: {
        messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function () {
        return (
            <section id='success' className='dashboard-main-section'>
                <h2 className='visuallyhidden'>Success</h2>
                <fieldset className='tracking-cctray-group'>
                    <form className='tracking-cctray-group-cctray-form'>
                        <Messages.Messages messages={this.props.messages} />
                    </form>
                </fieldset>
            </section>
        )
    }
})

module.exports = {
    render: function (messages) {
        React.render(<SuccessSection messages={messages} />, $('#success-content')[0])
    }
}