var React = require('react/addons')

module.exports = {

    AddMessage: React.createClass({
        mixins: [React.addons.LinkedStateMixin],

        propTypes: {
            addMessage: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {message: ''}
        },

        render: function () {
            return (
                <div className='tracking-cctray-group-cctray-form'>
                    <label htmlFor='message-input' className='success-message-prompt'>message</label>
                    <input id="message-input" className='tracking-cctray-group-cctray-form-input success-message-input' type='text' placeholder='text or image url' valueLink={this.linkState('message')} onKeyPress={this.onKeyPress}/>
                    <button className='dashboard-button dashboard-button-secondary' onClick={this.onClick}>add</button>
                </div>
            )
        },

        onClick: function () {
            this.props.addMessage(this.state.message)
        },

        onKeyPress: function (evt) {
            if (evt.key === 'Enter') {
                this.props.addMessage(this.state.message)
            }
        }
    })

}